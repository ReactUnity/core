---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A backdrop inside a filter is kept until something behind it moves

An element reading a backdrop from inside a filtered subtree is served by rendering that subtree
again with everything from the reader onwards hidden, once per reader. That render is the entire
cost of the feature -- a camera is a pipeline entry, and an entry costs about the same whatever it
draws -- so a filter containing five such elements entered the pipeline five extra times every frame,
whether or not anything in it had changed.

A backdrop is what was painted *before* the element, so a change after one in paint order cannot
reach it. The subtree's dirty tracking now records how early in paint order the change was rather
than only that there was one, and each reader keeps the surface it already holds unless the change
landed before it. Everything is taken again when the set of readers changes, when a rebuild reports
no position of its own, or when the capture camera moves or resizes -- a surface taken through a
different framing holds a different part of the world at the same uv, and uv is how a backdrop is
read.

Two cheaper-looking answers were measured and dropped. Rendering the backdrops at half resolution,
a quarter of the pixels, moved the pass 17.65 ms to 17.55 ms: the pixels are not what is being paid
for. Grouping readers that do not overlap into a shared render came to the same five renders on the
page it was tried against, because readers there are interleaved with content that genuinely covers
them.

On the kitchen sink's Game HUD this drops the pass from 6.0 renders a frame to 5.0, and from 16.7 ms
to 13.7 ms. Readers on the page itself, outside any filter, are still rendered every frame.
