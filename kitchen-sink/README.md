# ReactUnity Kitchen Sink

The Unity project ReactUnity is developed and manually tested against — most features at once, across UGUI, UI Toolkit, a world-space canvas, VR and raw HTML. It is also the sample users are pointed at, so it is published standalone: see [the `kitchen-sink` branch](https://github.com/ReactUnity/core/tree/kitchen-sink).

For smaller, more focused examples, see [`samples/`](../samples).

## Running it

Open the project in Unity, open `Assets/Scenes/MainScene.unity` and press Play, or drive it headlessly:

```bash
pnpm unity open kitchen-sink
```

The UI is a React app in [`react/`](react). Start its dev server and press Play — Unity connects to it and hot-reloads as you edit `react/src/pages/…`:

```bash
pnpm --filter reactunity-kitchen-sink start
```

`pnpm --filter reactunity-kitchen-sink build` writes the bundle to `Assets/Resources/react`, which is committed so the project plays without Node.

Unlike `tests/`, this project is pinned to **6000.6.0f1** and is not part of any CI matrix.

## The two hosted WebGL players

Two Unity WebGL builds come out of this project. Neither is tracked here — together they are ~165 MB — and neither is built by CI, which has no WebGL module. They live permanently under `Unity/` on the `gh-pages` branch of [reactunity.github.io](https://github.com/ReactUnity/reactunity.github.io), which the docs deploy is configured not to wipe.

| Build profile | Published to | Loaded by |
|---|---|---|
| `WebInjectable` | `Unity/injectable/` | every docs example, via [instance.tsx](../docs/src/components/unity/instance.tsx) |
| `Previewer` | `Unity/previewer/<version>/` | the `@reactunity/scripts` dev server, via [index.html](../packages/scripts/config/public/index.html) |

Building one is a `build` against an open Editor — `pnpm unity` has no WebGL command, and could not run one while an Editor holds the project lock anyway. Each takes about ten minutes cold and under a minute once the other has warmed the IL2CPP cache:

```bash
unity command build --project-path kitchen-sink -- --target WebGL --profileName Previewer --scenes '["Assets/Scenes/Internal/Previewer.unity"]' --outputPath Logs/web/Previewer --confirm true
```

Four things decide whether the result is usable at those URLs, and nothing checks any of them:

- **Name the scene, do not trust `--profileName` to.** The command resolves the scene list *before* it activates the profile, so a profile switch does not reach the build it is switching for: asking for `Previewer` while `WebInjectable` was active produces the WebInjectable scene under the name `Previewer.data`, succeeds, and looks right until someone opens it. `--scenes` is the only reliable half; the profile still has to be named, for the platform settings.
- **The output folder name becomes the file name.** Unity writes `Build/<folder name>.wasm`, not the product or profile name, so the folder has to be `WebInjectable` or `Previewer` — that is what both consumers request. The directory it is *published* into is `injectable`/`previewer`; only `Build/` is copied over (neither scene uses `StreamingAssets`, so no build produces one).
- **Compression has to be off.** The project builds Gzip with `webGLDecompressionFallback` off, which lands as `Build/….wasm.gz` and needs a `Content-Encoding` header GitHub Pages does not send. Set `PlayerSettings.WebGL.compressionFormat = Disabled` first, and put it back afterwards — it is a project setting, not something either profile overrides. That, plus a `Code Optimization` of `Shorter Build Time`, is why the `.wasm` is ~59 MB.
- **The previewer's version is in its path**, so a new build means a new directory *and* the matching `PREVIEWER_VERSION` bump in `packages/scripts/config/public/index.html`. Upload first: a bump pointing at a directory that is not there yet gives every dev server a dead previewer.

Check a build before uploading it, because a wrong one succeeds quietly. `python -m http.server` in the output folder and open `index.html`: the previewer fetches `/index.js` from that origin, so dropping the injectable bundle there with its `/*INJECT_CODE*/` marker replaced renders a real component; the injectable player renders nothing until something calls `SetJSX` then `RenderBridge` on `ReactCanvas`, which is what the docs page does.

`WebInjectable` bakes in `unity/core/Tests/Runtime/Resources/ReactUnity/tests/injectable/index.js` — the bundle the C# suite injects fixtures into — so regenerate it with `pnpm --filter @reactunity/injectable build` before building the player, or the docs examples run against whatever the renderer looked like when that bundle was last committed.

## Publishing

This directory is not cloneable on its own: `Packages/manifest.json` consumes the Unity packages as `file:../../unity/*` and `react/package.json` uses `workspace:*`, both so that the project always exercises the working tree. [scripts/kitchen-sink/prepare.mts](../scripts/kitchen-sink/prepare.mts) rewrites those to published versions and drops the developer-only pieces; [release-kitchen-sink.yml](../.github/workflows/release-kitchen-sink.yml) commits the result to the orphan branch.

To see exactly what a user gets:

```bash
pnpm kitchen-sink Logs/kitchen-sink --force
```

**Anything added here that only resolves inside this checkout has to be handled in `prepare.mts`.** It fails loudly on the cases it knows about — a leftover `file:` or `workspace:` dependency, a scene pinned to an engine the export drops, a version OpenUPM has not published yet — but it cannot guess at a new one, and the failure in a user's Editor is a project that imports with no ReactUnity in it rather than an error they can read.
