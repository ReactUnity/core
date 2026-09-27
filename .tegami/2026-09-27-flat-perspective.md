---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A `perspective` over one flat plane is captured face-on

A `perspective` used to render its subtree through a camera of its own. That is a whole pipeline
entry per element on every frame the subtree moves, and it could never be packed with other captures.
When everything under the element lies in one plane, which is the usual tilted card or receding
floor, the subtree is now captured face-on and packed with the frame's other filters. The composite
draws that capture through the projection, divided per pixel so the texture stays perspective-correct,
and pointer events are mapped back through the same projection.

When the plane is nothing but one inner filter's composite, the outer element takes no capture at all
and warps the inner one's texture. On the kitchen-sink Game HUD, whose horizon grid is a
`mask-image` inside a `perspective`, that removes one render from every frame, cutting the frame from
22.6 ms to 20.4 ms.

A plane nearer the eye than half the `perspective` distance would be magnified more than twice, so
it keeps the camera path. So does anything the flat capture cannot express: a subtree spread over
several planes, or a perspective element that also has its own `mask-image`, `clip-path`, or a filter
that samples neighbouring pixels such as `blur()` or `drop-shadow()`.
