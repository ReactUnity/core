# React Unity

[![openupm](https://img.shields.io/npm/v/com.kurtgokhan.react-unity?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.kurtgokhan.react-unity/)
[![GitHub Wiki](https://img.shields.io/badge/wiki-available-brightgreen.svg)](https://github.com/ReactUnity/core/wiki)

React Unity is a way to build interactive UI in Unity3D using the popular React framework and Typescript. 
It is designed to support CSS-like features and Flex layout system. 

## Requirements

- Node.js version 12 is required on the development machine
- Tested in Unity 2019.3 and 2020.1


## Installing

**Install via OpenUPM**

```
openupm add com.kurtgokhan.react-unity
```

**Or add manually by editing `manifest.json`**

```
{
  "dependencies": {
    "com.kurtgokhan.react-unity": "https://github.com/ReactUnity/core.git",
    ...
  },
}
```


## Usage

- Create a canvas and add `ReactUnity` component to it
- Run `npm init react-unity` to create a React project in your Unity project root
- Run `npm start` from React project
- Click play

Read the detailed instructions in [wiki](https://github.com/KurtGokhan/react-unity/wiki). Also check the [sample project](https://github.com/ReactUnity/full-sample).


## Issues and Contribution

Please feel free to share all your questions, proposals and feedbacks by opening issues. This package is in its early stages and looking for constructive feedback.


## Resources and References

- [Full Unity Project Sample](https://github.com/ReactUnity/full-sample) and [Demo](https://reactunity.github.io/)
- [React Unity Renderer (npm package)](https://github.com/ReactUnity/renderer)
- [`npm init react-unity`](https://github.com/ReactUnity/create-react-unity)
- [React](https://reactjs.org/)
- [Yoga](https://yogalayout.com/)
- [Jint](https://github.com/sebastienros/jint)
