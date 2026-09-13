---
packages:
  npm:@reactunity/renderer:
    type: patch
  upm:com.reactunity.core:
    type: patch
---

### `calc()` keeps a percentage

A `calc()` that works out to a percentage is one now, on every property Yoga can hold a percentage for:
`width: calc(1/2 * 100%)` is `50%`, and so `w-1/2`, `left-1/2`, `-translate-x-1/2` and `basis-1/3` — which
is how a CSS framework spells every fraction it has — lay out instead of dropping. The percentage is
carried through the arithmetic rather than resolved on sight, which is what used to throw the answer away:
the parent it was resolved against had not been laid out yet, so the declaration came out as nothing at
all.

A calculation mixing a percentage with a length, `calc(100% - 2rem)`, is still dropped. Yoga has one unit
per value and no calc of its own, so there is nothing to hand it.

`infinity` is a number as CSS Values 4 asks — the largest length the implementation supports, not a real
infinity. `border-radius: calc(infinity * 1px)`, which is what a `rounded-full` utility compiles to, used
to come out of the corner reduction as NaN and leave the element painting nothing.

Under `REACT_UNITY_DEVELOPER`, a declaration that resolves to nothing now says so once in the console,
naming the property and the value. A dropped declaration was silent before, which is the part of this that
cost the most to find.
