---
packages:
  npm:@reactunity/renderer:
    type: patch
---

### Logical border radii survive the Vite build

The preset names an old CSS target so that Lightning CSS lowers what ReactUnity's CSS subset has no
parser for. `border-start-start-radius` and its three siblings were caught by that too, and their
lowered form is a pair of rules selected by `:-webkit-any(:lang(ae),:lang(ar),...)` naming every
right-to-left language -- pseudo-classes ReactUnity reads as custom states, which never match, so the
radius was dropped and the console carried a warning for each. Lowering is excluded for the logical
properties now, the way it already was for `light-dark()`: both are things the renderer resolves
itself, and against the element's own direction rather than the document's language.
