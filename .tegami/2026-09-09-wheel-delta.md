---
packages:
  "upm:com.reactunity.core": patch
---

### A wheel tick scrolls about as far as it does in a browser

One notch of the mouse wheel moved a scroll box **36,000 points**, which is why a single flick left
most content behind. Two mistakes multiplied. `scrollSensitivity` was 50 points per unit of delta,
tuned back when a delta was one unit per notch; then a `* 120` was added on top for Unity 2023.2 and
newer, on the grounds that the delta had become 120 times smaller. It had not. What changed is that a
delta stopped meaning anything fixed: the legacy input module reports one per notch, the input
system's UI module reports six, and either can be configured to report something else.

So the delta is now handed to the module that produced it to be converted into a tick count -- the
only thing that knows -- and `sensitivity` is how far one tick scrolls, defaulting to **100 points**,
near enough to what a browser does for one notch. A trackpad's fractional ticks scale with it.

**`sensitivity` therefore measures something new**: points per wheel tick, rather than points per unit
of whatever the input module happened to report. Anything set to compensate for the old distance
should go back to somewhere near the default.

Fixed with it: **every tick of a fast flick counts.** A tick arriving while the one before it was
still animating was measured from how far that animation had got instead of from where it was headed,
so it replaced the scroll in flight rather than adding to it. Three quick notches travelled 100 points
instead of 300 -- the faster the wheel turned, the less it scrolled.

The wheel event is also left as it arrived rather than rewritten in place, so passing one on to a
scroll box further up cannot convert the same delta twice.

### The wheel is followed instead of being given a deadline

Smoothing a wheel scroll was a fixed-length animation, restarted by every event. That is the wrong
shape for a wheel, which has no destination in mind, and it broke in a way that got worse the better
the machine: each restart began a curve in its slowest part, so the ground covered in a frame was
`deltaTime / smoothness` of the way to a target that the next tick moved again. The faster the frames,
the smaller that fraction, and the further behind the view fell. Measured at half-millisecond frames,
thirty ticks asking for 3000 points moved the view **40 points** while the wheel turned, and the rest
arrived in one sweep once it stopped -- which is exactly how it felt.

The wheel now moves a target and the view follows it, with no deadline to restart: a fixed fraction of
the remaining distance is closed per unit of time, so the speed follows the wheel and the frame rate
only decides how finely that is sampled. The same measurement now covers **506 points** while the
wheel turns, on a smooth ramp, and settles the rest without a jump.

`smoothness` keeps its meaning closely enough -- how long the view takes to catch up, 0.12s by
default, now defined as the point where a twentieth of the distance is left. `0` still follows the
wheel exactly.

### An asked-for scroll keeps its duration, and its speed

Scrolls that name a destination -- `ScrollTop`, `ScrollTo`, `ScrollBy`, `scroll-behavior: smooth`, a
snap -- still take exactly the time they are given, because that is what they promise. What changed is
the curve: it was a straight line, so a scroll ran at a constant speed and stopped dead. It is now a
cubic that **starts at the speed of whatever it interrupted** and eases out to a stop, so retargeting
carries the motion on and the end settles instead of halting. A snap still lands exactly on its snap
point at exactly the moment it is due.

One spurious `onValueChanged` per interrupted scroll is gone with it -- it reported a position that
was overwritten in the same frame.
