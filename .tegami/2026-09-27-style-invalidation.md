---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Interacting with a styled page no longer restyles most of it

A class change, a hover, or an element arriving used to restyle the element and every descendant,
and often its siblings too, whether or not any rule could tell the difference. Now the rules are
matched again first, and an element whose matched declarations did not change keeps its computed
style, along with everything that inherits from it. Arriving and leaving siblings rematch only the
elements that a `:nth-child`, `:last-child`, `+` or `~` rule actually reads. Matching itself goes
through an index of each rule's id, class, and tag, so an element is only tested against the rules
that could apply to it. Across the 410 elements of the kitchen-sink Game HUD, matching takes 7 ms
instead of 68 ms.

A `var()` used to parse its text again on every read, and a `var()` inside a shorthand re-expanded
the whole shorthand on every read. Each converter and shorthand now keeps what it parsed. Transition
and animation timings are also read once per style rather than once per tick. Together these cut the
Game HUD's idle garbage from 326 KB to 21 KB a frame, which is what made its periodic GC stutters.

On that page, taking a hit went from a 246 ms frame to 33 ms, showing a tooltip went from about
100 ms to 40 ms, and the idle median frame went from 17.8 ms to 14.5 ms.
