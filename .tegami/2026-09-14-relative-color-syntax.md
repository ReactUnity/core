---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### Relative color syntax

Every color function takes a `from <color>` origin, which is CSS Color 5's relative color syntax:
`rgb()`, `hsl()`, `hsv()`, `lab()`, `lch()`, `oklab()` and `oklch()`. The origin is converted into the
function's own space and its channels become keywords the channel slots can use, on their own or inside
`calc()` — so `rgb(from var(--brand) r g b / 50%)` is a brand color at half opacity without repeating it,
and `oklch(from currentcolor calc(l * 0.8) c h)` is a hover shade of whatever the element's own color
turns out to be. A keyword may appear in any slot, so `rgb(from red b g r)` is blue.

Each keyword carries the range CSS gives it — `r` is `0`–`255`, `hsl()`'s `s` is `0`–`100`, `oklch()`'s
`l` is `0`–`1`, a hue is degrees, `alpha` is `0`–`1` — so a literal mixes with one exactly as it would in
a browser. An omitted alpha is the origin's own rather than `1`, so `rgb(from <color> r g b)` is that
color unchanged.

The origin stays lazy, so it may be a `var()`, `currentColor`, a `color-mix()` or another relative color,
and one parsed rule resolves against each element it lands on. A literal origin is decomposed while
parsing instead, so the whole function still folds to a constant.

Two things the color functions have always got wrong were in the way, and are fixed:

`hsl()` and `hsv()` read saturation and lightness on CSS's `0`–`100` scale rather than `0`–`1`, so the
`%` may be left off as every framework that emits `hsl(152 37 59)` expects. Written with percentages
they are unchanged; written as bare fractions — `hsl(152, 0.37, 0.59)`, which was the only spelling that
used to work — they now mean what CSS says they mean, which is very nearly black.

Out-of-range components are clamped rather than carried through the conversion, which is what CSS
Color 4 asks of a specified color and what this arithmetic reaches constantly: `rgb(300 0 0)` is red,
`hsl(0 150 50)` is a saturation of `100%`, and `calc(l * 4)` is a lightness of `1` rather than a color
that paints nothing. A saturation past `100%` used to come out of the conversion as a different hue
entirely. Alpha is clamped everywhere, hue wraps, and a channel written as `none` is `0` in `rgb()`,
`hsl()` and `hsv()` as it already was in the Lab family.
