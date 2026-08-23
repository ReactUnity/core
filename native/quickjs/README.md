# `native/quickjs` — building the engine binary

Builds `quickjs.dll` / `libquickjs.so` / `quickjs.bundle` / `libquickjs.a`, the native library
`com.reactunity.quickjs` P/Invokes into. Artifacts are copied into
[unity/quickjs/Plugins/QuickJS](../../unity/quickjs/Plugins/QuickJS) by hand for now.

This exists because the shipped binaries are unity-jsb prebuilts and this repo had no way to
reproduce them. See [MIGRATION.md](../../unity/quickjs/MIGRATION.md) for why we are moving off
Bellard-era QuickJS at all.

```bash
cmake -B build -S . -G "Visual Studio 17 2022" -A x64
```

```bash
cmake --build build --config Release --target quickjs
```

**Always name the target.** quickjs-ng registers `run-test262`, `api-test`, `lre-test` and friends
unconditionally, so a default build compiles all of them.

## What it links

quickjs-ng is fetched by CMake, never vendored, and pinned to a **commit** — `QJS_COMMIT` in
[CMakeLists.txt](CMakeLists.txt). It points at a fork because the asynchronous module loader
(`JS_SetModuleLoaderFuncAsync`, `JS_FulfillModuleLoad`, `JS_RejectModuleLoad`,
`JS_EvalModuleAsync`) is not upstream yet. Override `QJS_REPOSITORY`/`QJS_COMMIT` to build against
plain upstream.

ng is built **static** and linked into one shared library, so there is a single binary to ship per
platform. `BUILDING_QJS_SHARED` is defined on the static target on purpose: it turns `JS_EXTERN`
into `dllexport`, which survives into the DLL that links the archive and re-exports ng's whole
`JS_*` API under our name.

## `src/` — the shim

`unity_qjs.c` and `unity_ext.c` come from unity-jsb (`jsb_build/quickjs/`, MIT). They exist because
most of what the C# layer wants is either `static inline` in `quickjs.h` or variadic, and P/Invoke
can reach neither; plus the bridge class and payload, which are genuinely unity-jsb's own.

Ported to ng with four changes, all in `unity_qjs.c`:

- **`JS_BOOL`** — ng dropped the alias for C `bool`. Redefined here as `int`, deliberately: it keeps
  the shim's ABI where it was, so the C# `JS_BOOL = Int32` declarations for these 25 functions stay
  correct and the `bool`-width problem is confined to ng's own exports.
- **`JS_NewClassID`** — gained a `JSRuntime *` and now allocates from `rt->js_class_id_alloc`.
  Allocated through a zeroed local so each runtime bumps its own counter and actually reserves the
  id, rather than reusing a process-global one it never claimed.
- **`JSB_FreeRuntime`** — unity-jsb had patched Bellard's `JS_FreeRuntime` to return whether the GC
  object list came out empty, and `ScriptRuntime` logs "gc object leaks" on 0. ng's is `void` and
  reports leaks by asserting in debug builds, so this now returns 1 unconditionally. **That
  diagnostic is lost** — the only deliberate behaviour regression in the port.
- **`JSB_Init`** — ran from a C# static initialiser, before any runtime exists, so it can no longer
  allocate class ids. `JSB_NewRuntime` already did it, and nothing in C# declares `JSB_GetClassID`.

Two functions were added:

- **`JSB_ThrowError`** — present in the shipped DLL but **not in unity-jsb's source tree**, which is
  a commit behind the binary. Reconstructed from its only caller, `JSNative.ThrowInternalError`,
  which passes an explicit length because the message is not null-terminated: despite the name it
  raises an InternalError. Worth re-checking against upstream if it ever turns up.
- **`JSB_ATOM_Operators` / `JSB_ATOM_Symbol_operatorSet`** — ng removed operator overloading, so the
  atom table has no entry to generate an accessor from. They return `JS_ATOM_NULL`, which is
  load-bearing rather than a stub: `JSAtom.IsValid` is `_value != 0` and every call site is already
  guarded by it.

The shim still defines ~27 functions the C# layer no longer declares, including the struct fast
paths. They cost two unused exports each and nothing else; prune them once the DLL is proven in the
Editor, not before.

## Where it does not build yet

Windows x64 with MSVC only. unity-jsb built Windows with MinGW and only WSA with MSVC; both follow
the Win64 ABI for the 16-byte `JSValue` return, so the switch is safe, but it is untested for the
other eleven artifacts (3 Android ABIs, iOS, macOS, 4 WSA, Linux x64, Windows x86).
