---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A white flash from an element that has just gained a filter

The image an element filter composites its capture back through was created enabled and textureless,
and a `RawImage` with no texture samples the white one -- so between the frame a filter was attached
on and the first `LateUpdate` that rendered it, the element drew as a solid white quad at its own
size. Anything that gained a filter mid-frame flashed white for a frame: an animated
`drop-shadow` appearing, a page mounting a filtered subtree. The composite now starts disabled and is
switched on with its first capture.
