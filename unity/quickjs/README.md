# React Unity QuickJS

[![openupm](https://img.shields.io/npm/v/com.reactunity.quickjs?label=openupm&style=for-the-badge&registry_uri=https://package.openupm.com)](https://openupm.com/packages/com.reactunity.quickjs/)

This adds the QuickJS engine to ReactUnity. The C# binding is a fork of [unity-jsb](https://github.com/ialex32x/unity-jsb); the engine underneath it is [quickjs-ng](https://github.com/quickjs-ng/quickjs), which is a different engine from the Bellard-era QuickJS unity-jsb bound rather than a newer version of it.

The reason that matters to you: ng's asynchronous module loader means an `import` of an http URL, and so a dynamic `import()`, resolves without blocking a frame. `EngineCapabilities.ModuleResolution` is how you ask whether the engine in front of you can do that. WebGL is the exception — that backend evaluates through `eval`, has no module scope at all, and keeps the host import hook it always had.

Native binaries for all eleven supported targets are built from source in the monorepo (`native/quickjs`) rather than shipped as prebuilts.


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
