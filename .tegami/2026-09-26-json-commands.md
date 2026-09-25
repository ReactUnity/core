---
packages:
  upm:com.reactunity.core:
    type: minor
---

### Newtonsoft.Json is no longer a dependency

The renderer's command buffer is now read by a small JSON reader of ReactUnity's own instead of
Newtonsoft's token tree, which parses it about four times as fast. Mounting a list of 1000 styled
elements takes about 45 ms less, and updating it 16% less.

A string prop that looks like a date now arrives as written. Newtonsoft turned it into a `DateTime`,
so a prop like `"2026-09-26T10:00:00.000Z"` reached C# reformatted in the current culture.

`com.unity.nuget.newtonsoft-json` is no longer pulled in by `com.reactunity.core`. A project that
used Newtonsoft without depending on it itself needs to add it to its own manifest.
