---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Faster element creation

The style system's name tables compared keys with the invariant culture, which under Mono builds a
sort key on every hash, so looking up a property name cost about 13 µs. They compare ordinally now,
which matches the same ASCII names, and an inline `style` prop applies in about half the time.

UGUI elements are also created with their `RectTransform` in place, instead of adding one that
replaces the `Transform` Unity started them with. Together these take about 80 ms off mounting a
list of 1000 elements.
