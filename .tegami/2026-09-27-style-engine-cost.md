---
packages:
  upm:com.reactunity.core:
    type: patch
---

### The style engine does less work per element

Measured against the kitchen-sink's Tailwind build on a 520-element tree:
- Inserting the stylesheet takes 88 ms instead of 112 ms.
- Styling a freshly mounted tree takes 155 ms instead of 197 ms.
- Applying a recomputed style to every element takes 29 ms instead of 46 ms.
- Reading every property off fresh styles takes 24 ms instead of 43 ms.
- A frame with forty cards mid-transition takes 2.2 ms instead of 4.0 ms.

Most of the saving is in how a property is looked up:
- An element's declarations are merged into one table on first read.
- The lookup passes the property's slot around instead of probing for it again.
- A resolved value is not wrapped in a fresh copy of itself on every read.
- `var()` looks up its interned property instead of allocating a new one.
- A keyword, a value with no `var()` in it, and a value with no function in it are recognised without the parsers that used to try each one.
- Rule matching sorts its candidates in place, and selectors and `@media` conditions are split without regular expressions.

A transition or an animation used to throw away every cached value in each child of the element it moved, every frame. A compositor-only frame (`opacity`, `translate`, `rotate`, `scale` or layout) now leaves the children's caches alone unless one of them reads its parent through `inherit`. Writing one of those four properties no longer drops the element's other resolved values either.

Custom property names are case-sensitive, as CSS says. `--Foo` and `--foo` used to share one entry in the property registry.
