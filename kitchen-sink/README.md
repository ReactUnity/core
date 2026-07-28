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

Unlike `tests/`, this project is pinned to **6000.5.5f1** and is not part of any CI matrix.

## Publishing

This directory is not cloneable on its own: `Packages/manifest.json` consumes the Unity packages as `file:../../unity/*` and `react/package.json` uses `workspace:*`, both so that the project always exercises the working tree. [scripts/kitchen-sink/prepare.mts](../scripts/kitchen-sink/prepare.mts) rewrites those to published versions and drops the developer-only pieces; [release-kitchen-sink.yml](../.github/workflows/release-kitchen-sink.yml) commits the result to the orphan branch.

To see exactly what a user gets:

```bash
pnpm kitchen-sink Logs/kitchen-sink --force
```

**Anything added here that only resolves inside this checkout has to be handled in `prepare.mts`.** It fails loudly on the cases it knows about — a leftover `file:` or `workspace:` dependency, a scene pinned to an engine the export drops, a version OpenUPM has not published yet — but it cannot guess at a new one, and the failure in a user's Editor is a project that imports with no ReactUnity in it rather than an error they can read.
