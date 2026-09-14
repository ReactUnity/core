---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `mask-image` no longer re-renders on every filter capture

A filter re-captures whenever its subtree moves, and each capture rendered the element's mask again
along with it. The mask is the mask layers drawn into the filter region -- the subtree is not in it
-- so every one of those renders after the first produced the same texture. It is kept now until its
geometry or one of its layers actually changes. That matters out of proportion to what it draws: a
mask render is a whole pipeline entry, which costs about the same whether the target is 12 pixels
across or 1800, so the saving is the entry rather than the pixels.
