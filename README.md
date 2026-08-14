# React Unity Jint

[![openupm](https://img.shields.io/npm/v/com.reactunity.jint?label=openupm&style=for-the-badge&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.jint/)

This package contains binaries for [Jint](https://github.com/sebastienros/jint) targeted for ReactUnity.


## Installing

**Install via OpenUPM (recommended)**

```
npx openupm-cli add com.reactunity.jint
```

**Or add using the package manager with the git URL**

```
https://github.com/ReactUnity/core.git#upm/jint
```

The sources live in the [ReactUnity/core](https://github.com/ReactUnity/core) monorepo under `unity/jint`, but every release is published to the `upm/jint` branch with the package at its root, so this fetches only this package. Pin a version with its tag instead:

```
https://github.com/ReactUnity/core.git#upm/jint/v0.23.0
```

The standalone `ReactUnity/jint` repository is frozen at 0.21.0 — update the URL if your project still points there.
