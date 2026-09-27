---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A page that is not changing costs less every frame

A settled UGUI page still did work every frame in proportion to its size. A scroll view re-culled
every graphic inside it, whether or not anything had moved. Every element and text node got its own
`LateUpdate` or `Update` from Unity, and on a settled page Unity's per-component dispatch cost more
than the callbacks did. Every element also opened a profiler marker, even when its style state had
nothing to do, and a paused or finished animation re-applied the same value each frame.

In the Editor, the kitchen-sink Material page now takes 3.3 ms a frame instead of 5.6 ms; its canvas
update drops from 1.6 ms to 0.6 ms. The Home page takes 1.6 ms instead of 2.6 ms. On the Filter page,
pointer handling across its 81 filters takes 0.65 ms instead of 1.44 ms. Nothing renders differently:
captures of the Material page, scrolled and not, are pixel-identical with and without the change.
