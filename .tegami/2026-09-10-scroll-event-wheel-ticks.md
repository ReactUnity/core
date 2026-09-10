---
packages:
  "upm:com.reactunity.core": patch
---

### An `onScroll` listener is handed wheel ticks

What a wheel notch is worth in `PointerEventData.scrollDelta` is the input module's business, and
the modules disagree: the legacy one reports one, the input system's UI module six, and either is a
serialized setting a project can change. A scroll box has converted that to a tick count since the
wheel work above, but the delta reaching an `onScroll` listener was still whatever arrived -- so the
same handler moves six times as far in a project on the input system as on the legacy manager, and
nothing in the value says which one it is looking at.

`ScrollHandler` converts before it calls, and puts the delta back as it arrived before returning, so
a scroll box handling the same event alongside it does not convert it twice. **`scrollDelta` on the
event therefore measures something new**: wheel ticks, one per notch, on any module. A handler tuned
against the input system's six wants a sixth of the multiplier it had.

The kitchen sink's render texture demo is where that had gone furthest wrong. Its wheel handler
pushed the camera `scrollDelta.y * 10` along its own Z -- written when a notch was one, already brisk
at ten units, and sixty once the project moved to the input system. The camera sits eight units from
its subject, so one notch of the wheel put it at `z = +52`: through the subject, past it, nothing in
frame. Half a unit per tick now, sixteen notches from where the camera starts to where the subject
is.
