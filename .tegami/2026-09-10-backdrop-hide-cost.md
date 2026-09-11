---
packages:
  "upm:com.reactunity.core": patch
---

### Reading a backdrop no longer rebuilds the whole canvas twice a frame

Under a scriptable pipeline a backdrop is rendered rather than grabbed, and the reader has to be
taken out of the frame for the length of that render. Doing it by collapsing the element's transform
made `RectMask2D` cull the whole page, clear its geometry and rebuild it on the way back, once going
in and once coming out — a cost many times the render it was arranging, and one every page paid,
since one element with a `backdrop-filter` over the page is enough.

The element is hidden with zero alpha instead, which moves no rect, so the canvas re-submits what it
already has. Measured in the editor on the sample at the same pixels, the Scrolling page goes from
33.8 ms to 8.8 ms a frame and the Home page from 14.7 ms to 7.0 ms.

The built-in pipeline is untouched — it grabs, and renders no backdrop at all.
