---
name: unity
description: Compile, test, and drive Unity for this repo's C# packages (unity/core, jint, quickjs, clearscript) and the two Unity projects (tests/, kitchen-sink/). Use when a change touches C# under unity/**, when Unity test results are needed, when a rendering snapshot has to be checked or regenerated, or when the app has to be started or screenshotted. Also use when asked to "run the Unity tests", "check this compiles", or "see it working in Unity".
---

# Driving Unity from here

Two ways in, and they are two different tools. Pick by whether an Editor is already open on the project.

| | `pnpm unity <cmd>` (batch mode) | `unity <cmd>` (open Editor) |
|---|---|---|
| Is | this repo's driver, [scripts/unity/](../../../scripts/unity/) | **Unity's own CLI**, installed on this machine |
| Needs | the project **not** open in an Editor | the project **open**, with `com.unity.pipeline` (both have it) |
| Speed | ~8 s compile, ~70 s EditMode suite | 200–600 ms per command, no recompile, no domain reload |
| Use for | compile, the suites, IL2CPP players — anything scriptable, and the only CI-faithful results | an Editor the user already has open, play mode, screenshots, scene and asset edits |

The second one is not mainly a speed win — it is how you work *without closing someone's Editor*, and the only way to reach play mode and screenshots. See [Unity's own CLI](#unitys-own-cli) for what it can do and where it must not be used.

This repo used to carry its own version of that: an `AgentBridge` loopback server plus a `pnpm unity bridge` client. Both are gone — the Pipeline package does all of it and more. A `pnpm unity bridge …` invocation found anywhere is stale; [the table below](#unitys-own-cli) says what it became.

The two refuse to fight each other: batch mode checks the project lock first and points at the other tool.

## The loop for a C# change

```bash
pnpm unity compile tests
```

8 seconds warm, and it reports `file(line,col): CSxxxx: message` for every error. Run this after **every** C# edit under `unity/**` — it is far cheaper than the test suite and catches the majority of mistakes. Nothing else in this repo type-checks C#; `pnpm typecheck` is TypeScript only.

Then the suites:

```bash
pnpm unity test tests
```

`EditMode` then `PlayMode` (two Unity invocations — `-testPlatform All` is a game-ci concept that Unity rejects with exit code 4). Narrow it while iterating:

```bash
pnpm unity test tests --platform EditMode --filter ReactUnity.Tests.StyleTests
```

Green on CI's **6000.1.9f1** is **346/354 EditMode** (8 skipped) and **690/701 PlayMode** (11 skipped), both with zero failures — so on that editor a single failure is a real signal. On the local **6000.5.9f1** the EditMode figure holds but PlayMode has 15 pre-existing failures; see the 6000.5 note below before reading a PlayMode failure as yours. **Zero tests is a failure, not a pass**: it means the project failed to load, usually package resolution. The CLI treats it that way; do not read `0 failed` as green without checking the total.

## IL2CPP, which no suite above covers

The Editor is always Mono, so `compile` and `test` say nothing about the backend that actually ships. A P/Invoke stub the AOT compiler had to generate from a signature, a reverse callback it never saw, a type the managed stripper deleted — those exist only in a player, and they are exactly what the QuickJS binding is made of.

```bash
pnpm unity player tests --backend il2cpp
```

Builds a development standalone player (`-executeMethod ReactUnity.Editor.Developer.PlayerBuilder.Build`), runs it with `-reactProbe`, and reads the verdict back out of the player log. The probe is [EngineProbe](../../../unity/core/Runtime/Developer/EngineProbe.cs): it creates every engine in the build and runs seven checks each — evaluate, strings (including `''`, which QuickJS got wrong until `9ac748b3`), a `Func` and an `Action` called from JS, a type reference through the reflect binder, a global round trip, and a module. Then it quits with 0 or 1.

- Both new files are gated on `REACT_UNITY_DEVELOPER`, so none of this ships. If the probe never reports, that define is the first thing to check.
- `--backend mono` builds the same player the other way. Run it when an IL2CPP failure needs to be told apart from a plain bug — Mono passing and IL2CPP failing is the signal that means AOT.
- **A run that quietly fell back to Mono is not a pass.** The probe prints the backend the *player* was compiled with (`ENABLE_IL2CPP`, not what we asked for) and the runner fails on a mismatch. Do not weaken that check.
- IL2CPP compiles the whole managed surface to C++ before building it, so budget minutes, not the ~8 s `compile` takes. `--skip-build` re-runs the player already on disk.
- `--stripping High` is where `[Preserve]` gets tested. The default is whatever the project has.

Not on CI by design — it needs a C++ toolchain and the IL2CPP module on the runner.

## Rendering snapshots

PlayMode compares captures against `unity/core/Tests/.snapshots/windows/` (committed, so local runs are meaningful). Two traps:

- `--nographics` makes every snapshot assert go **Inconclusive**, not fail. Only pass it when you know you are skipping them.
- Regenerating is `--overwrite-snapshots`. It **rewrites committed PNGs** — and only ever the `windows/` set when run here, since the directory is chosen by `SystemInfo.operatingSystemFamily`. Only do it when asked, and show `git status` afterwards.
- If `TextMesh Pro Essential Resources are missing` shows up, that is environmental, not yours: Unity 6's ugui 2.x does not recognise the old `com.unity.textmeshpro` layout, pops its importer window, and the error attaches to whichever test is mid-flight — so it lands on a different one each run. Fixed by importing TMP essentials into `tests/`; reimport via `Window > TextMeshPro > Import TMP Essential Resources` if it returns.

The `React > Tests > Overwrite Snapshots` menu item is a **toggle** on `EditorPrefs`, not a one-shot. If you drive it through `unity command menu`, you have flipped persistent state that affects every later run — flip it back.

**A failing snapshot is a bug report until you have proven otherwise.** On 2026-07-28 eleven gradient snapshots failed, were assumed stale, and were overwritten — enshrining a real regression ([b0fc47885](unity/core/Runtime/Types/Gradient.cs:181) had made a linear-space colour conversion unconditional, darkening every gradient by 2.2 in gamma-space projects). It had gone unnoticed for seven months because the UGUI PlayMode suite was not running on CI.

Two lessons worth more than the incident:

- **Re-running after `--overwrite-snapshots` proves nothing.** It rewrites the baseline, so it cannot fail. The only real check is a plain run against baselines you did not generate.
- **Look at the pixels.** `linear-gradient(red, blue)` must have centre `(127,0,128)` and CSS `green` must be `(0,128,0)` — the renderer mimics CSS, so a browser is the reference. Compare against `git show <commit>~1:<path>`; identical diff counts across Unity versions prove determinism, not correctness.

`linux/` is the set CI reads and must be regenerated by CI — `[snapshots]` in a commit message, or the workflow's `overwrite-snapshots` input. Never regenerate `linux/` locally.

## Working against the open Editor

```bash
unity status --format json
```

Which Editors are up, their project, port, pid, and whether each is `ready`. Then discover and drive:

```bash
unity command --project-path S:/Work/Unity/reactunity/tests --query test
unity command editor_status --project-path S:/Work/Unity/reactunity/tests
unity command run_tests --project-path <path> -- --mode EditMode --filter ReactUnity.Tests.StyleTests
```

**Never assume a command name — list them.** The Editor defines the set, so it varies by project and package version: 142 commands in `tests/`, ~200 in kitchen-sink. `unity command` with no name lists them; `--query`, `--tag` and `--detail compact` keep that listing small. Note `--group_by` is spelled with an underscore, deliberately.

Things that carry over from the bridge this replaced, all still true:

- **A refused connection usually means "busy", not "broken".** The Pipeline server goes down for the length of every domain reload. Long operations do not block a request either — `build`, `recompile`, `audit` and the bakes all return immediately and have a matching `*_status` command to poll.
- **Screenshots need the Editor to actually render a frame.** In play mode that is automatic; idle in the Editor it may never come. `capture_game_view` misses Screen Space - Overlay UI unless you pass `source=screen`, which is play-mode only.
- **A project with C# compile errors boots into Safe Mode, where the Pipeline package does not load at all** — so "cannot connect" can mean "compile error", not "no Editor". `unity pipeline list` reports Safe Mode explicitly. Fix the C# and restart; there is no CLI-side way around it.
- **Batch mode is the source of truth; the live Editor is for iterating.** The same EditMode suite gives different answers in the two environments — measured on 6000.5.5f1, batch was 316/325 with 9 skipped and 0 failures, while the open Editor ran 3 of those skipped tests and failed 2 others (`ScriptTagDoesNotCrashOnError`, `ActivePropertyShouldWorkForStyleTag`) that batch passes. Both are sensitive to Editor state — log interception and `:active` — not to your change. Confirm with `pnpm unity test tests` before calling a suite green.

To hand a project back to batch mode, quit the Editor:

```bash
unity command eval --project-path <path> -- "UnityEditor.EditorApplication.Exit(0);"
```

That works, but **reports a failure** — `COMMAND_FAILED: Invalid response format from Pipeline server` — because the Editor exits before the server can answer. Confirm with `unity status`, not the exit code. (The old bridge deferred its response a few frames to avoid exactly this; nothing in the Pipeline package does.)

## Running the sample app

`kitchen-sink` renders a React app served by `react-unity-scripts`:

```bash
pnpm --filter reactunity-kitchen-sink start
```

```bash
pnpm unity open kitchen-sink
unity command editor_play --project-path S:/Work/Unity/reactunity/kitchen-sink
```

```bash
unity command capture_game_view --project-path S:/Work/Unity/reactunity/kitchen-sink -- --source screen --save_path Logs/unity/shot.png
```

That produces a real PNG of the running app — read it back to check a visual change. Unity connects to the dev server, so JS changes hot-reload without touching the Editor.

Both Unity projects consume the C# packages as `file:../../unity/*`, so both exercise the working tree. **`kitchen-sink` used to point at `https://github.com/ReactUnity/core.git#latest`** — while it did, it compiled the *published* package and local C# changes were invisible there, silently. If a change to `unity/**` seems to have no effect in kitchen-sink, check its manifest first.

Those `file:` refs are also why `kitchen-sink` cannot be cloned on its own, and why publishing it is a transform rather than a copy — see [prepare.mts](../../../scripts/kitchen-sink/prepare.mts). Anything added here that only resolves inside this checkout has to be handled there too.

## Unity's own CLI

Unity shipped an official CLI in July 2026. It is installed here but **not on PATH in this shell**:

```bash
"/c/Users/Krtgo/AppData/Local/Unity/bin/unity.exe" status --format json
```

Its own agent skill is at `~/.claude/skills/unity-cli` (`unity skill install claude-code` wrote it, `unity skill refresh` re-renders it after `unity upgrade`) — read that for the full command surface. What matters here is the division of labour, and the mapping from what this repo used to have.

**It replaced the AgentBridge**, deleted in the same commit as this note. Both projects have `com.unity.pipeline` — kitchen-sink as of `b8225447`, tests/ since — and every bridge action had an equivalent, which is the whole reason 686 lines of C# in their own asmdef plus a 219-line client could go:

| `pnpm unity bridge …` (gone) | `unity command …` |
|---|---|
| `status` | `editor_status` |
| `logs` | `console` / `get_console_logs` |
| `refresh` | `recompile` + `recompile_status` |
| `test` | `run_tests` + `test_status` (also `list_tests`) |
| `play` / `stop` | `editor_play` / `editor_stop` |
| `screenshot` | `screenshot`, `capture_game_view`, `capture_scene_view` |
| `menu` | `menu` |
| `quit` | `eval "UnityEditor.EditorApplication.Exit(0);"` |

It goes well past that: `build` + `build_status`, `eval`, `get`/`set_player_settings`, `switch_build_target`, `package_add`/`remove`, `audit`, the scene and asset editing surface, and a `--runtime` mode that attaches to a running development **player**. `run_tests` returns a structured summary plus a row per test, so it needs no results file at all.

**It does not replace `compile`, `test`, or `player`**, for one reason that is not about features: `unity test` and `unity build` launch the Editor without snapshotting the files Unity rewrites for having opened the project. On this repo that silently upgrades `tests/Packages/manifest.json` into a shape CI cannot resolve — the failure mode is *zero tests reported as a pass*. See [project.mts](../../../scripts/unity/project.mts). Two smaller gaps: it has no notion of `-assemblyNames` or our `-reactOverwriteSnapshots`, though `unity test . -- <args>` forwards both; and its editor discovery found 3 of the 6 editors installed here (it misses side-by-side `C:\Program Files\Unity <version>` installs, which `pnpm unity editors` lists).

So: `unity` for anything against a live Editor, `pnpm unity` for anything in batch mode. Nothing in this repo needs to grow a third client for either job — if a repo-specific action is wanted in a live Editor, it is a `[CliCommand]` static method in an Editor assembly, discoverable by `unity list` with no CLI release. The `unity-cli` skill documents that.

## Things that will bite

**Local runs rewrite the project, and committing that breaks CI.** Opening `tests/` with 6000.5 upgrades `Packages/manifest.json` to a 6000-only shape (`com.unity.ugui` 2.x, no `textmeshpro`) that the CI jobs cannot resolve — measured on 6000.1, and unresolvable packages produce *zero tests* while still looking like a pass. The CLI snapshots those files and puts them back after every run. Do not pass `--no-restore` unless you intend to commit the upgrade, and check `git status` under `tests/` before committing anything.

**A PlayMode run empties a font asset that ships.** `unity/core/Assets/Material Icons/Material Icons SDF - TMP.asset` is a dynamic-atlas TMP font, and a run clears its `m_GlyphTable` on the way to repopulating it at runtime — 375 lines of glyph metrics gone. It is in a *package*, not a project, so nothing project-relative reached it until `PACKAGE_CHURN_FILES` in [project.mts](../../../scripts/unity/project.mts) was added. That list is the only thing standing between a test run and publishing a font with no glyphs in it, so leave it in place, and if another package asset starts showing up in `git status` after runs, add it there rather than reverting by hand each time.

**Restore only covers batch runs.** `pnpm unity open` hands the project to an interactive Editor that nothing cleans up after, so it churns `ProjectSettings/*` and the deliberately-tracked `UserSettings/EditorUserSettings.asset` freely. After any session with an open Editor, read `git status` before committing.

**Unity leaves untracked files behind** (`tests/.vscode/`, `tests/tests.slnx`, new `ProjectSettings/*.asset`). Restore does not delete them — regenerating them each run is worse. Leave them out of commits. A killed PlayMode run also leaks `tests/Assets/InitTestScene*.unity`, which the test framework normally deletes itself; a stray one is debris, not content.

**The editor version comes from each project's `ProjectSettings/ProjectVersion.txt`** — whichever Editor last opened the project is the one these commands drive. Nothing is pinned in the scripts (a hard-coded version went stale the first time someone upgraded). `UNITY_VERSION=` overrides per run, and only then is that file restored afterwards; `pnpm unity editors` lists what exists.

**`tests/` runs on the 6000.5 line, but PlayMode is not green there** — an earlier note here said it could not load at all, and that was wrong; a later one said both suites were green, and that is wrong too. Measured on **6000.5.9f1** with no `UNITY_VERSION`: EditMode **346/354** (8 skipped, zero failures), PlayMode **675/701** with **15 failures** — `ButtonTests` and `InputTests` across all three engines, each a `StackOverflowException` in `BeforeTest`. Verified pre-existing by stashing every local change and re-running, and CI's 6000.1.9f1 passes the same commit. So a PlayMode failure in those two fixtures on 6000.5 is the editor, not your change; confirm anything else against a CI editor.

What the old note got right is that `com.unity.inputsystem` **1.14.2** does not compile there — nine `CS0619`s in its editor assemblies, `GetInstanceID`/`GetAssetPath(int)`/`InstanceIDToObject(int)` after the `EntityId` migration, which produce *zero tests* rather than a red suite. What it got wrong is the conclusion: 1.14.2 was only ever the manifest's **minimum**, and 6000.5 was picking 1.20.0 over it whenever the lockfile let it. Whether a run worked came down to whether the resolver had a reason to fall back to minimums — and adding a package is such a reason, which is how this got diagnosed. So the minimums are now raised to the versions that work on 6000.5 (`inputsystem` 1.20.0, `test-framework.performance` 3.5.0, `testtools.codecoverage` 1.3.0), each of which still declares `unity: 6000.0` or older and so stays resolvable on CI.

`test-framework`, `ugui` and `ext.nunit` are deliberately left alone — they are `builtin`, so the editor supplies its own version whatever the manifest says (1.7.0 and 2.5.0 on 6000.5), and the recorded number is informational. Do not "fix" those to match a local run: the 6000-only manifest shape, with `ugui` 2.x and no `textmeshpro`, is the one that fails to resolve on 6000.1.

**The first run after the package graph changes can crash.** Adding the Pipeline package produced one `0xC0000005` mid-suite, inside Unity's own `EditorWindow.Close` → `DockArea.RemoveTab` → `ContainerWindow.Close` teardown, on a run that was also re-resolving and re-importing. The identical run straight afterwards was green and it has not returned. Re-run once before investigating a crash whose stack is entirely Unity's.

CI runs 6000.0.51f1 and 6000.1.9f1, so a local pass still is not proof the matrix passes — and the raised minimums in particular have only been measured on 6000.5.

**Switching `UNITY_VERSION` is not free.** A different editor deletes and recreates the project's asset database, so the run after a version switch pays a full reimport, and switching back pays it again. Worth it to reproduce a matrix failure; not worth it casually. `ProjectVersion.txt` is deliberately left at whatever version last opened the project — reverting it below the local editor makes `pnpm unity open` hang on a modal "Project Upgrade Required" dialog with no visible window title. CI ignores that file entirely.

**Generated TypeScript models are not editable.** `packages/renderer/src/models/generated/*.ts` comes from `unity/core/Editor/Developer/TypescriptModelsGenerator.cs`. Change the C# type and regenerate from the Editor; never hand-edit the output.

Logs and results land in `Logs/unity/` (gitignored) at stable paths, so a failed run can be re-read without re-running it.
