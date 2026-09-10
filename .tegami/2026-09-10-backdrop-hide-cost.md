---
packages:
  "upm:com.reactunity.core": patch
---

### Reading a backdrop no longer rebuilds the whole canvas twice a frame

Under a scriptable pipeline a backdrop is rendered rather than grabbed, and the render needs the
reader and everything painted after it taken out of the frame for the length of it. That was done
with a degenerate transform, which holds where the `CanvasRenderer.cull` flag does not — but it
collapses every rect underneath it, so `RectMask2D` culled the whole page, cleared the geometry and
rebuilt it on the way back, once going in and once coming out. The rebuild cost many times the
render it was arranging, and every page pays it, because one element with a `backdrop-filter` over
the page is enough.

Zero alpha on the CanvasRenderers instead. It moves no rect, so nothing is re-clipped and nothing is
re-tessellated; the canvas re-submits what it already has. Measured in the editor on the sample, at
the same pixels:

| page | before | after |
| --- | --- | --- |
| Scrolling | 33.8 ms | 8.8 ms |
| Home | 14.7 ms | 7.0 ms |
| Filter (22 readers) | 82 ms | 53 ms |

The built-in pipeline is untouched — it grabs, and renders no backdrop at all.
