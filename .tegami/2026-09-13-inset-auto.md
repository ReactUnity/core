---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `auto` on a position edge

`top`, `right`, `bottom` and `left` take `auto`, which is no position at all and leaves the edge opposite
it in charge. Only the percentage case was told apart from a plain number before, so `auto` was passed on
as the zero its value happens to hold: `inset: auto 0 0 auto` set `top: 0; left: 0`, which beat the two
edges that were meant to place the box and pinned it to the corner it was told to stay out of.
