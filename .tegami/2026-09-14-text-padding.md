---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Padding on a text or icon element moves the glyphs

The glyphs of a `text` or an `icon` live on a child that stretches over the whole element, and nothing
inset that child -- so `padding` grew the box and the line stayed where it was, hard against the border
box's own edge, with the whole padding showing as space on the far side of it. A padded badge looked
left-aligned for that reason, and a wrapping line broke against the padded width rather than the width
it was measured at. The child is now inset by the element's padding and border, which is the content box
CSS lays text out in.
