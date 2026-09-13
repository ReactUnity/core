---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `border-radius` is reduced the way CSS reduces it

A `border-radius` too large for its box is scaled down by one factor over the whole box — the smallest of
(edge length ÷ the two radii sitting on that edge) across the four edges — so an over-large radius shrinks
the shape that was asked for rather than each corner on its own. Taken per corner, `border-radius: 100px
100px 10px 10px` on a 100×100 box kept the small corners at 9.09 where the browser gives 5, and a pill
asked for on an oblong kept the corners its short edge never reached.

A radius is also clamped before the reduction rather than after, so an infinite one cannot come through it
as NaN.
