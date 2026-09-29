## 0.26.0

### `flushSync` works again

`@reactunity/renderer`

`flushSync` from `@reactunity/renderer` threw `TypeError: not a function` on every call. It called
the reconciler's `flushSync`, which react-reconciler 0.33 renamed to `flushSyncFromReconciler`, and
the reconciler's typings still declare the old name, so nothing caught it. It now commits the
updates its callback schedules before it returns, including on roots rendered with
`disableBatchRendering`.

### QuickJS runs JavaScript about a third faster

`com.reactunity.quickjs`

The engine moves to quickjs-ng 0.17.0 plus the fork's interpreter work: inline caches on property
access, cached global variable slots, fused compare-and-branch and faster Map, Set, JSON and string
paths. Octane scores 1.33× the previous build on Windows and Linux. Inside Unity, parsing a large
bundle is 1.4–1.7× faster and general JavaScript 1.2–1.5×. Rendering cost is unchanged, because
building UGUI objects on the C# side dominates it.

Recursion depth on Windows is slightly lower than before. The interpreter's frame on MSVC grew with
this release, so the deepest React tree the Editor can commit at the default
`ScriptRuntime.MaxStackSize` went from 36 levels to 32.

### Unmounting a long list is no longer quadratic

`com.reactunity.core`

Removing an element re-resolved the styles of every sibling it left behind, on the spot, on top of
the deferred resolve its removal already scheduled. Clearing a list of 1000 elements took 5.8 s;
it now takes 100 ms. Styles still update on the parent's next update, the same way they already
did when a child was added.

### `PoolingType.All` pools elements under the default renderer, and a reused one starts clean

`com.reactunity.core`

Under `PoolingType.All`, the batched renderer (the default) never pooled an element. It sends the
pool key of an element without a `pool` prop as `null`, and the command reader turned that into
`""`, which means `pool={false}`. The unbatched renderer pooled them all along, so the two
disagreed. A missing key now reaches the context as `null` and pools under `All` in both. `pool={false}`
still opts an element out. `Basic`, the default, only pools text and pseudo elements and is
unchanged.

A reused element also used to keep every prop its previous owner set that the new one does not,
because a create command carries only the props that are present. Styles were already reset. Props
were not, so a reused element could still be hidden by `active={false}`, still checked or disabled,
still pointing at another element's `href`, camera, prefab target, video, SVG content or icon set,
or still limited by an input's `characterLimit` and `contentType`. Each UGUI element now puts its
props back to what a new one has. An element with a camera, prefab target or video lets go of it
when it is unmounted, not when it is reused.

- A pooled element is dropped from the ref table, so its old ref id no longer resolves to whatever
  element reuses it.
- An element whose `Pool()` refuses it is destroyed. It used to be left in the scene.
- Disposing a context no longer pools anything, so a portal under `All` is destroyed with its
  context. Before, it was pooled and outlived the context.
- A reused scrollbar has its `data-horizontal`/`data-vertical`/`data-direction` again, and an
  input no longer drives a scrollbar that went back to the pool.
- A filtered element lets go of its filter when it is pooled. Its offscreen surface and the
  composite it left in its old parent were kept, so whatever reused that parent showed a stale
  capture. A reused element that no longer had a filter was also moved back under its first
  owner's parent.
- An element whose `backdrop-filter` or `outline` goes away, whether through a style change or
  through reuse, stops drawing it. Both used to stay once set.
- UIToolkit and Editor elements are no longer pooled under `All`. A `VisualElement` is cheap to
  build, and each kind has native fields a reuse would have to reset one by one. Text and pseudo
  elements are pooled as before.

### Filters and backdrops render less often

`com.reactunity.core`

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

### Newtonsoft.Json is no longer a dependency

`com.reactunity.core`

The renderer's command buffer is now read by a small JSON reader of ReactUnity's own instead of
Newtonsoft's token tree, which parses it about four times as fast. Mounting a list of 1000 styled
elements takes about 45 ms less, and updating it 16% less.

A string prop that looks like a date now arrives as written. Newtonsoft turned it into a `DateTime`,
so a prop like `"2026-09-26T10:00:00.000Z"` reached C# reformatted in the current culture.

`com.unity.nuget.newtonsoft-json` is no longer pulled in by `com.reactunity.core`. A project that
used Newtonsoft without depending on it itself needs to add it to its own manifest.

### An opaque, clipped `isolation: isolate` no longer takes a capture

`com.reactunity.core`

`isolation: isolate` renders the element off screen so its descendants' `mix-blend-mode` can only
blend within it. When the element has an opaque background, full opacity and `overflow: hidden`, that
group holds exactly what the page would, so the capture is now skipped. It comes back as soon as any
of the three changes, animated opacity included. The kitchen-sink Game HUD's `isolate` on its screen
was a full-screen camera render every frame.

URP's backdrop pass also stops re-walking the canvas every frame when nothing was added, removed or
reordered, which took it from 1.4 ms to 0.4 ms on the Game HUD. The walk found a bug on the way: a
`Mask` added to a graphic after it started reading the backdrop drew its stencil pop too early, so
the masked content disappeared.

### Pointer events and captures work through nested filters

`com.reactunity.core`

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

### Faster element creation

