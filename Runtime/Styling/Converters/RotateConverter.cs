using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// The <c>rotate</c> property in the web's grammar: <c>none</c>, an angle about z, or an axis
    /// keyword or vector with an angle. Three angles are read as Euler angles, ReactUnity's older
    /// spelling. The value is Euler angles in CSS space, which each framework maps onto its own axes.
    /// </summary>
    public class RotateConverter : TypedStyleConverterBase<Vector3>
    {
        public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            if (keyword == CssKeyword.None) return Constant(Vector3.zero, out result);
            return base.HandleKeyword(keyword, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var values = ParserHelpers.SplitWhitespace(value);

            switch (values.Count)
            {
                case 1:
                    return AboutAxis(Vector3.forward, values[0], out result);
                case 2:
                    if (TryAxis(values[0], out var first)) return AboutAxis(first, values[1], out result);
                    if (TryAxis(values[1], out var second)) return AboutAxis(second, values[0], out result);
                    return Fail(out result);
                case 3:
                    return Euler(values.Cast<object>().ToList(), out result);
                case 4:
                    // The angle is whichever end is not a bare number; the grammar lets it come first.
                    return IsNumber(values[3])
                        ? AxisAngle(values[1], values[2], values[3], values[0], out result)
                        : AxisAngle(values[0], values[1], values[2], values[3], out result);
            }

            return base.ParseInternal(value, out result);
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (value is Vector2 v2) return Constant(new Vector3(v2.x, v2.y, 0), out result);
            if (value is Vector4 v4) return Constant(new Vector3(v4.x, v4.y, v4.z), out result);
            if (value is Quaternion q) return Constant(q.eulerAngles, out result);
            if (value is double d) return Constant(new Vector3(0, 0, (float) d), out result);
            if (value is float f) return Constant(new Vector3(0, 0, f), out result);
            if (value is int i) return Constant(new Vector3(0, 0, i), out result);

            if (value is IEnumerable e)
            {
                var items = e.OfType<object>().ToList();
                if (items.Count == 1) return AboutAxis(Vector3.forward, items[0], out result);
                if (items.Count == 3) return Euler(items, out result);
                if (items.Count == 4) return AxisAngle(items[0], items[1], items[2], items[3], out result);
                return Fail(out result);
            }

            return base.ConvertInternal(value, out result);
        }

        /// <summary>
        /// Euler angles for a turn about an axis. A principal axis keeps the angle as written, so a
        /// keyframe past one turn still animates as one; any other axis goes through a quaternion.
        /// </summary>
        public static Vector3 FromAxisAngle(Vector3 axis, float angle)
        {
            if (axis == Vector3.zero) return Vector3.zero;
            if (axis.y == 0 && axis.z == 0) return new Vector3(Mathf.Sign(axis.x) * angle, 0, 0);
            if (axis.x == 0 && axis.z == 0) return new Vector3(0, Mathf.Sign(axis.y) * angle, 0);
            if (axis.x == 0 && axis.y == 0) return new Vector3(0, 0, Mathf.Sign(axis.z) * angle);
            return Quaternion.AngleAxis(angle, axis.normalized).eulerAngles;
        }

        private static bool TryAxis(string token, out Vector3 axis)
        {
            switch (token.ToLowerInvariant())
            {
                case "x": axis = Vector3.right; return true;
                case "y": axis = Vector3.up; return true;
                case "z": axis = Vector3.forward; return true;
                default: axis = default; return false;
            }
        }

        private static bool IsNumber(string token) =>
            float.TryParse(token, NumberStyles.Float, CultureInfo.InvariantCulture, out _);

        private bool AboutAxis(Vector3 axis, object angle, out IComputedValue result)
        {
            return ComputedMapper.Create(out result, angle, AllConverters.AngleConverter,
                (resolved) => resolved is float a ? (object) (axis * a) : null);
        }

        private bool Euler(List<object> angles, out IComputedValue result)
        {
            return ComputedList.Create(out result, angles, AllConverters.AngleConverter,
                (resolved) => resolved[0] is float x && resolved[1] is float y && resolved[2] is float z
                    ? (object) new Vector3(x, y, z)
                    : null);
        }

        // The axis components are bare numbers, which the angle converter reads unchanged.
        private bool AxisAngle(object x, object y, object z, object angle, out IComputedValue result)
        {
            return ComputedList.Create(out result, new List<object> { x, y, z, angle }, AllConverters.AngleConverter,
                (resolved) => resolved[0] is float ax && resolved[1] is float ay && resolved[2] is float az && resolved[3] is float a
                    ? (object) FromAxisAngle(new Vector3(ax, ay, az), a)
                    : null);
        }
    }
}
