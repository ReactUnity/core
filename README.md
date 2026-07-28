# ReactUnity Kitchen Sink

A complete Unity project that exercises most of [ReactUnity](https://github.com/ReactUnity/core) at once — UGUI and UI Toolkit, a world-space canvas, VR, SVG, animations, styling with four different CSS-in-JS libraries, Redux, TanStack Query, and C# ↔ JavaScript interop. It doubles as the project ReactUnity itself is developed against, so it tends to reach the newest features first.

Built from ReactUnity **v0.23.0**.

## Clone it

This branch has the project at its root, so a shallow single-branch clone fetches only this and not the monorepo it is published from:

```bash
git clone --branch kitchen-sink --single-branch --depth 1 https://github.com/ReactUnity/core.git reactunity-kitchen-sink
```

To pin the version instead of following the branch, clone the tag `kitchen-sink/v0.23.0`.

## Run it

1. Open the folder as a project in **Unity 6000.5 or newer**. The Package Manager will pull `com.reactunity.core` and `com.reactunity.quickjs` from OpenUPM on first open, which is already configured as a scoped registry.
2. Open `Assets/Scenes/MainScene.unity`.
3. Press **Play**, and navigate the examples in the rendered UI.

Node is not needed for this. The UI is committed pre-built under `Assets/Resources/react`, so the project plays as cloned.

## Change the UI

The interface is a React app in [`react/`](react). To edit it live:

```bash
cd react
npm install
npm start
```

Then press **Play** in Unity. It connects to the dev server on port 3100 and hot-reloads as you edit — start with `react/src/pages/home/index.tsx`. The same dev server also renders the UI in a browser at [localhost:3100](http://localhost:3100), which is usually the faster way to iterate on layout.

`npm run build` writes a production bundle back into `Assets/Resources/react`, which is what a player build ships.

## What is in it

| Scene | Shows |
|---|---|
| `MainScene` | The main example gallery, rendered with UGUI |
| `UIToolkit` | The same renderer targeting UI Toolkit instead |
| `WorldCanvas` | ReactUnity on a canvas in 3D space |
| `VR` | A world-space UI driven by XR interaction |
| `HTML` | The `<html>` component rendering raw markup |

The gallery pages under `react/src/pages` are the useful part to read: `style-playground` and `style-frameworks` for the CSS subset, `animations`, `svgs`, `images`, `bg-patterns`, `material` for the component library, `redux` and `query` for state management, `interop` for calling into C#, and `game` and `todo` for something closer to a real screen.

## Packages

| Package | Version | Source |
|---|---|---|
| `com.reactunity.core` | 0.23.0 | OpenUPM |
| `com.reactunity.quickjs` | 0.23.0 | OpenUPM |
| `@reactunity/renderer`, `material`, `scripts` | 0.23.0 | npm |

QuickJS is the recommended JavaScript engine and the only one installed here. ReactUnity also ships [Jint](https://github.com/ReactUnity/core/tree/upm/jint) (pure C#, no native binary, slower) and [ClearScript](https://github.com/ReactUnity/core/tree/upm/clearscript) (V8). Add one by installing its package and picking it in the `EngineType` dropdown on the `ReactRenderer` component:

```
https://github.com/ReactUnity/core.git#upm/clearscript
```

ClearScript is worth adding if you want to attach a JavaScript debugger — `react/.vscode/launch.json` has the VS Code configuration for it, and [the debugging guide](https://reactunity.github.io/learn/howto/debug) covers the rest. QuickJS has no debugger.

## Where to go next

- [Documentation](https://reactunity.github.io)
- [ReactUnity/core](https://github.com/ReactUnity/core) — the source, and where to file issues
- [Discord](https://discord.gg/UY2EFW5ZKG)

## Licence

MIT, same as ReactUnity. Use anything here as a starting point.

---

This branch is generated — it is `kitchen-sink/` from the [ReactUnity/core](https://github.com/ReactUnity/core) monorepo with the local `file:` and `workspace:` dependencies rewritten to published versions. Pull requests belong on `main` in that repo, not here.
