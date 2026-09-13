---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### `perspective`, `perspective-origin` and `backface-visibility`

3D transforms have always composed here — `rotateX` and `rotateY` set a real rotation, and children keep
their own depth the way `transform-style: preserve-3d` describes — but nothing projected them, so a
rotation only ever foreshortened linearly and never converged anywhere.

`perspective` on a parent now does. Its subtree is captured through a camera of its own, the same offscreen
machinery `filter` uses, with an off-axis frustum standing the viewer wherever `perspective-origin` puts
them; the capture grows to hold whatever the projection throws outside the element's box, so a card leaning
out of its stage is not clipped. `backface-visibility: hidden` is separate and needs no perspective: it
watches the element's winding — which catches a mirror as well as a rotation, as CSS does — and takes the
element out of both drawing and hit testing while its back is turned.

There is still no `transform-style`. Its `preserve-3d` is what everything already does, and its default
`flat` would need a shear the transform model has nowhere to put.

A `transform` whose functions run together with no space between them -- `rotateX(35deg)rotateY(-30deg)`,
which is what every CSS minifier emits -- now parses. It was being read as one token naming no function,
so a built stylesheet silently lost the whole declaration while the same rule worked in source.

**`translate-z` has changed sign.** A positive value now comes *towards* the viewer, as CSS says and as
`rotateX`/`rotateY` already did. Nothing could show the difference under an orthographic screen-space
canvas, which is why it went unnoticed; a `perspective` shows it immediately. Code that leaned on the old
direction — most likely ordering elements in a world-space canvas — wants the opposite sign now.
