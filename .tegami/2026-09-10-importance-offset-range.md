---
packages:
  "upm:com.reactunity.core": patch
---

### An `importanceOffset` of 128 or more wrapped out of the cascade

`InsertStyle(css, offset)` and the `StyleSheet` constructor only had room for -128..127 offsets, so
`InsertStyle(css, 1000)` came out negative and silently lost to everything, the useragent sheet
included — which read as the sheet not applying at all. The whole `int` range a caller can pass now
works, in both directions.
