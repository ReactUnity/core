---
packages:
  "upm:com.reactunity.core": patch
---

### A sprite sheet animated by `background-position` moves again

Nothing queued a mesh rebuild when `background-position` or `background-repeat` was assigned, so the
graphic kept drawing whatever position it had last been tessellated with. It had always worked by
accident, because the layer's size was assigned from the same block and rebuilt unconditionally;
guarding that against a value that had not moved took the incidental rebuild away with it, and a
sprite sheet froze on its first frame. Both now dirty the vertices when the value actually changes,
so the kitchen sink's walking cat rebuilds 15 times a second rather than 60 or never.

`border-image` had the mirror image of the same problem: its four mesh inputs — `slice`, `width`,
`outset` and `repeat` — were answered with a blanket rebuild, so every element with a border image
re-tessellated its border on every frame its style was applied. That cost is what makes a filtered
ancestor re-capture its whole subtree. The sample's border image goes from one rebuild a frame to
none.

An asynchronously resolved border image now dirties for itself, the per-frame rebuild having been
what made one appear at all.