`com.reactunity.core`

The style system's name tables compared keys with the invariant culture, which under Mono builds a
sort key on every hash, so looking up a property name cost about 13 µs. They compare ordinally now,
which matches the same ASCII names, and an inline `style` prop applies in about half the time.

UGUI elements are also created with their `RectTransform` in place, instead of adding one that
replaces the `Transform` Unity started them with. Together these take about 80 ms off mounting a
list of 1000 elements.

### `backdrop-filter` and `mix-blend-mode` no longer cost a render under URP

`com.reactunity.core`

URP has no `GrabPass`, so every element that reads the backdrop used to cost a camera render of its
own, about 1.5-2.5 ms each in the editor. On URP 17 (Unity 6) and later the canvas is now drawn by a
pass inside the camera's own render instead, which copies the screen just before each reader, as a
`GrabPass` does. A reader costs about 0.03 ms, and the result is pixel-identical to the render it
replaces. The kitchen-sink Game HUD's page backdrops went from 5.5 ms a frame to 0.5 ms.

- It needs the render graph, so a project in URP's *Compatibility Mode* keeps rendering per reader.
- Readers inside a `filter` still render, because the filter's content is drawn by a camera of its own.
- Other objects on the canvas's layer are drawn after the scene's transparent geometry rather than
  sorted among it.

It lives in the new `ReactUnity.UGUI.URP` assembly, which only compiles where URP 17 is installed.

### With `Pooling: All`, a pooled element comes back in the role it had

`com.reactunity.core`

A pool used to hand back whichever element went in last, so a remount usually gave each element
someone else's role. Its background, border, shadow and mask graphics then had to be rebuilt for the
new one. Each spare is now filed under the `className` it had, and an element created with the same
`className` gets that spare first. When no spare matches, the pool falls back to the latest one as
before. This covers the default batched renderer. The `disableBatchRendering` path still gets the
latest spare, because its props arrive as a script object that is only read once the element exists.

`IPoolableComponent.PoolStack` is now a `PoolStack`, not a `Stack<IPoolableComponent>`.
`IPoolableComponent` also gains `PoolHint`: the `className` that files the component in its pool.

An element now parks at most two surplus box shadows and destroys the rest. Before this, every
pooled element kept as many shadows as any role had ever given it, and on the kitchen-sink Game HUD
the count grew from 165 to over 740 across 60 tab switches.

A revived element with no `className` also no longer reports the one it had before it was pooled.

### Animating an element no longer restyles everything inside it

`com.reactunity.core`

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

### Stylesheets parse in half the time

`com.reactunity.core`

The bundled ExCSS parser allocates a third of what it did and does not lex a plain declaration twice
to decide whether it is a nested rule. In the Editor, the 112 KB kitchen-sink Tailwind build parses in
36 ms instead of 72 ms, and inserting it takes 95 ms instead of 149 ms. The parsed sheet is unchanged.

### A `perspective` over one flat plane is captured face-on

`com.reactunity.core`

A `perspective` used to render its subtree through a camera of its own. That is a whole pipeline
entry per element on every frame the subtree moves, and it could never be packed with other captures.
When everything under the element lies in one plane, which is the usual tilted card or receding
floor, the subtree is now captured face-on and packed with the frame's other filters. The composite
draws that capture through the projection, divided per pixel so the texture stays perspective-correct,
and pointer events are mapped back through the same projection.

When the plane is nothing but one inner filter's composite, the outer element takes no capture at all
and warps the inner one's texture. On the kitchen-sink Game HUD, whose horizon grid is a
`mask-image` inside a `perspective`, that removes one render from every frame, cutting the frame from
22.6 ms to 20.4 ms.

A plane nearer the eye than half the `perspective` distance would be magnified more than twice, so
it keeps the camera path. So does anything the flat capture cannot express: a subtree spread over
several planes, or a perspective element that also has its own `mask-image`, `clip-path`, or a filter
that samples neighbouring pixels such as `blur()` or `drop-shadow()`.

### A page that is not changing costs less every frame

`com.reactunity.core`

A settled UGUI page still did work every frame in proportion to its size. A scroll view re-culled
every graphic inside it, whether or not anything had moved. Every element and text node got its own
`LateUpdate` or `Update` from Unity, and on a settled page Unity's per-component dispatch cost more
than the callbacks did. Every element also opened a profiler marker, even when its style state had
nothing to do, and a paused or finished animation re-applied the same value each frame.

In the Editor, the kitchen-sink Material page now takes 3.3 ms a frame instead of 5.6 ms; its canvas
update drops from 1.6 ms to 0.6 ms. The Home page takes 1.6 ms instead of 2.6 ms. On the Filter page,
pointer handling across its 81 filters takes 0.65 ms instead of 1.44 ms. Nothing renders differently:
captures of the Material page, scrolled and not, are pixel-identical with and without the change.

### Mounting a subtree costs less, most of all with pooling on

`com.reactunity.core`

Reading a style property used to probe each declaration block an element matched, one at a time,
and hash the property's name again for every probe, since Mono does not cache a string's hash. The
blocks are now merged into one lookup the first time the element reads a property, and each property
hashes its name once. A first read takes about 515 ns instead of 1100 ns, and applying an element's
layout styles to Yoga dropped from 6–9 ms to about 3 ms across a mount of 150 elements. It also
produces a tenth of the garbage it used to.

