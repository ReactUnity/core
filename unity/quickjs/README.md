# React Unity QuickJS

[![openupm](https://img.shields.io/npm/v/com.reactunity.quickjs?label=openupm&style=for-the-badge&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.quickjs/)

This is a fork of [unity-jsb](https://github.com/ialex32x/unity-jsb) targeted for ReactUnity. It adds QuickJS engine capability to ReactUnity.


## Installing

**Install via OpenUPM (recommended)**

```
npx openupm-cli add com.reactunity.quickjs
```

**Or add using the package manager with the git URL**

```
https://github.com/ReactUnity/core.git#upm/quickjs
```

The sources live in the [ReactUnity/core](https://github.com/ReactUnity/core) monorepo under `unity/quickjs`, but every release is published to the `upm/quickjs` branch with the package at its root, so this fetches only this package. Pin a version with its tag instead:

```
https://github.com/ReactUnity/core.git#upm/quickjs/v0.23.0
```

The standalone `ReactUnity/quickjs` repository is frozen at 0.19.0 — update the URL if your project still points there.
