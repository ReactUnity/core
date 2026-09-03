# React Unity Renderer

![npm version](https://badge.fury.io/js/%40reactunity%2Frenderer.svg)

React reconciler implementation for React Unity, including Typescript definitions. 
See [main repo](https://github.com/ReactUnity/core) for further info.

## Installation

```
npm i @reactunity/renderer
```

## Vite plugin

`@reactunity/renderer/vite` is a preset that configures Vite for a ReactUnity app:

```ts
// vite.config.mts
import reactUnity from '@reactunity/renderer/vite';
import { defineConfig } from 'vite';

export default defineConfig({ plugins: [reactUnity()] });
```

It adds [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react), finds the Unity
project above the app and builds into its `Assets/Resources/react`, and empties that folder before
each build while keeping Unity's `.meta` files — so the GUIDs your scenes reference survive a
rebuild. Filenames carry no content hash for the same reason. It also turns off the Vite devtools and
the HMR error overlay, neither of which Unity can display.

Every part of that is an option:

| Option | Default | |
| --- | --- | --- |
| `unityProject` | discovered | The Unity project to build into, absolute or relative to the Vite root. |
| `assetPath` | `Assets/Resources/react` | Output folder inside the Unity project. |
| `clean` | `true` | Empty the output directory before each build, keeping its `.meta` files. |
| `preserve` | `[]` | Paths inside the output directory that the clean never deletes. |
| `hashFileNames` | `false` | Put content hashes in output filenames. |
| `react` | `{}` | Options for `@vitejs/plugin-react`, or `false` to add the React plugin yourself. |

Anything set in the Vite config itself wins: the preset only fills in what you left out.