An element's background and border graphics are now created under their parent, not at the scene
root and then moved there. Each move made the graphic find its canvas again and rebuild its
material. An element with a `border-radius` and no border no longer gets a `[Border]` graphic that
draws nothing, because the mask already rounds its background.

With `Pooling: All`, a pooled element is usually reused in a different role from the one it had
before. When the new role needed fewer box shadows or no `clip-path` stencil, the extra graphics
used to be destroyed, and they were then built again for the next element that needed them. They
are now parked: disabled and kept for the next time. A shadow or stencil whose values have not
changed also no longer rebuilds its mesh on every restyle. The backdrop pass under URP now skips the
inactive pool when it walks the canvas.

On the kitchen-sink Game HUD, switching between the side panel's tabs takes a 53–61 ms frame in the
editor, down from 71–93 ms. Each switch mounts 100 to 150 elements.

### Entering play mode again no longer throws `MissingReferenceException`

`com.reactunity.core`

With domain reload off in Enter Play Mode Options, the user-agent stylesheet, polyfills, default
sprites, materials and fonts ReactUnity keeps in static fields survived from one play session to the
next. When one of them was destroyed in between, which a reimport does, the next session read the
destroyed object and threw `MissingReferenceException: The object of type 'UnityEngine.TextAsset' has
been destroyed`. They are now loaded again when that happens.

Warnings that are shown once, such as an unknown pseudo-class, are shown once per play session
rather than once per domain reload.

### `clip-path` can be cut with the stencil, and `shape-rendering` chooses when

`@reactunity/renderer`, `com.reactunity.core`

A `clip-path` rendered its element off screen and composited it back through the shape: an
antialiased edge, a render target per element, and a camera render whenever anything inside changed.
A plain rectangle -- `inset()`, `rect()` or `xywh()` without `round`, or a bare geometry box -- is now
cut with the stencil instead, as `overflow: hidden` is, since an axis-aligned edge loses nothing.

The new, inherited `shape-rendering` property extends that: `optimizeSpeed` or `crispEdges` cuts rounded
boxes, circles, ellipses and simple polygons with the stencil too, with an aliased edge.
`geometricPrecision` keeps even a rectangle on the antialiased path.

- An element that needs the render anyway (`filter`, `mix-blend-mode`, `mask-image`, `perspective`,
  `isolation: isolate`), or that also has `overflow: hidden`, keeps its clip on the render.
- A stencil clip does not isolate a descendant's `mix-blend-mode`; `isolation: isolate` restores that.
- Hit testing follows the shape either way.

### The style engine does less work per element

`com.reactunity.core`

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

### Interacting with a styled page no longer restyles most of it

`com.reactunity.core`

A class change, a hover, or an element arriving used to restyle the element and every descendant,
and often its siblings too, whether or not any rule could tell the difference. Now the rules are
matched again first, and an element whose matched declarations did not change keeps its computed
style, along with everything that inherits from it. Arriving and leaving siblings rematch only the
elements that a `:nth-child`, `:last-child`, `+` or `~` rule actually reads. Matching itself goes
through an index of each rule's id, class, and tag, so an element is only tested against the rules
that could apply to it. Across the 410 elements of the kitchen-sink Game HUD, matching takes 7 ms
instead of 68 ms.

A `var()` used to parse its text again on every read, and a `var()` inside a shorthand re-expanded
the whole shorthand on every read. Each converter and shorthand now keeps what it parsed. Transition
and animation timings are also read once per style rather than once per tick. Together these cut the
Game HUD's idle garbage from 326 KB to 21 KB a frame, which is what made its periodic GC stutters.

On that page, taking a hit went from a 246 ms frame to 33 ms, showing a tooltip went from about
100 ms to 40 ms, and the idle median frame went from 17.8 ms to 14.5 ms.

### QuickJS parses and serializes JSON two and a half times as fast

`com.reactunity.quickjs`

The engine moves to the fork's `v0.17.0-gkurt.1`, which adds ports of Bellard's recent correctness
and performance fixes and a round of the fork's own work on JSON, arrays, regular expressions,
strings and number formatting. Inside Unity, a `JSON.stringify` and `JSON.parse` round trip of 5000
commands is 2.5× faster, a mixed workload of objects, strings, Maps, regexps and classes 1.13×, and
the Sucrase JSX transform 1.05×. Engine startup, JS → C# calls and rendering are unchanged, and so is
the stack budget.

## 0.25.0

### Logical borders and sizing

`@reactunity/renderer`, `com.reactunity.core`

The painted border properties have their logical spellings — `border-inline-color`,
`border-start-start-radius` and the rest — so `direction: rtl` turns a coloured edge or a rounded corner
around, and Tailwind's `border-s-*` and `rounded-s-*` do something. `inline-size`, `block-size` and their
`min-`/`max-` forms are aliases for the width and height properties.

### `scroll-padding`, `scroll-margin` and `scroll-snap-stop`

`@reactunity/renderer`, `com.reactunity.core`

The three scroll-snap properties that were missing are in: `scroll-padding` insets the box a snap target
lines up against, `scroll-margin` outsets the target itself, and `scroll-snap-stop: always` keeps a fling
from carrying past a target on its way to one further along.

