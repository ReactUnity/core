---
packages:
  upm:com.reactunity.core:
    type: patch
---

### An unreadable `scale()` no longer collapses the element

`transform: scale(...)` fell back to `0` for an argument it could not read, so one bad value did not
just fail to scale the element -- it scaled it to nothing and the element disappeared. Every other
spelling (`scaleX`, `scaleY`, `scaleZ`, `scale3d`) already fell back to `1`, and `scale()` now agrees
with them: an argument that cannot be read leaves that axis alone.

This was easiest to hit through a custom property, since a variable can hold anything -- which is
also why `var()` inside `transform` was believed not to work and documented as not working. It does,
and always has: the substitution is textual and runs before the function list is read, so a variable
can hold an argument, both arguments and the comma between them, several whole functions, or the
function's name. The documentation said the opposite and has been corrected.
