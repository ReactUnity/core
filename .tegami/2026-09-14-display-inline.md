---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `display: inline`

Reads as `block`, joining the `inline-block`, `inline-flex` and `flow-root` spellings that already did.
There is no inline formatting context here for an outer display to differ in, and a block is what an
element is by default — so dropping the declaration left the element exactly where the mapping puts it,
minus the ability to override an earlier `display`.
