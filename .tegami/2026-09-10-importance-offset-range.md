---
packages:
  "upm:com.reactunity.core": patch
---

### An `importanceOffset` of 128 or more wrapped out of the cascade

`InsertStyle(css, offset)` and the `StyleSheet` constructor put the offset above every other
cascade term, one step of `1 << 24` each. Specificity was an `int`, so only -128..127 of them fit:
`InsertStyle(css, 1000)` came out negative and silently lost to everything, the user agent sheet at
offset -1 included, which read as the sheet not applying at all.

Specificity is a `long` now, which is enough for the whole `int` range a caller can pass, in both
directions. The step stays at `1 << 24` because it cannot be any smaller — `!important`, the highest
layer rank and a saturated selector fill bits 0-23 exactly.
