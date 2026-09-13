---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `conic-gradient` takes angle stops

A conic gradient's colour stops are angles — `conic-gradient(#22d3ee 0deg, #a5f3fc 223deg)` — and are read
as angles now, in any of `deg`, `rad`, `grad` and `turn`. They were read with the converter the linear and
radial gradients use, so a stop carrying an angle unit took the whole declaration down with it and the
element painted no gradient at all. A percentage stop is a fraction of the turn as before, and `from
<angle>` was never affected.
