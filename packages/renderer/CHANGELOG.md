## @reactunity/renderer@0.25.0

### Logical borders and sizing

The painted border properties have their logical spellings — `border-inline-color`,
`border-start-start-radius` and the rest — so `direction: rtl` turns a coloured edge or a rounded corner
around, and Tailwind's `border-s-*` and `rounded-s-*` do something. `inline-size`, `block-size` and their
`min-`/`max-` forms are aliases for the width and height properties.

### `scroll-padding`, `scroll-margin` and `scroll-snap-stop`

The three scroll-snap properties that were missing are in: `scroll-padding` insets the box a snap target
lines up against, `scroll-margin` outsets the target itself, and `scroll-snap-stop: always` keeps a fling
from carrying past a target on its way to one further along.

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

### `calc()` keeps a percentage

A `calc()` that works out to a percentage is one now, on every property Yoga can hold a percentage for:
`width: calc(1/2 * 100%)` is `50%`, and so `w-1/2`, `left-1/2`, `-translate-x-1/2` and `basis-1/3` — which
is how a CSS framework spells every fraction it has — lay out instead of dropping. The percentage is
carried through the arithmetic rather than resolved on sight, which is what used to throw the answer away:
the parent it was resolved against had not been laid out yet, so the declaration came out as nothing at
all.

It survives a sub-expression too, parenthesised or a nested `calc()` — `calc(calc(1 / 2 * 100%) * -1)`,
which is what a framework emits for every *negative* fraction utility. A group is worked out before the
calculation around it, and the length or percentage it came out as is an operand again exactly as it
stands, rather than something the arithmetic around it could not read.

On a property Yoga does not hold as a percentage -- `border-left-width`, `scroll-margin-left` -- a
calculated percentage now resolves to the same number the percentage written out gets, rather than
reaching the property as a value of the wrong type.

A calculation mixing a percentage with a length, `calc(100% - 2rem)`, is still dropped. Yoga has one unit
per value and no calc of its own, so there is nothing to hand it.

`infinity` is a number as CSS Values 4 asks — the largest length the implementation supports, not a real
infinity. `border-radius: calc(infinity * 1px)`, which is what a `rounded-full` utility compiles to, used
to come out of the corner reduction as NaN and leave the element painting nothing.

Under `REACT_UNITY_DEVELOPER`, a declaration that resolves to nothing now says so once in the console,
naming the property and the value. A dropped declaration was silent before, which is the part of this that
cost the most to find.

### `overscroll-behavior`

**Scrolling now chains.** A `<scroll>` that has reached its end hands the rest of the gesture to the
nearest scroll box above it, as a page does on the web. Until now the innermost box swallowed every
tick and every drag it was given, so a short list inside a long page was a dead spot: reaching its
end stopped the scroll rather than carrying on with the page behind it.

`overscroll-behavior` is how a box keeps a scroll to itself instead. `contain` stops the handover,
`none` stops it and drops the local overscroll effect with it -- which here is `<scroll>`'s
`elasticity` prop, so `none` on an elastic box takes its bounce away where `contain` leaves it. Both
axes are separate: the shorthand takes one value or two with `x` first, `overscroll-behavior-x` and
`-y` set them individually, and `overscroll-behavior-inline` and `-block` are the same two under
their logical names. The axis a gesture runs along is the one that decides, so a contained `y` does
not trap a sideways scroll.

A gesture stays with whichever box took it, rather than being handed over the moment that one
reaches its own end: dragging a list down to its end and on past it does not then start dragging the
page. That is the latching a browser does, and it is measured from where the drag began, so a slow
one is not mistaken for a stuck one.

Chaining walks the element tree rather than the transform hierarchy, so a `filter` or a
`perspective` in between -- both of which reparent their subtree onto an offscreen canvas -- does
not break it.

### `perspective`, `perspective-origin` and `backface-visibility`

3D transforms have always composed here — `rotateX` and `rotateY` set a real rotation, and children keep
their own depth the way `transform-style: preserve-3d` describes — but nothing projected them, so a
rotation only ever foreshortened linearly and never converged anywhere.

`perspective` on a parent now does. Its subtree is captured through a camera of its own, the same offscreen
machinery `filter` uses, with an off-axis frustum standing the viewer wherever `perspective-origin` puts
them; the capture grows to hold whatever the projection throws outside the element's box, so a card leaning
out of its stage is not clipped. `backface-visibility: hidden` is separate and needs no perspective: it
watches the element's winding — which catches a mirror as well as a rotation, as CSS does — and takes the
element out of both drawing and hit testing while its back is turned.

There is still no `transform-style`. Its `preserve-3d` is what everything already does, and its default
`flat` would need a shear the transform model has nowhere to put.

