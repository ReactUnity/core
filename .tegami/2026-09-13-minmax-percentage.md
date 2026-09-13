---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `min()`, `max()` and `clamp()` over percentages

A comparison whose arguments are all percentages is a percentage: `max(50%, 60%)` is exactly `60%`
whatever the box turns out to be, and `clamp(20%, 90%, 80%)` is `80%`. Those are answered up front and
handed to Yoga as a percentage, the same way a `calc()` that works out to one is.

A comparison that mixes a percentage with a length still has to know what the percentage is worth before
it can order the two, so it waits until the property is resolved on an element and resolves the percentage
there — which is what `width: min(50%, 300px)` did before and still does, on the properties that have an
answer for it.
