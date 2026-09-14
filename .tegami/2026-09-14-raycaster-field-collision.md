---
packages:
  upm:com.reactunity.core:
    type: patch
---

### A serialization warning from the filter raycaster

`CustomViewportRaycaster` overrides `GraphicRaycaster.Raycast` and had taken the cached-canvas field
along with the body it was adapted from, so it declared an `m_Canvas` the base already had. Unity does
not serialize a class whose field name a parent uses, and said so by name -- `Base(FilterRaycaster)
m_Canvas` -- against a project that had never written either field. The copy is renamed.
