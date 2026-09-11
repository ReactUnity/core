---
packages:
  "upm:com.reactunity.core": patch
---

### `backdrop-filter` blurs under URP

The blur was written as a separable one — blur across, then blur down — which the built-in pipeline
supports and URP does not, so all the passes read the same unblurred image, blended their results
over each other, and the panel came out sharp and over-saturated. URP now does it in a single pass,
and on a backdrop with no UI in it the two pipelines are the same image to within a mean of
0.01/255.

**Distances are measured in screen pixels rather than backdrop texels.** URP's snapshot is
downsampled whenever the render pipeline asset's *Opaque Downsampling* says so, so `blur(5px)`,
`pixelate()`, `chromatic-aberration()` and `scanlines()` all landed at the wrong scale on any
project that had left it at its default of 2×.

### `backdrop-filter: scanlines()` lands on rows again

Broken under both pipelines. Unity signals a vertically flipped backdrop by negating its texel size,
which tripped the guard against a divide by zero, so the row index came out at around 1e8 and had no
precision left to be periodic with. The lines were missing over most of the screen and irregular
over the rest.
