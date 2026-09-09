---
packages:
  "upm:com.reactunity.core": patch
---

### The backdrop register belongs to the host, not the scene

It was a scene root with a `Destroy` queued from the context's disposal list, and a scene close does
not wait for the end of the frame that queue is drained on — so a register made while a context was
being taken apart outlived the scene it was made in. Nothing forces it out to a root in the first
place: unlike the filter surfaces it carries no canvas, so it now lives under the host and goes away
with it, and it refuses to be created at all once the host is gone.

Only reachable under a scriptable pipeline, where the register exists — the built-in pipeline grabs
and never makes one.
