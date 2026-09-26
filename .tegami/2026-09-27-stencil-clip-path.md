---
packages:
  upm:com.reactunity.core:
    type: minor
  npm:@reactunity/renderer:
    type: minor
---

### `clip-path` can be cut with the stencil, and `shape-rendering` chooses when

A `clip-path` rendered its element off screen and composited it back through the shape: an
antialiased edge, a render target per element, and a camera render whenever anything inside changed.
A plain rectangle -- `inset()`, `rect()` or `xywh()` without `round`, or a bare geometry box -- is now
cut with the stencil instead, as `overflow: hidden` is, since an axis-aligned edge loses nothing.

The new, inherited `shape-rendering` property extends that: `optimizeSpeed` or `crispEdges` cuts rounded
boxes, circles, ellipses and simple polygons with the stencil too, with an aliased edge.
`geometricPrecision` keeps even a rectangle on the antialiased path.

- An element that needs the render anyway (`filter`, `mix-blend-mode`, `mask-image`, `perspective`,
  `isolation: isolate`), or that also has `overflow: hidden`, keeps its clip on the render.
- A stencil clip does not isolate a descendant's `mix-blend-mode`; `isolation: isolate` restores that.
- Hit testing follows the shape either way.
