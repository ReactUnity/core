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
| `JS_*` — real QuickJS API | 72 | 60 exported by ng unchanged; 2 inline (`JS_NewFloat64`, `JS_NewString`) need a shim; 10 absent and all free — see below |
| `JSB_*` / `jsb_*` — unity-jsb C shim | 46 | None exist in ng. 43 live, 3 dead (removed on this branch). **This is the migration.** |
| `JSB_ATOM_*` | 16 | Only 16 of the ~1000 the DLL exports are used |
| `js_*` — allocator | 3 | `js_malloc`, `js_free`, `js_strdup` all exported by ng |

Every one of the 10 absent `JS_*` costs nothing except two. `JS_GetPropertyInternal` and
`JS_SetPropertyInternal` are **live** — called from wrapper methods in `JSApi.cs` itself, at lines
231 and 488 — so phase 3 has to map them onto ng's `JS_GetProperty`/`JS_SetProperty`. For the rest:
the five `JS_*Debugger*` plus `JS_SetLogFunc` are `#if JSB_WITH_V8_BACKEND` with
no-op stubs in the `#else`; `JS_SetBaseUrl` is a real P/Invoke only under
`UNITY_WEBGL && !UNITY_EDITOR` and lives in the jslib; `JS_AddIntrinsicOperators` is already stubbed
under `JSB_NO_BIGNUM`, which ng makes permanent. Nothing in the QuickJS path touches
BigFloat/BigDecimal either.

Where the 41 live shim functions are consumed:

| Directory | Sites | What it is |
|---|---:|---|
| `Binding/ValueTypes/` | 60 | Unity struct marshalling (`Values_Vector3`, `Values_Color`, …) — the `jsb_get/set_float_4` fast paths. **The open question.** |
| `Binding/` root | 14 | Runtime reflection binder (`DynamicType`, `DynamicMethod`, `DefaultBinder`). Used. |
| `Source/` root | 13 | `ScriptRuntime`, `ScriptContext`. Used. |
| `Source/Unity/` | 12 | Unity integration. Used. |
| `Source/Utils/`, `Source/Experimental/` | 4 | Used. |
| `Binding/Editor/` | **0** | The codegen. Pure C#, no native dependency. |

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
bundle, 4 WSA architectures, Linux x64, Windows x64 + x86) and the repo has **no sources and no
build script** for any of them — they are unity-jsb prebuilts. Nothing downstream is verifiable
until this exists. Fork unity-jsb's C shim, repoint at quickjs-ng, stand up a CI matrix. ng helps:
proper CMake with real cross-compilation and a supported wasm target.
*Exit: twelve artifacts built reproducibly in CI from a tagged ng commit, Windows x64 loading in the Editor.*

**Phase 1 — subtract, against the old DLL.** Partly done on this branch (see below). Remaining: drop
`Binding/Editor/`, which needs `BindingManager.Generate()` split first — `QuickJSEngine.cs:83` calls
`bm.Generate(TypeBindingFlags.None)`, which still constructs a `CodeGenerator` and runs the full
per-type traversal into disabled buffers because no `codegenCallback` is passed. Then run the
`ValueTypes/` experiment. All of it against the **old** DLL, one subsystem per commit, suite green
between each — never bundle subtraction with migration.
*Exit: repo compiles and `pnpm unity test tests` passes against the old DLL with those subsystems gone.*

**Phase 2 — port the C shim.** Whatever survives the `ValueTypes/` experiment — 18 to 41 `JSB_*`
functions — against ng headers, plus the two inline shims and the 16 atoms.
*Exit: `libquickjs` builds against ng and exports everything the C# layer names.*

**Phase 3 — rewrite the C# declarations from the header.** Not by eye, not by editing in place.
Generate or hand-check every declaration against `quickjs.h`, fixing `bool` widths and dropped
contexts. Re-derive the tag constants.
*Exit: Unity suite passes on Windows against the ng DLL **and** a desktop IL2CPP player build runs.*

**Phase 4 — mirror in the jslib, then wire the async loader.** Bring `jsbplugin.ts` into agreement,
then install `JS_SetModuleLoaderFuncAsync`, port `QuickJSModuleLoader` onto
`Dispatcher.StartDeferred` + `UnityWebRequest`, set `EngineCapabilities.ModuleResolution`, and
retire `ModuleCompat.RewriteDynamicImports` for QuickJS.
*Exit: kitchen-sink loads a module graph over HTTP with no blocking frame, on desktop and in WebGL.*

## The open question: can `Binding/ValueTypes/` go?

It is 60 of the 74 shim call-sites, and grep cannot settle it. ReactUnity calls only three `Values`
members — `js_get_classvalue` (6×), `register_type_caster` (4×), `PushArray` (1×) — registers its own
type casters, and its QuickJS files contain no direct `Vector2`/`Vector3`/`Color` references. But
`Values` is a partial class spread across all sixteen `Values_*.cs`, which may register into a
generic dispatch table those calls consult.

**Settle it empirically:** delete `Binding/ValueTypes/`, compile against the **old** DLL, run
`pnpm unity test tests`. Green means the shim drops from 41 functions to 18 and the struct fast paths
never need porting. Red gives the exact dependency list. One build, and it is the difference between
porting 18 functions and 41.

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

Phase 1 subtractions that were verifiable without touching the engine:

- **The V8 backend.** No `v8-bridge` binary ships anywhere in `Plugins/`, so every
  `JSB_WITH_V8_BACKEND` path referenced a DLL that does not exist. ClearScript covers V8.
- **The debug server.** All five `JS_*Debugger*` entry points sat behind `JSB_WITH_V8_BACKEND` with
  no-op stubs in the `#else` — `JS_OpenDebugger` was `{ }`, `JS_IsDebuggerConnected` was `return 0`.
  Never functional on QuickJS, so removing it is not a regression.
- **Dead API.** Three shim declarations with no callers: `JSB_GetBridgeClassID`, `jsb_get_int_4`,
  `jsb_set_int_4`.

Two things that looked deletable and were not, both because the first caller search excluded
`Runtime/Source/Native` itself — check that directory before concluding anything is dead:

- `JSB_Init` is the DLL version handshake, called from `JSApi.cs:151`.
- `JS_GetPropertyInternal`/`JS_SetPropertyInternal` are called from wrappers in `JSApi.cs`.
