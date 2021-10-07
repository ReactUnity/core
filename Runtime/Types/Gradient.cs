using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Animations;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    internal class GradientRampProperties
    {
        public Texture2D Texture;
        public float Offset;
        public float Length;
        public float Distance;
    }

    public enum GradientType
    {
        None = 0,
        Linear = 1,
        Radial = 2,
        Conic = 3,
    }

    public enum RadialGradientSizeHint
    {
        FarthestCorner = 0,
        FarthestSide = 1,
        ClosestCorner = 2,
        ClosestSide = 3,
        Custom = 4,
    }

    public enum RadialGradientShape
    {
        Ellipse = 0,
        Circle = 1,
    }

    public abstract class BaseGradient
    {
        public class ColorKey
        {
            public Color? Color;
            public YogaValue Offset;
        }

        public virtual GradientType Type { get; }
        public List<ColorKey> Keys { get; }
        public bool Repeating { get; }
        public bool Valid { get; private set; }
        public virtual bool SizeUpdatesGraphic => true;

        private Dictionary<Vector2, GradientRampProperties> Ramps = new Dictionary<Vector2, GradientRampProperties>();


        public BaseGradient(List<ColorKey> keys, bool repeating)
        {
            Keys = keys;
            Repeating = repeating;
            Valid = ProcessKeys();
        }

        private bool ProcessKeys()
        {
            if (Keys == null) return false;

            var lc = Keys.Count - 1;

            var first = Keys[0];
            var last = Keys[Keys.Count - 1];

            if (first.Offset.Unit == YogaUnit.Undefined || first.Offset.Unit == YogaUnit.Auto)
                first.Offset = YogaValue.Percent(0);

            if (Keys.Count > 1 && (last.Offset.Unit == YogaUnit.Undefined || last.Offset.Unit == YogaUnit.Auto))
                last.Offset = YogaValue.Percent(100);

            for (int i = 0; i < Keys.Count; i++)
            {
                var key = Keys[i];

                var unit = key.Offset.Unit;
                var noUnit = unit == YogaUnit.Auto || unit == YogaUnit.Undefined;
                if (!key.Color.HasValue && noUnit) return false;

                if (!key.Color.HasValue)
                {
                    if (i == 0 || i == lc) return false;

                    var pk = Keys[i - 1];
                    var nk = Keys[i + 1];

                    if (!pk.Color.HasValue || !nk.Color.HasValue) return false;

                    key.Color = Interpolater.Interpolate(pk.Color.Value, nk.Color.Value, 0.5f);
                }
            }

            Ramps = new Dictionary<Vector2, GradientRampProperties>();

            return true;
        }

        internal GradientRampProperties GetRamp(Vector2 dimensions, int resolution = 1024)
        {
            if (Keys == null || Keys.Count == 0) return null;
            if (Ramps.TryGetValue(dimensions, out var rmp)) return rmp;

            var distance = CalculateLength(dimensions);

            var first = Keys[0];
            float offset = StylingUtils.GetRatioValue(first.Offset, distance, 0);
            float length = 1f;

            if (Repeating) length = 0;
            else offset = Mathf.Min(0, offset);

            for (int i = 1; i < Keys.Count; i++)
            {
                var key = Keys[i];

                var off = StylingUtils.GetRatioValue(key.Offset, distance, float.NaN);

                if (!float.IsNaN(off) && off > length)
                {
                    length = off;
                }
            }

            length = length - offset;

            var tx = new Texture2D(resolution, 1, TextureFormat.RGBA32, false, true);
            tx.wrapMode = Repeating ? TextureWrapMode.Repeat : TextureWrapMode.Clamp;
            var resRp = 1f / (resolution - 1);

            var lastPixel = Color.clear;
            for (int i = 0; i < resolution; i++)
            {
                var t = i * resRp;
                var rt = length * t + offset;

                var px = GetColorForOffset(distance, rt);

                // This is done so that transparent pixels have same color channel as next pixel
                // So that the bilinear interpolation shows a better texture
                if (i > 0 && lastPixel == Color.clear)
                    tx.SetPixel(i - 1, 0, new Color(px.r, px.g, px.a, 0));
                else if (px == Color.clear)
                    px = new Color(lastPixel.r, lastPixel.g, lastPixel.a, 0);

                tx.SetPixel(i, 0, px);
                lastPixel = px;
            }

            // Prevent tearing on repeat
            var firstPixel = tx.GetPixel(0, 0);
            if (firstPixel == Color.clear)
            {
                if (tx.GetPixel(1, 0).a == 0 && lastPixel != Color.clear)
                    tx.SetPixel(0, 0, new Color(lastPixel.r, lastPixel.g, lastPixel.a, 0));
            }
            else if (lastPixel == Color.clear)
            {
                if (tx.GetPixel(resolution - 2, 0).a == 0)
                    tx.SetPixel(resolution - 1, 0, new Color(firstPixel.r, firstPixel.g, firstPixel.a, 0));
            }

            tx.Apply();

            var ramp = new GradientRampProperties
            {
                Texture = tx,
                Offset = offset,
                Length = length,
                Distance = distance,
            };

            Ramps[dimensions] = ramp;

            return ramp;
        }

        public Color GetColorForOffset(float width, float t)
        {
            float fromOffset = 0;
            float toOffset = 0;

            var lastIndexWithOffset = -1;

            for (int i = 0; i < Keys.Count; i++)
            {
                var key = Keys[i];

                var off = StylingUtils.GetRatioValue(key.Offset, width);

                if (off > t) break;

                if (!float.IsNaN(off))
                {
                    lastIndexWithOffset = i;
                    fromOffset = off;
                }
            }

            if (lastIndexWithOffset == -1)
            {
                return Keys[0].Color.Value;
            }

            var nextIndexWithOffset = lastIndexWithOffset;
            for (int i = lastIndexWithOffset + 1; i < Keys.Count; i++)
            {
                var key = Keys[i];
                var off = StylingUtils.GetRatioValue(key.Offset, width);
                if (!float.IsNaN(off))
                {
                    nextIndexWithOffset = i;
                    toOffset = off;
                    break;
                }
            }

            if (lastIndexWithOffset == nextIndexWithOffset) return Keys[lastIndexWithOffset].Color.Value;

            var delta = t - fromOffset;
            var offsetDiff = toOffset - fromOffset;
            var indexDiff = (nextIndexWithOffset - lastIndexWithOffset) * 1f;

            var indOffset = (delta / offsetDiff) * indexDiff;
            var indAbs = Mathf.Max(0, Mathf.FloorToInt(indOffset));
            var ind = lastIndexWithOffset + indAbs;
            var indDelta = indOffset - indAbs;

            var fr = Keys[ind];
            var tr = Keys[ind + 1];

            return Interpolater.Interpolate(fr.Color.Value, tr.Color.Value, indDelta);
        }


        internal virtual void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            material.SetFloat("_gradientType", (int) Type);
            material.SetFloat("_repeating", Repeating ? 1 : 0);

            var calc = GetRamp(size);
            material.SetFloat("_distance", calc.Distance);
            material.SetFloat("_length", calc.Length);
            material.SetFloat("_offset", calc.Offset);
        }

        protected abstract float CalculateLength(Vector2 size);
    }

    public class LinearGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Linear;
        public float Angle { get; set; }

        public LinearGradient(List<ColorKey> keys, bool repeating, float angle) : base(keys, repeating)
        {
            Angle = angle;
        }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);
            material.SetFloat("_angle", Angle);
        }

        protected override float CalculateLength(Vector2 size)
        {
            var angle = Mathf.PI - Angle;
            var c = Mathf.Cos(angle);
            var s = Mathf.Sin(angle);

            if (c == 0 || s == 1) return size.x;
            if (s == 0 || c == 1) return size.y;

            // TODO: remove unnecessary code
            //var tan = s / c;
            //if (tan == 0) return size.y;
            //return Mathf.Abs(size.x / s) - Mathf.Abs((Mathf.Abs(size.x / tan) - size.y) * c);

            var slope = Mathf.Tan(Mathf.PI / 2 - angle);

            if (slope == 0) return size.x;

            float perpendicularSlope = -1 / slope;
            float cc = Mathf.Sign(c) * size.y - perpendicularSlope * Mathf.Sign(s) * size.x;
            float endX = cc / (slope - perpendicularSlope);
            float endY = perpendicularSlope * endX + cc;

            return new Vector2(endX, endY).magnitude;
        }
    }

    public class RadialGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Radial;
        public YogaValue2 At { get; set; }
        public YogaValue Radius { get; set; }
        public RadialGradientSizeHint SizeHint { get; set; }
        public RadialGradientShape Shape { get; set; }

        public RadialGradient(List<ColorKey> keys, bool repeating, YogaValue2 at, YogaValue radius,
            RadialGradientSizeHint sizeHint, RadialGradientShape shape) : base(keys, repeating)
        {
            At = at;
            Radius = radius;
            SizeHint = sizeHint;
            Shape = shape;
        }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);

            var calc = GetRamp(size);
            material.SetVector("_at", StylingUtils.GetRatioValue(At, size, float.NaN, true));
            material.SetFloat("_sizeHint", (int) SizeHint);
            material.SetFloat("_shape", (int) Shape);
            material.SetFloat("_radius", CalculateRadius(size) * Mathf.Max(1, calc.Length));
        }

        protected override float CalculateLength(Vector2 size)
        {
            var at = StylingUtils.GetPointValue(At, size, float.NaN, true);

            switch (SizeHint)
            {
                case RadialGradientSizeHint.Custom:
                    return StylingUtils.GetPointValue(Radius, size.x, 0);
                case RadialGradientSizeHint.FarthestSide:
                    return Mathf.Max(at.x, size.x - at.x, at.y, size.y - at.y);
                case RadialGradientSizeHint.ClosestCorner:
                    return new Vector2(Mathf.Min(at.x, size.x - at.x), Mathf.Min(at.y, size.y - at.y)).magnitude;
                case RadialGradientSizeHint.ClosestSide:
                    return Mathf.Min(at.x, size.x - at.x, at.y, size.y - at.y);
                case RadialGradientSizeHint.FarthestCorner:
                default:
                    return new Vector2(Mathf.Max(at.x, size.x - at.x), Mathf.Max(at.y, size.y - at.y)).magnitude;
            }
        }

        protected float CalculateRadius(Vector2 size)
        {
            var aspect = size.x / size.y;
            var at = StylingUtils.GetRatioValue(At, size, float.NaN, true);

            switch (SizeHint)
            {
                case RadialGradientSizeHint.Custom:
                    return StylingUtils.GetRatioValue(Radius, size.y, 0) / aspect;
                case RadialGradientSizeHint.FarthestSide:
                    return Mathf.Max(at.x, 1 - at.x, at.y / aspect, (1 - at.y) / aspect);
                case RadialGradientSizeHint.ClosestCorner:
                    return new Vector2(Mathf.Min(at.x, 1 - at.x), Mathf.Min(at.y, 1 - at.y) / aspect).magnitude;
                case RadialGradientSizeHint.ClosestSide:
                    return Mathf.Min(at.x, 1 - at.x, at.y / aspect, (1 - at.y) / aspect);
                case RadialGradientSizeHint.FarthestCorner:
                default:
                    return new Vector2(Mathf.Max(at.x, 1 - at.x), Mathf.Max(at.y, 1 - at.y) / aspect).magnitude;
            }
        }
    }

    public class ConicGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Conic;
        public YogaValue2 At { get; set; }
        public float From { get; set; }

        public ConicGradient(List<ColorKey> keys, bool repeating, YogaValue2 at, float from) : base(keys, repeating)
        {
            At = at;
            From = from;
        }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);
            material.SetVector("_at", StylingUtils.GetRatioValue(At, size, float.NaN, true));
            material.SetFloat("_from", From);
        }

        protected override float CalculateLength(Vector2 size) => 1;
    }
}
