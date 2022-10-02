using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling.Animations;
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
        private struct ShaderProps
        {
            internal Material BaseMaterial;
            public float GradientType;
            public float Repeating;
            public float Distance;
            public float Length;
            public float Offset;

            public void SetMaterialProps(Material mat)
            {
                mat.SetFloat("_gradientType", GradientType);
                mat.SetFloat("_repeating", Repeating);
                mat.SetFloat("_distance", Distance);
                mat.SetFloat("_length", Length);
                mat.SetFloat("_offset", Offset);
            }

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       GradientType == props.GradientType &&
                       Repeating == props.Repeating &&
                       Distance == props.Distance &&
                       Length == props.Length &&
                       Offset == props.Offset;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, GradientType, Repeating, Distance, Length, Offset);
            }
        }

        public class ColorKey
        {
            public Color? Color;
            public YogaValue Offset;
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

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
            float offset = first.Offset.GetRatioValue(distance, 0);
            float length = 1f;

            if (Repeating) length = 0;
            else offset = Mathf.Min(0, offset);

            for (int i = 1; i < Keys.Count; i++)
            {
                var key = Keys[i];

                var off = key.Offset.GetRatioValue(distance, float.NaN);

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

                var off = key.Offset.GetRatioValue(width);

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
                var off = key.Offset.GetRatioValue(width);
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


        internal virtual Material ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            var calc = GetRamp(size);

            var props = new ShaderProps
            {
                BaseMaterial = material,
                GradientType = (int) Type,
                Repeating = Repeating ? 1 : 0,
                Distance = calc.Distance,
                Length = calc.Length,
                Offset = calc.Offset,
            };

            if (!CachedMaterials.TryGetValue(props, out var result) || !result)
            {
                result = new Material(props.BaseMaterial);
                props.SetMaterialProps(result);
                CachedMaterials[props] = result;
            }

            return result;
        }

        protected abstract float CalculateLength(Vector2 size);
    }

    public class LinearGradient : BaseGradient
    {
        private struct ShaderProps
        {
            internal Material BaseMaterial;
            public float Angle;

            public void SetMaterialProps(Material mat)
            {
                mat.SetFloat("_angle", Angle);
            }

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Angle == props.Angle;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, Angle);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public override GradientType Type => GradientType.Linear;
        public float Angle { get; set; }

        public LinearGradient(List<ColorKey> keys, bool repeating, float angle) : base(keys, repeating)
        {
            Angle = angle;
        }

        internal override Material ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            material = base.ModifyMaterial(context, material, size);

            var props = new ShaderProps
            {
                BaseMaterial = material,
                Angle = Angle,
            };

            if (!CachedMaterials.TryGetValue(props, out var result) || !result)
            {
                result = new Material(props.BaseMaterial);
                props.SetMaterialProps(result);
                CachedMaterials[props] = result;
            }

            return result;
        }

        protected override float CalculateLength(Vector2 size)
        {
            var angle = Mathf.PI - Angle;
            var c = Mathf.Cos(angle);
            var s = Mathf.Sin(angle);

            if (c == 0 || s == 1) return size.x;
            if (s == 0 || c == 1) return size.y;

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
        private struct ShaderProps
        {
            internal Material BaseMaterial;
            public Vector2 At;
            public int SizeHint;
            public int Shape;
            public float Radius;

            public void SetMaterialProps(Material mat)
            {
                mat.SetVector("_at", At);
                mat.SetFloat("_sizeHint", SizeHint);
                mat.SetFloat("_shape", Shape);
                mat.SetFloat("_radius", Radius);
            }

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       At.Equals(props.At) &&
                       SizeHint == props.SizeHint &&
                       Shape == props.Shape &&
                       Radius == props.Radius;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, At, SizeHint, Shape, Radius);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

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

        internal override Material ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            material = base.ModifyMaterial(context, material, size);

            var calc = GetRamp(size);

            var props = new ShaderProps
            {
                BaseMaterial = material,
                At = At.GetRatioValue(size, float.NaN, true),
                SizeHint = (int) SizeHint,
                Shape = (int) Shape,
                Radius = CalculateRadius(size) * Mathf.Max(1, calc.Length),
            };

            if (!CachedMaterials.TryGetValue(props, out var result) || !result)
            {
                result = new Material(props.BaseMaterial);
                props.SetMaterialProps(result);
                CachedMaterials[props] = result;
            }

            return result;
        }

        protected override float CalculateLength(Vector2 size)
        {
            var at = At.GetPointValue(size, float.NaN, true);

            switch (SizeHint)
            {
                case RadialGradientSizeHint.Custom:
                    return Radius.GetPointValue(size.x, 0);
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
            var at = At.GetRatioValue(size, float.NaN, true);

            switch (SizeHint)
            {
                case RadialGradientSizeHint.Custom:
                    return Radius.GetRatioValue(size.y, 0) / aspect;
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
        private struct ShaderProps
        {
            internal Material BaseMaterial;
            public Vector2 At;
            public float From;

            public void SetMaterialProps(Material mat)
            {
                mat.SetVector("_at", At);
                mat.SetFloat("_from", From);
            }

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       At.Equals(props.At) &&
                       From == props.From;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, At, From);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public override GradientType Type => GradientType.Conic;
        public YogaValue2 At { get; set; }
        public float From { get; set; }

        public ConicGradient(List<ColorKey> keys, bool repeating, YogaValue2 at, float from) : base(keys, repeating)
        {
            At = at;
            From = from;
        }

        internal override Material ModifyMaterial(ReactContext context, Material material, Vector2 size)
        {
            material = base.ModifyMaterial(context, material, size);

            var props = new ShaderProps
            {
                BaseMaterial = material,
                At = At.GetRatioValue(size, float.NaN, true),
                From = From,
            };

            if (!CachedMaterials.TryGetValue(props, out var result) || !result)
            {
                result = new Material(props.BaseMaterial);
                props.SetMaterialProps(result);
                CachedMaterials[props] = result;
            }

            return result;
        }

        protected override float CalculateLength(Vector2 size) => 1;
    }
}
