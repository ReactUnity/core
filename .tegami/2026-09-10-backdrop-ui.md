---
packages:
  "upm:com.reactunity.core": patch
---

### `backdrop-filter` and `mix-blend-mode` see the UI behind them under a scriptable pipeline

Both read the frame behind an element, and both got it from URP's `_CameraOpaqueTexture` — a single
snapshot taken before any transparent geometry, so no UI was ever in it. A frosted panel over a page
blurred the 3D scene behind the page rather than the page, and `difference` against a coloured tile
had nothing to difference against.

There is no `GrabPass` outside the built-in pipeline, so the backdrop is now rendered rather than
grabbed: the canvas's camera draws the frame again with that element and everything painted after it
left out, which is the image a grab would have produced. Readers are taken in paint order, so one
sitting over another finds the first one's result already in it. On the kitchen sink's filter page
the two pipelines now agree to a mean of 0.07/255.

**It costs one camera render per element that reads a backdrop** — about 3 ms each, measured in the
editor. A handful of such elements is fine; the twenty on that demo page are not. The built-in
pipeline keeps its `GrabPass`, which is a 0.16 ms copy.

An element on a `ScreenSpaceOverlay` canvas still falls back to the opaque texture, because an
overlay canvas is drawn after every camera has finished.
