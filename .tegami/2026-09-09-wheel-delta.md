---
packages:
  "upm:com.reactunity.core": patch
---

### Wheel scrolling

One wheel tick scrolls about as far as it does in a browser, and the view follows the wheel instead of
chasing a deadline. `sensitivity` now measures points per tick, so anything tuned to the old distance should
go back near its default of 100.
