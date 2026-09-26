---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Filters and backdrops render less often

Every `filter`, `clip-path`, `mask-image`, `isolation`, `mix-blend-mode` and `backdrop-filter` costs a
camera render, roughly 2 ms each under URP whatever it draws. So a page is as fast as the number of
those it takes per frame. The kitchen-sink Game HUD went from ~52 ms to ~41 ms a frame in the editor:

- **A filtered element that only moves keeps its capture.** Translating or rotating the element, or
  moving its descendants without changing where they sit relative to it, used to re-capture. Now only
  the composite moves.
- **A `backdrop-filter` inside a filter re-renders only when something behind it changed**, as ones on
  the page already did.
- **Backdrop readers with nothing drawn between them share a render.**
- **Scroll views clip once a frame** rather than once per render. UGUI re-culls every graphic under a
  `RectMask2D` on every camera render, which was ~0.5 ms a render on a page with three scroll views.
- **Offscreen cameras skip HDR, MSAA and occlusion culling.**
- **Animating only `translate`, `rotate`, `scale`, `opacity` or layout properties no longer re-applies
  the whole style.** The element is moved, faded and laid out again, and nothing it draws is rebuilt.
