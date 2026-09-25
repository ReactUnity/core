---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Faster CSS property lookups

The style system's name tables compared keys with the invariant culture, which under Mono builds a
sort key on every hash, so looking up a property name cost about 13 µs. They compare ordinally now,
which matches the same ASCII names, and an inline `style` prop applies in about half the time.
