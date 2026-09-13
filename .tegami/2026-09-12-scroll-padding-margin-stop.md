---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### `scroll-padding`, `scroll-margin` and `scroll-snap-stop`

The three scroll-snap properties that were missing are in: `scroll-padding` insets the box a snap target
lines up against, `scroll-margin` outsets the target itself, and `scroll-snap-stop: always` keeps a fling
from carrying past a target on its way to one further along.
