# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

ReactUnity: a React renderer that draws UI inside Unity3D (UGUI, UIToolkit, and the Unity Editor) without a DOM. This is a **monorepo formed by merging ~10 previously separate ReactUnity repos** (`renderer`, `scripts`, `material`, `create`, `core`, `jint`, `quickjs`, `clearscript`, `docs`, `tests`, `full-sample` (now `kitchen-sink/`), `samples`) with their histories preserved — see the `chore: merge X into Y` commits. Much of the layout only makes sense in that light, and the workflow files under `.github/workflows/` carry detailed comments explaining why each piece is shaped the way it is. Read those before changing CI.

## Two package universes

| | npm (`packages/*`) | UPM / Unity (`unity/*`) |
|---|---|---|
| Members | `@reactunity/renderer`, `scripts`, `material`, `create` | `com.reactunity.core`, `jint`, `quickjs`, `clearscript` |
| Consumed by | the user's React app | the user's Unity project |
| Published by | `.github/workflows/release-npm.yml` (Tegami + npm OIDC) | `.github/workflows/release-upm.yml` (manual dispatch, orphan branch per package) |

All eight share **one version number** (currently `0.22.0`). Tegami bumps `packages/*`; the `syncUnityVersions` plugin in [scripts/tegami.mts](scripts/tegami.mts) copies that version into the four `unity/*/package.json` manifests.

**`unity/*/package.json` files are UPM manifests, not npm manifests.** Their `dependencies` are Unity package names (`com.unity.editorcoroutines`). They are deliberately excluded from the pnpm workspace — adding them would send pnpm to the npm registry looking for Unity packages.

## pnpm workspace membership