### `background-clip` inside a filtered subtree

`com.reactunity.core`

`background-clip` is measured against the canvas the element actually renders on, which is the outermost
one over it — the same space UGUI's own `RectMask2D` reads, and the space a background shader is handed its
vertex positions in. An element under an `isolation: isolate` or `filter` ancestor renders on the offscreen
surface that filter parks at the scene root, whose scale has nothing to do with the context's canvas; the
clip was built from the context's either way, so the coverage landed a canvas-scale ratio away from the
glyphs and `background-clip: text` painted nothing on them.

### `background-clip`

`@reactunity/renderer`, `com.reactunity.core`

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

### `border-radius` is reduced the way CSS reduces it

`com.reactunity.core`

A `border-radius` too large for its box is scaled down by one factor over the whole box — the smallest of
(edge length ÷ the two radii sitting on that edge) across the four edges — so an over-large radius shrinks
the shape that was asked for rather than each corner on its own. Taken per corner, `border-radius: 100px
100px 10px 10px` on a 100×100 box kept the small corners at 9.09 where the browser gives 5, and a pill
asked for on an oblong kept the corners its short edge never reached.

A radius is also clamped before the reduction rather than after, so an infinite one cannot come through it
as NaN.

### `calc()` keeps a percentage

`@reactunity/renderer`, `com.reactunity.core`

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

### `conic-gradient` takes angle stops

`com.reactunity.core`

A conic gradient's colour stops are angles — `conic-gradient(#22d3ee 0deg, #a5f3fc 223deg)` — and are read
as angles now, in any of `deg`, `rad`, `grad` and `turn`. They were read with the converter the linear and
radial gradients use, so a stop carrying an angle unit took the whole declaration down with it and the
element painted no gradient at all. A percentage stop is a fraction of the turn as before, and `from
<angle>` was never affected.

### `auto` on a position edge

`com.reactunity.core`

`top`, `right`, `bottom` and `left` take `auto`, which is no position at all and leaves the edge opposite
it in charge. Only the percentage case was told apart from a plain number before, so `auto` was passed on
as the zero its value happens to hold: `inset: auto 0 0 auto` set `top: 0; left: 0`, which beat the two
edges that were meant to place the box and pinned it to the corner it was told to stay out of.

### `min()`, `max()` and `clamp()` over percentages

`com.reactunity.core`

A comparison whose arguments are all percentages is a percentage: `max(50%, 60%)` is exactly `60%`
whatever the box turns out to be, and `clamp(20%, 90%, 80%)` is `80%`. Those are answered up front and
handed to Yoga as a percentage, the same way a `calc()` that works out to one is.

A comparison that mixes a percentage with a length still has to know what the percentage is worth before
it can order the two, so it waits until the property is resolved on an element and resolves the percentage
there — which is what `width: min(50%, 300px)` did before and still does, on the properties that have an
answer for it.

### `overscroll-behavior`

`@reactunity/renderer`, `com.reactunity.core`

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

`@reactunity/renderer`, `com.reactunity.core`

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

### An unreadable `scale()` no longer collapses the element

`com.reactunity.core`

`transform: scale(...)` fell back to `0` for an argument it could not read, so one bad value did not
just fail to scale the element -- it scaled it to nothing and the element disappeared. Every other
spelling (`scaleX`, `scaleY`, `scaleZ`, `scale3d`) already fell back to `1`, and `scale()` now agrees
with them: an argument that cannot be read leaves that axis alone.

This was easiest to hit through a custom property, since a variable can hold anything -- which is
also why `var()` inside `transform` was believed not to work and documented as not working. It does,
and always has: the substitution is textual and runs before the function list is read, so a variable
can hold an argument, both arguments and the comma between them, several whole functions, or the
function's name. The documentation said the opposite and has been corrected.

### `audio-delay` and `audio-iteration-count` read what the `audio` shorthand does

`com.reactunity.core`

The shorthand parses its delay as a duration and its count with `infinite` allowed; the two longhands
read a plain number, so `audio-delay: 250ms` and `audio-iteration-count: infinite` were dropped while the
same values inside `audio: url(...) 250ms infinite` worked. Both now use the converter the shorthand uses,
which is what `animation-delay` and `animation-iteration-count` already did.

### Faster context startup and teardown

`com.reactunity.core`, `com.reactunity.quickjs`

Destroying a context no longer forces two blocking gen2 collections. QuickJS's shutdown ran them so
that the finalizer of any outstanding `ScriptValue` would queue its free first, but clearing the object
cache already disposes every wrapper still alive -- which reaches the referenced ones a collection never
could. That was 67 ms of main thread on a small heap and a good deal more on a grown one, every time a
context went away. A wrapper whose finalizer runs after its context is gone now stays quiet instead of
logging an error from the GC thread.

Starting one is cheaper too. The QuickJS reflect-binding pass reflected over every assembly in the domain
for each engine, although what it finds depends on the domain and not on the runtime; it is collected
once now and re-bound per runtime, which takes engine startup from 159 ms to 15 ms. And Jint reuses the
parse of a large script it has run before, so a second context, a `Restart()` or a re-render pays for the
parse of its bundle once rather than every time.

