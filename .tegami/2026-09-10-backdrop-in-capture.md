---
packages:
  "upm:com.reactunity.core": patch
---

### A blend inside a capture reads that capture under a scriptable pipeline

`isolation: isolate`, a `filter` on an ancestor, and stacked `background-blend-mode` each render an
element off screen and composite the result back, and anything blending inside that render has to
blend with the capture rather than with the page. The built-in pipeline gets this for nothing, so it
was only ever wrong where there is no `GrabPass`: an isolated group's two `difference` blobs
overlapped in flat green instead of orange, and every stacked `background-blend-mode` layer blended
against the 3D scene behind the page.

Each capture now renders its own backdrops immediately before it is taken. On the kitchen sink's
filter page the two pipelines agree exactly across the background-blend grid and the isolation demo.

`background-blend-mode`'s upper layers read the backdrop the same way, and their fallback is
deliberately different from the other two readers': with nothing bound the layer comes through as
though it did not blend, since that backdrop is the element's own layers and blending against the
scene instead would be worse than not blending at all.
