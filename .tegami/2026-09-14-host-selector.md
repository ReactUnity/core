---
packages:
  upm:com.reactunity.core:
    type: minor
---

### `:host` and `:host()`

`:host` selects the element ReactUnity renders into — the same element `:root` does, since there are no
shadow trees here for the two to tell apart. `:host(.dark)` matches it only when it also matches the
argument, which weighs what it would on its own. Neither used to parse at all, and an unreadable branch
took its whole selector list down with it: `:root, :host { ... }`, the shape Tailwind opens its theme
block with, lost the `:root` half too.
