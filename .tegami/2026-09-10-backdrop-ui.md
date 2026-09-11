---
packages:
  "upm:com.reactunity.core": patch
---

### Backdrops read the UI behind them

`backdrop-filter` and `mix-blend-mode` see it outside the built-in pipeline, at the cost of one camera render
per element that reads a backdrop.
