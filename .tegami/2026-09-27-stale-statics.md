---
packages:
  upm:com.reactunity.core:
    type: patch
---

### Entering play mode again no longer throws `MissingReferenceException`

With domain reload off in Enter Play Mode Options, the user-agent stylesheet, polyfills, default
sprites, materials and fonts ReactUnity keeps in static fields survived from one play session to the
next. When one of them was destroyed in between, which a reimport does, the next session read the
destroyed object and threw `MissingReferenceException: The object of type 'UnityEngine.TextAsset' has
been destroyed`. They are now loaded again when that happens.

Warnings that are shown once, such as an unknown pseudo-class, are shown once per play session
rather than once per domain reload.