A `transform` whose functions run together with no space between them -- `rotateX(35deg)rotateY(-30deg)`,
which is what every CSS minifier emits -- now parses. It was being read as one token naming no function,
so a built stylesheet silently lost the whole declaration while the same rule worked in source.

**`translate-z` has changed sign.** A positive value now comes *towards* the viewer, as CSS says and as
`rotateX`/`rotateY` already did. Nothing could show the difference under an orthographic screen-space
canvas, which is why it went unnoticed; a `perspective` shows it immediately. Code that leaned on the old
direction — most likely ordering elements in a world-space canvas — wants the opposite sign now.

### Logical border radii survive the Vite build

The preset names an old CSS target so that Lightning CSS lowers what ReactUnity's CSS subset has no
parser for. `border-start-start-radius` and its three siblings were caught by that too, and their
lowered form is a pair of rules selected by `:-webkit-any(:lang(ae),:lang(ar),...)` naming every
right-to-left language -- pseudo-classes ReactUnity reads as custom states, which never match, so the
radius was dropped and the console carried a warning for each. Lowering is excluded for the logical
properties now, the way it already was for `light-dark()`: both are things the renderer resolves
itself, and against the element's own direction rather than the document's language.

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

## @reactunity/renderer@0.24.0

### Tailwind's Preflight

`@reactunity/renderer/tailwind.css` replaces it with a reset written for what ReactUnity renders, and
`@reactunity/renderer/vite` aliases `@import "tailwindcss"` to that file.

### CSS logical properties

`padding-inline`, `margin-block`, `inset-inline-start` and the rest work, so `direction` turns the inline
axis around for a whole subtree and Tailwind's `px-*`, `ps-*` and `space-x-*` utilities do something.

### The Vite preset

`@reactunity/renderer/vite` configures Vite the way a ReactUnity app needs it, building into the Unity
project it finds and keeping the `.meta` files that carry its GUIDs.

### `@starting-style`, `light-dark()` and more

`@starting-style`, `light-dark()`, `color-scheme`, the `place-*` shorthands, the CSS math functions,
`:nth-child(An+B of S)`, `attr()`, `linear()` and the boolean `(hover)` and `(pointer)` media queries all
work.

### Web and Tailwind CSS spellings

A stylesheet written for a browser or generated by Tailwind is accepted where it used to be dropped: vendor
prefixes, `min()`, `max()` and `clamp()`, `white-space`, `text-shadow`, `overflow-x` and `overflow-y`,
`caret-color`, `::selection`, `scrollbar-color`, `scrollbar-width`, the viewport length units, and the
`prefers-color-scheme` and `prefers-reduced-motion` media features.

### Container queries

They work with size and `style()` conditions, along with `container-type`, `container-name` and the `cq*`
units.

### `scrollbar-gutter`, and `scrollbar-size` is gone

The gutter reserves room along the bar's edge so content is never covered, and `scrollbar-width` is now the
only spelling.

### `filter`

The property renders on UGUI, with `blur`, `drop-shadow` and the rest of the CSS functions plus the
non-standard `grain`, `pixelate`, `posterize`, `scanlines`, `tint` and `chromatic-aberration`. `filter` and
`backdrop-filter` are typed in `Style`. A `style={undefined}` no longer takes the whole app down. Animating
`backdrop-filter` no longer leaks a material per frame, and applying a style that did not change no longer
rebuilds the element.

### Inline styles and `!important`

An element's inline style no longer loses to rules that are entirely `!important`.

### `text-decoration`

The shorthand applies the line and the colour, so `text-decoration: underline dotted red` draws the underline
instead of dropping the whole declaration.

### `position: inset` is removed

Use `absolute`, which Yoga now resolves correctly against a containing block that has padding.

### `timeline-scope`

A timeline name can be lent to an ancestor's whole subtree, so a progress bar beside a scroll view can read
it.

### Complex selectors, `@custom-media` and more

`:is()`, `:where()` and `:not()` take a complex selector anywhere, `:state()` names a custom state, the
`-webkit-` and `-moz-` spellings of the scrollbar and placeholder parts work, and `@custom-media`,
`@container scroll-state()` and `@supports selector()` are new.

### Scroll-driven animations

`animation-timeline: scroll()` and `scroll-timeline-name` drive an animation from a scroll container's
position instead of the clock.

### The generated Typescript models

All six files are regenerated against a current Editor, for the first time since January 2025.

### View timelines and `animation-range`

`animation-timeline: view()` runs an animation over the element's own passage through its scroll view, and
`animation-range` says which part of a timeline it covers.

### `mix-blend-mode`

