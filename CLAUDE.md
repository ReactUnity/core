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
Builds `packages/*` only, topologically (`material` needs `renderer`'s `dist`).

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

### Unity C# tests

There is no local CLI entry point — open `tests/` in Unity and use the Test Runner, or let `.github/workflows/unity-tests.yml` run the matrix (Unity 2021.3 → 6000.1). `tests/Packages/manifest.json` already points at `file:../../unity/*`, so the four Unity packages are wired up with no patching.

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
- Root `.npmrc` sets `node-options="--import tsx"` (so `.mts` config is runnable) and `strict-peer-dependencies=false` (docs is on React 18, everything else React 19).
- `pnpm-workspace.yaml`'s dependency-build allowlist is `allowBuilds`, not pnpm 10's `onlyBuiltDependencies`. pnpm 11 still *accepts* the old key — `pnpm config list` echoes it back — but no longer consults it, so every install script silently gets skipped. Combined with pnpm 11 defaulting `strictDepBuilds` to true, that turns a skipped build into `ERR_PNPM_IGNORED_BUILDS` and fails the install. Packages are listed explicitly as `true` or `false`; omitting one leaves it "undecided", which is what `strictDepBuilds` errors on. Only four are `true` — the ones whose native or downloaded binaries never materialise otherwise. Anything whose install script just prints a funding banner goes in as `false`.

## Conventions

Biome ([biome.jsonc](biome.jsonc)) is the only JS/TS formatter and linter: single quotes, 2-space indent, width 140, LF, `reactClassic` JSX runtime for the formatter. `docs/` is excluded and uses its own Prettier + ESLint setup. C# formatting comes from the root `.editorconfig`.

When explaining a non-obvious decision, this repo's style is a comment at the point of the decision spelling out what was tried and why it was rejected — match that density rather than trimming it.
