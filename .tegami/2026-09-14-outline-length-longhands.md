---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `outline-width`, `outline-offset` and `text-stroke-width` take units

The three longhands read their value as a bare number, so `outline-width: 1px` was dropped while the
`outline: 1px solid red` shorthand — which parses its own length — worked. Each now reads what its
shorthand reads, units, `calc()` and all. Tailwind's `outline` utility compiles to the longhand.
