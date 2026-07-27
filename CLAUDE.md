# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

ReactUnity: a React renderer that draws UI inside Unity3D (UGUI, UIToolkit, and the Unity Editor) without a DOM. This is a **monorepo formed by merging ~10 previously separate ReactUnity repos** (`renderer`, `scripts`, `material`, `create`, `core`, `jint`, `quickjs`, `clearscript`, `docs`, `tests`, `full-sample`, `samples`) with their histories preserved — see the `chore: merge X into Y` commits. Much of the layout only makes sense in that light, and the workflow files under `.github/workflows/` carry detailed comments explaining why each piece is shaped the way it is. Read those before changing CI.

## Two package universes

| | npm (`packages/*`) | UPM / Unity (`unity/*`) |
|---|---|---|
| Members | `@reactunity/renderer`, `scripts`, `material`, `create` | `com.reactunity.core`, `jint`, `quickjs`, `clearscript` |
| Consumed by | the user's React app | the user's Unity project |
| Published by | `.github/workflows/release-npm.yml` (Tegami + npm OIDC) | `.github/workflows/release-upm.yml` (manual dispatch, orphan branch per package) |

All eight share **one version number** (currently `0.22.0`). Tegami bumps `packages/*`; the `syncUnityVersions` plugin in [scripts/tegami.mts](scripts/tegami.mts) copies that version into the four `unity/*/package.json` manifests.

**`unity/*/package.json` files are UPM manifests, not npm manifests.** Their `dependencies` are Unity package names (`com.unity.editorcoroutines`). They are deliberately excluded from the pnpm workspace — adding them would send pnpm to the npm registry looking for Unity packages.

## pnpm workspace membership

