# React Unity

[![openupm](https://img.shields.io/npm/v/com.reactunity.core?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.core/)
[![Tests](https://github.com/ReactUnity/core/actions/workflows/test.yml/badge.svg)](https://github.com/ReactUnity/core/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/ReactUnity/core/branch/main/graph/badge.svg?token=3ZDHD77UX1)](https://codecov.io/gh/ReactUnity/core)

React Unity is a way to build interactive UI in Unity3D using React. It can be used together with packages like Typescript, redux, i18next, react-router and more.
It also supports a subset of CSS features and Flex layout system.

## Requirements

Node is only used while developing and not required in runtime or after the project is built. Following are the minimum recommended versions. Use latest stable versions when possible.

- Node 12
- Unity 2019.4
- TMPro v2 or v3

## Installing

**Install via OpenUPM (recommended)**

```
npx openupm-cli add com.reactunity.core
```

**Or add using the package manager with the git URL**

`https://github.com/ReactUnity/core.git#stable`


## Usage

- Create a canvas and add `ReactUnity` component to it
- Run `npm init @reactunity` in your Unity project root to create a React project
- Run `npm start` from React project
- Click play in Unity

The documentation on the [main website](https://reactunity.github.io) is under development. You can also read detailed instructions in outdated [wiki](https://github.com/ReactUnity/core/wiki).

## Known Issues

- Not well tested yet
- Low documentation coverage

> Feel free to share all your questions, proposals and feedbacks by opening issues. This package is in its early stages and looking for constructive feedback.

## Resources and References

- [Sample Project](https://github.com/ReactUnity/samples) and [Demo](https://reactunity.github.io/samples)
- [React Unity Renderer (npm package)](https://github.com/ReactUnity/renderer)
- [`npm init @reactunity`](https://github.com/ReactUnity/create)
- [Acknowledgements](./.github/acknowledgements.md)
