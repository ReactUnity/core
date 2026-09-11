---
packages:
  "upm:com.reactunity.core": patch
---

### A wheel tick scrolls about as far as it does in a browser

One notch of the mouse wheel moved a scroll box **36,000 points**, which is why a single flick left
most content behind. The delta is now handed to the input module that produced it to be converted
into a tick count — the only thing that knows, since the legacy input module reports one unit per
notch, the input system's UI module six, and either can be configured to report something else.

**`sensitivity` therefore measures something new**: points per wheel tick, rather than points per
unit of whatever the input module happened to report. It defaults to **100 points**, near enough to
what a browser does for one notch, and a trackpad's fractional ticks scale with it. Anything set to
compensate for the old distance should go back to somewhere near the default.

Fixed with it: **every tick of a fast flick counts.** A tick arriving while the one before it was
still animating replaced the scroll in flight rather than adding to it, so three quick notches
travelled 100 points instead of 300 — the faster the wheel turned, the less it scrolled. The wheel
event is also left as it arrived rather than rewritten in place, so passing one on to a scroll box
further up cannot convert the same delta twice.

### The wheel is followed instead of being given a deadline

Smoothing a wheel scroll was a fixed-length animation, restarted by every event, which is the wrong
shape for a wheel and got worse the faster the machine ran: at half-millisecond frames, thirty ticks
asking for 3000 points moved the view **40 points** while the wheel turned, and the rest arrived in
one sweep once it stopped.

The wheel now moves a target and the view follows it, closing a fixed fraction of the remaining
distance per unit of time — so the speed follows the wheel and the frame rate only decides how
finely that is sampled. The same measurement now covers **506 points** while the wheel turns, on a
smooth ramp, and settles the rest without a jump.

`smoothness` keeps its meaning closely enough: how long the view takes to catch up, 0.12s by
default, now defined as the point where a twentieth of the distance is left. `0` still follows the
wheel exactly.

### An asked-for scroll keeps its duration, and its speed

Scrolls that name a destination — `ScrollTop`, `ScrollTo`, `ScrollBy`, `scroll-behavior: smooth`, a
snap — still take exactly the time they are given. What changed is the curve: it was a straight
line, so a scroll ran at a constant speed and stopped dead. It is now a cubic that **starts at the
speed of whatever it interrupted** and eases out to a stop, so retargeting carries the motion on and
the end settles instead of halting. A snap still lands exactly on its snap point at exactly the
moment it is due.

One spurious `onValueChanged` per interrupted scroll is gone with it.
