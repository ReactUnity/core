using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Animations;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    public class CalculatedGradient
    {
        public Texture2D Ramp;
        public float Offset;
        public float Length;
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
        public List<ColorKey> Keys { get; set; }
        public bool Repeating { get; set; }
        public virtual bool SizeUpdatesGraphic => true;

        public bool ProcessKeys()
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
                else if (noUnit)
                {
                    var pk = Keys[i - 1];

                    var count = 1;

                    for (int j = i + 1; j < Keys.Count; j++)
                    {
                        var keyUnit = Keys[j].Offset.Unit;
                        if (keyUnit == YogaUnit.Auto || keyUnit == YogaUnit.Undefined) count++;
                        else break;
                    }
                }
            }

            return true;
        }

        public CalculatedGradient GetCalculatedGradient(Vector2 dimensions, int resolution = 1024)
        {
            if (Keys == null || Keys.Count == 0) return null;
            var width = CalculateLength(dimensions);

            float offset = 0f;
            float size = 1f;


            var first = Keys[0];
            var last = Keys[Keys.Count - 1];

            if (Repeating)
            {
                offset = StylingUtils.GetRatioValue(first.Offset, width, 0);
                size = 0;

                for (int i = 1; i < Keys.Count; i++)
                {
                    var key = Keys[i];

                    var off = StylingUtils.GetRatioValue(key.Offset, width, float.NaN);

                    if (!float.IsNaN(off) && off > size)
                    {
                        size = off;
                    }
                }
                size = size - offset;
            }


            var tx = new Texture2D(resolution, 1);
            tx.wrapMode = TextureWrapMode.Clamp;
            var resRp = 1f / (resolution - 1);

            for (int i = 0; i < resolution; i++)
            {
                var t = i * resRp;
                var rt = size * t + offset;
                tx.SetPixel(i, 0, GetColorForOffset(width, rt));
            }

            tx.Apply();
            return new CalculatedGradient
            {
                Ramp = tx,
                Offset = offset,
                Length = size,
            };
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
            material.SetInteger("_gradientType", (int) Type);
            material.SetInteger("_repeating", Repeating ? 1 : 0);

            var calc = GetCalculatedGradient(size);
            material.SetFloat("_length", calc.Length);
            material.SetFloat("_offset", calc.Offset);
        }

        protected abstract float CalculateLength(Vector2 size);
    }

    public class LinearGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Linear;
        public float Angle { get; set; }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);
            material.SetFloat("_angle", Angle);
        }

        protected override float CalculateLength(Vector2 size)
        {
            var c = Mathf.Cos(Angle);
            var s = Mathf.Sin(Angle);

            return size.y * c * c + size.x * s * s;
        }
    }

    public class RadialGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Radial;
        public YogaValue2 At { get; set; }
        public YogaValue Radius { get; set; }
        public RadialGradientSizeHint SizeHint { get; set; }
        public RadialGradientShape Shape { get; set; }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);
            material.SetVector("_at", StylingUtils.GetRatioValue(At, size));
            material.SetInteger("_sizeHint", (int) SizeHint);
            material.SetInteger("_shape", (int) Shape);
            material.SetFloat("_radius", CalculateRadius(size));
        }

        protected override float CalculateLength(Vector2 size)
        {
            var at = StylingUtils.GetPointValue(At, size);

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
            var at = StylingUtils.GetRatioValue(At, size);

            switch (SizeHint)
            {
                case RadialGradientSizeHint.Custom:
                    return StylingUtils.GetRatioValue(Radius, size.y, 0);
                case RadialGradientSizeHint.FarthestSide:
                    return Mathf.Max(at.x, 1 - at.x, at.y, 1 - at.y);
                case RadialGradientSizeHint.ClosestCorner:
                    return new Vector2(Mathf.Min(at.x, 1 - at.x), Mathf.Min(at.y, 1 - at.y)).magnitude;
                case RadialGradientSizeHint.ClosestSide:
                    return Mathf.Min(at.x, 1 - at.x, at.y, 1 - at.y);
                case RadialGradientSizeHint.FarthestCorner:
                default:
                    return new Vector2(Mathf.Max(at.x, 1 - at.x), Mathf.Max(at.y, 1 - at.y)).magnitude;
            }
        }
    }
    public class ConicGradient : BaseGradient
    {
        public override GradientType Type => GradientType.Conic;
        public YogaValue2 At { get; set; }
        public float From { get; set; }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            base.ModifyMaterial(context, material, size);
            material.SetVector("_at", StylingUtils.GetRatioValue(At, size));
            material.SetFloat("_from", From);
        }

        protected override float CalculateLength(Vector2 size) => 1;
    }
}
