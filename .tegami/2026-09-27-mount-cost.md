---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Mounting a subtree costs less, most of all with pooling on

Reading a style property used to probe each declaration block an element matched, one at a time,
and hash the property's name again for every probe, since Mono does not cache a string's hash. The
blocks are now merged into one lookup the first time the element reads a property, and each property
hashes its name once. A first read takes about 515 ns instead of 1100 ns, and applying an element's
layout styles to Yoga dropped from 6–9 ms to about 3 ms across a mount of 150 elements. It also
produces a tenth of the garbage it used to.

An element's background and border graphics are now created under their parent, not at the scene
root and then moved there. Each move made the graphic find its canvas again and rebuild its
material. An element with a `border-radius` and no border no longer gets a `[Border]` graphic that
draws nothing, because the mask already rounds its background.

With `Pooling: All`, a pooled element is usually reused in a different role from the one it had
before. When the new role needed fewer box shadows or no `clip-path` stencil, the extra graphics
used to be destroyed, and they were then built again for the next element that needed them. They
are now parked: disabled and kept for the next time. A shadow or stencil whose values have not
changed also no longer rebuilds its mesh on every restyle. The backdrop pass under URP now skips the
inactive pool when it walks the canvas.

On the kitchen-sink Game HUD, switching between the side panel's tabs takes a 53–61 ms frame in the
editor, down from 71–93 ms. Each switch mounts 100 to 150 elements.
