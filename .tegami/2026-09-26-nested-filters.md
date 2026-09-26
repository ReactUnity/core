---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Pointer events and captures work through nested filters

An element with `filter`, `clip-path`, `mask-image`, `isolation`, `mix-blend-mode` or `perspective`
is drawn from an offscreen capture. When one of those sat inside another, several things went
wrong, and a page built from many of them, like the kitchen-sink Game HUD, showed all of them:

- **Clicks stopped reaching the page.** The inner filter's raycaster mapped the pointer straight
  into the outer filter's camera instead of through the outer capture. It also reported that
  offscreen camera as its event camera, which outranks the page camera, so its misplaced hits won
  every click. A pointer now goes through each capture it is nested in, and the outermost filter
  casts for everything inside it.
- **Overlapping filters took each other's clicks.** Two filtered siblings tied, so which one got a
  click came down to the order their raycasters registered in. The one painted on top now wins.
- **Captures flickered.** The object that renders queued captures is created by the first one, so
  on that frame a filter could be queued twice. It was moved into the shared render twice and
  back once, left there, and drew into other elements' captures for a frame at a time.
- **An outer filter could show nothing, or a stale copy, of an inner one.** Captures ran in an
  order that only counted nesting up to the first surface, so an outer clip could be captured
  before the fill inside it. And an inner filter that re-captured never told the outer one to
  do the same. Inner captures now run first, and a finished one marks its outer filter for
  re-capture.
