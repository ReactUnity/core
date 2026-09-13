---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### `background-clip: text`

`background-clip` takes one value per background layer, and `text` cuts that layer down to the element's
own glyphs — a gradient or an image painted through the text, which with `color: transparent` is the
gradient-text effect. The glyphs are rasterised into a coverage texture by a command buffer and only when
they move, so an idle element costs nothing. `border-box`, `padding-box` and `content-box` parse and
round-trip, but all three still paint the area the background already covers, which stops at the padding
edge.
