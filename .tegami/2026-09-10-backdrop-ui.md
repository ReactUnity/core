---
packages:
  "upm:com.reactunity.core": patch
---

`backdrop-filter` and `mix-blend-mode` see the UI behind them outside the built-in pipeline, at the cost of
one camera render per element that reads a backdrop.