### `display: inline`

`com.reactunity.core`

Reads as `block`, joining the `inline-block`, `inline-flex` and `flow-root` spellings that already did.
There is no inline formatting context here for an outer display to differ in, and a block is what an
element is by default — so dropping the declaration left the element exactly where the mapping puts it,
minus the ability to override an earlier `display`.

### Filters on a page now share one offscreen render

`com.reactunity.core`

Each filtered element was captured by a camera of its own, and a camera is a whole pipeline entry --
which costs about the same whatever it draws: an empty 4x4 one measures 1.5 ms in the editor against
2.0 ms for a full 1777x820 screen. So a page of filters was paying for the number of times it entered
the pipeline and almost nothing for the pixels, and eleven spinning 62px rings cost eleven entries.

The captures that can share a frame are now packed into one texture, taken in a single render, and
copied back into the targets each of them was already using, so nothing after the capture changes.
Each cell is sized to hold whatever the subtree draws outside the element -- which a camera per
element used to crop away for free -- and only the capture region is copied out of it. Cells are
placed on whole pixels, so a packed capture lands exactly where a solo one did: the kitchen sink's
Game HUD renders the same 307,200 pixels either way, to the byte.

A capture keeps a camera to itself where it needs one: under `perspective`, which wants its own
frustum, on a rotated element, whose camera turns with it, and around a `backdrop-filter` or a
`mix-blend-mode` inside the filtered subtree, which has the subtree rendered again with part of it
hidden. Nesting is captured innermost first, so an element containing a filtered one still draws this
frame's copy of it rather than last frame's.

On that HUD -- 45 filters, of which about 15 re-capture on any given frame -- this takes the frame
from 58.4 ms to 45.1 ms in the editor, with the captures themselves going from 22.4 ms to 8.8 ms.

### A white flash from an element that has just gained a filter

`com.reactunity.core`

The image an element filter composites its capture back through was created enabled and textureless,
and a `RawImage` with no texture samples the white one -- so between the frame a filter was attached
on and the first `LateUpdate` that rendered it, the element drew as a solid white quad at its own
size. Anything that gained a filter mid-frame flashed white for a frame: an animated
`drop-shadow` appearing, a page mounting a filtered subtree. The composite now starts disabled and is
switched on with its first capture.

### `mask-image` no longer re-renders on every filter capture

`com.reactunity.core`

A filter re-captures whenever its subtree moves, and each capture rendered the element's mask again
along with it. The mask is the mask layers drawn into the filter region -- the subtree is not in it
-- so every one of those renders after the first produced the same texture. It is kept now until its
geometry or one of its layers actually changes. That matters out of proportion to what it draws: a
mask render is a whole pipeline entry, which costs about the same whether the target is 12 pixels
across or 1800, so the saving is the entry rather than the pixels.

### `:host` and `:host()`

`com.reactunity.core`

`:host` selects the element ReactUnity renders into — the same element `:root` does, since there are no
shadow trees here for the two to tell apart. `:host(.dark)` matches it only when it also matches the
argument, which weighs what it would on its own. Neither used to parse at all, and an unreadable branch
took its whole selector list down with it: `:root, :host { ... }`, the shape Tailwind opens its theme
block with, lost the `:root` half too.

### A backdrop inside a filter is kept until something behind it moves

`com.reactunity.core`

An element reading a backdrop from inside a filtered subtree is served by rendering that subtree
again with everything from the reader onwards hidden, once per reader. That render is the entire
cost of the feature -- a camera is a pipeline entry, and an entry costs about the same whatever it
draws -- so a filter containing five such elements entered the pipeline five extra times every frame,
whether or not anything in it had changed.

A backdrop is what was painted *before* the element, so a change after one in paint order cannot
reach it. The subtree's dirty tracking now records how early in paint order the change was rather
than only that there was one, and each reader keeps the surface it already holds unless the change
landed before it. Everything is taken again when the set of readers changes, when a rebuild reports
no position of its own, or when the capture camera moves or resizes -- a surface taken through a
different framing holds a different part of the world at the same uv, and uv is how a backdrop is
read.

Two cheaper-looking answers were measured and dropped. Rendering the backdrops at half resolution,
a quarter of the pixels, moved the pass 17.65 ms to 17.55 ms: the pixels are not what is being paid
for. Grouping readers that do not overlap into a shared render came to the same five renders on the
page it was tried against, because readers there are interleaved with content that genuinely covers
them.

On the kitchen sink's Game HUD this drops the pass from 6.0 renders a frame to 5.0, and from 16.7 ms
to 13.7 ms. Readers on the page itself, outside any filter, are still rendered every frame.

### Logical border radii survive the Vite build

`@reactunity/renderer`

The preset names an old CSS target so that Lightning CSS lowers what ReactUnity's CSS subset has no
parser for. `border-start-start-radius` and its three siblings were caught by that too, and their
lowered form is a pair of rules selected by `:-webkit-any(:lang(ae),:lang(ar),...)` naming every
right-to-left language -- pseudo-classes ReactUnity reads as custom states, which never match, so the
radius was dropped and the console carried a warning for each. Lowering is excluded for the logical
properties now, the way it already was for `light-dark()`: both are things the renderer resolves
itself, and against the element's own direction rather than the document's language.

