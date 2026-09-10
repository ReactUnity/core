---
packages:
  "upm:com.reactunity.core": patch
---

### A sprite sheet animated by `background-position` moves again

`background-position` and `background-repeat` reached the UGUI background layer as plain fields.
Only the mesh reads them, and nothing queued a mesh rebuild when they were assigned — so the
graphic kept drawing whatever position it had last been tessellated with. It had always been that
way, and it had always worked, because the layer's size was assigned from the same block and its
setter rebuilt unconditionally. Guarding that setter against a value that had not moved took the
incidental rebuild away with it, and a sprite sheet scrolled by `background-position` froze on its
first frame.

Both are properties now, each dirtying the vertices when the value actually changes. The kitchen
sink's walking cat rebuilds 15 times a second, once per `steps(11)` boundary, rather than 60 or
never.

`border-image` had the mirror image of the same problem. Its four mesh inputs — `slice`, `width`,
`outset`, `repeat` — are plain fields too, but the caller answered that with a blanket
`SetVerticesDirty` after assigning them, so changes landed and *every* element with a border image
re-tessellated its border on every frame its style was applied, moved or not. That is the cost
`filter` notices: a re-tessellation is what makes a filtered ancestor re-capture its whole subtree.
The four are guarded properties now and the blanket dirty is gone; the sample's border image goes
from one rebuild a frame to none.

Two supporting changes fall out of that. The resolved texture backs `mainTexture` and its intrinsic
size drives the UVs, and nothing dirtied for it — the per-frame rebuild was what made an
asynchronously resolved border image ever appear — so the resolve now dirties for itself.
`BorderImageSlice`, `YogaValue2` and `BackgroundSize` gained value equality, because a guard that
runs every frame should not fall back to a reflective field walk or box its operands.

Worth knowing which way to check any of this: forcing a frame out of the editor — a screenshot, a
game view resize — re-lays out the canvas and rebuilds the mesh as a side effect, so every capture
shows a fresh sprite frame whether or not the animation is reaching the graphic. The measurement
that tells the truth is `Graphic.RegisterDirtyVerticesCallback`, which counted zero over sixty
frames while the style walked from 54% to 90%.
