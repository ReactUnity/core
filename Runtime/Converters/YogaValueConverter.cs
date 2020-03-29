using Facebook.Yoga;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Converters
{
    public static class YogaValueConverter
    {

        public static YogaValue? NormalizeYogaValue(object value)
        {
            if (value == null) return YogaValue.Undefined();
            else if (value is YogaValue c) return c;
            else if (value is double d) return YogaValue.Point((float)d);
            else if (value is int i) return YogaValue.Point(i);
            else if (value is float v) return YogaValue.Point(v);
            else if (value is string s)
            {
                if (s == "auto") return YogaValue.Auto();
                else if (s.EndsWith("%")) return YogaValue.Percent(float.Parse(s.Replace("%", "")));
                else return YogaValue.Point(float.Parse(s));
            }
            else return value as YogaValue?;
        }

    }
}