Defined in [pnpm-workspace.yaml](pnpm-workspace.yaml), which documents every inclusion and exclusion. Members are: `packages/*`, `unity/core/.react/*` (three React apps embedded in the core Unity package; the `.react` dot-prefix hides them from Unity's asset importer), `kitchen-sink/react`, and `docs`.

Explicit non-members: `samples/**` (rotted — React 19 alongside React-18-capped redux deps), `packages/create/scaffold/**` (a template whose deps are placeholders), and anything under `Library/` or `PackageCache/` (Unity's own package cache is full of `package.json` files).

`overrides` in the same file force every `@reactunity/*` request to resolve to the workspace copy — without it pnpm downloads registry copies of packages that exist right here, and hard-fails once the local version is one npm has never seen.

## Commands

Node >= 26 (`.node-version` pins 26), pnpm 11.17.0 via `packageManager`.

```bash
pnpm install
```

```bash
pnpm build
```
Builds `packages/*` only, topologically (`material` needs `renderer`'s `dist`). [tsdown](https://tsdown.dev) is the bundler — one `tsdown.config.ts` per package, and `tsc` never emits. Output is bundled per entry rather than mirroring `src`, and targets **ES2015**, which is rolldown's floor (it cannot emit ES5). The config comments cover the externals.

```bash
pnpm typecheck
```
`tsc --noEmit` across the workspace, and the only thing that type checks — neither tsdown nor webpack does. CI runs it as its own step.

```bash
pnpm check
```
Biome lint + format check over the whole repo — this is what CI runs. `pnpm lint` and `pnpm format` are the narrower variants. Husky + lint-staged run `biome check --write` on commit.

Per-package work uses pnpm filters:

```bash
pnpm --filter @reactunity/renderer build
```

```bash
pnpm --filter @reactunity/material watch
```

### Running a React app against Unity

Every app in this repo — `kitchen-sink/react` and the three under `unity/core/.react/` — is a [Vite](https://vite.dev) 8 app, configured by the `reactUnity()` preset from `@reactunity/renderer/vite`:

```bash
pnpm --filter reactunity-kitchen-sink start
```

`start` is plain `vite`: a dev server with HMR that Unity connects to, on the port that app's `vite.config.mts` pins with `strictPort` (3100 for kitchen-sink, 4000 and 4200 for the devtools and quick-start editor windows) — so a clash fails the run rather than moving the port out from under the scene's `DevServer` url. `build` writes into the Unity project the preset finds by walking up from the Vite root, at `Assets/Resources/react`; the three package-owned apps spell `build.outDir` out instead, because their output belongs to a UPM package and there is no project to discover. `ReactUnityOptions` in [packages/renderer/src/vite/index.ts](packages/renderer/src/vite/index.ts) documents the rest, including why filename hashes are off by default (a renamed file loses its `.meta`, and so its Unity GUID).

`unity/core/.react/injectable` is the odd one out: it builds the single IIFE bundle the C# suite substitutes fixture code into, so it is a library build under a fixed name rather than an app — its config comments cover why.

### The documentation site

`docs/` is an [Astro](https://astro.build) site (it was a Next 12 fork of react.dev until the migration; the shape and MDX component set are still React's). `pnpm --filter react-website start` serves it on port 4321, `pnpm --filter react-website build` writes `docs/dist`. There is no type-check command for it -- see below. [docs/README.md](docs/README.md) explains how a page is assembled; the parts worth knowing before editing it:

- Pages are `.mdx` files in `docs/src/content`, wired up by `docs/src/content.config.ts` and rendered by `docs/src/pages/[...slug].astro`, which also owns the element-name → component map. Navigation, titles and prev/next links come from `sidebarLearn.json` / `sidebarReference.json`, not frontmatter. `layout:` is *not* usable in frontmatter — Astro treats it as a component to import.
- Almost everything renders to static HTML. Only three things ship JS: the nav (`client:load`), the table of contents (`client:load`) and each `<Sandpack>` (`client:visible`). Components in the MDX map are `.astro` files on purpose — a React component there receives its children as an opaque `<astro-slot>` blob, so anything that needs to read its children (`<Sandpack>`'s code fences) gets the data from a remark plugin instead.
- One Unity WebGL player is shared by every example on a page, via a module-level singleton in `docs/src/components/unity/global.tsx`. It cannot be React context: each Sandpack is a separate island with its own React root, and the player is a ~100 MB download.

### Unity C# tests

```bash
pnpm unity compile tests
```

```bash
pnpm unity test tests
```

```bash
pnpm unity player tests --backend il2cpp
```

[scripts/unity/](scripts/unity/) drives a local Editor headlessly — `compile` (~8 s warm, the cheapest check on any C# edit), `test`, `player`, `open`, `editors`, and `bridge` for talking to an Editor that is already open. `pnpm unity help` lists it all, and [.claude/skills/unity](.claude/skills/unity/SKILL.md) covers which path to use and what bites.

`player` is the only check here that covers **IL2CPP**, and the reason it exists is that the Editor is always Mono: nothing `compile` or `test` reports says anything about a P/Invoke stub the AOT compiler had to generate, a reverse callback it never saw, or a type the managed stripper deleted — which is most of what the QuickJS binding is made of. It builds a development player and runs [EngineProbe](unity/core/Runtime/Developer/EngineProbe.cs) inside it, which drives every engine in the build across the boundary and prints a verdict the runner reads back. Both halves are gated on `REACT_UNITY_DEVELOPER`, so none of it ships, and it is deliberately not on CI (it needs a C++ toolchain and the IL2CPP module). `--backend mono` builds the same player the other way, which is how an AOT failure gets told apart from a plain bug.

Unity's own `unity` CLI (July 2026, installed at `~/AppData/Local/Unity/bin/unity.exe`, its skill at `~/.claude/skills/unity-cli`) covers everything `bridge` does and much more against an Editor that is open, via the `com.unity.pipeline` package kitchen-sink picked up in `b8225447`. It does **not** cover the batch commands, because it launches the Editor without snapshotting the files a local run rewrites — the trap described next. The skill has the mapping.

Three things worth knowing before running any of it:

- **The editor version comes from each project's `ProjectSettings/ProjectVersion.txt`** — whichever Editor last opened the project is the one the CLI drives. Nothing is pinned in the scripts. `UNITY_VERSION=` overrides per run, and only then is that stamp restored afterwards. `tests/` loads and runs on **6000.5.9f1**, so the older note that the 6000.5 line could not run it at all is wrong. Both suites are green there: EditMode 342/350 and PlayMode 690/701, zero failures. It was not always — `ButtonTests` and `InputTests` used to fail on that editor and only that editor, because the suite transformed its JSX by running Babel inside QuickJS and Babel's parse-then-traverse depth did not fit the main-thread stack 6000.5 leaves. Replacing it with Sucrase fixed all 15; [.claude/skills/unity/SKILL.md](.claude/skills/unity/SKILL.md) keeps the measurements, and they are the ones to beat before putting Babel back. A local pass is still not a matrix pass. That failure was `com.unity.inputsystem` 1.14.2, whose editor assemblies fail obsolete-as-error there — and 1.14.2 was only ever the manifest's *minimum*, which the resolver dropped back to whenever it had reason to re-resolve. The minimums are now raised past it. `test-framework`, `ugui` and `ext.nunit` stay where they are because they are `builtin` and the editor supplies its own. CI runs 6000.0.51f1/6000.1.9f1, so a local pass is still not a matrix pass.
- **Opening `tests/` rewrites its manifest into a 6000-only shape** — `com.unity.ugui` 2.x, no `textmeshpro`, plus `modules.physicscore2d`/`vectorgraphics`/`adaptiveperformance` — and that manifest fails to resolve on **6000.1** (measured), which yields *zero tests* rather than a red suite. The CLI snapshots those files and restores them after every run; `--no-restore` opts out. Restore covers batch runs only — an interactive Editor churns them freely, so check `git status` after one.

- **Both Unity projects run the Universal Render Pipeline**, assigned in each project's `ProjectSettings/GraphicsSettings.asset` against the `URP_Asset` in its own `Assets/`. `com.unity.render-pipelines.universal` is a `builtin` package in Unity 6, so the manifest version is a floor the editor overrides with its own -- it cannot break a matrix job the way the `inputsystem` pin did. This is what covers the no-`GrabPass` backdrop path (`BackdropSurface`, `backdrop-filter`, `mix-blend-mode`, stacked `background-blend-mode`), which is dead code under built-in; the pipeline is worth flipping back temporarily to compare the two, and both are still supported. The rendering snapshots are pipeline-independent in practice -- moving `tests/` to URP changed none of the 453 of them.

The Test Runner window still works, as does `.github/workflows/unity-tests.yml` for the real matrix. `tests/Packages/manifest.json` already points at `file:../../unity/*`, so the four Unity packages are wired up with no patching.

Driving an Editor that is **already open** is not this CLI's job any more. It was, through an `AgentBridge` loopback server in its own asmdef plus a `pnpm unity bridge` client; both were deleted once `com.unity.pipeline` was in both projects, because Unity's CLI covers every action they had and a great deal more. A repo-specific action wanted in a live Editor is now a `[CliCommand]` static method in an Editor assembly, which `unity list` discovers with no CLI release.

Each fixture's JSX snippet is transpiled **at runtime, inside the engine under test**, by
[CodeTransformer](unity/core/Tests/Runtime/Utils/CodeTransformer.cs) — so the transpiler's own call
depth is charged to Unity's main-thread C stack, which is already deep. That budget is the whole
reason it is **Sucrase** and not Babel: Sucrase rewrites a token stream, where Babel parses to an
AST and traverses it, and Babel's floor did not fit on the 6000.5 editor. `disableESTransforms` is
on deliberately — lowering optional chaining breaks C# method handles under ClearScript, and all
three engines run the modern syntax natively anyway.

The bundle it loads is generated, so do not edit
`unity/core/Editor/Resources/ReactUnity/tests/scripts/sucrase-standalone.js`:

```bash
pnpm build:test-transformer
```

[scripts/test-transformer/build.mts](scripts/test-transformer/build.mts) bundles it with esbuild and
stamps the Sucrase version into a header comment. Commit the result. Biome excludes it as generated
output rather than for size — unlike the 3.7 MB `@babel/standalone` it replaced, which was over
Biome's 1 MiB per-file ceiling and so failed `pnpm check` outright. The `docs` site still uses
`@babel/standalone` (8.x, a real dependency) for its Sandpack examples, which is fine: that one runs
in the browser, where stack is not scarce.

Rendering tests compare against snapshots in `unity/core/Tests/.snapshots/{linux,windows}`. To regenerate: the `React > Tests > Overwrite Snapshots` editor menu toggle (needs the `REACT_UNITY_DEVELOPER` define), the `-reactOverwriteSnapshots` command-line arg, `[snapshots]` in a commit message, or the workflow's `overwrite-snapshots` dispatch input. CI commits regenerated snapshots from the one matrix job marked `main: true`.

### Releasing

```bash
pnpm tegami
```
Tegami config lives in [scripts/tegami.mts](scripts/tegami.mts) (unrelated to `packages/scripts`, despite the name). Changelog entries are pending `.tegami/*.md` files; `tegami ci` on `main` either opens a "Version Packages" PR or publishes from the committed publish lock. UPM releases are separate and manual (`release-upm.yml`, workflow_dispatch).

### The Kitchen Sink sample

`kitchen-sink/` is both the project ReactUnity is manually tested against and the sample users are pointed at, so it is published standalone on the `kitchen-sink` orphan branch by [release-kitchen-sink.yml](.github/workflows/release-kitchen-sink.yml).

It runs URP, and the filter page is the one place that costs: a backdrop read is a `GrabPass` on built-in and a whole extra camera render without one, so its 22 readers take a frame from ~9 ms to ~53 ms in the editor. Every other page reads one backdrop -- the root's `backdrop-blur-sm` -- and stays under 13 ms. That is the demo page being a stress test rather than a regression -- see [`backdrop-filter`](docs/src/content/reference/css/backdrop-filter.mdx) for the cost model.

```bash
node scripts/kitchen-sink/prepare.mts Logs/kitchen-sink --force
```

[prepare.mts](scripts/kitchen-sink/prepare.mts) is the whole transform, and the workflow only packages what it produces — so run it locally to see exactly what users get. It copies the tracked files (`git ls-files`, which keeps the exclusion list honest), rewrites `file:../../unity/*` and `workspace:*` to the current published version, drops `com.reactunity.jint`/`clearscript` and the `testables` block, strips `REACT_UNITY_DEVELOPER`, and moves any scene pinned to a dropped engine back to `EngineType: Auto`.

Then it verifies, which is the part that matters: **it fails if OpenUPM or npm have not published the pinned version yet.** That is why this workflow is not chained to `release-npm.yml` the way `release-upm.yml` is — both registries build asynchronously after a release, and a manifest pinning a version they do not have gives a user an empty `Packages` folder, the same silent failure the `file:` refs cause. Dispatch it once they have caught up.

Anything added to `kitchen-sink/` that only works inside this checkout has to be handled in `prepare.mts`, or the exported project breaks in a way nothing here would catch.

## Architecture

### The JS ↔ C# boundary

`@reactunity/renderer` is a `react-reconciler` host config that never touches a DOM. Two reconcilers live side by side in `packages/renderer/src/renderer/`:

- `sync/` — calls into C# directly, one interop call per operation.
- `async/` — the default. Serializes mutations into a command buffer (`async/commands.ts`, `async/serializer.ts`), flushed once per microtask. Objects crossing the boundary are handles tracked in `async/objects.ts`. Batching is what makes inline rich-text and SVG subcontexts possible; disabling it (`disableBatchRendering`) trades those away for lower per-call overhead on Jint.

The C# side of that call surface is `unity/core/Runtime/Core/ReactUnityBridge.cs` — `createElement`, `appendChild`, `applyUpdate`, and friends. Everything reachable from JS is `[Preserve]`d against IL2CPP stripping.

### Type models are generated from C#

`packages/renderer/src/models/generated/*.ts` is emitted by `unity/core/Editor/Developer/TypescriptModelsGenerator.cs`, which reflects over the Unity assemblies. Biome ignores `models/generated`. **Do not hand-edit those files** — change the C# type (or the generator's include/remap options) and regenerate.

Regeneration is a `[CliCommand]` in [ReactUnity.Editor.Pipeline](unity/core/Editor/Developer/Pipeline/TypescriptModelsCommands.cs), against an Editor that is open on a project with `com.unity.pipeline`:

```bash
unity command generate_models -- --directory packages/renderer/src/models/generated --preset all
```

`--preset` is one of `react`, `unity`, `editor`, `yoga`, `system`, `tests` or `all`; the assembly it lives in is gated on `REACT_UNITY_DEVELOPER` and on the pipeline package, so it never ships. The menu items under `React/Typescript Generator` do the same thing interactively.

**The six files are one matched set** and have to be regenerated together — `react.ts` and `editor.ts` import Unity's own types from `unity.ts`, so regenerating one against a newer editor leaves references nothing declares, and `pnpm typecheck` is what catches it. The reverse of that is `ExcludedTypes` in the presets: a type declared in an editor assembly but under the `UnityEngine` namespace is sent to `unity.ts` by the namespace-to-file mapping, where nothing declares it, so it is excluded down to `any`.

### Rendering frameworks

`unity/core/Runtime/Frameworks/` holds three backends behind the same component interfaces: `UGUI` (the mature one, with its own measurers, shapes, and state handlers), `UIToolkit`, and `Noop` (headless, used by tests). Each has its own asmdef. The matching TS type surfaces are `@reactunity/renderer/ugui`, `/uitoolkit`, `/editor` — each with its own `jsx-runtime`, so a project picks its element namespace by which one it imports.

### JavaScript engines

`unity/core/Runtime/Scripting/` defines `IJavaScriptEngine` plus DOM shims (`DomProxies/` — `fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `URL`). Concrete engines ship as separate UPM packages so a project pulls in only one native binary: `com.reactunity.quickjs` (recommended), `jint` (pure C#, slower), `clearscript` (V8).

`com.reactunity.quickjs` binds **[quickjs-ng](https://github.com/quickjs-ng/quickjs)**. It used to bind unity-jsb's fork of Bellard-era QuickJS, and the two are different engines rather than two versions of one — which is why the binary, the C shim and every P/Invoke declaration were rebuilt rather than upgraded. [unity/quickjs/MIGRATION.md](unity/quickjs/MIGRATION.md) is the record of that, and is worth reading before changing anything under `Runtime/Source/Native`.

The C# is still unity-jsb's design — namespace `QuickJS.*`, assemblies `jsb.core`/`jsb.native`/`jsb.shared`/`jsb.editor.binding`, and the `JSB_*` shim symbols — but nothing is fetched from or linked against unity-jsb any more. All eleven native artifacts are built from [native/quickjs](native/quickjs) by [native-quickjs.yml](.github/workflows/native-quickjs.yml) and pinned to `gkurt/quickjs` `v0.16.2-reactunity.3` — the fork's `next` branch, carrying the two async-module-loader additions plus the module status-guard fix they turned out to need, none of which are upstream yet.

**Asynchronous module loading is what this bought**: an `import` of an http URL, and so a dynamic `import()`, resolves without blocking a frame. Every target has it, WebGL included, so `EngineCapabilities.ModuleResolution` is claimed everywhere and the host import hook that stood in for it is gone. `ModuleCompat` is down to `NeedsModuleScope`: no engine needs its code rewritten, only its document type decided.

WebGL gets there differently, because there is no QuickJS in it. The host half is shared — `QuickJSModuleLoader` resolves and fetches, so `import './x'` obeys ReactUnity's paths on both — but the linking is the browser's: [jsbplugin.ts](unity/quickjs/Plugins/QuickJS/WebGL/.source/jsbplugin.ts) assembles each module into a blob URL, rewriting every specifier to its dependency's URL, and imports the root. A module cannot see the globals proxy the rest of that backend runs inside (`with` is illegal in module code), so each one opens with a generated `var {…} = …` prelude of the host globals it mentions. `MIGRATION.md`'s "The second implementation" has the four rules that prelude has to follow and why each was a bug first. **Cycles are refused there** — a blob URL needs final text, and a cycle's is not.

**The jslib is generated; edit [.source/jsbplugin.ts](unity/quickjs/Plugins/QuickJS/WebGL/.source/jsbplugin.ts), never `jsbplugin.jslib`.** TypeScript 5 is pinned (`npx -p typescript@5 tsc && node postbuild.mjs` in `.source`) because TS 7 removed every option the build needs and has no ES5 emit, which Emscripten still requires. ES5 is not decoration: `async`/`await`, spread and `for…of` all downlevel to helper functions tsc puts at the top of the file, and Emscripten only emits the library object's own members — so a helper reference is `undefined` at runtime. Plain `.then()` chains and `forEach` only. `native-quickjs.yml` rebuilds and diffs the jslib, so a hand-edit or a forgotten rebuild fails CI, and runs the module tests:

```bash
node --test unity/quickjs/Plugins/QuickJS/WebGL/.source/jsbplugin.test.mjs
```

### Styling

`unity/core/Runtime/Styling/` implements a CSS subset over Yoga flexbox. Note for anything UI-facing: **an element with no `display` stacks its children, and `display: flex` lays them out in a row**, as on the web (there is no block layout, so both are flex containers); `flex-shrink` defaults to 1; CSS cannot style SVG icons from libraries like `react-icons` (use their `color`/`size` props); emoji are not reliably supported.

## Toolchain traps

These are load-bearing and easy to undo (see commit `43e90688`):

- `packages/scripts/tsconfig.json` must keep `preserveSymlinks: false`. Every consumer extends this config; under pnpm every dependency is a symlink, and `true` breaks module identity (renderer's `fetch`/`Response` globals silently drop out of scope).
- Loaders in `packages/scripts/config/webpack.config.js` must be `require.resolve`'d, not bare strings — webpack resolves loader strings against the *consuming app's* directory, which only ever worked under npm's flat hoisting.
- Root `.npmrc` sets `node-options="--import tsx"` (so `.mts` config is runnable) and `strict-peer-dependencies=false`.
- TypeScript is 7.x everywhere, `docs` included -- which cost `docs` its type checking: `astro check` runs on the compiler's JS API, and `@astrojs/language-server` throws in `assertCompatibleTypeScript` on 7, so the script and `@astrojs/check` are gone (`docs/package.json` has the note). `astro build` is the remaining gate there. Nothing may reintroduce `require('typescript')` or `resolve.sync('typescript')` — 7 has no CJS entry — and the options it removed (`target: ES5`, `esModuleInterop: false`, `baseUrl`) can't come back into a tsconfig. Everything else in the workspace is on latest.
- `vite build` does **not** fail on type errors — nothing in the build pipeline type checks, so `pnpm typecheck` is what catches them. Where an app names its own files by a root-relative path instead of a relative one (`kitchen-sink/react` and `unity/core/.react/devtools` do), that is the `#*` subpath imports in its `package.json` and not a bundler alias — `#*` maps to `./*` literally, so those specifiers carry the extension, which is what `allowImportingTsExtensions` in their tsconfigs is for.
- `pnpm-workspace.yaml`'s dependency-build allowlist is `allowBuilds`, not pnpm 10's `onlyBuiltDependencies`. pnpm 11 still *accepts* the old key — `pnpm config list` echoes it back — but no longer consults it, so every install script silently gets skipped. Combined with pnpm 11 defaulting `strictDepBuilds` to true, that turns a skipped build into `ERR_PNPM_IGNORED_BUILDS` and fails the install. Packages are listed explicitly as `true` or `false`; omitting one leaves it "undecided", which is what `strictDepBuilds` errors on. Only four are `true` — the ones whose native or downloaded binaries never materialise otherwise. Anything whose install script just prints a funding banner goes in as `false`.

## Conventions

Biome 2 ([biome.jsonc](biome.jsonc)) is the only JS/TS formatter and linter: single quotes, 2-space indent, width 140, LF, `reactClassic` JSX runtime for the formatter. Two settings there exist because of what this repo is, and both carry comments: `a11y` is off (every JSX file Biome sees renders Unity components, not DOM — `<button>` has no `type`, `<image>` has no `alt`), and the CSS `noUnknown*` rules are off (ReactUnity's CSS dialect is not the web's). `docs/` is excluded and uses its own Prettier setup — it formats `.astro` files, which Biome cannot. C# formatting comes from the root `.editorconfig`.

**Line endings are LF everywhere**, enforced at two levels: [.gitattributes](.gitattributes) normalises on commit (`* text=auto eol=lf`), so no editor can put a CRLF into the repo whatever Visual Studio or Unity write on disk, and [.editorconfig](.editorconfig) asks editors for LF so the churn never starts. Both carry comments explaining the state they replaced — before them the repo was 1921 LF against 1015 CRLF, split *within* every extension. `*.bat`/`*.cmd` are the one declared CRLF exception, and `*.asset` is deliberately left to git's content sniffing (one is binary lighting data among 136 YAML ones).

**There is one `.editorconfig`, at the root.** There were fourteen — one per merged repo, each declaring `root = true`, so each subtree was governed by its own copy and eleven of them were byte-identical; the only thing the split achieved was disagreeing about line endings. Repo-wide editor rules go in the root file. The exception is [packages/create/scaffold/react/.editorconfig](packages/create/scaffold/react/.editorconfig), which is shipped to scaffolded user projects (its `.npmignore` un-ignores it deliberately) rather than configuring this repo.

**Keep comments short.** About one line inside a function body, about three for public API documentation. Comment the non-obvious decision — what was tried and why it was rejected — but compress it to a sentence and state the conclusion rather than narrating how you got there. Longer reasoning belongs in the commit message or the `.tegami` changelog entry, not the source.
