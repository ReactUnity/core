# Migrating `com.reactunity.quickjs` to quickjs-ng

Work in progress on branch `quickjs-ng-migration`. A rendered version of this plan, with the
full measured tables, is at <https://claude.ai/code/artifact/25feabb3-942e-419e-9394-e48b22bd7d1a>.

## Why

This package binds [unity-jsb](https://github.com/ialex32x/unity-jsb)'s fork of **Bellard-era
QuickJS**, not [quickjs-ng](https://github.com/quickjs-ng/quickjs). `dumpbin -exports` on the
shipped `Plugins/QuickJS/x64/quickjs.dll` proves it: `JS_NewBigDecimal` and
`JSB_ATOM_BigFloatEnv` are present, `JS_SetModuleLoaderFunc2` is not. quickjs-ng deleted BigDecimal
and BigFloat outright.

Both upstreams are dormant. The immediate driver is **asynchronous module loading** — the spec's
`HostLoadImportedModule`, which lets a host fetch modules over a network without blocking. It is
implemented and tested on <https://github.com/gkurt/quickjs> branch `async-module-loading`
(36 assertions, clean under ASan and `QJS_ENABLE_GC_STRESS`), and it cannot reach Unity until this
migration lands. Bellard-era QuickJS has no async loader and never will.

A proven C# binding for the new API — P/Invoke declarations, UTF-8 marshalling, delegate rooting,
`GCHandle` handling, and a `QuickJSModuleLoader` shaped like `JintModuleLoader` — lives outside this
repo at `S:/Work/Unity/quickjs-ng-csharp` (23 assertions passing against a quickjs-ng DLL on
.NET 8). It was the reference for phases 3 and 4, and `AsyncModuleLoader` is its shape.

## Measured surface

**104 live entry points** bound to `JSBDLL`, re-measured after phase 4. Liveness is evaluated with
Unity's real define set, so a declaration inside a dead `#if` does not count:

| Group | Live | Provided by the ng build |
|---|---:|---|
| `JS_*` — real QuickJS API | 66 | all exported by ng |
| `JSB_*` / `jsb_*` — unity-jsb C shim | 27 | **all 27** — none exist in ng, so each one is ported in [native/quickjs/src](../../native/quickjs/src) |
| `JSB_ATOM_*` | 11 | all generated from ng's `quickjs-atom.h` |
| `js_*` — allocator | 2 | `js_malloc` and `js_free`, both exported by ng |

Nothing is unaccounted for: `check-exports.py` reports 104 of 104 satisfied with no stale export,
and `check-signatures.py` reports all 66 `JS_*` declarations matching their prototypes in
`quickjs.h`. Both exit 0.

The count has moved twice by subtraction and once by addition. Phase 3 deleted seven declarations —
the four atoms ng does not have, `JS_GetPropertyInternal`, `JS_SetPropertyInternal` and
`JS_AddIntrinsicOperators` — and added `JS_GetProperty` and `JS_SetProperty`, which ng exports
itself, for 99. Removing operator overloading took `JSB_ATOM_Function` with it, for 98. Phase 4
added the six the async loader needs: `JS_SetModuleLoaderFuncAsync`, `JS_SetModuleMetaFunc`,
`JS_FulfillModuleLoad`, `JS_RejectModuleLoad`, `JS_EvalModuleAsync` and `JS_GetModuleName`.

A WebGL build binds 105: the same set plus `JS_SetBaseUrl`, which is a real P/Invoke only there.
That is the number [check-jslib.py](../../native/quickjs/check-jslib.py) holds the jslib to.

The shim is **27 functions, not the 25 this document used to claim.** The old count went by C#
member name and so missed three entry points reached through `EntryPoint` aliases on declarations
named `JS_*`: `JSB_DupValue`, `JSB_FreeValue` and `JSB_NewFloat64`. An earlier version of this
document warned that any audit of this surface has to honour `EntryPoint`, and then got it wrong
anyway — so re-run `check-exports.py`, which resolves `EntryPoint`, rather than reading the surface.

The names that used to be listed here and are no longer a cost: the five `JS_*Debugger*` and
`JS_SetLogFunc` went with the debug server; `JS_SetBaseUrl` is a real P/Invoke only under
`UNITY_WEBGL && !UNITY_EDITOR` and lives in
the jslib; and `JS_NewString`, the one name this plan expected to need an inline shim, turned out to
have no callers anywhere and was deleted instead. Nothing in the QuickJS path touches
BigFloat/BigDecimal.

## The four atoms ng does not have — resolved

`fileName`, `lineNumber`, `Operators`, `Symbol_operatorSet` are absent from ng's
`quickjs-atom.h`. They split cleanly into a free case and a real one:

- **`Operators` / `Symbol_operatorSet`** — dropped with operator overloading, and now so is
  everything that named them. Phase 2 stubbed the accessors, phase 3 made
  `IsOperatorOverloadingSupported` permanently `false` and took both atoms and
  `JS_AddIntrinsicOperators` off the P/Invoke surface, and phase 4 deleted the machinery behind the
  guard: `OperatorDecl`, `TypeRegister`'s six `RegisterOperator` overloads, `ClassDecl`'s three
  `Add*Operator` methods, `ScriptContext`'s `Operators.create` lookup, `OperatorBindingInfo`, the
  `op_*` switch in `AddMethod`, and `CodeGenHelper_Operator`. See "Removing operator overloading"
  below for what that costs.
- **`fileName` / `lineNumber`** — not free, and silent. Bellard's `build_backtrace` defines
  both **on the Error object**; ng only keeps the `Function.prototype` getters
  (`quickjs.c:43389`). `JSContext.FormatException` read them off a caught exception to build the
  error location, so under ng it would have got `undefined` twice and every script error would have
  lost its file and line without anything failing. Phase 3 deleted both reads: ng's `stack` already
  opens with `    at <file>:<line>:<col>` in exactly that shape (`quickjs.c:8256`), so appending the
  stack is now the whole job. Confirmed on a real parse error out of the suite, which now reports
  `SyntaxError: ... / at ReactUnity/scripts/anonymous:1:16` followed by the call chain — the same
  location the deleted code produced, plus a column and the frames above it.

`shim-test` still asserts ng defines none of the four, so the reasoning written against their
absence fails loudly if a future ng brings one back.

Everything else the atom machinery needs is unchanged: ng's `quickjs-atom.h` uses the same
`DEF(name, str)` shape, so unity-jsb's enum-and-accessor trick ports verbatim (241 atoms in ng
against 224 in Bellard).

## What fails silently

Missing symbols throw on first call. **Changed** symbols keep working and return nonsense. This is
the list phase 3 fixed. Three of its seven rows are corrections to what this document said, all of
them from an earlier by-eye reading — `check-signatures.py` now derives the whole table from the
header instead:

| Symbol | C# before phase 3 | quickjs-ng | Failure |
|---|---|---|---|
| `JS_IsArray` | `int (ctx, val)` | `bool (val)` | arity + width |
| `JS_IsError` | `JS_BOOL (ctx, val)` | `bool (val)` | arity + width |
| `JS_IsFunction` | `JS_BOOL (ctx, val)` | `bool (ctx, val)` | width |
| `JS_IsConstructor` | `JS_BOOL (ctx, val)` | `bool (ctx, val)` | width |
| `JS_IsJobPending` | `int (rt, out pctx)` | `bool (rt)` | arity + width |
| `JS_SetConstructor` | `void (ctx, func, proto)` | `int (...)` | discarded error |
| `JS_ToCStringLen2` | `bool cesu8` as `UnmanagedType.Bool` | `bool` (1 byte) | 4-byte `BOOL` |
| `JSHostPromiseRejectionTracker` | `JS_BOOL is_handled` | `bool is_handled` | width, **into** managed |

The last row is the same width bug in the other direction, and the only one of these that was
correct before ng: Bellard's `is_handled` really was `JS_BOOL`. It is a **reverse** P/Invoke — ng
calls into managed code — so the managed signature decides how many bytes are read off the register,
and reading four where ng wrote one takes three undefined bytes with it. The handler is
`if (is_handled != 1)` guarding the "Unhandled promise rejection" log, so the visible symptom would
have been handled rejections reported as unhandled. `check-signatures.py` reads `DllImport`
declarations only and never sees a delegate, so this one was found by hand and the delegates are
still a hand-checked surface.

`JS_IsJobPending` was listed here as width-only. Its C# declaration actually carried a second
parameter, `out JSContext pctx`, that **no QuickJS header has ever had** — Bellard's included; the
callee ignored the register and the caller read back an uninitialised local. `JS_SetConstructor` and
`JS_ToCStringLen2` were not on the list at all. All three came from running the check, not from
re-reading the header, which is the argument for having built it.

`JS_BOOL` is `Int32` here; ng returns C `bool`. On x64 a `bool` return sets only `AL` and the upper
three bytes of `EAX` are undefined — usually truthy, occasionally not. Every one needs
`[return: MarshalAs(UnmanagedType.U1)] bool`. ng's header has 26 `bool`-returning functions, of which
this surface declares five, so this recurs as the surface grows.

`JS_IsArray` losing its tri-state is a behaviour change, not just an ABI one. Bellard's returned -1
for the proxy case; ng's `bool` cannot, so the 18 `if (isArray == -1)` early-returns in
`Values_get.cs` were unreachable and are gone.

`JS_IsArray` and `JS_IsError` also **lost their `JSContext*`**, which shifts the `JSValue` into the
wrong register slot. `JS_IsPromise` is a third instance, hit while writing the reference binding: it
compiled clean and returned the wrong answer.

Also silent: **`JS_TAG_FLOAT64` is 8 in ng and 7 in Bellard** — the enum gained `STRING_ROPE` and
`SHORT_BIG_INT`. Re-derive every tag from the new header rather than copying it forward. Phase 3 did,
and `SHORT_BIG_INT` turns out to occupy 7, the slot `FLOAT64` used to hold, so a stale copy of that
block reads every double as a bigint. `BIG_DECIMAL` and `BIG_FLOAT` are gone and `BIG_INT` moved from
-10 to -9; the `JS_WRITE_OBJ_BSWAP` and `JS_READ_OBJ_ROM_DATA` flags are now 0, both obsolete.

**`JS_TAG_STRING_ROPE` was the real find in that enum.** ng represents `a + b` as an unflattened
rope and hands it out as an ordinary `JSValue` (`quickjs.c:5532`), so ng's own `JS_IsString` tests
both tags (`quickjs.h:819`). `JSValue.IsString()` tested only `JS_TAG_STRING`, which would have
silently classified every concatenated string reaching a C# binding as a non-string — no error, just
a wrong answer, on an input any script can produce.

## The second implementation

`Plugins/QuickJS/WebGL/jsbplugin.jslib` reimplements the whole `JSBDLL` surface on the browser's
own engine, compiled from `jsbplugin.ts` in ES5-safe syntax because Emscripten requires it. There is
no QuickJS on WebGL at all, so every signature change and every tag value has to land here
independently. Budget it as a peer of the C# work.

Phase 4 brought it back into agreement and mechanised the part that can be:
[check-jslib.py](../../native/quickjs/check-jslib.py) is `check-exports.py` for this backend, and it
reports 105 of 105 with nothing unused. It found both directions on its first run — which is the
argument for having written it rather than reading the file:

- **`JS_GetProperty` and `JS_SetProperty` were missing**, so this branch did not link for WebGL at
  all. Phase 3 replaced the two `*Internal` wrappers with ng's own exports and the jslib never grew
  them: an undefined symbol on the first property read, which is every property read.
- **26 entries were named by nothing**: the 18 `jsb_get_*`/`jsb_set_*` struct accessors phase 1
  deleted, both `*Internal` functions, `JS_NewString`, `JSB_ATOM_fileName`, `JSB_ATOM_lineNumber`
  and three bridge functions.

Liveness has to be re-evaluated with a WebGL define set rather than the Editor one, and that is not
cosmetic: `JS_SetBaseUrl` is a real P/Invoke exactly where the jslib is, so an Editor-define reading
reports it as unused. Sabotaging that line is one of the three checks the script was shown to catch.

What the check cannot see is signatures — there is no header to compare against — so those were
read: the tag block, the `JS_WRITE_OBJ`/`JS_READ_OBJ` flags, `JSEvalFlags`, `JSPropFlags`, and the
arities of `JS_IsArray`, `JS_IsError`, `JS_IsJobPending`, `JS_SetProperty` and `JS_SetConstructor`.
Two things are worth knowing before touching it again:

- **Widths do not matter here and arities do.** wasm passes a C `bool` as an `i32`, so nothing like
  phase 3's `is_handled` exists on this side. An arity change is the whole risk, and it is silent:
  `JS_IsArray(ctx, val)` against a caller passing one argument reads `val` out of the `ctx` slot.
- **ng dropped the `JSContext` from `JS_IsArray` and `JS_IsError`, and references are per runtime**,
  so there is nothing left to resolve a `JSValue` against. `unityJsbState.getAnyValue` searches the
  live runtimes; two of them would be ambiguous, which needs `JSWorker`, which needs threads WebGL
  does not have.

`unity_qjs.c` no longer has `UNITY_WEBGL` guards for the same underlying reason: on WebGL
`JSApi.JSBDLL` is `__Internal` and the native library is never loaded, so those guards protected a
configuration that cannot occur (and were incoherent anyway — they skipped `quickjs.h` and then used
`JSAtom`).

**The async loader is not easier here, and this document had that wrong twice.** The first claim was
that the browser's real promises and real `import()` make `JS_EvalModuleAsync` a thin `async
function`. What that missed is that this backend has no module scope to run one in: `context.evaluate`
is an `eval` wrapped in `with (globals)` so the bundle sees ReactUnity's globals, and `eval` cannot
run `import` or `export` at all. The second claim was the correction — that fixing it needs "a module
realm in the iframe", and is therefore out of reach. That was the wrong shape, and it is what made
the work look bigger than it is.

**WebGL has ES modules now.** The realm was never the problem; the globals were, and the fix is
smaller than a realm. Modules run in the *same* realm `evaluate` does — the page's, reached through
`new Function('url', 'return import(url);')`, so a module and a script produce objects of one realm
and the `instanceof Error` checks all through the jslib keep working. What a module cannot do is see
the globals proxy, because `with` is illegal in module code and a module's `globalThis` is its
realm's. So the proxy is published on the page under one key and every module is assembled with a
prelude that declares the host globals it mentions:

```js
var {console,fetch,UnityBridge,location} = globalThis["__reactunity_jsb__"][1].globals;
```

Four details make that hold up, and each was a bug before it was a rule:

- **`var`, not `const`.** A bundle is free to declare `var URL` itself; two `var` declarations of one
  name are legal where two lexical ones are a `SyntaxError`. The scanner still collects `let`,
  `const`, `class`, `function` and import bindings so the prelude skips those.
- **Only the names the module mentions**, matched as free identifiers rather than after a `.`. A name
  that is never injected can never collide.
- **The prelude rides on the source's own first line**, with no newline of its own, so no line number
  moves — which matters most for the source map the bundle arrived with, since that cannot be
  corrected from here once it is off by one.
- **Specifiers have to be rewritten.** A module reaches the browser as a blob url, and a blob has no
  base for a relative specifier to resolve against, so every specifier is replaced with the blob url
  of the dependency the host already fetched. Dynamic `import()` is rewritten too — left alone the
  browser would resolve it against the blob url and fetch it itself, which is not where this
  backend's modules live.

The host's half is unchanged and shared with desktop: `QuickJSModuleLoader` resolves and fetches,
`JS_FulfillModuleLoad` settles each load, so `import './x'` resolves against ReactUnity's own paths
on both. What differs is who links and evaluates — there is no QuickJS here, so the assembled blob
urls are handed to the engine the page already runs, and live bindings, top-level await and the
module cache come from it for free.

`JS_SetModuleMetaFunc` is the one hook that cannot be served: it identifies a module by its
`JSModuleDef`, and this backend has none to hand out. The prelude sets `import.meta.url` to the name
the normalizer resolved, which is the same value `MetaTrampoline` would have written.

**One divergence from desktop, deliberate: a cycle is refused.** A blob url can only be minted for
text that is already final, and a cycle's is not — each side needs the other's url first. It is
reported where the path that closes it is still known (`Circular imports are not supported on WebGL:
a -> b -> a`) rather than left as a deadlocked import. Bundler output does not contain ESM cycles;
hand-written module graphs can.

**None of this has run in a WebGL player.** The WebGL build module is not installed on the machine
this was written on, so what is verified is the scanner and the graph loader, against the generated
jslib and the platform's own dynamic import — 42 tests in
`Plugins/QuickJS/WebGL/.source/jsbplugin.test.mjs`, run by CI. What that cannot reach is the C
boundary: the two new dyncall signatures (`iiiii` for the normalizer, `viiiii` for the loader),
whether IL2CPP's reverse wrapper passes `JSModuleLoadHandle` as a flattened `i32` the way clang's
wasm ABI says it should, and whether Unity's WebGL output lets `new Function` and blob-url imports
through. A player is the only thing that settles those.

## Phases

**Gate 0 — the native build pipeline.** Twelve binaries ship (3 Android ABIs, iOS `.a`, macOS
bundle, 4 WSA architectures, Linux x64, Windows x64 + x86) and **this repo** has no sources and no
build script for any of them. Upstream does: `jsb_build/quickjs/` in unity-jsb holds the whole
thing — `unity_qjs.c` (275 lines) and `unity_ext.c` (414), a `CMakeLists.txt`, and
`make_jsb_{win,linux,macos,ios,android,wsa}` scripts. Gate 0 is vendoring that and repointing it at
ng, not writing it. Note Windows is built with **MinGW** (`x86_64-w64-mingw32-gcc`) and only WSA
with MSVC.

**Vendoring turned out to be the wrong plan, and none of it was needed.** Our own
[native/quickjs/CMakeLists.txt](../../native/quickjs/CMakeLists.txt) already branches for every
target shape — `IOS` static, `APPLE` module-and-bundle, shared elsewhere — so the per-platform
difference is a configure line, not a script. There is nothing to port and nothing to keep in step
with upstream. [native-quickjs.yml](../../.github/workflows/native-quickjs.yml) is the matrix:
build, run `shim-test` where the runner can execute what it built, check the exports, upload.
Installing into `Plugins/QuickJS/` stays manual, like `release-upm.yml`.

Five of twelve are now proven, four of them measured rather than argued: Windows x64 (installed),
Windows x86, Linux x64, WSA x64 and WSA ARM64, each 104/104 exports, and the shim's 241 atoms
passing on Linux — the first time that test has run off Windows. macOS, iOS and the three Android
ABIs need a Mac and an NDK, so CI is their first run.

Four findings from doing it, all in [the README](../../native/quickjs/README.md):

- **WSA was never the hard part.** It compiles the whole of `quickjs.c` and trips only on `/sdl`,
  which UWP sets by default and which promotes C4146 and C4703 to errors — two warnings `quickjs.c`
  and `dtoa.c` trip deliberately, and which we already suppressed on our own target but not on ng's.
  Two flags. Separately, CMake's compiler probe builds *and signs an appx*, which fails on ARM64;
  `CMAKE_TRY_COMPILE_TARGET_TYPE=STATIC_LIBRARY` skips it.
- **WSA ARM (32-bit) is dropped, not pending.** The Windows SDK stopped supporting 32-bit ARM
  (`MSB8087`, 10.0.26100 on) and Unity no longer targets it. Twelve artifacts become eleven.
- **The Android ABI list is a unity-jsb relic.** It ships `arm64-v8a`, `armeabi-v7a` and 32-bit
  `x86`, and no `x86_64` — which is the ABI Unity 6 actually targets, while 32-bit `x86` is not one
  it offers. The workflow builds `x86_64` instead.
- **iOS would have shipped an empty archive.** A static library does not absorb a static library it
  links, so `add_library(quickjs STATIC …)` plus `target_link_libraries(… qjs)` yields an archive
  holding the shim alone, every `JS_*` symbol missing, and nothing failing until Unity links the
  Xcode project. The shipped prebuilt is a merged archive (it carries `cutils.o`); the CMakeLists now
  merges too, and `check-exports.py` reads archives so it catches a regression.

The other half of Gate 0 was that the checks could not run without Unity: they derive the wanted set
from generated `.csproj` that are gitignored and hold absolute paths. The surface is now committed as
`pinvoke-native.txt` (104) and `pinvoke-webgl.txt` (105), used when the `.csproj` are absent and
compared against them when they are present, so it cannot rot. `check-exports.py` also grew ELF,
Mach-O and archive readers, so all twelve artifacts are checkable rather than only the Windows ones.

One thing to know before installing any of those eleven: `unity/quickjs/.gitignore` is a Visual
Studio template inherited from the merged repo, and its `[Xx]64/` and `[Xx]86/` build-output rules
**also matched `Plugins/QuickJS/x64` and `x86`**, the directories the binaries ship from. The files
already there are tracked and so survived, which is why nobody noticed; a newly built one was
silently untracked, and `git add` on it failed outright and took the pre-commit hook with it. Phase 3
hit this trying to commit the ng DLL and negated the two paths. Two of the eleven land in those
directories.
*Exit: twelve artifacts built reproducibly in CI from a tagged ng commit, Windows x64 loading in the Editor.*

**Phase 1 — subtract, against the old DLL.** Done, including the one item that was held back for a
decision: the codegen is gone — see "The codegen, dropped" below. Everything else landed earlier —
the dead Unity integration, the struct marshalling, the 18 uncalled shim declarations, the
`JSB_UNITYLESS` resolution, and the `BindingManager.Bind()` split that took `CodeGenerator` out of
the reflect-binding path, which is what made the drop a clean cut rather than an untangling.
*Exit: repo compiles and `pnpm unity test tests` passes against the old DLL with those subsystems gone.*

**Phase 2 — port the C shim.** Done. 27 `JSB_*`/`jsb_*` functions and 16 atoms against ng's
headers, in [native/quickjs/src](../../native/quickjs/src) — see "What phase 2 changed" below for
the two defects that only ng has, and for the test that covers the atom numbering.
*Exit: `libquickjs` builds against ng and exports everything the C# layer names.* Met.

**Phase 3 — rewrite the C# declarations from the header.** Done, and done from the header rather
than by eye: [check-signatures.py](../../native/quickjs/check-signatures.py) parses every prototype
in `quickjs.h`, parses every live P/Invoke, and diffs them. All five known names are resolved; the
check found three further mismatches this document had wrong or missing, and a hand audit of what it
cannot see — delegates, enums, struct layouts — found two more. See "What fails silently" above and
"What phase 3 changed" below.

*Exit: Unity suite passes on Windows against the ng DLL **and** a desktop IL2CPP player build runs.*
**Met, both halves.** The ng DLL is installed at
`Plugins/QuickJS/x64/quickjs.dll` and the suite passes on it unchanged from the pre-migration
baseline: EditMode 340/348, PlayMode 689/701, 0 failed. That the *ng* build is what ran is not
inferred from the pass — ng exports `JS_GetProperty` and `JS_SetProperty`, which are `static inline`
in Bellard's and absent from the old DLL's exports, and the C# now binds both directly, so the old
binary would have thrown `EntryPointNotFoundException` on the first property read.

The IL2CPP half was blocked on tooling and no longer is. The Hub's "Windows Build Support (IL2CPP)"
module is installed, and `pnpm unity player` is the batch-mode entry point `scripts/unity` was
missing: it builds a development standalone player and runs
[EngineProbe](../core/Runtime/Developer/EngineProbe.cs) inside it, which drives every engine in the
build across the boundary — evaluate, strings, a `Func` and an `Action` called from JS, a type
reference through the reflect binder, a global round trip, a module — and prints a verdict the
runner reads back. Measured on 6000.5.9f1 against `tests/`:

| backend | build | result |
|---|---|---|
| il2cpp | 309 s | QuickJS 7/7, Jint 7/7 |
| mono | 15 s | QuickJS 7/7, Jint 7/7, ClearScript 7/7 |

**QuickJS works under IL2CPP.** That is now a test rather than the argument this section used to
make. Two engines against three is the gating working — ClearScript is compiled out under IL2CPP by
design, and the probe is what shows you that instead of you assuming it. The `--backend mono` column
is not decoration: an AOT failure is only distinguishable from a plain bug by Mono passing where
IL2CPP does not.

What this does *not* cover is the other ten artifacts. It exercises Windows x64 AOT; Android and iOS
have their own stripping and their own P/Invoke conventions, and CI has never built either.

**Phase 4 — mirror in the jslib, then wire the async loader.** Done. The jslib is back in
agreement and held there by a check; `AsyncModuleLoader` installs
`JS_SetModuleLoaderFuncAsync`, `QuickJSModuleLoader` fetches over `Dispatcher.StartDeferred` +
`UnityWebRequest`, and `EngineCapabilities.ModuleResolution` is claimed on every target including
WebGL, where the jslib implements the same loader hooks and the browser links the graph.

*Exit: kitchen-sink loads a module graph over HTTP with no blocking frame, on desktop and in WebGL.*
**Desktop met and tested; WebGL implemented but not run in a player.**
`AStaticImportGraphLoadsAsynchronously` covers the desktop half, and
covers it better than a kitchen-sink walkthrough would: two hops, the second only discoverable once
the first arrives, asserting both that nothing has evaluated when `ExecuteScript` returns and that
the graph completes over the following frames. The first of those is what proves the *asynchronous*
part — the synchronous loader would have resolved and run the whole graph inline. It also pins
`import.meta.url` on a fetched module, which is what the relative import below it resolves against.
PlayMode goes from 689/701 to 690/701: one more test, not one fewer skip. The kitchen-sink
walkthrough itself is still a manual step nobody has run.

The WebGL half came later, and the reasoning that said it could not — that it needed a module realm
in the iframe — was wrong; see "The second implementation" above for what it actually took.
That closed the last gap in `EngineCapabilities.ModuleResolution`, so **the host import hook is
gone**: `ScriptContext.CreateImportHook`, the `LoadScript` it installed, and
`ModuleCompat.RewriteDynamicImports` with its string-literal scanner. All three were unreachable
from every shipped engine once WebGL stopped needing them, and keeping them as an extension point
did not survive a look at how an engine is chosen - `ScriptContext` builds the factory itself from
an `internal` switch over a closed enum, so a third party cannot supply an engine at all. Whoever
adds the next one is editing these files anyway, and would write the hook against what that engine
needs rather than inherit one shaped around a constraint that no longer exists. `NeedsModuleScope`
stays; deciding that a chunk needs module scope is still the job.

One thing phase 4 needed that the fork did not have: **the async loader gave the host no way to set
`import.meta`.** `JS_FulfillModuleLoad` compiles the source itself and settles the graph internally,
so unlike the synchronous loaders it never hands out a `JSModuleDef` — and the engine has never
populated `import.meta.url`, that being host policy. Two tests assert on it for every engine.
gkurt/quickjs `30ceffe` adds `JS_SetModuleMetaFunc`, ECMA-262's `HostGetImportMetaProperties`,
called from `js_import_meta` on first read and skipped when the object already exists so the
synchronous path keeps precedence. It also implements the `JS_LoadModuleAsync` that `quickjs.h`
named twice without declaring. Both are covered in `async-module-test.c`, and both guards were
sabotaged to confirm the coverage: without the call both urls read `undefined`, without the
freshness test the host's own value is overwritten.

## What phase 4 changed

### The module loader

`AsyncModuleLoader` (in the package) owns the three trampolines and the `GCHandle` the engine
carries as its opaque pointer; `QuickJSModuleLoader` (in core) resolves a specifier against the
importing module and fetches it with `UnityWebRequest` over `Dispatcher.StartDeferred`. It is
deliberately the same shape as `JintModuleLoader`, down to `ModuleLoadCompletion`, because the two
answer the same question and reading them side by side is how a divergence gets noticed.

Four things about it are load-bearing:

- **`Execute` does not await the graph.** `ScriptContext.EvalModuleAsync` returns as soon as the
  root is compiled and the first requests are out, then `Runtime.ExecutePendingJob()` drains what the
  graph queued. A module needing nothing from the loader — which is every bundle — therefore still
  finishes before `Execute` returns, and one waiting on a request finishes over the following
  `Update()`s. That is the same bargain `JintEngine` strikes, and the same reason a blocking fetch
  is not an option: the requests need the frames the import would be holding.
- **A rejected graph is reported once.** `EvalModuleAsync` attaches a rejection handler, which also
  marks the rejection handled — so this replaces the "unhandled promise rejection" the tracker would
  otherwise log rather than adding a second line to it. Only a parse error in the root still throws,
  because that is the one failure that happens before there is a promise.
- **An exception must not cross back into C.** Every trampoline catches: unwinding through the
  engine's own frames would leave the load handle unsettled and hang the graph for good. A failure
  to even start the fetch settles the completion instead.
- **The delegates are rooted, and the handle is freed after the runtime.** `Marshal
  .GetFunctionPointerForDelegate` does not keep a delegate alive, and the engine holds the pointer
  the `GCHandle` backs, so `QuickJSEngine` disposes the loader *after* `Runtime.Shutdown()`.

Two smaller corrections came out of writing it. `JSModuleNormalizeFunc` and `JSModuleLoaderFunc`
declared their module names as `[MarshalAs(UnmanagedType.LPStr)] string`, which is the ANSI code
page against a `const char *` the engine encodes as UTF-8 — any module path outside ASCII arrived
mangled. Both now take `IntPtr` and decode explicitly. And `JS_EvalModuleAsync` replaces the
compile-then-`_SetImportMeta`-then-`JS_EvalFunction` dance the synchronous path needed, because
`import.meta` is now filled in by the engine calling back rather than by the host reaching for a
`JSModuleDef` it no longer has.

### Removing operator overloading

ng removed the engine feature, so phase 3 pinned `IsOperatorOverloadingSupported` to `false` and
left the machinery behind the guard. Phase 4 deleted it: `OperatorDecl`, six `RegisterOperator`
overloads with `SubmitOperators` and `GetOperatorDecl`, three `Add*Operator` methods on `ClassDecl`,
the `Operators.create` lookup in `ScriptContext`, `OperatorBindingInfo`, the `op_*` switch in
`AddMethod`, `CodeGenHelper_Operator`, and the two places codegen emitted an `AddSelfOperator` call.

What that costs, precisely: **generated bindings can no longer emit operator overloads for C#
types.** That was a codegen feature on a path ReactUnity does not use, and the codegen has since
been dropped outright — see "The codegen, dropped". `op_*` methods still bind as ordinary
static methods under those names, which is what they already did with the guard false, so no
call from script changes. `jsb.isOperatorOverloadingSupported` is no longer defined; it read
`false` and now reads `undefined`, so anything gating on it takes the same branch.

Two operator-named things stay, and both are load-bearing rather than residue. `IsOperatorMethod`
still lets an `op_*` method past the special-name filter, and the `op_*` switch in
`CodeGenHelper_Method` still emits `a + b` for one — that switch is *why* a bound operator method
compiles at all, since C# refuses to call `op_Addition` by name. Together they are what keeps the
"binds as an ordinary static method" sentence above true, and both predate the migration. The one
thing that was genuinely dead is gone: `TypeDB._DynamicOperatorInvoke`, a `[MonoPInvokeCallback]`
stub whose whole body was `throw new NotImplementedException()` and which nothing referenced.

Two consequences were not obvious from the guard. `TypeBindingInfo.preload` was defined as
"this type declares operators" and nothing else ever set it, so both call sites now pass `false`;
`ScriptRuntime.AddTypeReference` keeps the parameter, because generated bindings pass it and eager
binding is not an operator concept. And `JSB_ATOM_Function` went with `_functionConstructor`, whose
only reader was `TypeRegister.GetConstructor(typeof(JSFunction))` on the operator path.

### An empty string is not null

`JSApi.GetString(ctx, ptr, len)` returned `null` for `len == 0`, so QuickJS was the one engine that
marshalled `''` back into C# as `null` — and since that is the marshaller every JS-to-C# string goes
through, it made the empty string unrepresentable. It is not an ng regression; `main` has the same
line. It now returns `string.Empty`, and `null` means only what it should: there is no buffer.

Nothing depended on the old behaviour, which is what made the fix a one-liner rather than an audit.
Two callers do read that `null` as a signal, and both get *more* correct: `JSContext.ToStringSafe`
used it to detect a `toString` that threw, and would fire its take-and-drop on a legitimate `''`;
`js_get_classvalue(out Type)` fed it to `TypeDB.GetType`, which answers the same for `null` and `""`.

`StringMarshallingTests` pins it down for all three engines in both directions, and the measurement
that motivated it is worth keeping, because only one cell of it was wrong:

| passed from script | Jint / ClearScript | QuickJS, before |
| --- | --- | --- |
| `''` | `""` | **`null`** |
| `'x'`, `'héllo çay'` | verbatim | verbatim |
| `null`, `undefined` | `null` | `null` |

So JS `null` and `undefined` already arrived as `null` despite `js_get_primitive` carrying a
`// no check` comment, and non-ASCII already round-tripped — `Marshal.PtrToStringAnsi` resolves to
UTF-8 under both Mono and IL2CPP, so the ANSI-code-page hazard that bit the module-loader delegates
does not bite here. The empty string was the whole divergence. The C#-to-script direction was
already correct, so that half of the test is a guard, not a fix.

### The jslib build was broken

`npx -p typescript tsc`, the command in the jslib's own header, fails outright: TypeScript 7 removed
every option this tsconfig needs — `target: ES5`, `outFile`, `module: none`, `baseUrl`,
`moduleResolution: node` — and has no ES5 emit at all, which Emscripten still requires. The
instructions now pin `typescript@5`. That the pipeline is otherwise intact was checked before
changing anything: rebuilding the untouched source reproduced the committed jslib byte for byte.

Worth knowing for next time: a TS 7 run does not fail cleanly. It rejected the config, then emitted
`jsbplugin.js` next to the jslib from the leftover `outDir`, which Unity imported and gave a `.meta`
file. Check `git status` after touching that directory.

## What phase 3 changed

Phase 3's instruction to itself was "not by eye". That mattered. The by-eye list in this document
was wrong about one of its entries and missing two others, and none of the four findings below would
have come out of re-reading that list at all.

- **`JSValue.IsString()` was wrong for concatenated strings.** ng represents `a + b` as an
  unflattened rope with its own tag and hands it out as an ordinary value, which is why ng's own
  `JS_IsString` accepts both tags. Testing only `JS_TAG_STRING` classified every concatenated string
  reaching a binding as a non-string — reachable from any script, with no error to notice.
- **`JS_IsJobPending` had a parameter no QuickJS ever declared.** `out JSContext pctx`, present in
  the C# and in the jslib, absent from Bellard's header and ng's. This document listed the symbol as
  needing a width fix only.
- **The promise-rejection callback read `is_handled` four bytes wide.** ng narrowed it to C `bool`,
  and this is the one direction a P/Invoke audit does not cover: native calling managed. It decides
  whether an unhandled promise rejection is logged.
- **`JS_EVAL_FLAG_STRIP` is `JS_EVAL_FLAG_ASYNC_LOAD` in ng.** Same bit, unrelated meaning: ng asks
  for a module returned with its dependencies unresolved. Nothing passed the flag, so this was
  latent — but it is bit 4 of the flag word phase 4's async loader has to set, so the old name
  was a trap laid directly in the next phase's path.

Two smaller ones the list did not have either: `JS_SetConstructor` returns `int` in ng and was
declared `void`, discarding a failure; and `JS_ToCStringLen2`'s `cesu8` was marshalled as
`UnmanagedType.Bool`, the four-byte Win32 `BOOL`, against a one-byte C `bool`.

### Everything that crosses by value, not just the tags

"Re-derive the tag constants" was taken to mean every constant and layout that crosses the boundary
by value. `JSPropFlags`, `JSGPNFlags`, `JSCFunctionEnum` and the `JSMemoryUsage` layout all agree
with ng field for field; `JSEvalFlags` did not, per above. The eleven callback delegates were
checked the same way, and `is_handled` was the only mismatch — every getter/setter/magic shape
matches ng's `JSCFunctionType` union exactly. `JSPropertyEnum.is_enumerable` is the same one-byte
`bool` narrowing again, this time inside a struct; `atom` sits at offset 4 either way so only the
flag was at risk, and nothing references the struct yet, but it was corrected rather than left for
whatever uses it first.

### The mechanical half

The five `bool`/arity fixes from the table above, the tag block re-derived from ng's enum, the
`JS_WRITE_OBJ`/`JS_READ_OBJ` flags corrected, `JS_GetProperty`/`JS_SetProperty` bound straight to
ng's exports, operator overloading made permanently unsupported, and the `fileName`/`lineNumber`
reads replaced by ng's `stack`. On the call-site side that is 25 dropped `JSContext` arguments, 42
comparisons against `1`/`0` turned into boolean expressions, and 18 unreachable `isArray == -1`
blocks removed. `JSB_NO_BIGNUM` is now referenced nowhere and was left to lapse rather than removed
from anything — nothing declares or documents it.

### check-signatures.py

`check-exports.py` answers "does the symbol exist", which is the failure that throws.
[check-signatures.py](../../native/quickjs/check-signatures.py) answers "is the declaration right",
which is the failure that does not: it compares return width, arity, discarded returns and `bool`
parameter width against the prototypes in `quickjs.h`, and reports 0 mismatches across 60
declarations. Like `shim-test`, it was sabotaged before being trusted — four doctored copies of
`quickjs.h`, one per check, each of which it caught.

Its blind spot is deliberate and worth remembering: it reads `DllImport` declarations, so the
callback delegates are outside it, and that is exactly where `is_handled` was hiding. Delegates,
enums and struct layouts stay a hand-checked surface.

Both scripts now share [pinvoke.py](../../native/quickjs/pinvoke.py) for reading the live P/Invoke
set, because duplicating the C# preprocessor evaluator to answer the same question twice is how the
two checks would drift apart.

## What phase 2 changed

Gate 0 got the shim compiling. Compiling is not porting, and two defects were visible only by
reading ng against Bellard:

- **`JS_SetOpaque` can now fail.** Bellard's wrote the pointer into any object it was handed; ng
  returns -1 for anything that is not an object of a registered class. Unchecked, as the vendored
  source left it, a failure leaks the payload *and* hands C# a bridge object whose id reads back as
  0 — no error anywhere. Both live constructors now check it.
- **`js_malloc` was never checked**, so an allocation failure dereferenced NULL rather than
  propagating the exception ng had already thrown. Same for the runtime payload in `JSB_NewRuntime`.

Two smaller ones: the atom accessors were declared K&R `()` rather than `(void)`, which C23
redefines; and `JS_NewClass`'s return was ignored, so a failed class registration would have
produced a runtime whose bridge objects had no class.

**26 shim functions nothing names are gone** — `JSB_Eval`, `JSB_FreePayload`, `JSB_GetClassID`,
`JSB_GetBridgeClassID`, `jsb_construct_bridge_object`, `jsb_get_payload`, and the 20 struct
accessors phase 1 orphaned. `check-exports.py` now diffs **both** directions, so neither a missing
export nor a stale one survives a run.

### shim-test

A CMake target and a CTest that links the shim against ng in-process, covering what a successful
link cannot:

- **All 241 atom ids.** The shim builds its enum from ng's own `quickjs-atom.h` with the same `DEF`
  trick `quickjs.c` uses, so the numbering is correct by construction — but "by construction" is an
  argument, and ng went from 224 atoms to 241. The test asserts the nth accessor returns n+1 *and*
  that `JS_AtomToCString` hands back the header's own string. Bad numbering would otherwise surface
  as every property lookup silently addressing a different name.
- **That ng still lacks all four of the atoms it is missing** — the two the stubs cover and the two
  phase 3 has to work around — so a later ng bump cannot quietly shadow a real atom with a stub.
- **The bridge payload round-trip** — object and value payloads, `jsb_get`/`jsb_set_bytes`, a plain
  object correctly reporting no payload, a negative size rejected, and the class finalizer firing
  exactly twice.

Run it in `Debug` too. Losing `JSB_FreeRuntime`'s leak return was the port's one deliberate
regression, and ng's replacement is an assert on a non-empty GC object list inside `JS_FreeRuntime`
(`quickjs.c:2717`) — only live without `NDEBUG`. A `Debug` pass is what is left of that diagnostic.

Sabotage it before trusting it; a test over a macro-generated table is easy to write vacuously.
Flipping the expected atom id to `i + 2` must produce 241 failures and a non-zero exit.

It does not replace the Editor, which is still gate 0's remaining exit criterion.

## What JSB_UNITYLESS hid

Every jsb asmdef carried a `versionDefines` entry defining `JSB_UNITYLESS` with an empty
expression, so it was on for every platform, always. **28.9% of the package's C# — 9,588 of
33,137 code lines — was excluded by the preprocessor**, and nothing said so.

That is what settled the `ValueTypes/` question, which this document previously proposed
settling with a build: fifteen of the sixteen `Values_*.cs` files open with `#if !JSB_UNITYLESS`,
so the Vector/Color/Matrix fast paths had never been compiled and the shim call-sites attributed
to them did not exist. `Values_DateTime.cs` was the only live file.

It also took the whole of `Runtime/Source/Unity/` (45 files), including two entire assemblies —
`jsb.editor.unity` and `jsb.editor.hotfix` — and 468 KB of bundled Unity.Cecil DLLs. ReactUnity
supplies its own Unity layer, so jsb's `JSBehaviour`, inspectors, editor windows and Prefs GUI
were unreachable.

If you are auditing this, the technique matters more than the number: inject a syntax error
inside the guard and compile. A `#`-prefixed token will not do — the lexer still scans excluded
regions for directives, so it errors either way and proves nothing.

## The codegen, dropped

This document used to call `Binding/Editor/` "the codegen. Pure C#, no native dependency" with zero
shim call-sites, and treat dropping it as subtraction. It was not, and the reason is worth keeping:
`BindingManager._EmitDelegateMethod` built C# source with `CodeGenerator`, `CSNamespaceCodeGen` and
`DelegateCodeGen` and compiled it **at runtime**, as the fallback for a delegate signature no
hand-written template covers (`GetReflectedDelegateMethod` -> `GenerateReflectedDelegateMethod`). So
`Codegen/` was reachable from the reflect-binding path, not only from an editor menu.

That fallback could not work either, and failed in a way worth recording: the two guards disagreed.
`CodeGenUtils.IsCodeEmitSupported()` returned true unless `NETCOREAPP`, but `CodeGenUtils.Compile`
was `#if !(NETCOREAPP || NET_STANDARD_2_0 || NET_STANDARD_2_1 || NET_STANDARD)` and both test
projects run `apiCompatibilityLevel: 6` (.NET Standard 2.1). The emit path therefore ran, built the
source, got `null` from `Compile`, dereferenced it, and swallowed the `NullReferenceException` into
`Error(exception)`. It has been dead on arrival under Unity for as long as those settings have held.

Dropped in full: `Binding/Editor/Codegen/` (17 files), the two codegen binding callbacks and
`ICodeGenCallback`, `BindingManager.Generate(TypeBindingFlags)` with `_WriteCSharp`/`_WriteTSD` and
the `codeGenCallback` plumbing, `_EmitDelegateMethod` and the `AddAssemblies` pair only it used,
`DocResolver`, and `BindingManager.UnitylessReflectBind` ~ the sole caller of `Generate`, itself
called by nothing. `Prefs` lost the 23 members left with no reader; `newLineStyle` stays because the
live `newline` property is built on it, and the class no longer claims to be loadable from
`js-bridge.json`, which nothing has read for some time.

What it costs: **a delegate whose signature no hand-written template covers can no longer be
bound.** In practice that is `ref`/`out` parameters beyond the template set. Nothing changes for
Unity, where the emit path already failed and returned `null`; what changes is that
`GenerateReflectedDelegateMethod` now says so, naming the signature at `Warn` level, instead of
logging a `NullReferenceException`. Generated bindings a user already has keep working: they
reference runtime types in `Binding/`, not the generator ~ what goes away is regenerating them.

Two helpers had to survive it. `CodeGenUtils` mixed the runtime compiler in with naming and type
utilities that `TSTypeNaming` and `TypeBindingInfo` need, so those moved to `BindingUtils`
(`IsDirectlyImplements`, `Normalize`, `NormalizeEx`, `Concat`); `RemoveAt`, `ToLiteral` and
`ConcatAsLiteral` had no readers left and went with the rest. `TextGenerator` stays ~ it is also
`BindingManager`'s log writer, not only a source emitter.

## Risks

- **IL2CPP diverges from CoreCLR.** The reference binding runs on .NET 8; struct-by-value and
  reverse P/Invoke are exactly where Mono and IL2CPP differ. Made a phase 3 exit criterion, not a
  phase 4 discovery — and **closed on Windows x64**: `pnpm unity player tests --backend il2cpp`
  passes every probe check, including the reverse-callback ones. Open everywhere else, and Android
  and iOS are where it would bite hardest; nothing has built those artifacts yet, let alone run one.
- **No sanitizer off desktop.** ASan and GC-stress cover x64 only. Test every new interop behaviour
  on desktop under ASan first; mobile is validation, never discovery.
- **Two implementations drifting.** Half closed. `check-jslib.py` now holds the *names* in
  agreement in both directions and exits non-zero on either, which is what caught WebGL failing to
  link at all. Signatures are still unenforced: the jslib has no header to check against, so arity
  and tag values remain a reading exercise. Generating both from one description is still the real
  fix; failing that, a test asserting tags and arities match across backends.
- **The async loader is not upstream yet.** Half closed. The pin is now
  `gkurt/quickjs` **v0.16.2-reactunity.1**, an annotated tag on `30ceffe` describing what the fork
  adds and why, so the commit cannot be lost to a rebase or GC. The CMakeLists still pins the SHA
  rather than the tag name, because a tag can be moved and a SHA cannot — the tag is for identity,
  not for resolution. What remains is the upstream PR: coordinate with quickjs-ng#1522, whose author
  proposed a dynamic-import-only version of the same feature.

## Done on this branch

Against the old DLL, one subsystem per commit, `pnpm unity compile tests` green between each and
the full suite green at the end (1,029 tests, 0 failures, both before and after).

- **The V8 backend.** No `v8-bridge` binary ships anywhere in `Plugins/`, so every
  `JSB_WITH_V8_BACKEND` path referenced a DLL that does not exist. ClearScript covers V8.
- **The debug server.** All five `JS_*Debugger*` entry points sat behind `JSB_WITH_V8_BACKEND` with
  no-op stubs in the `#else` — `JS_OpenDebugger` was `{ }`, `JS_IsDebuggerConnected` was `return 0`.
  `ScriptRuntime.Initialize` then forced `args.withDebugServer = false` before anything read it, so
  the waiting branch was unreachable and `OnDebuggerConnected` had no subscribers. Three layers of
  dead. `RaiseDebuggerConnectedEvent` is now `RaiseInitialized`, which is what it did.
- **The unity-jsb Unity integration** — all of `Runtime/Source/Unity/`, two assemblies, 468 KB of
  Cecil. See "What JSB_UNITYLESS hid".
- **The Unity struct marshalling** — fifteen of the sixteen `Binding/ValueTypes/Values_*.cs`, plus
  `Values_inject.cs`. `Values_DateTime.cs` stays.
- **`JSB_UNITYLESS` itself**, substituted and constant-folded away: 407 lines, and 22 conditionals
  wrapped around the calling-convention attributes and delegate rooting in `JSApi.cs`.
- **21 dead shim declarations** — `JSB_GetBridgeClassID`, `jsb_get/set_int_4` first, then the 18 the
  struct deletion orphaned.
- **`BindingManager.Bind()`**, splitting the reflect-binding path out of `Generate(TypeBindingFlags)`
  so it no longer constructs a `CodeGenerator` and walks every type into buffers nobody reads.
- **Gate 0 for Windows x64** — `native/quickjs` builds `quickjs.dll` from ng plus the ported
  shim, exporting the async-loader entry points and not exporting `JS_NewBigDecimal`. It satisfied
  99 of the 105 live P/Invoke names at the time; phase 3 closed the gap from the C# side, and after
  phase 4 it is 104 of 104.

- **Phase 2, the C shim** — 27 functions and 16 atoms ported, 26 uncalled ones deleted, the two
  ng-only defects above fixed, `shim-test` added, and `check-exports.py` taught to diff both
  directions.
- **Phase 3, the C# declarations** — all 99 live P/Invokes checked against `quickjs.h` by
  `check-signatures.py` and every mismatch fixed, including two silent bugs the plan did not have;
  the ng DLL installed for Windows x64 and the suite passing on it at the pre-migration baseline.
- **The IL2CPP player build** phase 3's exit criterion also asked for — `pnpm unity player`, plus
  the probe it runs inside the player. QuickJS and Jint pass all seven checks under IL2CPP on
  Windows x64, and the same player built as Mono passes with ClearScript alongside them.
- **Phase 4, the async module loader** — every target. `AsyncModuleLoader` +
  `QuickJSModuleLoader` fetch a graph over HTTP without blocking a frame, `import.meta.url` comes
  from a hook added to the fork, and the jslib is back in agreement with a check to keep it there.
  WebGL shares the host half and hands the linking to the browser, which is what the earlier note
  here said could not be done without a module realm in the iframe. It has not run in a player.
- **Operator overloading, removed** — the machinery phase 3 left behind a permanently false guard.
  ng has no operator overloading to register, and the last dead stub went with it.
- **`''` no longer marshals back as `null`** — a pre-existing bug in the string marshaller, not an
  ng regression, that made QuickJS the one engine unable to represent the empty string.
- **The codegen, dropped** — the last phase 1 item, held back because it was a feature decision
  rather than subtraction. `Binding/Editor/Codegen/` and everything that only fed it, including a
  runtime C# compiler that could not run under Unity's API profile at all.
- **The plugin directories were gitignored** — `[Xx]64/`/`[Xx]86/` in `unity/quickjs/.gitignore`
  matched `Plugins/QuickJS/x64` and `x86`. Found by being unable to commit the ng DLL; fixed by
  negating those two paths, which the next eleven artifacts need.

One thing the port turned up that no amount of reading would have: **unity-jsb's source tree is
a commit behind its own shipped binary.** `JSB_ThrowError` is exported by
`Plugins/QuickJS/x64/quickjs.dll` and defined nowhere in `jsb_build/`. It was the only such gap,
but only because the export diff was run — vendoring the sources and trusting them would have
shipped a DLL missing a function the C# layer calls.

Two things that looked deletable and were not, both because the first caller search excluded
`Runtime/Source/Native` itself — check that directory before concluding anything is dead:

- `JSB_Init` is the DLL version handshake, called from `JSApi.cs:151`.
- `JS_GetPropertyInternal`/`JS_SetPropertyInternal` are called from wrappers in `JSApi.cs`.

And one process note worth keeping: `pnpm unity compile tests` is ~10 s and the suite is ~10 min.
Skipping the compile once cost a full suite run to a broken string literal. Compile after every
edit; run the suite at the subsystem boundary.
