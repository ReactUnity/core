---
packages:
  "upm:com.reactunity.core": patch
---

### `backdrop-filter` blurs under URP

The blur was written as a separable one: blur across, blur down, then the colour ops, each pass
reading what the one before it left. Built-in gives it that for free, because `GrabPass { }` re-copies
the current render target before every pass it precedes. URP has no GrabPass, and its
`_CameraOpaqueTexture` is one snapshot taken once a frame — so all three passes read the same
unblurred image, the first two blended their results over each other, and the panel came out sharp
and over-saturated.

URP now does it in a single pass. The same nine weights applied as a 2D outer product are the same
convolution a separable pair performs, so nothing about the result changes: on a backdrop with no UI
in it, the two pipelines are now the same image to within a mean of 0.01/255.

**Distances are measured in screen pixels rather than backdrop texels.** URP's snapshot is
downsampled whenever the render pipeline asset's *Opaque Downsampling* says so, where built-in's grab
is always the full-resolution target — so `blur(5px)`, `pixelate()`, `chromatic-aberration()` and
`scanlines()` all landed at the wrong scale on any project that had left it at its default of 2×.

### `backdrop-filter: scanlines()` lands on rows again

This one was broken under both pipelines. The row index came from dividing by the backdrop's texel
height, guarded with a `max(…, 1e-8)` against a divide by zero — and Unity signals a vertically
flipped grab by *negating* that texel size, so the guard fired on every frame and the row index came
out at around 1e8, which has no precision left to be periodic with. The lines were missing over most
of the screen and irregular over the rest.

### Still not right under URP

An element's backdrop holds only what URP put in that snapshot, which is the opaque scene — the UI
behind the element never reaches it. So a panel over other UI blurs the 3D scene behind all of it
rather than the interface it sits on, and `mix-blend-mode` still has nothing but the scene to blend
against.
