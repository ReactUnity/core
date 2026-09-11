---
packages:
  "upm:com.reactunity.core": patch
---

`scrollDelta` on an `onScroll` event measures wheel ticks, one per notch, on any input module. A handler
tuned against the input system's six wants a sixth of the multiplier it had.
