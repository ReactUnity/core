---
packages:
  npm:@reactunity/renderer:
    type: minor
  npm:@reactunity/scripts:
    type: patch
---

### The Vite preset has a previewer

`reactUnity()` from `@reactunity/renderer/vite` now serves the previewer at `/previewer/` on the dev
server. The previewer is a hosted Unity WebGL player that runs your app in the browser, with no
Editor open, and Vite's hot reload applies edits to it as you save. The dev server prints its address
next to `Local:`. Opening the dev server's root in a browser now redirects there, instead of failing
with `Globals is not defined`.

A WebGL build of your own scene in `public/previewer/` is served in its place. Pass
`previewer: false` to turn the page off.

The previewer build is new in this release, and the `react-unity-scripts` dev server loads it too.