### A backdrop on the page is kept until something behind it changes

`com.reactunity.core`

Under a scriptable pipeline, an element reading a backdrop is served by entering the camera again
with everything from that element onwards hidden. A camera entry costs about 1.5 ms whatever it
draws, so a page carrying twenty such elements paid thirty extra milliseconds every frame, moving or
not. The same render inside a filtered subtree is already kept between frames; the page's own pass
was not, because nothing was watching the page.

Something now is. Every graphic under the root canvas is tracked by its world matrix, its rect, its
enabled state and its rebuild callbacks, plus the alpha of every `CanvasGroup` above it; a filter
tells the watch directly when a capture rewrites the pixels its composite draws. Each change is
reduced to a screen rectangle and a paint index, and a reader keeps the surface it holds unless a
change landed both *before* it in paint order and *inside* the screen area it samples -- its own
rect, widened by however far its blur kernel reaches, which for a nine-tap kernel strided in screen
pixels is four times the blur radius and no further. A reader the camera frame does not reach is not
rendered at all, and is taken again on the first frame it returns, so that it does not come back
holding a surface from before the changes it was away for.

Two things cannot be watched this way and are handled by presence instead. Geometry the camera draws
that is not on the canvas -- a 3D scene behind the UI -- is located once per frame by projecting the
renderers' bounds, and any reader standing over it is rendered every frame. A texture whose contents
an outside script rewrites, with nothing moving and nothing rebuilding, is not noticed at all.

Three cheaper-looking answers were measured and dropped. Grouping readers that do not overlap into a
shared render came to twenty renders from twenty at every bleed from 0 to 64 px, because each reader
on the page tried is painted directly over content of its own. Gating the cache on the camera's
culling mask disabled it outright, the mask there covering six layers with live geometry on one.
Watching `Transform.hasChanged` is unusable canvas-wide: `background-clip` already consumes it for
its own text sources, and whichever polls first takes the change.

On the kitchen sink's filter page, seventeen readers on screen, this takes the pass from 20.0
renders a frame to 1.0, and the frame from 56 ms to 18 ms.

### `outline-width`, `outline-offset` and `text-stroke-width` take units

`com.reactunity.core`

The three longhands read their value as a bare number, so `outline-width: 1px` was dropped while the
`outline: 1px solid red` shorthand — which parses its own length — worked. Each now reads what its
shorthand reads, units, `calc()` and all. Tailwind's `outline` utility compiles to the longhand.

### A serialization warning from the filter raycaster

`com.reactunity.core`

`CustomViewportRaycaster` overrides `GraphicRaycaster.Raycast` and had taken the cached-canvas field
along with the body it was adapted from, so it declared an `m_Canvas` the base already had. Unity does
not serialize a class whose field name a parent uses, and said so by name -- `Base(FilterRaycaster)
m_Canvas` -- against a project that had never written either field. The copy is renamed.

### Relative color syntax

`@reactunity/renderer`, `com.reactunity.core`

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

### The root element restyles when it changes

`com.reactunity.core`

A class, id, attribute or custom state set on the root element now re-resolves its styles, and a
top-level element arriving or leaving restyles the top-level elements beside it. Marking an element for
restyling walks its siblings through its parent, and the root has none — so the walk returned before
doing anything, leaving `:root.dark` matching whatever it matched at startup and `:first-child` among the
root's own children stale. Startup and stylesheet changes were never affected; they mark the root
directly.

### `NullReferenceException` when a page with a blended element goes away

`com.reactunity.core`

Tearing down a context destroys the host first and the element filters after it, and an element with
`mix-blend-mode` unregisters itself from the backdrop surface on the way out. That registry is created
on demand, and by then there is no host left to create it on -- so the property handed back a null and
the filter threw from `OnDestroy`, once per teardown. It asks for the existing surface now instead of
one made to be unregistered from.

### Padding on a text or icon element moves the glyphs

`com.reactunity.core`

The glyphs of a `text` or an `icon` live on a child that stretches over the whole element, and nothing
inset that child -- so `padding` grew the box and the line stayed where it was, hard against the border
box's own edge, with the whole padding showing as space on the far side of it. A padded badge looked
left-aligned for that reason, and a wrapping line broke against the padded width rather than the width
it was measured at. The child is now inset by the element's padding and border, which is the content box
CSS lays text out in.

## 0.24.0

### ClearScript 7.5.1

`com.reactunity.clearscript`

The bundled binaries bring V8 14.7.173.23.

### quickjs-ng

`com.reactunity.core`, `com.reactunity.quickjs`

`com.reactunity.quickjs` binds quickjs-ng in place of unity-jsb's fork of QuickJS. `import` and dynamic
`import()` resolve without blocking a frame, and WebGL runs ES modules for the first time. A runaway script
throws a catchable `RangeError` instead of taking down the player or the Editor. An empty JavaScript string
now marshals to C# as `string.Empty` rather than `null`.

### Tailwind's Preflight

`@reactunity/renderer`

`@reactunity/renderer/tailwind.css` replaces it with a reset written for what ReactUnity renders, and
`@reactunity/renderer/vite` aliases `@import "tailwindcss"` to that file.

