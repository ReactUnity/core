---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### `background-clip`

`background-clip` takes one value per background layer, and all four of CSS's values now do what they say.
`text` cuts a layer down to the element's own glyphs — a gradient or an image painted through the text,
which with `color: transparent` is the gradient-text effect. The glyphs are rasterised into a coverage
texture by a command buffer and only when they move, so an idle element costs nothing.

The three boxes used to be one box. Every background was masked at the padding edge, so a background never
reached under its own border: a dashed, dotted or semi-transparent border showed the page through its gaps
rather than the element, and a rounded one took the border's inner radius instead of its own. The mask is the border box now, which is both
what `border-box` means and what CSS makes the default; `padding-box` and `content-box` are cut per layer
in the fragment shader, with the radii that box has left, and cost nothing when there is no border or
padding to separate them.

Moving that mask corrected an inset `box-shadow` with it. One is cast by the padding edge, which is where
it is now drawn and rounded — it used to be cast by the border box and then trimmed back to the padding
box by the mask, so on a bordered element it sat a border-width out from where CSS puts it.
