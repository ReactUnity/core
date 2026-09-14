---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `NullReferenceException` when a page with a blended element goes away

Tearing down a context destroys the host first and the element filters after it, and an element with
`mix-blend-mode` unregisters itself from the backdrop surface on the way out. That registry is created
on demand, and by then there is no host left to create it on -- so the property handed back a null and
the filter threw from `OnDestroy`, once per teardown. It asks for the existing surface now instead of
one made to be unregistered from.
