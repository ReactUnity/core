# React Unity

[![openupm](https://img.shields.io/npm/v/com.reactunity.core?label=openupm&style=for-the-badge&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.core/)
[![Discord](https://img.shields.io/discord/884829138991603792?style=for-the-badge&label=Discord)](https://discord.gg/UY2EFW5ZKG)
[![Codecov](https://img.shields.io/codecov/c/github/ReactUnity/core?style=for-the-badge&token=3ZDHD77UX1)](https://codecov.io/gh/ReactUnity/core)
[![Tests](https://gist.githubusercontent.com/KurtGokhan/f744e86dd53cd0159d4f1d56ae9aae19/raw/ReactUnityTestBadge.svg)](https://github.com/ReactUnity/core/actions/workflows/test.yml)

React Unity is a way to build declarative UI in Unity3D using React. It can be used together with packages like Typescript, redux, i18next, react-router and more.
It also supports a subset of CSS features and Flexbox layout system.

## Requirements

Node is only used while developing and not required in runtime or after the project is built. Following are the minimum recommended versions. Use latest stable versions when possible.

- Node 12
- Unity 2019.4
- TMPro v2 or v3

## Installing

**Install via OpenUPM (recommended)**

```
npx openupm-cli add com.reactunity.core com.reactunity.quickjs
```

**Or add using the package manager with the git URL**

```
https://github.com/ReactUnity/core.git#latest
```

## Usage

- Create a canvas and add `ReactRendererUGUI` component to it
- Run [`npx @reactunity/create@latest`](https://github.com/ReactUnity/create) in your Unity project root to create a React project
- Run `npm start` from React project
- Click play in Unity

Visit the documentation on the [main website](https://reactunity.github.io) to learn more.

## Known Issues

- Low documentation coverage

> Most of ReactUnity's features are not well documented yet. All questions, bug reports and requests are welcome. 
> You can share them by opening issues or posting them in the [Discord server](https://discord.gg/UY2EFW5ZKG).

## Resources and References

- [Sample Project](https://github.com/ReactUnity/full-sample)
- [React Unity Renderer (npm package)](https://github.com/ReactUnity/renderer)
- [Acknowledgements](./.github/acknowledgements.md)