An element, and everything inside it, blends into what is painted behind — all sixteen CSS blend functions
plus `plus-lighter` — and `isolation: isolate` contains one.

### `background-blend-mode`

Each background image layer blends with what is under it, through the same sixteen functions
`mix-blend-mode` has, instead of tinting the image with the background colour.

### The rest of `clip-path`

The remaining CSS shapes work — `path()`, `shape()`, `rect()` and `xywh()` — along with a geometry box, and
`polygon()` has no vertex cap.

### Scroll snapping

`scroll-snap-type`, `scroll-snap-align` and `scroll-behavior: smooth` are new.

### Soft masks, `clip-path` and `image-rendering`

`mask-image` is real coverage rather than a one-bit stencil, so a gradient mask fades, and `clip-path` and
`image-rendering: pixelated` are new.

## @reactunity/renderer@0.23.1

### Fix gradients rendering too dark in gamma colour space

Every gradient — `linear-gradient`, `radial-gradient`, `conic-gradient` and their repeating forms — had its colours converted to linear space regardless of the project's colour space. A gamma-space project never converts them back, so the whole ramp came out darkened by a 2.2 exponent: CSS `green` painted as `rgb(0,55,0)` rather than `rgb(0,128,0)`, and `linear-gradient(red, blue)` crossed at `rgb(54,0,55)` rather than `rgb(127,0,128)`. Saturated endpoints survived while everything between them sank toward black.

The ramp is stored in a texture flagged linear and its contents have to agree with that flag, so the conversion is right in a linear-space project and stays. It now follows `QualitySettings.activeColorSpace` instead of applying unconditionally. Gamma-space projects again match what a browser paints for the same CSS declaration, to the byte.

Introduced in 0.23.0. Projects on Linear colour space were never affected, and need no changes.

### Fix non-solid border styles rendering as solid until the next style update

`inset`, `outset`, `groove`, `ridge`, `dotted`, `dashed` and `double` borders came out flat solid on an element's first render. Any later style update — a hot reload, a state change, anything that re-ran the style pass — painted them correctly, so in the Editor they appeared to work while a build, where no such update ever arrives, showed solid borders forever.

The style is encoded as UVs into a lookup texture that the border graphic samples. That texture was bound from the `Rounding` setter alone, and the graphic is also created from the layout pass, which never assigns rounding: styles run before layout, so on the first pass Yoga has no border widths yet and no border graphic exists to receive the rounding, and by the time the layout pass creates one the style pass is over. With no texture bound, Unity substitutes a white one and every style samples as solid.

The texture is now resolved on each material rebuild instead of being cached on assignment, so it is correct however the graphic came to exist.

Borders with a `border-radius` still ignore `border-style` and paint solid — a separate, pre-existing limitation of the rounded mesh path.

### Support border-style and outline-style on rounded corners

`border-radius` used to drop `border-style` entirely: the rounded mesh path sampled no style at all, so every style painted as flat solid, and `none` painted a solid border rather than nothing. Browsers render all of them with rounded corners, so a declaration that worked on a square element silently lost its style once a radius was added. `outline-style` was dropped the same way. All seven styles now render along the curve.

`groove`, `ridge`, `inset`, `outset` and `double` are ramps across the border width, and the rounded path already emitted an inner and an outer vertex ring stitched 1:1 into a quad strip. Feeding the style band's inner edge to the inner ring and its outer edge to the outer ring makes the strip interpolate the ramp, using the same bands and the same per-side inversion as the square path.

`dotted` and `dashed` repeat *along* the edge instead, which one continuous ring cannot express. When a side asks for one, the rings are emitted as vertices only and each side is drawn as its own strip, walked out by arc length along the border's centreline so a dash keeps its length through a corner. The dash and dot counts are fitted to a whole number per side, so a side begins and ends with half a gap rather than a clipped dash at the mitre. Sides can mix freely - a dashed top against solid sides keeps a clean mitre, since each corner arc doubles its vertex at 45 degrees and the per-side split lands exactly on that pair.

### Fix React Fast Refresh never repainting a hot-updated component

An edit to a component was fetched, applied and acknowledged by the dev server, and then nothing on screen changed. Both dev servers were affected — webpack and Vite alike — so any hot reload that was not a full page reload silently did nothing.

`render` registered the renderer with the devtools hook *after* committing the tree. React Refresh learns which roots it may refresh from the hook's `onCommitFiberRoot`, and only calls `scheduleRefresh` for roots it has seen mount — so a renderer that registers after its first commit is invisible to it forever. The initial mount was the commit being missed, which meant the app's only root was never a refresh candidate.

`injectIntoDevTools` now runs before the first commit, and once per reconciler rather than on every `render` call — repeated injection was registering the same renderer under a new id each time.
