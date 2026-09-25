---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Unmounting a long list is no longer quadratic

Removing an element re-resolved the styles of every sibling it left behind, on the spot, on top of
the deferred resolve its removal already scheduled. Clearing a list of 1000 elements took 5.8 s;
it now takes 100 ms. Styles still update on the parent's next update, the same way they already
did when a child was added.
