# React Unity

[![openupm](https://img.shields.io/npm/v/com.reactunity.core?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.core/)
[![GitHub Wiki](https://img.shields.io/badge/wiki-available-brightgreen.svg)](https://github.com/ReactUnity/core/wiki)

React Unity is a way to build interactive UI in Unity3D using React. It can be used together with packages like Typescript, redux, i18next, react-router and more.
It also supports a subset of CSS features and Flex layout system. 

> Please feel free to share all your questions, proposals and feedbacks by opening issues. This package is in its early stages and looking for constructive feedback.

## Requirements

Node is only used while developing and not required in runtime or after the project is built. Following are the minimum recommended versions.

- Node 12
- Unity 2020.3

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
- Click play

Read the detailed instructions in [wiki](https://github.com/ReactUnity/core/wiki). Also check the [sample projects](https://github.com/search?q=topic%3Asample-project+org%3AReactUnity&type=Repositories).

## Known Issues

- Not well tested yet

## Resources and References

- [Sample Project 1](https://github.com/ReactUnity/full-sample) and [Demo 1](https://reactunity.github.io/)
- [Sample Project 2](https://github.com/ReactUnity/samples) and [Demo 2](https://reactunity.github.io/samples)
- [React Unity Renderer (npm package)](https://github.com/ReactUnity/renderer)
- [`npm init @reactunity`](https://github.com/ReactUnity/create)
- 3rd party dependencies
  - [React](https://reactjs.org/)
  - [Yoga](https://yogalayout.com/)
  - [Jint](https://github.com/sebastienros/jint)
