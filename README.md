# React Unity

[![openupm](https://img.shields.io/npm/v/com.reactunity.core?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.core/)
[![GitHub Wiki](https://img.shields.io/badge/wiki-available-brightgreen.svg)](https://github.com/ReactUnity/core/wiki)

React Unity is a way to build interactive UI in Unity3D using the popular React framework and Typescript. 
It is designed to support CSS-like features and Flex layout system. 

**WIP: Upcoming breaking changes and API improvements**

## Requirements

- Node.js version 12 is required on the development machine
- Tested in Unity 2019.3 and 2020.1


## Installing

**Install via OpenUPM**

```
openupm add com.reactunity.core
```

**Or add manually by editing `manifest.json`**

```
{
  "dependencies": {
    "com.reactunity.core": "https://github.com/ReactUnity/core.git",
    ...
  },
}
```


## Usage

- Create a canvas and add `ReactUnity` component to it
- Run `npm init @reactunity` to create a React project in your Unity project root
- Run `npm start` from React project
- Click play

Read the detailed instructions in [wiki](https://github.com/ReactUnity/core/wiki). Also check the [sample project](https://github.com/ReactUnity/full-sample).


## Issues and Contribution

Please feel free to share all your questions, proposals and feedbacks by opening issues. This package is in its early stages and looking for constructive feedback.


## Resources and References

- [Full Unity Project Sample](https://github.com/ReactUnity/full-sample) and [Demo](https://reactunity.github.io/)
- [React Unity Renderer (npm package)](https://github.com/ReactUnity/renderer)
- [`npm init @reactunity`](https://github.com/ReactUnity/create)
- [React](https://reactjs.org/)
- [Yoga](https://yogalayout.com/)
- [Jint](https://github.com/sebastienros/jint)
