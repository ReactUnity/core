---
packages:
  upm:com.reactunity.core:
    type: patch
---

### The root element restyles when it changes

A class, id, attribute or custom state set on the root element now re-resolves its styles, and a
top-level element arriving or leaving restyles the top-level elements beside it. Marking an element for
restyling walks its siblings through its parent, and the root has none — so the walk returned before
doing anything, leaving `:root.dark` matching whatever it matched at startup and `:first-child` among the
root's own children stale. Startup and stylesheet changes were never affected; they mark the root
directly.
