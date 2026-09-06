# yoga

Builds the native `yoga` library `com.reactunity.core` P/Invokes into for layout. Every
artifact in [unity/core/Plugins/yoga](../../unity/core/Plugins/yoga) comes from here.

## Why this exists

The binaries were built by a `build.yml` living inside the [ReactUnity/yoga](https://github.com/ReactUnity/yoga)
fork. Two things followed from that, and both are the reason this directory exists:

- **The recipe was never reviewed next to the C# that consumes it.** Thirty-six commits
  of "fix ios output path", "revert msvc", "remove /WX" -- CI archaeology invisible from
  the repo that ships the result.
- **Nothing recorded which commit a binary came from.** Answering "which Yoga is this?"
  meant date-matching the commit message `add yoga 3.2.1` against the fork's log.

[native/quickjs](../quickjs) had already solved this for a native, multi-platform,
forked dependency. This is the same shape: the recipe lives here, the source is fetched
at a pinned SHA, and [PROVENANCE.md](../../unity/core/Plugins/yoga/PROVENANCE.md) next to
the binaries records what produced them.

## What the fork is for

`YOGA_COMMIT` in [CMakeLists.txt](CMakeLists.txt) is a SHA on the `reactunity` branch of
[ReactUnity/yoga](https://github.com/ReactUnity/yoga), because a branch moves and a SHA
cannot. That branch is **upstream `main` plus exactly one commit**: the layout fix for
[ReactUnity/core#89](https://github.com/ReactUnity/core/issues/89), where a percentage
cross size inside a content-sized container resolves to zero. It carries Yoga's own
regression tests for the fix, and the other 849 still pass with it.

Keeping it to one commit is the point. Moving to a newer upstream is a rebase of a single
patch, and reviewing what ReactUnity ships that upstream does not is `git log
upstream/main..reactunity`.

Nothing about the *build* lives there. The branch it replaced, `extended_main`, was
upstream plus nine changed files, and every one of them turns out to be unnecessary here:

- `build.yml` and the `.gitignore` / `.vscode` churn are CI, replaced by
  [native-yoga.yml](../../.github/workflows/native-yoga.yml).
- a `BUILD_SHARED_LIBS` option in `yoga/CMakeLists.txt`, `/WX` dropped from
  `cmake/project-defaults.cmake`, a `BUILD_STATIC_LIBS` option in `javascript/`, and
  `BUILD_SHARED_LIBS` in `java/` are all build-only. This CMakeLists defines its own
  target from the fetched sources rather than including Yoga's, so none of them are
  consulted.
- `ExperimentalFeatureCount = 1` hardcoded in `yoga/config/Config.h`, replacing
  `ordinalCount<ExperimentalFeature>()`, was the only *source* change. It was a
  workaround for an MSVC that could not evaluate it, and current MSVC can.

Measured rather than assumed: `extended_main`'s branch point, unpatched, builds through
this CMakeLists to **the same 400 exports** the shipped binaries have, with zero drift in
either direction. So the fork starts from upstream and adds one thing.

## What this does not build

Yoga ships three binding layers on top of the C API. None of them are ReactUnity's, and
skipping them is most of why this is one `add_library` rather than a port of the fork's
four-job workflow.

- **The Java/JNI `.aar`.** The shipped `android/yoga.aar` is upstream's, built by gradle,
  and its `libyoga.so` is the *JNI wrapper* -- `java/yogajni.version` restricts it to
  exporting `JNI_OnLoad` and nothing else. `[DllImport("yoga")]` has been resolving `YG*`
  only because Android's linker searches a library's `DT_NEEDED` dependencies and finds
  the separate `libyogacore.so` behind it. It works; it is not something to keep relying
  on. This builds one plain `libyoga.so` per ABI that exports the C API directly.
- **The embind JavaScript bindings.** The shipped `webgl/libyoga.a` came from Yoga's
  `javascript/` project, so it carries embind and `_emval` into every WebGL player --
  1191 symbols and 531 KB, against 497 symbols and 256 KB for the same C API built
  straight from the sources. Nothing calls them; Native.cs binds `__Internal`.
- **The Kotlin, Swift and podspec packaging**, for the same reason.

## Building

```bash
cmake -B build -S . -A x64            # or -A Win32
cmake --build build --config Release
```

The fetch happens at configure time, so the first configure is slower and needs network.
Non-Windows drops the `-A` and takes `-DCMAKE_BUILD_TYPE=Release` instead; the exact
toolchain arguments for every platform are the matrix in
[native-yoga.yml](../../.github/workflows/native-yoga.yml), which is the authority.

## The checks

```bash
python check-exports.py build/Release/yoga.dll
```

Does the built library export every name `Native.cs` P/Invokes? 132 of them, read
straight out of the committed source -- there is no snapshot file to drift, unlike
quickjs, because none of Yoga's declarations are behind an `#if`.

```bash
python check-enums.py
```

Do the C# enums still agree with the fetched `YGEnums.h`? This is the one that guards a
Yoga bump. Enums cross the boundary as bare ints, so a member that shifted by one links
fine, runs fine, and lays out the wrong thing.

It caught both kinds on the upgrade this directory shipped with. Upstream had inserted
`YGJustifyAuto` at the **front** of `YGJustify`, moving every other member by one --
without the check, `justify-content: center` would silently have started meaning
`flex-end`. And `YogaExperimentalFeature` still declared
`AbsolutePercentageAgainstPaddingEdge` and `FixAbsoluteTrailingColumnMargin` after
upstream removed both, where passing either would have indexed a `std::bitset<1>` out of
bounds and thrown C++ across the P/Invoke boundary.

Appending to an enum is safe, and is reported without failing -- that is how a new Yoga
feature shows up before ReactUnity surfaces it.

## Installing what CI built

The workflow uploads and never commits, the same as `native-quickjs.yml`: these are
tracked binaries in a Unity package and a half-updated set is worse than a stale one.
Download all nine artifacts, drop them into
[unity/core/Plugins/yoga](../../unity/core/Plugins/yoga), regenerate `PROVENANCE.md`, and
commit the lot together.

**Android changed shape on the first install.** It used to be a single
`android/yoga.aar`; it is now `android/<abi>/libyoga.so` for the three ABIs Unity 6
targets, the layout [com.reactunity.quickjs already uses](../../unity/quickjs/Plugins/QuickJS/Android/libs).
The `.aar`'s `.meta` did not carry over -- the per-ABI ones are copies of quickjs's, each
with its own guid and `CPU`. **This has not been run on an Android device yet.**

## Things that will bite

- **The linux leg must build in an old container.** glibc is backward compatible, never
  forward, so the floor a binary records is the oldest system it will load on. A
  runner-native build on ubuntu-latest produces a `.so` Unity cannot load, and the
  failure reads as `DllNotFoundException` -- a missing file, not a too-new one.
- **`_WINDLL` is what makes the Windows build export anything.** `YGMacros.h` resolves
  `YG_EXPORT` to `__declspec(dllexport)` under `_WINDLL` and to *nothing at all* on MSVC
  otherwise. CMake happens to set it for `SHARED` targets; the CMakeLists here sets it
  explicitly rather than depending on that.
- **Upstream's `cmake/project-defaults.cmake` still has `-Werror`** on the non-MSVC side
  (only `/WX` was ever removed). That is a reasonable default for developing Yoga and a
  bad one for a release pipeline, which is why this builds its own target instead of
  including theirs.
