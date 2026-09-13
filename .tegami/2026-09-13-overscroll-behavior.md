---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### `overscroll-behavior`

**Scrolling now chains.** A `<scroll>` that has reached its end hands the rest of the gesture to the
nearest scroll box above it, as a page does on the web. Until now the innermost box swallowed every
tick and every drag it was given, so a short list inside a long page was a dead spot: reaching its
end stopped the scroll rather than carrying on with the page behind it.

`overscroll-behavior` is how a box keeps a scroll to itself instead. `contain` stops the handover,
`none` stops it and drops the local overscroll effect with it -- which here is `<scroll>`'s
`elasticity` prop, so `none` on an elastic box takes its bounce away where `contain` leaves it. Both
axes are separate: the shorthand takes one value or two with `x` first, `overscroll-behavior-x` and
`-y` set them individually, and `overscroll-behavior-inline` and `-block` are the same two under
their logical names. The axis a gesture runs along is the one that decides, so a contained `y` does
not trap a sideways scroll.

A gesture stays with whichever box took it, rather than being handed over the moment that one
reaches its own end: dragging a list down to its end and on past it does not then start dragging the
page. That is the latching a browser does, and it is measured from where the drag began, so a slow
one is not mistaken for a stuck one.

Chaining walks the element tree rather than the transform hierarchy, so a `filter` or a
`perspective` in between -- both of which reparent their subtree onto an offscreen canvas -- does
not break it.
