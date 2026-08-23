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

## The four checks

None is optional, and they check different things: one runs the shim, one asks whether the library
exports what the C# names, one asks whether those names are *declared right* — which is the failure
mode that does not throw — and one asks the export question again for the WebGL backend, which has
no native library at all.

```bash
cmake --build build --config Release --target shim-test && ./build/Release/shim-test.exe
```

[shim_test.c](src/shim_test.c) links the shim against ng in-process and covers what a successful
link cannot. It asserts all **241** atom accessors return the id ng itself uses and resolve to the
string in ng's own `quickjs-atom.h`. The shim generates its enum from that header with the same
`DEF` trick `quickjs.c` uses, so the numbering is right by construction — but ng went from 224 atoms
to 241, and "by construction" is an argument rather than a check; bad numbering surfaces as every
atom-keyed property lookup silently addressing a different name. It also round-trips an object and a
value payload, checks that a plain object reports none, that a negative size is rejected, and that
the class finalizer fires. `ctest -C Release` runs it too.

Run it in `Debug` as well as `Release`. That is where the leak check lives: ng reports a non-empty
GC object list by asserting in `JS_FreeRuntime` (`quickjs.c:2717`) instead of returning a value the
way unity-jsb's patched Bellard did, so a `Debug` pass is the only remaining signal that the shim
balanced its refcounts.

If you extend it, sabotage it first — a test over a macro-generated table is easy to write
vacuously. Flipping the expected id to `i + 2` must give 241 failures and exit 1.

```bash
python native/quickjs/check-exports.py
```

[check-exports.py](check-exports.py) diffs the P/Invoke set against the library's export table in
**both** directions: names C# calls that we do not export, and shim functions we export that nothing
calls. The second direction is not cosmetic — 26 dead functions sat in the vendored shim precisely
because nothing looked. Either direction exits non-zero, so it can gate CI.

Currently 104 of 104 satisfied, 0 stale, exit 0.

It reads **PE, ELF, Mach-O and static archives**, sniffing the format from the file's magic rather
than the host OS, so one script covers all twelve artifacts and a cross-built one is checkable from
whichever runner produced it. PE goes through `dumpbin`, or `llvm-readobj` where there is no Visual
Studio; the rest through `llvm-nm` or `nm`. Pass a path to check something other than the default
Windows build:

```bash
python native/quickjs/check-exports.py build/Release/quickjs.dll
```

The archive case is not hypothetical. iOS ships a `.a`, and a static library does not absorb a
static library it links — so without the merge step in `CMakeLists.txt` that archive would hold the
shim alone, with every `JS_*` symbol missing and nothing failing until Unity links the Xcode
project. This check is what catches that.

### The committed surface

The wanted set comes from the C# `[DllImport]` declarations, which means the generated `.csproj` in
`tests/` — and those are gitignored, only exist after the project has been opened in Unity, and
carry absolute paths. No CI job that lacks Unity can derive it. So it is committed:

| file | what | count |
| --- | --- | --- |
| [pinvoke-native.txt](pinvoke-native.txt) | symbols P/Invoked from the native library | 104 |
| [pinvoke-webgl.txt](pinvoke-webgl.txt) | symbols a WebGL build P/Invokes from the jslib | 105 |

`check-exports.py` and `check-jslib.py` use the live declarations when the `.csproj` are there and
the committed file otherwise. When both are available they are compared, and a mismatch fails with
the added and removed names — so the file cannot quietly rot. Regenerate after changing any
`DllImport`, from a checkout Unity has opened:

```bash
python native/quickjs/check-exports.py --write
```

```bash
python native/quickjs/check-jslib.py --write
```

A side benefit worth having: a change to the native surface now shows up in a diff.

```bash
python native/quickjs/check-signatures.py
```

[check-signatures.py](check-signatures.py) compares each of those declarations against its prototype
in `quickjs.h` — return width, arity, a discarded return, and `bool` parameters marshalled wider than
one byte. A wrong signature links and runs, it just answers wrongly, so this covers exactly what a
green `check-exports.py` cannot. It found three mismatches the migration plan had missed, including a
parameter on `JS_IsJobPending` that no QuickJS header has ever declared.

