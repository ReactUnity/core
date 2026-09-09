---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### Scroll snapping and `scroll-behavior: smooth`

**`scroll-snap-type` and `scroll-snap-align` are new**, which is most of what a carousel or a pager
needed writing by hand:

```css
.strip { scroll-snap-type: x mandatory; }
.card { scroll-snap-align: center; }
```

`scroll-snap-type` takes an axis — `x`, `y`, `both`, or the logical `block`/`inline`, which are fixed
to y and x here — and optionally `mandatory` or `proximity`, defaulting to `proximity` as CSS does. A
`proximity` snap only takes the scroll when it settles within half a scrollport of a snap point; a
`mandatory` one always takes it. `scroll-snap-align` puts the snap points on the items, one alignment
per axis with the block one written first, and any descendant of the container can carry one.

The snap is taken once the scroll settles rather than while it is moving, so nothing fights the
gesture — and it is measured from **where the scroll would have come to rest**, not from where the
pointer let go, so a flick lands on the item it was thrown at. The scrollport is measured to the
container's padding edge, so a `start` snap on the first item is the top of the travel rather than an
offset that scrolls the padding away, and an item too far along to be reached snaps to the closest
offset that shows it. A layout change re-snaps a mandatory container without animating it.

**`scroll-behavior` is new**, and `smooth` animates the scrolls the element is *asked* to make:

```css
scroll-behavior: smooth;
```

That means assigning `ScrollTop` or `ScrollLeft`, calling `ScrollTo` or `ScrollBy` without a duration
of its own, and landing a snap. A wheel or a drag is a gesture rather than a request and keeps its
own smoothing either way — the `smoothness` prop, which is also what a snap animates over while
`scroll-behavior` is `auto`. Passing a duration explicitly still overrides both.

Two things came along with it. A scroll aimed at a position now **ends there**: `ScrollTop = 0` in the
middle of a fling used to let the inertia carry it back off, since the velocity the scroll view
coasts on was left running. And a new drag now takes over from wherever a running animation reached,
rather than jumping to where that animation was headed first.

`scroll-snap-stop`, `scroll-padding` and `scroll-margin` are not supported: a snap point is the item's
border box, measured against the container's padding box.
