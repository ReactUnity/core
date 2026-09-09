---
packages:
  "upm:com.reactunity.core": patch
---

### A blend inside a capture reads that capture under a scriptable pipeline

Rendering the backdrop rather than grabbing it left the case where the reader is not drawn to the
screen at all. `isolation: isolate`, a `filter` on an ancestor, and stacked `background-blend-mode`
each render the element off screen and composite the result back, and anything blending inside that
render blends with the capture, not with the page. Built-in gets this for nothing — `GrabPass` copies
whatever render target is current, and inside the capture that is already the right thing — so it was
only ever wrong on the pipelines that have no `GrabPass`: an isolated group's two `difference` blobs
overlapped in flat green instead of orange, and every stacked `background-blend-mode` layer blended
against the 3D scene behind the page.

Each capture now renders its own backdrops, from its own camera, immediately before it is taken. Which
capture a reader belongs to is read off the hierarchy — the nearest filter above it, which is the one
whose canvas it is drawn on — so a group's composite finds the group outside it and not itself. On the
kitchen sink's filter page the two pipelines now agree exactly across the background-blend grid and
the isolation demo, and every remaining difference on the page is either an animated filter caught at
a different phase or the blur-sampling residual that was already there.

`background-blend-mode`'s upper layers read the backdrop the same way, and their fallback is
deliberately different from the other two readers': with nothing bound the layer comes through as
though it did not blend. That backdrop is the element's own layers, which the camera's opaque texture
can never hold, so blending against it would be worse than not blending at all.

### The backdrop register no longer outlives its scene

It was created on demand, and a filter rendering during teardown asked for one after the context had
already disposed the previous — which left a `[BackdropSurface]` behind on every play-mode exit.
