# React Unity Scripts

This package includes scripts and configuration used by [React Unity](https://github.com/ReactUnity/core).

## Installation

```
npm i @reactunity/scripts
```

## Commands

- `react-unity-scripts start` - Start the dev server with HMR
- `react-unity-scripts build` - Create the production ready build
- `react-unity-scripts start --test` - Start the test server (entry file will be `test.ts` instead of `index.ts`)

## Extra Environment Variables

- `FILENAME` - Name of the generated javascript file. `index.js` by default.
- `BUILD_DIR` - Path to the generated output. Relative to the project. `../Assets/Resources/react` by default.
- `GENERATE_SOURCEMAP` - `false` by default.
- `HARD_RELOAD` - Reload the entire UI instead of doing HMR. `false` by default.
- `IMAGE_INLINE_SIZE_LIMIT` - `0` by default. Because non-inlined images will be faster in Unity. However, users may still want to inline images.

Environment variables can also be defined by having `.env`, `.env.local`, `.env.<development|production>` in project folder.
