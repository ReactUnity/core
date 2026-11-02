## @reactunity/scripts@0.27.0

### The Vite preset has a previewer

`reactUnity()` from `@reactunity/renderer/vite` now serves the previewer at `/previewer/` on the dev
server. The previewer is a hosted Unity WebGL player that runs your app in the browser, with no
Editor open, and Vite's hot reload applies edits to it as you save. The dev server prints its address
next to `Local:`. Opening the dev server's root in a browser now redirects there, instead of failing
with `Globals is not defined`.

A WebGL build of your own scene in `public/previewer/` is served in its place. Pass
`previewer: false` to turn the page off.

The previewer build is new in this release, and the `react-unity-scripts` dev server loads it too.

## @reactunity/scripts@0.24.0

### The browser previewer

It loads a player built from this release instead of 0.20.0, at a quarter of the download.

## @reactunity/scripts@0.23.0

### Serve the web previewer without installing it

The dev server's previewer now works out of the box. Visiting the dev server address in a browser opens a Unity WebGL player running your UI, with no extra package to install.

Previously this required the optional `@reactunity/previewer` dependency, which shipped a ~107 MB Unity build in its npm tarball — a cost every install paid for a page many projects never opened. The build is now hosted on `reactunity.github.io` and fetched on first load, then cached by the browser. `@reactunity/previewer` is no longer used and has been dropped from `peerDependencies`; you can remove it from your project.

Because the build is fetched rather than bundled, the first load needs network access. To preview offline — or to preview your own Unity scene — put a previewer build in a `previewer` folder in your project so that `previewer/index.html` exists. The dev server serves that in preference to the built-in previewer, and your project's own `public` folder takes precedence over both.

The dev server also serves `/info.html`, explaining how to point Unity's `DevServer` property at it. That guidance used to be the page shown at `/`.

### Fix the `previewer` folder override being ignored

A custom previewer placed in a `previewer` folder was never actually served. The dev server read `paths.appPreviewer`, but that key was only defined when developing `react-unity-scripts` in its own repository — in a published install the path resolved to `undefined`, so the documented override silently did nothing.