### CSS logical properties

`@reactunity/renderer`, `com.reactunity.core`

`padding-inline`, `margin-block`, `inset-inline-start` and the rest work, so `direction` turns the inline
axis around for a whole subtree and Tailwind's `px-*`, `ps-*` and `space-x-*` utilities do something.

### `currentcolor`

`com.reactunity.core`

A colour keyword matches case-insensitively, so the lowercase spelling a framework generates is a colour
again.

### The Vite preset

`@reactunity/renderer`

`@reactunity/renderer/vite` configures Vite the way a ReactUnity app needs it, building into the Unity
project it finds and keeping the `.meta` files that carry its GUIDs.

### Entry document scripts and stylesheets

`com.reactunity.core`, `com.reactunity.jint`, `com.reactunity.quickjs`

Scripts in an entry document are evaluated one at a time in document order, and its `<link rel="stylesheet">`
and `<style>` elements now apply rather than being dropped.

### A collected `<style>`

`com.reactunity.core`

A mounted `<style>` is no longer collected out from under its own updates, which used to leave it applied for
the rest of the session.

### Unitless `line-height`

`com.reactunity.core`

It is a multiple of the font size rather than a length in pixels, and an operand of `calc()` is a plain
number.

### Lab colours, `color-mix()` and `@supports`

`com.reactunity.core`

`oklch()`, `oklab()`, `lch()`, `lab()` and `color-mix()` are accepted wherever a colour is, and `@supports`
blocks are evaluated instead of dropped.

### `@property`

`com.reactunity.core`

A custom property can be registered with an initial value, so a declaration reading an unset variable is no
longer thrown away.

### `@layer`

`com.reactunity.core`

Cascade layers work, so layer order is consulted before specificity, and `revert-layer` with it.

### CSS nesting

`com.reactunity.core`

A style rule can contain other style rules, `@media` and `@supports` nest inside one, `:is()` and `:where()`
work, and an escaped class name such as `.hover\:underline` matches the class it names.

### Code-split bundles

`com.reactunity.core`

A bundle loaded out of `Resources` resolves its chunks, and `Event` is a global, so a chunk that fails to
load reports why.

### `:has()`

`com.reactunity.core`

The full relative selector list works, and styles re-resolve as the tree under an anchor changes.

### `@starting-style`, `light-dark()` and more

`@reactunity/renderer`, `com.reactunity.core`

`@starting-style`, `light-dark()`, `color-scheme`, the `place-*` shorthands, the CSS math functions,
`:nth-child(An+B of S)`, `attr()`, `linear()` and the boolean `(hover)` and `(pointer)` media queries all
work.

### Web and Tailwind CSS spellings

`@reactunity/renderer`, `com.reactunity.core`

A stylesheet written for a browser or generated by Tailwind is accepted where it used to be dropped: vendor
prefixes, `min()`, `max()` and `clamp()`, `white-space`, `text-shadow`, `overflow-x` and `overflow-y`,
`caret-color`, `::selection`, `scrollbar-color`, `scrollbar-width`, the viewport length units, and the
`prefers-color-scheme` and `prefers-reduced-motion` media features.

### Selectors that matched nothing

`com.reactunity.core`

`:only-child`, `:not()` with a list, the full `An+B` grammar, the `-of-type` family and the attribute
operators all match now, and a `::before` no longer counts as a sibling for the positional pseudo-classes.
UIToolkit gains `:focus-within` and `:focus-visible`.

### Container queries

`@reactunity/renderer`, `com.reactunity.core`

They work with size and `style()` conditions, along with `container-type`, `container-name` and the `cq*`
units.

### Percentage sizes, and the Yoga binaries

`com.reactunity.core`

`width: 100%` no longer collapses to zero inside a parent sized by its children. The Yoga binaries move to
current upstream with it, which halves the WebGL archive and ships one `libyoga.so` per Android ABI in place
of the `.aar`.

### `scrollbar-gutter`, and `scrollbar-size` is gone

`@reactunity/renderer`, `com.reactunity.core`

The gutter reserves room along the bar's edge so content is never covered, and `scrollbar-width` is now the
only spelling.

### `display: flex` and `flex-shrink`

`com.reactunity.core`

`display: flex` lays its children out in a row and `flex-shrink` defaults to 1, both as on the web, so an
element that declared `display: flex` and meant a column now needs `flex-direction: column`.

### Structural pseudo-class specificity

`com.reactunity.core`

`:first-child` and its relatives weigh as classes rather than as type selectors, so rules that used to tie
resolve differently.

### `rotate`

`com.reactunity.core`

A positive angle turns clockwise on UGUI, as on the web, and the property takes the web's axis-and-angle
grammar.

### `filter`

`@reactunity/renderer`, `com.reactunity.core`

The property renders on UGUI, with `blur`, `drop-shadow` and the rest of the CSS functions plus the
non-standard `grain`, `pixelate`, `posterize`, `scanlines`, `tint` and `chromatic-aberration`. `filter` and
`backdrop-filter` are typed in `Style`. A `style={undefined}` no longer takes the whole app down. Animating
`backdrop-filter` no longer leaks a material per frame, and applying a style that did not change no longer
rebuilds the element.

### Text backgrounds

