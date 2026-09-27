---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Animating an element no longer restyles everything inside it

A change to `opacity`, `translate`, `rotate` or `scale` on an element used to re-apply the full
style of every descendant each frame, although a descendant can only see those through `inherit`.
Descendants now compare the values they would inherit and stop there when nothing changed. Across a
520-element Tailwind page, a keyframe animation on the root costs 2.1 ms a frame instead of 27.9 ms,
and a transition on 40 cards 3.4 ms instead of 28.2 ms.

Reading a computed style is cheaper as well. An inherited `color` or `font-size` that fell back to its
default was resolved by walking every ancestor on every read, and each read went through up to four
dictionary lookups. Resolved values are now kept until the style changes, and lookups are indexed by
property. Applying a restyled page takes 36 ms instead of 48 ms, and hovering a card 0.3 ms instead
of 1.5 ms.

A transition that has finished is no longer checked every frame for good. Inserting a large stylesheet
is faster too: the 112 KB kitchen-sink Tailwind build inserts in 145 ms instead of 237 ms, most of it
from ExCSS no longer copying the whole sheet to read each rule's selector.

A point `transform-origin` on an element that has not been laid out yet no longer gives it a NaN position.
