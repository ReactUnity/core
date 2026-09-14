---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Filters on a page now share one offscreen render

Each filtered element was captured by a camera of its own, and a camera is a whole pipeline entry --
which costs about the same whatever it draws: an empty 4x4 one measures 1.5 ms in the editor against
2.0 ms for a full 1777x820 screen. So a page of filters was paying for the number of times it entered
the pipeline and almost nothing for the pixels, and eleven spinning 62px rings cost eleven entries.

The captures that can share a frame are now packed into one texture, taken in a single render, and
copied back into the targets each of them was already using, so nothing after the capture changes.
Each cell is sized to hold whatever the subtree draws outside the element -- which a camera per
element used to crop away for free -- and only the capture region is copied out of it. Cells are
placed on whole pixels, so a packed capture lands exactly where a solo one did: the kitchen sink's
Game HUD renders the same 307,200 pixels either way, to the byte.

A capture keeps a camera to itself where it needs one: under `perspective`, which wants its own
frustum, on a rotated element, whose camera turns with it, and around a `backdrop-filter` or a
`mix-blend-mode` inside the filtered subtree, which has the subtree rendered again with part of it
hidden. Nesting is captured innermost first, so an element containing a filtered one still draws this
frame's copy of it rather than last frame's.

On that HUD -- 45 filters, of which about 15 re-capture on any given frame -- this takes the frame
from 58.4 ms to 45.1 ms in the editor, with the captures themselves going from 22.4 ms to 8.8 ms.
