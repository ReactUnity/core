---
packages:
  upm:com.reactunity.core:
    type: minor
---

### `backdrop-filter` and `mix-blend-mode` no longer cost a render under URP

URP has no `GrabPass`, so every element that reads the backdrop used to cost a camera render of its
own, about 1.5-2.5 ms each in the editor. On URP 17 (Unity 6) and later the canvas is now drawn by a
pass inside the camera's own render instead, which copies the screen just before each reader, as a
`GrabPass` does. A reader costs about 0.03 ms, and the result is pixel-identical to the render it
replaces. The kitchen-sink Game HUD's page backdrops went from 5.5 ms a frame to 0.5 ms.

- It needs the render graph, so a project in URP's *Compatibility Mode* keeps rendering per reader.
- Readers inside a `filter` still render, because the filter's content is drawn by a camera of its own.
- Other objects on the canvas's layer are drawn after the scene's transparent geometry rather than
  sorted among it.

It lives in the new `ReactUnity.UGUI.URP` assembly, which only compiles where URP 17 is installed.