It reads `DllImport` declarations only, so the eleven callback delegates ng invokes *into* managed
code stay hand-checked, as do the enums and struct layouts that cross by value. That is not
hypothetical: `JSHostPromiseRejectionTracker`'s `is_handled` narrowed to a C `bool` in ng, and
`JS_EVAL_FLAG_STRIP`'s bit became `JS_EVAL_FLAG_ASYNC_LOAD`. Both had to be found by reading the
header.

Sabotage this one too: patch a copy of `quickjs.h`, pass it as the argument, and confirm the check
fires. All four have been shown to.

```bash
python native/quickjs/check-jslib.py
```

[check-jslib.py](check-jslib.py) asks the `check-exports.py` question about the *other* backend.
There is no QuickJS on WebGL: `Plugins/QuickJS/WebGL/jsbplugin.jslib` reimplements the whole
`JSBDLL` surface on the browser's engine, and until this existed nothing kept the two in agreement.
A name the C# declares and the jslib does not implement is an Emscripten link error; a jslib entry
nothing declares is dead weight. It re-evaluates liveness with a WebGL define set rather than the
Editor one, because `JS_SetBaseUrl` is a real P/Invoke exactly where the jslib is.

It found both directions on first run: `JS_GetProperty` and `JS_SetProperty`, which phase 3 bound
directly and the jslib never grew, and 26 entries left over from what phase 1 and phase 3 deleted.

What it cannot check is signatures. The jslib is hand-written JavaScript with no header to compare
against, so arity and tag values stay a reading exercise — which is how it came to hold Bellard's
tag numbers and a `pctx` argument no QuickJS has ever declared.

All three python checks get "the live P/Invoke set" from [pinvoke.py](pinvoke.py), which parses Unity's
generated `tests/*.csproj` for the real define set and source list — so a declaration inside a dead
`#if` is not counted as a requirement — and resolves `EntryPoint` aliases. Three declarations named
`JS_*` bind `JSB_*` symbols, so an audit by member name undercounts. Open `tests/` in the Editor once
if the `.csproj` files are missing.

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

**The shim exports exactly the 27 functions the C# layer names** — no more, no fewer — plus one atom
accessor per entry in ng's atom table. The 241 accessors come from one macro and cost nothing to
keep, so they are exempt from the "no more" half; `check-exports.py` enforces the rest.

### Ported to ng

- **`JS_BOOL`** — ng dropped the alias for C `bool`. Redefined here as `int`, deliberately: it keeps
  the shim's ABI where it was, so the C# `JS_BOOL = Int32` declarations for these functions stay
  correct and the `bool`-width problem stays confined to ng's own exports.
- **`JS_NewClassID`** — gained a `JSRuntime *` and now allocates from `rt->js_class_id_alloc`.
  Called per runtime through a zeroed local, so each runtime reserves its own id rather than
  reusing a process-global one it never claimed.
- **`JS_SetOpaque`** — returns `int` in ng and rejects anything that is not an object of a
  registered class, where Bellard's was `void` and wrote unconditionally. Unchecked, a failure leaks
  the payload *and* hands C# a bridge object whose id reads back as 0, with no error anywhere. Both
  constructors now go through one helper that checks it.
- **`JSB_FreeRuntime`** — unity-jsb had patched Bellard's `JS_FreeRuntime` to return whether the GC
  object list came out empty, and `ScriptRuntime` logs "gc object leaks" on 0. ng's is `void` and
  reports leaks by asserting in debug builds, so this returns 1 unconditionally. **That diagnostic
  is lost** — the only deliberate behaviour regression in the port.
- **`JSB_Init`** — runs from a C# static initialiser, before any runtime exists, so it can no longer
  allocate class ids. `JSB_NewRuntime` already did it, and nothing in C# declares `JSB_GetClassID`.

### Fixed while porting

`js_malloc` and `js_malloc_rt` returns were never checked, so an allocation failure dereferenced
NULL instead of propagating the exception ng had already thrown. `JS_NewClass`'s return was ignored,
so a failed registration would have produced a runtime whose bridge objects had no class. And the
atom accessors were declared K&R `()` rather than `(void)` — which C23 redefines, and which is why
they did not match a `JSAtom (*)(void)` typedef in the test.

