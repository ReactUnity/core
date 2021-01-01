using Facebook.Yoga;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace ReactUnity.Types
{
    [StructLayout(LayoutKind.Sequential)]
    public struct YogaValue2
    {
        public static YogaValue2 Zero = new YogaValue2(YogaValue.Point(0), YogaValue.Point(0));
        public static YogaValue2 Auto = new YogaValue2(YogaValue.Auto(), YogaValue.Auto());

        public YogaValue X { get; private set; }
        public YogaValue Y { get; private set; }

        public YogaValue2(YogaValue x, YogaValue y)
        {
            X = x;
            Y = y;
        }

        public override bool Equals(object obj)
        {
            return obj is YogaValue2 value &&
                   EqualityComparer<YogaValue>.Default.Equals(X, value.X) &&
                   EqualityComparer<YogaValue>.Default.Equals(Y, value.Y);
        }

        public override int GetHashCode()
        {
            int hashCode = 1861411795;
            hashCode = hashCode * -1521134295 + X.GetHashCode();
            hashCode = hashCode * -1521134295 + Y.GetHashCode();
            return hashCode;
        }

        public static bool operator ==(YogaValue2 left, YogaValue2 right)
        {
            return left.X.Unit == right.X.Unit && left.X.Value == right.X.Value
                && left.Y.Unit == right.Y.Unit && left.Y.Value == right.Y.Value;
        }
        public static bool operator !=(YogaValue2 left, YogaValue2 right)
        {
            return !(left == right);
        }
    }
}
