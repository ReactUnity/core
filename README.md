# React Unity ClearScript

[![openupm](https://img.shields.io/npm/v/com.reactunity.clearscript?label=openupm&style=for-the-badge&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.clearscript/)

This package contains binaries for [ClearScript](https://github.com/Microsoft/ClearScript) targeted for ReactUnity. It adds V8 engine capability to ReactUnity.


## Installing

**Install via OpenUPM (recommended)**

```
npx openupm-cli add com.reactunity.clearscript
```

**Or add using the package manager with the git URL**

```
https://github.com/ReactUnity/core.git#upm/clearscript
```

The sources live in the [ReactUnity/core](https://github.com/ReactUnity/core) monorepo under `unity/clearscript`, but every release is published to the `upm/clearscript` branch with the package at its root, so this fetches only this package. Pin a version with its tag instead:

```
https://github.com/ReactUnity/core.git#upm/clearscript/v0.23.0
```

The standalone `ReactUnity/clearscript` repository is frozen at 0.21.1 — update the URL if your project still points there.