### Added

- **`JSB_ThrowError`** — present in the shipped DLL but **not in unity-jsb's source tree**, which is
  a commit behind the binary. Reconstructed from its only caller, `JSNative.ThrowInternalError`,
  which passes an explicit length because the message is not null-terminated: despite the name it
  raises an InternalError. Worth re-checking against upstream if it ever turns up.
Two hand-written atom stubs, `JSB_ATOM_Operators` and `JSB_ATOM_Symbol_operatorSet`, lived here
between phases 2 and 3. Phase 3 made `IsOperatorOverloadingSupported` permanently false, which took
both off the P/Invoke surface; `check-exports.py` reported them stale exactly as predicted, and they
are gone. Every atom accessor the shim exports now comes from the one macro over `quickjs-atom.h`.

`JS_NewString` is deliberately *not* here. ng made it `static inline`, so the plan was to shim it —
but the C# declaration turned out to have no callers at all and was deleted instead.

## The other platforms

One CMakeLists covers all of them; the per-target difference is the configure line, which is why
there is no build script per platform and nothing to vendor from unity-jsb. All of it runs in
[native-quickjs.yml](../../.github/workflows/native-quickjs.yml), which builds each artifact,
runs `shim-test` wherever the runner can execute what it built, checks the exports, and uploads —
**installing them into `Plugins/QuickJS/` stays a manual step**, like `release-upm.yml`.

| artifact | configure | proven |
| --- | --- | --- |
| Windows x64 | `-G "Visual Studio 17 2022" -A x64` | yes, and installed |
| Windows x86 | `-A Win32` | yes, locally |
| Linux x64 | `-DCMAKE_BUILD_TYPE=Release` | yes, locally (WSL) |
| WSA x64 / x86 / ARM64 | `+ -DCMAKE_SYSTEM_NAME=WindowsStore -DCMAKE_SYSTEM_VERSION=10.0 -DCMAKE_TRY_COMPILE_TARGET_TYPE=STATIC_LIBRARY` | x64 and ARM64, locally |
| macOS universal | `-DCMAKE_OSX_ARCHITECTURES=arm64;x86_64` | not yet — needs a Mac |
| iOS arm64 | `-G Xcode -DCMAKE_SYSTEM_NAME=iOS -DCMAKE_XCODE_ATTRIBUTE_CODE_SIGNING_ALLOWED=NO` | not yet — needs a Mac |
| Android ×3 | `-DCMAKE_TOOLCHAIN_FILE=$ANDROID_NDK_ROOT/build/cmake/android.toolchain.cmake -DANDROID_ABI=… -DANDROID_PLATFORM=android-24` | not yet — needs the NDK |

Three things about that table are load-bearing.

**WSA needs two warnings suppressed on ng's own target.** UWP compiles with `/sdl`, which promotes
C4146 and C4703 to errors, and `quickjs.c` and `dtoa.c` trip both deliberately. Desktop MSVC leaves
them warnings, so this only ever bites WindowsStore. `CMAKE_TRY_COMPILE_TARGET_TYPE` is separate:
CMake's default compiler probe builds *and signs an appx*, which fails on ARM64.

**WSA ARM (32-bit) is dropped, not pending.** The Windows SDK no longer supports it — `MSB8087`,
from 10.0.26100 on — and Unity no longer targets it. Rebuilding it would mean pinning an SDK
Microsoft has ended.

**The Android ABI list changed.** The shipped set is `arm64-v8a`, `armeabi-v7a` and 32-bit `x86`,
with no `x86_64`. That is a unity-jsb-era list: `x86_64` is the ABI Unity 6 actually targets (the
emulator, Chromebooks) and 32-bit `x86` is not one it offers. The workflow builds `x86_64` and does
not build `x86`.

unity-jsb built Windows with MinGW and only WSA with MSVC. Both follow the Win64 ABI for the
16-byte `JSValue` return, so the switch to MSVC everywhere is safe.
