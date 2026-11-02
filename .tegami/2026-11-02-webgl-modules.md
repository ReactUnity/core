---
packages:
  upm:com.reactunity.quickjs:
    type: patch
---

### ES modules load on WebGL

On WebGL, every `import` failed with an empty `failed to load module graph:` error. The module name
normalizer called an Emscripten `_memcpy` that Unity's WebGL toolchain does not expose to plugin
code. With that fixed, three more things a Vite dev server sends now work:

- A top-level name bound by destructuring, such as Vite's `const { HTMLElement = class {} } = globalThis`,
  is no longer declared a second time as a host global.
- A host global used only inside a template substitution or a destructuring default is now available
  to the module.
- A module can import its own namespace, which Vite 8's React refresh adds to every module. Other
  circular imports are still refused on WebGL.
