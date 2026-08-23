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
(28 assertions, clean under ASan and `QJS_ENABLE_GC_STRESS`), and it cannot reach Unity until this
migration lands. Bellard-era QuickJS has no async loader and never will.

A proven C# binding for the new API — P/Invoke declarations, UTF-8 marshalling, delegate rooting,
`GCHandle` handling, and a `QuickJSModuleLoader` shaped like `JintModuleLoader` — lives outside this
repo at `S:/Work/Unity/quickjs-ng-csharp` (23 assertions passing against a quickjs-ng DLL on
.NET 8). Use it as the reference in phase 3.

## Measured surface

**104 live entry points** bound to `JSBDLL`, re-measured after phase 1 and phase 2. Liveness is
evaluated with Unity's real define set, so a declaration inside a dead `#if` does not count:

| Group | Live | Provided by the ng build |
|---|---:|---|
| `JS_*` — real QuickJS API | 59 | 56 exported by ng unchanged; 3 need C# work, see phase 3 |
| `JSB_*` / `jsb_*` — unity-jsb C shim | 27 | **all 27** — none exist in ng, so each one is ported in [native/quickjs/src](../../native/quickjs/src) |
| `JSB_ATOM_*` | 16 | 12 generated from ng's `quickjs-atom.h`, 2 stubbed where operator overloading was, **2 no shim can fake** — see below |
| `js_*` — allocator | 2 | `js_malloc` and `js_free`, both exported by ng |

`Runtime/Source/Native` declares 105 P/Invokes in total now, against 137 before phase 1.

The shim is **27 functions, not the 25 this document used to claim.** The old count went by C#
member name and so missed three entry points reached through `EntryPoint` aliases on declarations
named `JS_*`: `JSB_DupValue`, `JSB_FreeValue` and `JSB_NewFloat64`. An earlier version of this
document warned that any audit of this surface has to honour `EntryPoint`, and then got it wrong
anyway — so re-run `check-exports.py`, which resolves `EntryPoint`, rather than reading the surface.

Of the `JS_*` group, three are live and unexported, all of them phase 3's problem:
`JS_GetPropertyInternal` and `JS_SetPropertyInternal` are called from wrapper methods in `JSApi.cs`
itself, and `JS_AddIntrinsicOperators` from `ScriptContext.cs:56`. The names that used to be listed
here and are no longer a cost: the five `JS_*Debugger*` and `JS_SetLogFunc` went with the debug
server; `JS_SetBaseUrl` is a real P/Invoke only under `UNITY_WEBGL && !UNITY_EDITOR` and lives in
the jslib; and `JS_NewString`, the one name this plan expected to need an inline shim, turned out to
have no callers anywhere and was deleted instead. Nothing in the QuickJS path touches
BigFloat/BigDecimal.

## The four atoms ng does not have

`fileName`, `lineNumber`, `Operators`, `Symbol_operatorSet` are absent from ng's
`quickjs-atom.h`. They split cleanly into a free case and a real one:

- **`Operators` / `Symbol_operatorSet`** — dropped with operator overloading. Free: every
  call site already guards on `JS_ATOM_Operators.IsValid` or
  `JSApi.IsOperatorOverloadingSupported` (`ScriptContext.cs:71`, `OperatorDecl.cs:110`,
  `TypeBindingInfo.cs:899`). The shim returns `JS_ATOM_NULL` and the guards do the rest — done, and
  `shim-test` asserts ng has not grown the atoms back underneath the stubs.
- **`fileName` / `lineNumber`** — not free, and silent. Bellard's `build_backtrace` defines
  both **on the Error object**; ng only keeps the `Function.prototype` getters. `JSContext.cs:55`
  reads them off a caught exception to build the error location, so under ng it gets `undefined`
  twice and every script error loses its file and line without anything failing. Phase 3 has to
  re-derive the location from ng's `stack`.

Everything else the atom machinery needs is unchanged: ng's `quickjs-atom.h` uses the same
`DEF(name, str)` shape, so unity-jsb's enum-and-accessor trick ports verbatim (241 atoms in ng
against 224 in Bellard).

## What fails silently

Missing symbols throw on first call. **Changed** symbols keep working and return nonsense. Seven of
those, in two patterns — do not port a declaration by eye:

| Symbol | Current C# | quickjs-ng | Failure |
|---|---|---|---|
| `JS_IsArray` | `int (ctx, val)` | `bool (val)` | arity + width |
| `JS_IsError` | `JS_BOOL (ctx, val)` | `bool (val)` | arity + width |
| `JS_IsFunction` | `JS_BOOL (ctx, val)` | `bool (ctx, val)` | width |
| `JS_IsConstructor` | `JS_BOOL (ctx, val)` | `bool (ctx, val)` | width |
| `JS_IsJobPending` | `int (rt)` | `bool (rt)` | width |

