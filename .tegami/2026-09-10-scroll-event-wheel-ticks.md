---
packages:
  "upm:com.reactunity.core": patch
---

### `onScroll` wheel ticks

`scrollDelta` on the event measures wheel ticks, one per notch, on any input module. A handler tuned against
the input system's six wants a sixth of the multiplier it had.
