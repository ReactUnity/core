---
packages:
  "upm:com.reactunity.core": minor
---

### `font-family` takes a list, and `@font-face` declares a family's weights

`font-family` was one asset reference — a `url()` or a name standing for exactly one font — so the two things every project needs from it were unreachable. There was no way to write `font-family: Inter, "Noto Sans CJK", sans-serif`, and no way to say in CSS that a family has four weights: `font-weight` went to TextMeshPro's own `fontWeightTable`, which lives in the asset's inspector, so the stylesheet could name the family or the weight but never both.

Both now work, and neither needed parser work — ExCSS was already handing over the `font-weight` and `font-style` descriptors of a `@font-face` rule and they were being dropped on the floor.

**Several `@font-face` rules may name one family.** Each is a face of it, and `font-weight` and `font-style` on the element pick between them:

```css
@font-face { font-family: "Inter"; src: resource("Fonts/Inter-Regular"); }
@font-face { font-family: "Inter"; font-weight: 700; src: resource("Fonts/Inter-Bold"); }
@font-face { font-family: "Inter"; font-style: italic; src: resource("Fonts/Inter-Italic"); }
```

The list is matched the way [CSS Fonts 4](https://www.w3.org/TR/css-fonts-4/#font-style-matching) says: slope first, then weight, with the rule that lets `400` reach for `500` before anything lighter. A weight with no face of its own takes the nearest declared one, so a family with a regular and a bold still answers `font-weight: 500`. `src` accepts several comma separated entries and uses the first that loads; `local()` entries are skipped, because Unity has no system font to hand out, and `format()` and `tech()` hints are ignored.

**The resolution happens per element, not per declaration.** The weight that picks a face belongs to the element rather than to the `font-family` value, so an inherited family gives a bold child the bold face without the child naming the family again — `:root { font-family: "Inter" }` and `h1 { font-weight: bold }` is enough. Resolutions are cached by family list, weight and slope, because the value is read on every style pass and compared by identity; a fresh one each pass would reload the font asset every frame.

**A face that was declared for the weight or slope asked for switches off TextMeshPro's synthetic bold and skew** — the asset already is that variant, and faking it on top produced a doubly bold face. A family declaring a single face is unchanged: the weight still goes to the asset's own weight table and is faked when that is empty.

**`font-family: A, B, C` is also how CJK and emoji fallback is expressed.** The first font that loads draws the text and the rest cover the glyphs it has none of. That tail is wired into the first font's own fallback table, which is the only per-glyph fallback TextMeshPro has — it belongs to the font asset rather than to the element, so a face reached this way is reachable behind that font everywhere. Lists are merged rather than replaced, so an element naming fewer fallbacks never takes another's away, and whatever the asset itself declares stays behind the chain from CSS. Nothing is marked dirty and the tables are put back when play mode ends, so none of it reaches the file on disk.

The `font` shorthand takes the list too — everything after the size is the family, commas included — and both UGUI and UI Toolkit apply the chain.

`unicode-range` is still not implemented, and is not the mechanism here: which face covers a character is decided per glyph by the font itself. A `font-weight` range like `400 700` is read as its low end, since there is no variable axis to drive.
