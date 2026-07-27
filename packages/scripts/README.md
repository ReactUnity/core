# React Unity Scripts

![npm version](https://badge.fury.io/js/%40reactunity%2Fscripts.svg)

This package includes scripts and configuration used by [React Unity](https://github.com/ReactUnity/core).

This project is a fork of [Create React App (CRA)](https://create-react-app.dev/). Same options, conventions, and environment variables can be used. You can also check the documentation of CRA to get more information.

## Installation

```
npm i @reactunity/scripts
```

## Commands

- `react-unity-scripts start` - Start the dev server with Hot Module Replacement (HMR)
- `react-unity-scripts build` - Create the production ready build
- `react-unity-scripts start --test` - Start the test server (entry file will be `test.ts` instead of `index.ts`)

## Extra Environment Variables

Environment variables of CRA can be used with React Unity. However, there are some differences:

- `FILENAME` - Name of the generated javascript file. `index.js` by default.
- `BUILD_PATH` - Path to the generated output. Relative to the project. `../Assets/Resources/react` by default.
- `GENERATE_SOURCEMAP` - `false` by default.
- `FAST_REFRESH` - This can be set to `false` to disable `react-refresh` if you are having problems with hot reload
- `IMAGE_INLINE_SIZE_LIMIT` - `0` by default. Because non-inlined images will be faster in Unity. However, if users still want to inline images, they should increase this limit.
- `JSX_IMPORT_SOURCE` - Can be used to allow some custom JSX transformations. For example, set this variable to `@emotion/react` for Emotion.
- `ENABLE_SCOPE` - Can be used to restricts imports to `src` folder only.

Environment variables can also be defined by having `.env`, `.env.local`, `.env.<development|production>` in project folder.

Custom environment variables are also possible as in [CRA](https://create-react-app.dev/docs/adding-custom-environment-variables).

`.babelrc` can be used to modify some Babel options.

## Multiple Entry Points

In addition to `src/index` file, there can be other entry points. Every file under `src/entry/` folder will be detected and configured as an entry point. For example, if there is a file `src/entry/menu.tsx`, Webpack will detect that and create an entrypoint named `menu` with output `menu.js` in addition to the default entrypoint `index.js`.

## WebGL Inspector

When dev server is started with the `start` script, a web server is launched at the selected port (e.g. http://localhost:3000). This server serves the javascript and asset files that are used by ReactUnity. Visiting it in a browser opens the previewer, which runs your UI in a Unity WebGL player without launching the editor, and reacts to code changes via HMR. `/info.html` on the same server explains how to point Unity's `DevServer` property at it.

Nothing needs installing for this — the previewer's Unity build is hosted on `reactunity.github.io` rather than shipped as a dependency, so the first load fetches it over the network and the browser caches it thereafter. It used to be an optional `@reactunity/previewer` package, which meant a ~107 MB install for a page many projects never opened. That package is no longer used.

Note that the previewer has very limited capabilities and ReactUnity is not optimised for WebGL, so performance is well below a real player. It may not work for all cases, but it is useful when starting a new project. To preview your own scene instead — or to work offline — build a scene in Unity with a `ReactRendererUGUI` component, its `Type` set to `Url` and `Source Path` set to `/index.js`, and copy the output into a `previewer` folder under your React project so that `previewer/index.html` exists. The dev server serves that in preference to the built-in previewer, and your project's own `public` folder takes precedence over both.
