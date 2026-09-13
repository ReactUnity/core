---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### Logical borders and sizing

The painted border properties have their logical spellings — `border-inline-color`,
`border-start-start-radius` and the rest — so `direction: rtl` turns a coloured edge or a rounded corner
around, and Tailwind's `border-s-*` and `rounded-s-*` do something. `inline-size`, `block-size` and their
`min-`/`max-` forms are aliases for the width and height properties.
