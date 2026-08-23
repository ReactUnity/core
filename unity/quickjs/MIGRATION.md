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

137 distinct P/Invoke names across `Runtime/Source/Native`:

| Group | Count | Disposition |
|---|---:|---|
| `JS_*` — real QuickJS API | 72 | 60 exported by ng unchanged; `JS_NewString` is `static inline` and needs a shim; 10 absent, see below |
| `JSB_*` / `jsb_*` — unity-jsb C shim | 43 | None exist in ng. **25 live, 18 removed on this branch.** This is the migration. |
| `JSB_ATOM_*` | 16 | Only 16 of the ~1000 the DLL exports are used. **4 do not exist in ng** — see below |
| `js_*` — allocator | 3 | `js_malloc`, `js_free`, `js_strdup` all exported by ng |

So phase 2 is **25 shim functions plus 16 atoms**. That number is measured, not estimated:
liveness is evaluated with Unity's real define set, so callers inside dead `#if` blocks do
not count. See "What JSB_UNITYLESS hid" below for why it dropped so far.

Every one of the 10 absent `JS_*` costs nothing except two. `JS_GetPropertyInternal` and
`JS_SetPropertyInternal` are **live** — called from wrapper methods in `JSApi.cs` itself, at lines
231 and 488 — so phase 3 has to map them onto ng's `JS_GetProperty`/`JS_SetProperty`. For the rest:
the five `JS_*Debugger*` and `JS_SetLogFunc` are **gone**, deleted with the debug server on this
branch; `JS_SetBaseUrl` is a real P/Invoke only under `UNITY_WEBGL && !UNITY_EDITOR` and lives in
the jslib; `JS_AddIntrinsicOperators` is already stubbed under `JSB_NO_BIGNUM`, which ng makes
permanent. Nothing in the QuickJS path touches BigFloat/BigDecimal either.

Note that some of these names already reach the shim rather than ng: `JS_NewFloat64` is declared
with `EntryPoint = "JSB_NewFloat64"`. Any audit of this surface has to honour `EntryPoint` or it
will report gaps that are not there — `check-exports.py` does.

## The four atoms ng does not have

`fileName`, `lineNumber`, `Operators`, `Symbol_operatorSet` are absent from ng's
`quickjs-atom.h`. They split cleanly into a free case and a real one:

- **`Operators` / `Symbol_operatorSet`** — dropped with operator overloading. Free: every
  call site already guards on `JS_ATOM_Operators.IsValid` or
  `JSApi.IsOperatorOverloadingSupported` (`ScriptContext.cs:71`, `OperatorDecl.cs:110`,
  `TypeBindingInfo.cs:899`). The shim returns `JS_ATOM_NULL` and the guards do the rest.
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

**Phase 2 — port the C shim.** 25 `JSB_*`/`jsb_*` functions against ng headers, plus the two inline
shims and the 16 atoms (4 of which need the treatment described above).
*Exit: `libquickjs` builds against ng and exports everything the C# layer names.*

**Phase 3 — rewrite the C# declarations from the header.** Not by eye, not by editing in place.
Generate or hand-check every declaration against `quickjs.h`, fixing `bool` widths and dropped
contexts. Re-derive the tag constants.

Six names are already known to need C# work, because the Windows DLL builds and does not export
them. This is the whole list, not a sample — everything else the C# layer P/Invokes is satisfied:

| Name | What it needs |
|---|---|
| `JS_NewString` | `static inline` in ng. Call `JS_NewStringLen`, which is exported |
| `JS_GetPropertyInternal` / `JS_SetPropertyInternal` | remap the two `JSApi.cs` wrappers onto `JS_GetProperty` / `JS_SetProperty` |
| `JS_AddIntrinsicOperators` | stub it — the `JSB_NO_BIGNUM` path becomes permanent |
| `JSB_ATOM_fileName` / `JSB_ATOM_lineNumber` | delete the declarations and rewrite `JSContext.cs:55` against `stack` |

Keep the check honest by re-running it rather than reasoning about it —
`python native/quickjs/check-exports.py` reads the live P/Invoke set straight out of Unity's
generated `.csproj` files and diffs it against `dumpbin -exports`, exiting non-zero on any gap.
*Exit: Unity suite passes on Windows against the ng DLL **and** a desktop IL2CPP player build runs.*

**Phase 4 — mirror in the jslib, then wire the async loader.** Bring `jsbplugin.ts` into agreement,
then install `JS_SetModuleLoaderFuncAsync`, port `QuickJSModuleLoader` onto
`Dispatcher.StartDeferred` + `UnityWebRequest`, set `EngineCapabilities.ModuleResolution`, and
retire `ModuleCompat.RewriteDynamicImports` for QuickJS.
*Exit: kitchen-sink loads a module graph over HTTP with no blocking frame, on desktop and in WebGL.*

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
