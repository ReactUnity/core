---
packages:
  "upm:com.reactunity.core": minor
---

### `font-family` takes a list, and `@font-face` declares a family's weights

`font-family` was one asset reference, so there was no way to write
`font-family: Inter, "Noto Sans CJK", sans-serif`, and no way to say in CSS that a family has four
weights — `font-weight` went to TextMeshPro's own `fontWeightTable`, which lives in the asset's
inspector. Both work now.

**Several `@font-face` rules may name one family.** Each is a face of it, and `font-weight` and
`font-style` on the element pick between them:

```css
@font-face { font-family: "Inter"; src: resource("Fonts/Inter-Regular"); }
@font-face { font-family: "Inter"; font-weight: 700; src: resource("Fonts/Inter-Bold"); }
@font-face { font-family: "Inter"; font-style: italic; src: resource("Fonts/Inter-Italic"); }
```

The list is matched the way [CSS Fonts 4](https://www.w3.org/TR/css-fonts-4/#font-style-matching)
says: slope first, then weight, with the rule that lets `400` reach for `500` before anything
lighter. A weight with no face of its own takes the nearest declared one. `src` accepts several
comma separated entries and uses the first that loads; `local()` entries are skipped, Unity having
no system font to hand out, and `format()` and `tech()` hints are ignored.

**The resolution happens per element, not per declaration.** The weight that picks a face belongs to
the element rather than to the `font-family` value, so an inherited family gives a bold child the
bold face without the child naming the family again — `:root { font-family: "Inter" }` and
`h1 { font-weight: bold }` is enough.

**A face declared for the weight or slope asked for switches off TextMeshPro's synthetic bold and
skew**, the asset already being that variant. A family declaring a single face is unchanged: the
weight still goes to the asset's own weight table and is faked when that is empty.

**`font-family: A, B, C` is also how CJK and emoji fallback is expressed.** The first font that
loads draws the text and the rest cover the glyphs it has none of, through the font asset's own
fallback table — the only per-glyph fallback TextMeshPro has. Lists are merged rather than replaced,
so an element naming fewer fallbacks never takes another's away, and whatever the asset itself
declares stays behind the chain from CSS. Nothing is marked dirty and the tables are put back when
play mode ends, so none of it reaches the file on disk.

The `font` shorthand takes the list too — everything after the size is the family, commas included —
and both UGUI and UIToolkit apply the chain.

`unicode-range` is still not implemented, and is not the mechanism here: which face covers a
character is decided per glyph by the font itself. A `font-weight` range like `400 700` is read as
its low end, there being no variable axis to drive.