`JS_BOOL` is `Int32` here; ng returns C `bool`. On x64 a `bool` return sets only `AL` and the upper
three bytes of `EAX` are undefined — usually truthy, occasionally not. Every one needs
`[return: MarshalAs(UnmanagedType.U1)] bool`. ng's header has 26 `bool`-returning functions, so this
recurs as the surface grows.

`JS_IsArray` and `JS_IsError` also **lost their `JSContext*`**, which shifts the `JSValue` into the
wrong register slot. `JS_IsPromise` is a third instance, hit while writing the reference binding: it
compiled clean and returned the wrong answer.

Also silent: **`JS_TAG_FLOAT64` is 8 in ng and 7 in Bellard** — the enum gained `STRING_ROPE` and
`SHORT_BIG_INT`. Re-derive every tag from the new header rather than copying it forward.

## The second implementation

`Plugins/QuickJS/WebGL/jsbplugin.jslib` reimplements 125 functions — 122 overlapping the C#
P/Invoke surface — on the browser's own engine, compiled from 1,824 lines of TypeScript in ES5-safe
syntax because Emscripten requires it. There is no QuickJS on WebGL at all, so every signature
change and every tag value has to land here independently. Budget it as a peer of the C# work.

Phase 2 deliberately did not touch it, so it now carries entries nothing names — `JS_NewString`
among them — to prune when phase 4 brings it back into agreement. It is also why `unity_qjs.c` no
longer has `UNITY_WEBGL` guards: on WebGL `JSApi.JSBDLL` is `__Internal` and the native library is
never loaded at all, so those guards protected a configuration that cannot occur (and were
incoherent anyway — they skipped `quickjs.h` and then used `JSAtom`).

The async loader is *easier* here: the browser has real promises and real `import()`, so
`JS_EvalModuleAsync` is a thin `async function` rather than a state machine.

## Phases

**Gate 0 — the native build pipeline.** Twelve binaries ship (3 Android ABIs, iOS `.a`, macOS
bundle, 4 WSA architectures, Linux x64, Windows x64 + x86) and **this repo** has no sources and no
build script for any of them. Upstream does: `jsb_build/quickjs/` in unity-jsb holds the whole
thing — `unity_qjs.c` (275 lines) and `unity_ext.c` (414), a `CMakeLists.txt`, and
`make_jsb_{win,linux,macos,ios,android,wsa}` scripts. Gate 0 is vendoring that and repointing it at
ng, not writing it. Note Windows is built with **MinGW** (`x86_64-w64-mingw32-gcc`) and only WSA
with MSVC.

The port itself looks cheap: of the 28 distinct `JS_*` names the two shim files use, 27 are in ng's
public `quickjs.h` and the 28th is a macro they define themselves. `unity_qjs.c` is a normal
translation unit over the public header plus `quickjs-atom.h`, not a patch into `quickjs.c`, so
there is no merge to maintain against ng.
**Windows x64 is done** — [native/quickjs](../../native/quickjs) builds it, and the exit check
below is mechanised. Eleven artifacts and the CI matrix remain.
*Exit: twelve artifacts built reproducibly in CI from a tagged ng commit, Windows x64 loading in the Editor.*

**Phase 1 — subtract, against the old DLL.** Done on this branch except for one item that turned
out not to be subtraction at all: see "The codegen is not separable" below. Everything else landed —
the dead Unity integration, the struct marshalling, the 18 uncalled shim declarations, the
`JSB_UNITYLESS` resolution, and the `BindingManager.Bind()` split that takes `CodeGenerator` out of
the reflect-binding path.
*Exit: repo compiles and `pnpm unity test tests` passes against the old DLL with those subsystems gone.*

**Phase 2 — port the C shim.** Done. 27 `JSB_*`/`jsb_*` functions and 16 atoms against ng's
headers, in [native/quickjs/src](../../native/quickjs/src) — see "What phase 2 changed" below for
the two defects that only ng has, and for the test that covers the atom numbering.
*Exit: `libquickjs` builds against ng and exports everything the C# layer names.* Met on the C
side: none of the 27 are missing and nothing stale is exported. The 5 names still unexported are
C# declarations, which is the phase below.

**Phase 3 — rewrite the C# declarations from the header.** Not by eye, not by editing in place.
Generate or hand-check every declaration against `quickjs.h`, fixing `bool` widths and dropped
contexts. Re-derive the tag constants.

Five names are known to need C# work, because the Windows DLL builds and does not export them.
This is the whole list, not a sample — everything else the C# layer P/Invokes is satisfied:

