---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `audio-delay` and `audio-iteration-count` read what the `audio` shorthand does

The shorthand parses its delay as a duration and its count with `infinite` allowed; the two longhands
read a plain number, so `audio-delay: 250ms` and `audio-iteration-count: infinite` were dropped while the
same values inside `audio: url(...) 250ms infinite` worked. Both now use the converter the shorthand uses,
which is what `animation-delay` and `animation-iteration-count` already did.
