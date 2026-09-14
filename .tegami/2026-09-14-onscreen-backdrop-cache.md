---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A backdrop on the page is kept until something behind it changes

Under a scriptable pipeline, an element reading a backdrop is served by entering the camera again
with everything from that element onwards hidden. A camera entry costs about 1.5 ms whatever it
draws, so a page carrying twenty such elements paid thirty extra milliseconds every frame, moving or
not. The same render inside a filtered subtree is already kept between frames; the page's own pass
was not, because nothing was watching the page.

Something now is. Every graphic under the root canvas is tracked by its world matrix, its rect, its
enabled state and its rebuild callbacks, plus the alpha of every `CanvasGroup` above it; a filter
tells the watch directly when a capture rewrites the pixels its composite draws. Each change is
reduced to a screen rectangle and a paint index, and a reader keeps the surface it holds unless a
change landed both *before* it in paint order and *inside* the screen area it samples -- its own
rect, widened by however far its blur kernel reaches, which for a nine-tap kernel strided in screen
pixels is four times the blur radius and no further. A reader the camera frame does not reach is not
rendered at all, and is taken again on the first frame it returns, so that it does not come back
holding a surface from before the changes it was away for.

Two things cannot be watched this way and are handled by presence instead. Geometry the camera draws
that is not on the canvas -- a 3D scene behind the UI -- is located once per frame by projecting the
renderers' bounds, and any reader standing over it is rendered every frame. A texture whose contents
an outside script rewrites, with nothing moving and nothing rebuilding, is not noticed at all.

Three cheaper-looking answers were measured and dropped. Grouping readers that do not overlap into a
shared render came to twenty renders from twenty at every bleed from 0 to 64 px, because each reader
on the page tried is painted directly over content of its own. Gating the cache on the camera's
culling mask disabled it outright, the mask there covering six layers with live geometry on one.
Watching `Transform.hasChanged` is unusable canvas-wide: `background-clip` already consumes it for
its own text sources, and whichever polls first takes the change.

On the kitchen sink's filter page, seventeen readers on screen, this takes the pass from 20.0
renders a frame to 1.0, and the frame from 56 ms to 18 ms.
