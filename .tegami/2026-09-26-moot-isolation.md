---
packages:
  upm:com.reactunity.core:
    type: patch
---

### An opaque, clipped `isolation: isolate` no longer takes a capture

`isolation: isolate` renders the element off screen so its descendants' `mix-blend-mode` can only
blend within it. When the element has an opaque background, full opacity and `overflow: hidden`, that
group holds exactly what the page would, so the capture is now skipped. It comes back as soon as any
of the three changes, animated opacity included. The kitchen-sink Game HUD's `isolate` on its screen
was a full-screen camera render every frame.

URP's backdrop pass also stops re-walking the canvas every frame when nothing was added, removed or
reordered, which took it from 1.4 ms to 0.4 ms on the Game HUD. The walk found a bug on the way: a
`Mask` added to a graphic after it started reading the backdrop drew its stencil pop too early, so
the masked content disappeared.
