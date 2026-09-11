---
packages:
  npm:@reactunity/renderer:
    type: minor
  upm:com.reactunity.core:
    type: minor
---

### The rest of `clip-path`: `path()`, `shape()`, `rect()`, `xywh()` and geometry boxes

`clip-path` shipped with four basic shapes. The remaining ones are in, so every shape CSS has except
`url()` now works:

```css
clip-path: path('M 100 0 A 100 100 0 1 1 100 200 A 100 100 0 1 1 100 0 Z');
clip-path: shape(from 0 50%, curve to 50% 0 with 0 0, curve to 100% 50% with 100% 0, close);
clip-path: rect(20px auto auto 30px round 8px);
clip-path: xywh(10% 20% 60% 60% round 16px);
clip-path: content-box;
clip-path: padding-box circle(30px);
```

**`path()` reads the whole SVG `d` grammar** — `M L H V C S Q T A Z`, each in its relative lowercase
form, with repeated argument lists, implicit linetos after a moveto and packed arc flags — so path
data straight out of a design tool works, minified or not. Several subpaths are allowed, each filled
as though closed, which is what makes a hole under `evenodd`.

**`shape()` draws the same outlines in CSS**, which buys percentages, `calc()` and `var()`, none of
which a path string can carry. The commands map onto SVG's one for one: `curve ... with c` is a
quadratic and `curve ... with c1 / c2` a cubic, `smooth` mirrors the previous control point, `arc`
takes `large`/`small` and `cw`/`ccw`, and `by` is what SVG spells by lowercasing a letter.

**`rect()` and `xywh()`** are the other two ways CSS writes a rectangle. `rect()`'s four values are
where each edge is, from the box's top-left corner, and `auto` is the box's own edge; `xywh()` is a
corner and a size. Both take `round` and the whole `border-radius` grammar, as `inset()` already
did.

**A geometry box is honoured rather than parsed and dropped.** `padding-box`, `content-box` and
`margin-box` measure the shape against the element's box minus its border, minus its border and
padding, or plus its margin. The SVG boxes resolve the way they do on any element with no SVG
geometry: `fill-box` to the content box, `stroke-box` and `view-box` to the border box. A box on its
own is a shape — `clip-path: content-box` clips an element to its content box — which was rejected
outright before.

**The sixteen-point cap on `polygon()` is lifted.** A shape too large for the shader's uniform
budget is rasterized to a coverage mask once and sampled, so the cost of the shape is paid when it
changes rather than every frame. Hit testing never reads that mask — a pointer is tested against the
flattened outline itself, with the same fill rule, so a click agrees with the pixels to the point.