Defined in [pnpm-workspace.yaml](pnpm-workspace.yaml), which documents every inclusion and exclusion. Members are: `packages/*`, `unity/core/.react/*` (three React apps embedded in the core Unity package; the `.react` dot-prefix hides them from Unity's asset importer), `full-sample/react`, and `docs`.

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
Builds `packages/*` only, topologically (`material` needs `renderer`'s `dist`). **[tsdown](https://tsdown.dev) is the bundler; `tsc` never emits.** Each package has a `tsdown.config.ts` next to its `package.json`, and every `tsconfig.json` is `noEmit`, so type errors have to be asked for separately:

```bash
pnpm typecheck
```
`tsc --noEmit` across `packages/*`. CI runs it as its own step for exactly that reason — a green `pnpm build` says nothing about types, because rolldown transpiles file by file and the `.d.ts` step does no whole-program analysis.

The published output changed shape when tsdown took over, and the comments in each `tsdown.config.ts` explain the parts that are load-bearing. In short: `dist` is now bundled per entry plus shared chunks rather than a mirror of the source tree, and the syntax floor moved from ES5 to **ES2015**, because rolldown refuses anything older ("Rolldown only supports ES2015 (ES6) and later"). What makes that safe: `unity/jint` ships Jint 4 (`Plugins/Jint/Acornima.dll` — the parser Jint 4 took over from Esprima.NET), QuickJS is ES2020, ClearScript is V8, and `react-unity-scripts` already runs Babel across `node_modules` via `babel-preset-react-app/dependencies`. Two things stay externalised on purpose and are commented where they're configured: `react-unity-webgl` (types-only devDependency whose own published `.d.ts` has a broken relative import) and `material`'s `.scss` imports (ReactUnity stylesheets the consumer's sass-loader must see, hence the `copy-files` step alongside the build).

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

Each app (`full-sample/react`, `unity/core/.react/*`) uses `react-unity-scripts`, a CRA fork:

```bash
pnpm --filter reactunity-sample start
```

`start` runs a dev server with HMR that Unity connects to (and serves a browser previewer at the port). `build` emits to `BUILD_PATH` — by default `../Assets/Resources/react`, overridden per app in its `.env`. `react-unity-scripts start --test` swaps the entry point to `test.ts`. See [packages/scripts/README.md](packages/scripts/README.md) for the full env-var surface (`FILENAME`, `BUILD_PATH`, `JSX_IMPORT_SOURCE`, …).

### The documentation site

`docs/` is an [Astro](https://astro.build) site (it was a Next 12 fork of react.dev until the migration; the shape and MDX component set are still React's). `pnpm --filter react-website start` serves it on port 4321, `pnpm --filter react-website build` writes `docs/dist`, and `pnpm --filter react-website check` runs `astro check`. [docs/README.md](docs/README.md) explains how a page is assembled; the parts worth knowing before editing it:

- Pages are `.mdx` files in `docs/src/content`, wired up by `docs/src/content.config.ts` and rendered by `docs/src/pages/[...slug].astro`, which also owns the element-name → component map. Navigation, titles and prev/next links come from `sidebarLearn.json` / `sidebarReference.json`, not frontmatter. `layout:` is *not* usable in frontmatter — Astro treats it as a component to import.
- Almost everything renders to static HTML. Only three things ship JS: the nav (`client:load`), the table of contents (`client:load`) and each `<Sandpack>` (`client:visible`). Components in the MDX map are `.astro` files on purpose — a React component there receives its children as an opaque `<astro-slot>` blob, so anything that needs to read its children (`<Sandpack>`'s code fences) gets the data from a remark plugin instead.
- One Unity WebGL player is shared by every example on a page, via a module-level singleton in `docs/src/components/unity/global.tsx`. It cannot be React context: each Sandpack is a separate island with its own React root, and the player is a ~100 MB download.

### Unity C# tests

There is no local CLI entry point — open `tests/` in Unity and use the Test Runner, or let `.github/workflows/unity-tests.yml` run the matrix (Unity 2023.2 → 6000.1). `tests/Packages/manifest.json` already points at `file:../../unity/*`, so the four Unity packages are wired up with no patching.

Rendering tests compare against snapshots in `unity/core/Tests/.snapshots/{linux,windows}`. To regenerate: the `React > Tests > Overwrite Snapshots` editor menu toggle (needs the `REACT_UNITY_DEVELOPER` define), the `-reactOverwriteSnapshots` command-line arg, `[snapshots]` in a commit message, or the workflow's `overwrite-snapshots` dispatch input. CI commits regenerated snapshots from the one matrix job marked `main: true`.

### Releasing

```bash
pnpm tegami
```
Tegami config lives in [scripts/tegami.mts](scripts/tegami.mts) (unrelated to `packages/scripts`, despite the name). Changelog entries are pending `.tegami/*.md` files; `tegami ci` on `main` either opens a "Version Packages" PR or publishes from the committed publish lock. UPM releases are separate and manual (`release-upm.yml`, workflow_dispatch).

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
- `full-sample/react` is `"type": "module"`, so its webpack config is `webpack.config.cjs`; `config/paths.js` prefers a `.cjs` sibling.
- Root `.npmrc` sets `node-options="--import tsx"` (so `.mts` config is runnable) and `strict-peer-dependencies=false`.
- **TypeScript is 7.x everywhere except `docs`**, which stays on 6.x and says why next to its own pin: `@astrojs/check` peer-depends on `^5.0.0 || ^6.0.0`, and `pnpm check` there runs `astro check`, which drives the compiler's JS API. Version 7 is the native compiler, and getting the rest of the workspace onto it meant clearing two obstacles rather than waiting them out. It ships **no JS API** — its export map points `.` at `lib/version.cjs`, so `require('typescript')` yields `{ version, versionMajorMinor }` and `resolve.sync('typescript')` throws MODULE_NOT_FOUND — which blocked `packages/scripts` at three call sites and, through it, the four apps built with `react-unity-scripts`, since fork-ts-checker resolved TypeScript from the *app's* directory. All three are gone; see the next bullet. And 7 *removes* compiler options rather than deprecating them (TS5108 for `target=ES5` and `esModuleInterop=false`, TS5102 for `baseUrl`), which blocked `renderer` and `material` — those were emit options, and tsdown owns emit now. Three more deps are held back for reasons written next to them: `webpack-dev-server` (5.x — 6 needs Express 5, which the react-dev-utils middlewares predate), `@babel/core` (7.x — `babel-preset-react-app` peer-depends on it), and `react-unity-webgl` (9.x — `renderer/webgl-compat` re-exports its types as its own API).
- **Nothing in a build type checks — `react-unity-scripts` included.** CRA ran fork-ts-checker-webpack-plugin beside webpack so `start` reported type errors and `build` failed on them; Babel strips types without checking, so that plugin was the whole of it. It needs the JS API version 7 doesn't ship, so it was dropped, and with it went the other two `resolve.sync('typescript')` sites in [packages/scripts](packages/scripts/config/modules.js): `config/modules.js` now parses tsconfig with `jsonc-parser` (all it wanted was `baseUrl`), and `scripts/utils/verifyTypeScriptSetup.js` was deleted as dead code — only `init` called it, and `init` isn't one of the scripts `bin/react-unity-scripts.js` dispatches. Consequences worth knowing: `react-unity-scripts build` no longer fails on type errors (run `pnpm typecheck` alongside it, which is what CI does), `TSC_COMPILE_ON_ERROR` no longer does anything, and since `modules.js` derives webpack's `src` alias from `baseUrl` — an option 7 rejects — it now also accepts 7's replacement spelling, `"paths": { "*": ["./*"] }`. `unity/core/.react/devtools` depends on exactly that for its `src/…` imports.
- `pnpm-workspace.yaml`'s dependency-build allowlist is `allowBuilds`, not pnpm 10's `onlyBuiltDependencies`. pnpm 11 still *accepts* the old key — `pnpm config list` echoes it back — but no longer consults it, so every install script silently gets skipped. Combined with pnpm 11 defaulting `strictDepBuilds` to true, that turns a skipped build into `ERR_PNPM_IGNORED_BUILDS` and fails the install. Packages are listed explicitly as `true` or `false`; omitting one leaves it "undecided", which is what `strictDepBuilds` errors on. Only four are `true` — the ones whose native or downloaded binaries never materialise otherwise. Anything whose install script just prints a funding banner goes in as `false`.

## Conventions

Biome 2 ([biome.jsonc](biome.jsonc)) is the only JS/TS formatter and linter: single quotes, 2-space indent, width 140, LF, `reactClassic` JSX runtime for the formatter. Two settings there exist because of what this repo is, and both carry comments: `a11y` is off (every JSX file Biome sees renders Unity components, not DOM — `<button>` has no `type`, `<image>` has no `alt`), and the CSS `noUnknown*` rules are off (ReactUnity's CSS dialect is not the web's). `docs/` is excluded and uses its own Prettier setup — it formats `.astro` files, which Biome cannot. C# formatting comes from the root `.editorconfig`.

**Line endings are LF everywhere**, enforced at two levels: [.gitattributes](.gitattributes) normalises on commit (`* text=auto eol=lf`), so no editor can put a CRLF into the repo whatever Visual Studio or Unity write on disk, and [.editorconfig](.editorconfig) asks editors for LF so the churn never starts. Both carry comments explaining the state they replaced — before them the repo was 1921 LF against 1015 CRLF, split *within* every extension. `*.bat`/`*.cmd` are the one declared CRLF exception, and `*.asset` is deliberately left to git's content sniffing (one is binary lighting data among 136 YAML ones).

**There is one `.editorconfig`, at the root.** There were fourteen — one per merged repo, each declaring `root = true`, so each subtree was governed by its own copy and eleven of them were byte-identical; the only thing the split achieved was disagreeing about line endings. Repo-wide editor rules go in the root file. The exception is [packages/create/scaffold/react/.editorconfig](packages/create/scaffold/react/.editorconfig), which is shipped to scaffolded user projects (its `.npmignore` un-ignores it deliberately) rather than configuring this repo.

When explaining a non-obvious decision, this repo's style is a comment at the point of the decision spelling out what was tried and why it was rejected — match that density rather than trimming it.
