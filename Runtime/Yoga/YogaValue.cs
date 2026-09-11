using System;
using System.Runtime.InteropServices;

namespace Yoga
{
    [Serializable]
    [StructLayout(LayoutKind.Sequential)]
    public struct YogaValue
    {
        [UnityEngine.SerializeField]
        private float value;
        [UnityEngine.SerializeField]
        private YogaUnit unit;

        public YogaUnit Unit
        {
            get
            {
                return unit;
            }
        }

        public float Value
        {
            get
            {
                return value;
            }
        }

        public static YogaValue Point(float value)
        {
            return new YogaValue
            {
                value = value,
                unit = YogaConstants.IsUndefined(value) ? YogaUnit.Undefined : YogaUnit.Point
            };
        }

        public bool Equals(YogaValue other)
        {
            return Unit == other.Unit && (Value.Equals(other.Value) || Unit == YogaUnit.Undefined || Unit == YogaUnit.Auto || IsKeyword(Unit));
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            return obj is YogaValue && Equals((YogaValue) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (Value.GetHashCode() * 397) ^ (int) Unit;
            }
        }

        public static YogaValue Undefined()
        {
            return new YogaValue
            {
                value = YogaConstants.Undefined,
                unit = YogaUnit.Undefined
            };
        }

        public static YogaValue Auto()
        {
            return new YogaValue
            {
                value = 0f,
                unit = YogaUnit.Auto
            };
        }

        public static YogaValue Percent(float value)
        {
            return new YogaValue
            {
                value = value,
                unit = YogaConstants.IsUndefined(value) ? YogaUnit.Undefined : YogaUnit.Percent
            };
        }

        // The value stays undefined so these round-trip through the native getters, which report a
        // keyword unit with no number, and so nothing that interpolates or resolves a length treats
        // one as a zero.
        public static YogaValue MaxContent() => Keyword(YogaUnit.MaxContent);
        public static YogaValue FitContent() => Keyword(YogaUnit.FitContent);
        public static YogaValue Stretch() => Keyword(YogaUnit.Stretch);

        /// <summary>Whether the unit is a sizing keyword, which carries no <see cref="Value"/>.</summary>
        public static bool IsKeyword(YogaUnit unit) =>
            unit == YogaUnit.MaxContent || unit == YogaUnit.FitContent || unit == YogaUnit.Stretch;

        private static YogaValue Keyword(YogaUnit unit)
        {
            return new YogaValue
            {
                value = YogaConstants.Undefined,
                unit = unit
            };
        }

        public static implicit operator YogaValue(float pointValue)
        {
            return Point(pointValue);
        }

        public static bool operator ==(YogaValue left, YogaValue right) => left.Equals(right);
        public static bool operator !=(YogaValue left, YogaValue right) => !(left == right);
    }
}
