---
packages:
  npm:@reactunity/renderer:
    type: minor
---

### A custom Vite previewer lives in `previewer/`, not `public/previewer/`

The Vite preset now looks for your own previewer in a `previewer` folder next to your Vite config,
instead of in `public/previewer`. Vite copies `public/` into the build, and this preset builds into
the Unity project, so a previewer kept there landed in `Assets/Resources/react` on every
`vite build`. It is now the same folder `react-unity-scripts` reads. Move the folder out of `public/`
if you already set one up.

The `previewer` option also takes a folder path, relative to the Vite root, when the build lives
somewhere else:

```ts
reactUnity({ previewer: '../Builds/Previewer' })
```

The folder is checked on each request, so a build copied in while the dev server runs is picked up
without a restart. If the folder you name has no `index.html`, the dev server warns at startup and
falls back to the hosted previewer. Builds compressed with Gzip or Brotli now load even with
Unity's decompression fallback off, because the dev server sends the `Content-Encoding` header they
need.
