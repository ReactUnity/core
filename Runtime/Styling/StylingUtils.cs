using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling
{
    internal static class StylingUtils
    {
        public static IComputedValue CreateComputed(object value)
        {
            if (value is IComputedValue cv) return cv;
            return new ComputedConstant(value);
        }

        public static bool UnboxConstant(object value, out object result)
        {
            while (value is IComputedConstant cv) value = cv.ConstantValue;

            if (value is IComputedValue)
            {
                result = null;
                return false;
            }

            result = value;
            return true;
        }
    }
}
