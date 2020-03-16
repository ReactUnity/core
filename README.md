# React Unity

[![openupm](https://img.shields.io/npm/v/com.kurtgokhan.react-unity?label=openupm&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.kurtgokhan.react-unity/)
[![GitHub Wiki](https://img.shields.io/badge/wiki-available-brightgreen.svg)](https://github.com/KurtGokhan/react-unity/wiki)

React Unity is a way to build interactive UI in Unity3D using the popular React framework. 
It is designed to support CSS-like features and Flex layout system. 

## Requirements

- Node.js version 10 or above is required on the development machine. (Version 12 recommended)
- Tested in Unity 2019.3


## Installing

**Install via OpenUPM**

```
openupm add com.kurtgokhan.react-unity
```

**Or add manually by editing `manifest.json`**

```
{
  "dependencies": {
    "com.kurtgokhan.react-unity": "https://github.com/KurtGokhan/react-unity.git",
    ...
  },
}
```


## Usage

Open ```React > Quick Start``` from the menu bar for quick start wizard that will check requirements and create the React project next to the Asset folder. 

Import the sample from Package Manager Window to see how the Canvas is set up. Note that the _Source Asset_ property must point to the output file of your React project, which is `Assets/Resources/react/index.js` by default.

Make sure to read the [wiki](https://github.com/KurtGokhan/react-unity/wiki) for further usage instructions. You should also check the [sample app](https://github.com/KurtGokhan/react-unity-todo-sample).


## Issues and Contribution

Please feel free to share all your questions, proposals and feedbacks by opening issues. This package is in its early stages and looking for constructive feedback.


## Resources and References

- [Sample React TODO App](https://github.com/KurtGokhan/react-unity-todo-sample) and [Demo](https://reactunity.github.io/)
- [React Unity Renderer (npm package)](https://github.com/KurtGokhan/react-unity-renderer)
- [Create React Unity (npm project scaffold)](https://github.com/KurtGokhan/create-react-unity)
- [React](https://reactjs.org/)
- [Yoga](https://yogalayout.com/)
- [Jint](https://github.com/sebastienros/jint)
