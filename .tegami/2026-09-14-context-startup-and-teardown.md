---
packages:
  upm:com.reactunity.core:
    type: patch
  upm:com.reactunity.quickjs:
    type: patch
---

### Faster context startup and teardown

Destroying a context no longer forces two blocking gen2 collections. QuickJS's shutdown ran them so
that the finalizer of any outstanding `ScriptValue` would queue its free first, but clearing the object
cache already disposes every wrapper still alive -- which reaches the referenced ones a collection never
could. That was 67 ms of main thread on a small heap and a good deal more on a grown one, every time a
context went away. A wrapper whose finalizer runs after its context is gone now stays quiet instead of
logging an error from the GC thread.

Starting one is cheaper too. The QuickJS reflect-binding pass reflected over every assembly in the domain
for each engine, although what it finds depends on the domain and not on the runtime; it is collected
once now and re-bound per runtime, which takes engine startup from 159 ms to 15 ms. And Jint reuses the
parse of a large script it has run before, so a second context, a `Restart()` or a re-render pays for the
parse of its bundle once rather than every time.
