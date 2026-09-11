---
packages:
  "upm:com.reactunity.core": patch
---

### An `onScroll` listener is handed wheel ticks

What a wheel notch is worth in `PointerEventData.scrollDelta` is the input module's business, and
the modules disagree: the legacy one reports one, the input system's UI module six, and either is a
serialized setting a project can change. So the same handler moved six times as far in a project on
the input system as on the legacy manager, and nothing in the value said which one it was looking
at.

**`scrollDelta` on the event therefore measures something new**: wheel ticks, one per notch, on any
module. A handler tuned against the input system's six wants a sixth of the multiplier it had. The
event is put back as it arrived before returning, so a scroll box handling it alongside the listener
does not convert it twice.

The kitchen sink's render texture demo is where that had gone furthest wrong. Its wheel handler
pushed the camera `scrollDelta.y * 10` along its own Z, which was brisk at ten units and sixty once
the project moved to the input system — so one notch put the camera through its subject and past it.
Half a unit per tick now.
