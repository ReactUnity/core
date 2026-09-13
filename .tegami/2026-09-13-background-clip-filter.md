---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `background-clip` inside a filtered subtree

`background-clip` is measured against the canvas the element actually renders on, which is the outermost
one over it — the same space UGUI's own `RectMask2D` reads, and the space a background shader is handed its
vertex positions in. An element under an `isolation: isolate` or `filter` ancestor renders on the offscreen
surface that filter parks at the scene root, whose scale has nothing to do with the context's canvas; the
clip was built from the context's either way, so the coverage landed a canvas-scale ratio away from the
glyphs and `background-clip: text` painted nothing on them.