`com.reactunity.core`

A `<text>` or `<icon>` with a background, a border or a `border-radius` draws its glyphs over the background
instead of under it. Code that fetched the `TextMeshProUGUI` from the element's GameObject has to look in its
children now.

### Inline styles and `!important`

`@reactunity/renderer`, `com.reactunity.core`

An element's inline style no longer loses to rules that are entirely `!important`.

### `@scope`

`com.reactunity.core`

Both preludes work, donut scope included, and scope proximity joins the cascade between specificity and
source order.

### `text-decoration`

`@reactunity/renderer`, `com.reactunity.core`

The shorthand applies the line and the colour, so `text-decoration: underline dotted red` draws the underline
instead of dropping the whole declaration.

### `position: inset` is removed

`@reactunity/material`, `@reactunity/renderer`, `com.reactunity.core`

Use `absolute`, which Yoga now resolves correctly against a containing block that has padding.

### `timeline-scope`

`@reactunity/renderer`, `com.reactunity.core`

A timeline name can be lent to an ancestor's whole subtree, so a progress bar beside a scroll view can read
it.

### Complex selectors, `@custom-media` and more

`@reactunity/renderer`, `com.reactunity.core`

`:is()`, `:where()` and `:not()` take a complex selector anywhere, `:state()` names a custom state, the
`-webkit-` and `-moz-` spellings of the scrollbar and placeholder parts work, and `@custom-media`,
`@container scroll-state()` and `@supports selector()` are new.

### Scroll-driven animations

`@reactunity/renderer`, `com.reactunity.core`

`animation-timeline: scroll()` and `scroll-timeline-name` drive an animation from a scroll container's
position instead of the clock.

### `position: sticky` and `fixed`

`com.reactunity.core`

Both are implemented for UGUI, and `scroll-state(stuck: ...)` reads a stuck container. Under UIToolkit,
`position: static` is in flow again rather than absolute.

### The generated Typescript models

`@reactunity/renderer`, `com.reactunity.core`

All six files are regenerated against a current Editor, for the first time since January 2025.

### View timelines and `animation-range`

`@reactunity/renderer`, `com.reactunity.core`

`animation-timeline: view()` runs an animation over the element's own passage through its scroll view, and
`animation-range` says which part of a timeline it covers.

### `mix-blend-mode`

`@reactunity/renderer`, `com.reactunity.core`

An element, and everything inside it, blends into what is painted behind — all sixteen CSS blend functions
plus `plus-lighter` — and `isolation: isolate` contains one.

### Dev server restarts

`com.reactunity.core`

A Vite dev server can be restarted under a running app again.

### Minified `filter` values

`com.reactunity.core`

A minified `filter` or `backdrop-filter` value is read as written, where it used to throw and cost the whole
stylesheet.

### Percentage `rgb()` channels

`com.reactunity.core`

A percentage channel is 2.55 of the channel rather than 255, so `rgb(82%, 82%, 82%)` is grey and not white.

### `backdrop-filter` under URP

`com.reactunity.core`

The blur is correct and its distances are measured in screen pixels, and `scanlines()` lands on rows again
under both pipelines.

### `background-blend-mode`

`@reactunity/renderer`, `com.reactunity.core`

Each background image layer blends with what is under it, through the same sixteen functions
`mix-blend-mode` has, instead of tinting the image with the background colour.

### The rest of `clip-path`

`@reactunity/renderer`, `com.reactunity.core`

The remaining CSS shapes work — `path()`, `shape()`, `rect()` and `xywh()` — along with a geometry box, and
`polygon()` has no vertex cap.

### Scroll snapping

`@reactunity/renderer`, `com.reactunity.core`

`scroll-snap-type`, `scroll-snap-align` and `scroll-behavior: smooth` are new.

### Soft masks, `clip-path` and `image-rendering`

`@reactunity/renderer`, `com.reactunity.core`

`mask-image` is real coverage rather than a one-bit stencil, so a gradient mask fades, and `clip-path` and
`image-rendering: pixelated` are new.

### Wheel scrolling

`com.reactunity.core`

One wheel tick scrolls about as far as it does in a browser, and the view follows the wheel instead of
chasing a deadline. `sensitivity` now measures points per tick, so anything tuned to the old distance should
go back near its default of 100.

### Backdrops read the UI behind them

`com.reactunity.core`

`backdrop-filter` and `mix-blend-mode` see it outside the built-in pipeline, at the cost of one camera render
per element that reads a backdrop.

### `border-image` rebuilds

`com.reactunity.core`

An element with a `border-image` no longer re-tessellates its border on every frame its style is applied.

### `font-family` lists

`com.reactunity.core`

A list is how CJK and emoji fallback is expressed, and several `@font-face` rules may name one family so
`font-weight` and `font-style` pick between its faces.

### `importanceOffset`

`com.reactunity.core`

A value of 128 or more no longer wraps out of the cascade.

### The browser previewer

`@reactunity/scripts`

It loads a player built from this release instead of 0.20.0, at a quarter of the download.

### `onScroll` wheel ticks

`com.reactunity.core`

`scrollDelta` on the event measures wheel ticks, one per notch, on any input module. A handler tuned against
the input system's six wants a sixth of the multiplier it had.