| Name | What it needs |
|---|---|
| `JS_GetPropertyInternal` / `JS_SetPropertyInternal` | delete both declarations and bind `JSApi.JS_GetProperty`/`JS_SetProperty` straight to ng's, which are **exact** identities of the current wrapper bodies: ng's `JS_GetProperty` is `JS_GetPropertyInternal(ctx, obj, prop, obj, false)` and its `JS_SetProperty` is `JS_SetPropertyInternal(…, JS_PROP_THROW)` (`quickjs.c:9266`, `:10807`) |
| `JS_AddIntrinsicOperators` | make the no-bignum branch of `JSApi.cs:60` permanent rather than stubbing one name. That also takes `JSB_ATOM_Operators` and `JSB_ATOM_Symbol_operatorSet` off the P/Invoke surface, at which point the two stubs in `unity_qjs.c` must go too — `check-exports.py` will say so |
| `JSB_ATOM_fileName` / `JSB_ATOM_lineNumber` | delete the declarations and rewrite `JSContext.cs:55` against ng's `stack` |

Keep the check honest by re-running it rather than reasoning about it —
`python native/quickjs/check-exports.py` reads the live P/Invoke set straight out of Unity's
generated `.csproj` files and diffs it against `dumpbin -exports`, exiting non-zero on any gap.
*Exit: Unity suite passes on Windows against the ng DLL **and** a desktop IL2CPP player build runs.*

**Phase 4 — mirror in the jslib, then wire the async loader.** Bring `jsbplugin.ts` into agreement,
then install `JS_SetModuleLoaderFuncAsync`, port `QuickJSModuleLoader` onto
`Dispatcher.StartDeferred` + `UnityWebRequest`, set `EngineCapabilities.ModuleResolution`, and
retire `ModuleCompat.RewriteDynamicImports` for QuickJS.
*Exit: kitchen-sink loads a module graph over HTTP with no blocking frame, on desktop and in WebGL.*

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

## The codegen is not separable

This document used to call `Binding/Editor/` "the codegen. Pure C#, no native dependency" with
zero shim call-sites, and treat dropping it as subtraction. It is not.

`BindingManager._EmitDelegateMethod` builds C# source with `CodeGenerator`, `CSNamespaceCodeGen`
and `DelegateCodeGen` and compiles it **at runtime**, as the fallback for a delegate signature no
hand-written template covers (`GetReflectedDelegateMethod` → `GenerateReflectedDelegateMethod`).
So `Codegen/` is reachable from the reflect-binding path, not just from the editor menu.

It also cannot currently work, and fails in a way worth fixing on its own: the two guards
disagree. `CodeGenUtils.IsCodeEmitSupported()` returns true unless `NETCOREAPP`, but
`CodeGenUtils.Compile` is `#if !(NETCOREAPP || NET_STANDARD_2_0 || NET_STANDARD_2_1 ||
NET_STANDARD)` and both test projects run `apiCompatibilityLevel: 6` (.NET Standard 2.1). So the
emit path runs, builds the source, gets `null` from `Compile`, dereferences it, and swallows the
`NullReferenceException` into `Error(exception)`.

Deleting `Codegen/` is therefore a **deliberate feature drop** — delegates with `ref`/`out`
parameters outside the template set, for users on the .NET Framework API profile — and wants a
decision rather than a commit. `BindingManager.Bind()` already removes `CodeGenerator` from the
path everything actually uses, so nothing downstream is blocked on making that call.

## Risks

- **IL2CPP diverges from CoreCLR.** The reference binding runs on .NET 8; struct-by-value and
  reverse P/Invoke are exactly where Mono and IL2CPP differ. Made a phase 3 exit criterion, not a
  phase 4 discovery.
- **No sanitizer off desktop.** ASan and GC-stress cover x64 only. Test every new interop behaviour
  on desktop under ASan first; mobile is validation, never discovery.
- **Two implementations drifting.** C# and the jslib must agree on 122 signatures and every tag, and
  nothing enforces it — WebGL just misbehaves. Generate both from one description if possible;
  failing that, a test asserting tags and arities match across backends.
- **The async loader is not upstream yet.** Pin a tagged commit of `gkurt/quickjs`, not a branch, and
  pursue the upstream PR in parallel. Coordinate with quickjs-ng#1522, whose author proposed a
  dynamic-import-only version of the same feature.

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
  shim, satisfying 99 of the 105 live P/Invoke names, exporting the four async-loader entry
  points, and not exporting `JS_NewBigDecimal`.

- **Phase 2, the C shim** — 27 functions and 16 atoms ported, 26 uncalled ones deleted, the two
  ng-only defects above fixed, `shim-test` added, and `check-exports.py` taught to diff both
  directions.

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
