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

Each app (`kitchen-sink/react`, `unity/core/.react/*`) uses `react-unity-scripts`, a CRA fork:

```bash
pnpm --filter reactunity-kitchen-sink start
```

`start` runs a dev server with HMR that Unity connects to (and serves a browser previewer at the port). `build` emits to `BUILD_PATH` — by default `../Assets/Resources/react`, overridden per app in its `.env`. `react-unity-scripts start --test` swaps the entry point to `test.ts`. See [packages/scripts/README.md](packages/scripts/README.md) for the full env-var surface (`FILENAME`, `BUILD_PATH`, `JSX_IMPORT_SOURCE`, …).

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

[scripts/unity/](scripts/unity/) drives a local Editor headlessly — `compile` (~8 s warm, the cheapest check on any C# edit), `test`, `open`, `editors`, and `bridge` for talking to an Editor that is already open. `pnpm unity help` lists it all, and [.claude/skills/unity](.claude/skills/unity/SKILL.md) covers which path to use and what bites. Two things worth knowing before running it:

- **The editor is pinned per project — `tests/` on 6000.1.4f1, `kitchen-sink` on 6000.5.5f1.** `tests/` cannot use 6000.5: its committed manifest resolves `com.unity.inputsystem`/`test-framework.performance` versions using `TreeView`, which 6000.5 made obsolete-as-error, giving 306 compile errors before any test runs. `UNITY_VERSION=` overrides. CI runs 2023.2.20f1/6000.0.51f1/6000.1.9f1, so a local pass is still not a matrix pass.
- **Opening `tests/` rewrites its manifest into a 6000-only shape** — `com.unity.ugui` 2.x, no `textmeshpro`, plus `modules.physicscore2d`/`vectorgraphics`/`adaptiveperformance` — and that manifest fails to resolve on **6000.1 as well as 2023.2** (measured), which yields *zero tests* rather than a red suite. The CLI snapshots those files and restores them after every run; `--no-restore` opts out. Restore covers batch runs only — an interactive Editor churns them freely, so check `git status` after one.

The Test Runner window still works, as does `.github/workflows/unity-tests.yml` for the real matrix. `tests/Packages/manifest.json` already points at `file:../../unity/*`, so the four Unity packages are wired up with no patching.

The Editor bridge itself is [unity/core/Editor/Developer/AgentBridge](unity/core/Editor/Developer/AgentBridge/): a loopback TCP server in its own asmdef, gated on `REACT_UNITY_DEVELOPER` and never started in batch mode. It is a separate assembly because it references `UnityEditor.TestRunner`, which `ReactUnity.Editor` must not depend on.

Rendering tests compare against snapshots in `unity/core/Tests/.snapshots/{linux,windows}`. To regenerate: the `React > Tests > Overwrite Snapshots` editor menu toggle (needs the `REACT_UNITY_DEVELOPER` define), the `-reactOverwriteSnapshots` command-line arg, `[snapshots]` in a commit message, or the workflow's `overwrite-snapshots` dispatch input. CI commits regenerated snapshots from the one matrix job marked `main: true`.

### Releasing

```bash
pnpm tegami
```
Tegami config lives in [scripts/tegami.mts](scripts/tegami.mts) (unrelated to `packages/scripts`, despite the name). Changelog entries are pending `.tegami/*.md` files; `tegami ci` on `main` either opens a "Version Packages" PR or publishes from the committed publish lock. UPM releases are separate and manual (`release-upm.yml`, workflow_dispatch).

### The Kitchen Sink sample

`kitchen-sink/` is both the project ReactUnity is manually tested against and the sample users are pointed at, so it is published standalone on the `kitchen-sink` orphan branch by [release-kitchen-sink.yml](.github/workflows/release-kitchen-sink.yml).

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

`packages/renderer/src/models/generated/*.ts` is emitted by `unity/core/Editor/Developer/TypescriptModelsGenerator.cs`, which reflects over the Unity assemblies. Biome ignores `models/generated`. **Do not hand-edit those files** — change the C# type (or the generator's include/remap options) and regenerate from the Unity Editor.

### Rendering frameworks

`unity/core/Runtime/Frameworks/` holds three backends behind the same component interfaces: `UGUI` (the mature one, with its own measurers, shapes, and state handlers), `UIToolkit`, and `Noop` (headless, used by tests). Each has its own asmdef. The matching TS type surfaces are `@reactunity/renderer/ugui`, `/uitoolkit`, `/editor` — each with its own `jsx-runtime`, so a project picks its element namespace by which one it imports.

### JavaScript engines

`unity/core/Runtime/Scripting/` defines `IJavaScriptEngine` plus DOM shims (`DomProxies/` — `fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `URL`). Concrete engines ship as separate UPM packages so a project pulls in only one native binary: `com.reactunity.quickjs` (recommended), `jint` (pure C#, slower), `clearscript` (V8).

### Styling

`unity/core/Runtime/Styling/` implements a CSS subset over Yoga flexbox. Note for anything UI-facing: **flex direction defaults to `column`**, not `row`; CSS cannot style SVG icons from libraries like `react-icons` (use their `color`/`size` props); emoji are not reliably supported.

## Toolchain traps

These are load-bearing and easy to undo (see commit `43e90688`):

- `packages/scripts/tsconfig.json` must keep `preserveSymlinks: false`. Every consumer extends this config; under pnpm every dependency is a symlink, and `true` breaks module identity (renderer's `fetch`/`Response` globals silently drop out of scope).
- Loaders in `packages/scripts/config/webpack.config.js` must be `require.resolve`'d, not bare strings — webpack resolves loader strings against the *consuming app's* directory, which only ever worked under npm's flat hoisting.
- `kitchen-sink/react` is `"type": "module"`, so its webpack config is `webpack.config.cjs`; `config/paths.js` prefers a `.cjs` sibling.
- Root `.npmrc` sets `node-options="--import tsx"` (so `.mts` config is runnable) and `strict-peer-dependencies=false`.
- TypeScript is 7.x everywhere, `docs` included -- which cost `docs` its type checking: `astro check` runs on the compiler's JS API, and `@astrojs/language-server` throws in `assertCompatibleTypeScript` on 7, so the script and `@astrojs/check` are gone (`docs/package.json` has the note). `astro build` is the remaining gate there. Nothing may reintroduce `require('typescript')` or `resolve.sync('typescript')` — 7 has no CJS entry — and the options it removed (`target: ES5`, `esModuleInterop: false`, `baseUrl`) can't come back into a tsconfig. Everything else in the workspace is on latest.
- `react-unity-scripts build` does **not** fail on type errors — fork-ts-checker is gone, so `TSC_COMPILE_ON_ERROR` does nothing and `pnpm typecheck` is what catches them. [packages/scripts/config/modules.js](packages/scripts/config/modules.js) derives webpack's `src` alias from `baseUrl`, and accepts `"paths": { "*": ["./*"] }` as the same thing since TS 7 removed `baseUrl`; `unity/core/.react/devtools` relies on that for its `src/…` imports.
- `pnpm-workspace.yaml`'s dependency-build allowlist is `allowBuilds`, not pnpm 10's `onlyBuiltDependencies`. pnpm 11 still *accepts* the old key — `pnpm config list` echoes it back — but no longer consults it, so every install script silently gets skipped. Combined with pnpm 11 defaulting `strictDepBuilds` to true, that turns a skipped build into `ERR_PNPM_IGNORED_BUILDS` and fails the install. Packages are listed explicitly as `true` or `false`; omitting one leaves it "undecided", which is what `strictDepBuilds` errors on. Only four are `true` — the ones whose native or downloaded binaries never materialise otherwise. Anything whose install script just prints a funding banner goes in as `false`.

## Conventions

Biome 2 ([biome.jsonc](biome.jsonc)) is the only JS/TS formatter and linter: single quotes, 2-space indent, width 140, LF, `reactClassic` JSX runtime for the formatter. Two settings there exist because of what this repo is, and both carry comments: `a11y` is off (every JSX file Biome sees renders Unity components, not DOM — `<button>` has no `type`, `<image>` has no `alt`), and the CSS `noUnknown*` rules are off (ReactUnity's CSS dialect is not the web's). `docs/` is excluded and uses its own Prettier setup — it formats `.astro` files, which Biome cannot. C# formatting comes from the root `.editorconfig`.

**Line endings are LF everywhere**, enforced at two levels: [.gitattributes](.gitattributes) normalises on commit (`* text=auto eol=lf`), so no editor can put a CRLF into the repo whatever Visual Studio or Unity write on disk, and [.editorconfig](.editorconfig) asks editors for LF so the churn never starts. Both carry comments explaining the state they replaced — before them the repo was 1921 LF against 1015 CRLF, split *within* every extension. `*.bat`/`*.cmd` are the one declared CRLF exception, and `*.asset` is deliberately left to git's content sniffing (one is binary lighting data among 136 YAML ones).

**There is one `.editorconfig`, at the root.** There were fourteen — one per merged repo, each declaring `root = true`, so each subtree was governed by its own copy and eleven of them were byte-identical; the only thing the split achieved was disagreeing about line endings. Repo-wide editor rules go in the root file. The exception is [packages/create/scaffold/react/.editorconfig](packages/create/scaffold/react/.editorconfig), which is shipped to scaffolded user projects (its `.npmignore` un-ignores it deliberately) rather than configuring this repo.

**Keep comments short.** About one line inside a function body, about three for public API documentation. Comment the non-obvious decision — what was tried and why it was rejected — but compress it to a sentence and state the conclusion rather than narrating how you got there. Longer reasoning belongs in the commit message or the `.tegami` changelog entry, not the source.
