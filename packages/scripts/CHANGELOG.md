## @reactunity/scripts@0.23.0

### Serve the web previewer without installing it

The dev server's previewer now works out of the box. Visiting the dev server address in a browser opens a Unity WebGL player running your UI, with no extra package to install.

Previously this required the optional `@reactunity/previewer` dependency, which shipped a ~107 MB Unity build in its npm tarball — a cost every install paid for a page many projects never opened. The build is now hosted on `reactunity.github.io` and fetched on first load, then cached by the browser. `@reactunity/previewer` is no longer used and has been dropped from `peerDependencies`; you can remove it from your project.

Because the build is fetched rather than bundled, the first load needs network access. To preview offline — or to preview your own Unity scene — put a previewer build in a `previewer` folder in your project so that `previewer/index.html` exists. The dev server serves that in preference to the built-in previewer, and your project's own `public` folder takes precedence over both.

The dev server also serves `/info.html`, explaining how to point Unity's `DevServer` property at it. That guidance used to be the page shown at `/`.

### Fix the `previewer` folder override being ignored

A custom previewer placed in a `previewer` folder was never actually served. The dev server read `paths.appPreviewer`, but that key was only defined when developing `react-unity-scripts` in its own repository — in a published install the path resolved to `undefined`, so the documented override silently did nothing.
