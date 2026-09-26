using UnityEngine;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>CSS <c>cubic-bezier()</c>, solved for x the way browsers do (Newton, then bisection).</summary>
    public readonly struct CubicBezier
    {
        readonly float ax, bx, cx, ay, by, cy;

        public CubicBezier(float x1, float y1, float x2, float y2)
        {
            cx = 3f * x1;
            bx = 3f * (x2 - x1) - cx;
            ax = 1f - cx - bx;
            cy = 3f * y1;
            by = 3f * (y2 - y1) - cy;
            ay = 1f - cy - by;
        }

        float SampleX(float t) => ((ax * t + bx) * t + cx) * t;
        float SampleY(float t) => ((ay * t + by) * t + cy) * t;
        float SlopeX(float t) => (3f * ax * t + 2f * bx) * t + cx;

        public float Evaluate(float x)
        {
            if (x <= 0f) return 0f;
            if (x >= 1f) return 1f;

            float t = x;
            for (int i = 0; i < 8; i++)
            {
                float err = SampleX(t) - x;
                if (Mathf.Abs(err) < 1e-5f) return SampleY(t);
                float d = SlopeX(t);
                if (Mathf.Abs(d) < 1e-6f) break;
                t -= err / d;
            }

            float lo = 0f, hi = 1f;
            t = x;
            for (int i = 0; i < 24; i++)
            {
                float v = SampleX(t);
                if (Mathf.Abs(v - x) < 1e-5f) break;
                if (x > v) lo = t;
                else hi = t;
                t = (lo + hi) * 0.5f;
            }
            return SampleY(t);
        }
    }

    public static class HudEase
    {
        public static readonly CubicBezier Ease = new CubicBezier(0.25f, 0.1f, 0.25f, 1f);
        public static readonly CubicBezier EaseOut = new CubicBezier(0f, 0f, 0.58f, 1f);
        public static readonly CubicBezier EaseInOut = new CubicBezier(0.42f, 0f, 0.58f, 1f);
        public static readonly CubicBezier Colors = new CubicBezier(0.4f, 0f, 0.2f, 1f);
        public static readonly CubicBezier Snappy = new CubicBezier(0.2f, 0.8f, 0.3f, 1f);
        public static readonly CubicBezier Overshoot = new CubicBezier(0.2f, 1.4f, 0.4f, 1f);
        public static readonly CubicBezier Float = new CubicBezier(0.15f, 0.9f, 0.3f, 1f);
        public static readonly CubicBezier Pulse = new CubicBezier(0.35f, 0f, 0.85f, 1f);

        /// <summary>Progress through an <c>alternate</c> infinite animation, 0..1..0.</summary>
        public static float PingPong(float time, float period)
        {
            float p = time / period;
            int cycle = Mathf.FloorToInt(p);
            float f = p - cycle;
            return (cycle & 1) == 0 ? f : 1f - f;
        }

        public static float Loop(float time, float period)
        {
            float p = time / period;
            return p - Mathf.Floor(p);
        }
    }

    /// <summary>A CSS transition on one number: retargeting starts from wherever it currently is.</summary>
    public struct HudTween
    {
        public float From, To, Start, Duration, Delay;
        public CubicBezier Curve;

        public HudTween(float value, float duration, float delay, CubicBezier curve)
        {
            From = To = value;
            Start = -1000f;
            Duration = duration;
            Delay = delay;
            Curve = curve;
        }

        public float Value(float now)
        {
            float t = (now - Start - Delay) / Duration;
            if (t <= 0f) return From;
            if (t >= 1f) return To;
            return From + (To - From) * Curve.Evaluate(t);
        }

        /// <summary>True for one frame past the end as well, so the final value always lands.</summary>
        public bool Running(float now) => now - Start <= Delay + Duration + 0.1f;

        public void Retarget(float target, float now)
        {
            if (target == To) return;
            From = Value(now);
            To = target;
            Start = now;
        }

        public void Snap(float value)
        {
            From = To = value;
            Start = -1000f;
        }
    }

    /// <summary>
    /// The page's floor: a plane hinged at the top of the horizon box and tilted by rotateX, seen
    /// through a CSS perspective whose origin is the top centre of that box. Y grows downwards.
    /// </summary>
    public readonly struct HudFloorPlane
    {
        public readonly float Width, Height, Perspective, Sin, Cos;

        public HudFloorPlane(float width, float height, float perspective, float degrees)
        {
            Width = width;
            Height = height;
            Perspective = perspective;
            Sin = Mathf.Sin(degrees * Mathf.Deg2Rad);
            Cos = Mathf.Cos(degrees * Mathf.Deg2Rad);
        }

        public float Scale(float y) => Perspective / (Perspective - y * Sin);

        public float ScreenX(float x, float y) => Width * 0.5f + (x - Width * 0.5f) * Scale(y);

        public float ScreenY(float y) => y * Cos * Scale(y);

        /// <summary>Plane depth at which the projection reaches the bottom of the horizon box.</summary>
        public float VisibleDepth => Height * Perspective / (Cos * Perspective + Height * Sin);

        /// <summary>The floor's mask-image: 0.15 at the hinge, opaque at 32%, gone at 94%.</summary>
        public float Fade(float y)
        {
            float t = y / Height;
            if (t < 0.32f) return Mathf.Lerp(0.15f, 1f, t / 0.32f);
            return Mathf.Clamp01(1f - (t - 0.32f) / 0.62f);
        }
    }
}
