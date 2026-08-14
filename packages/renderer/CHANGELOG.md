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
