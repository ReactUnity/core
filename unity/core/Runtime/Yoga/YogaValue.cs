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
            return Unit == other.Unit && (Value.Equals(other.Value) || Unit == YogaUnit.Undefined || Unit == YogaUnit.Auto);
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

        public static implicit operator YogaValue(float pointValue)
        {
            return Point(pointValue);
        }

        public static bool operator ==(YogaValue left, YogaValue right) => left.Equals(right);
        public static bool operator !=(YogaValue left, YogaValue right) => !(left == right);
    }
}
