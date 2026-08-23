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

## The three checks

None is optional, and they check different things: one runs the shim, one asks whether the library
exports what the C# names, and one asks whether those names are *declared right* — which is the
failure mode that does not throw.

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

[check-exports.py](check-exports.py) diffs the live P/Invoke set against `dumpbin -exports` in
**both** directions: names C# calls that we do not export, and shim functions we export that nothing
calls. The second direction is not cosmetic — 26 dead functions sat in the vendored shim precisely
because nothing looked. Either direction exits non-zero, so it can gate CI.

Currently 99 of 99 satisfied, 0 stale, exit 0. The live set shrank from 104 because phase 3 removed
declarations rather than adding exports: the four atoms ng does not have, the two `*Internal`
property functions, and `JS_AddIntrinsicOperators`.

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

Both scripts get "the live P/Invoke set" from [pinvoke.py](pinvoke.py), which parses Unity's
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

## Where it does not build yet

Windows x64 with MSVC only. unity-jsb built Windows with MinGW and only WSA with MSVC; both follow
the Win64 ABI for the 16-byte `JSValue` return, so the switch is safe, but it is untested for the
other eleven artifacts (3 Android ABIs, iOS, macOS, 4 WSA, Linux x64, Windows x86).
