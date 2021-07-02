using System;
using UnityEditor.UIElements;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.UIToolkit
{
    internal class StyleLengthField : TextValueField<StyleLength>
    {
        // This property to alleviate the fact we have to cast all the time
        LengthInput lengthInput => (LengthInput) textInputBase;

        public StyleLengthField() : this((string) null) { }

        public StyleLengthField(int maxLength)
            : this(null, maxLength) { }

        public StyleLengthField(string label, int maxLength = -1)
            : base(label, maxLength, new LengthInput())
        {
            AddLabelDragger<StyleLength>();
        }

        public override void ApplyInputDeviceDelta(Vector3 delta, DeltaSpeed speed, StyleLength startValue)
        {
            lengthInput.ApplyInputDeviceDelta(delta, speed, startValue);
        }

        protected override StyleLength StringToValue(string str)
        {
            return ParseString(str, value);
        }

        protected override string ValueToString(StyleLength value)
        {
            return value.ToString().ToLower();
        }

        private static StyleLength ParseString(string str, StyleLength defaultValue)
        {
            if (string.IsNullOrEmpty(str))
                return defaultValue;

            str = str.ToLower();

            StyleLength result = defaultValue;
            if (char.IsLetter(str[0]))
            {
                if (str == "auto")
                    result = new StyleLength(StyleKeyword.Auto);
                else if (str == "none")
                    result = new StyleLength(StyleKeyword.None);
            }
            else
            {
                Length length = defaultValue.value;
                float value = length.value;
                LengthUnit unit = length.unit;

                // Find unit index
                int digitEndIndex = 0;
                int unitIndex = -1;
                for (int i = 0; i < str.Length; i++)
                {
                    var c = str[i];
                    if (char.IsLetter(c) || c == '%')
                    {
                        unitIndex = i;
                        break;
                    }

                    ++digitEndIndex;
                }

                var floatStr = str.Substring(0, digitEndIndex);
                var unitStr = string.Empty;
                if (unitIndex > 0)
                    unitStr = str.Substring(unitIndex, str.Length - unitIndex).ToLower();

                float v;
                if (float.TryParse(floatStr, out v))
                    value = v;

                switch (unitStr)
                {
                    case "px":
                        unit = LengthUnit.Pixel;
                        break;
                    case "%":
                        unit = LengthUnit.Percent;
                        break;
                    default:
                        break;
                }
                result = new Length(value, unit);
            }

            return result;
        }

        protected class LengthInput : TextValueInput
        {
            StyleLengthField parentLengthField => (StyleLengthField) parent;

            protected override string allowedCharacters
            {
                get { return "0123456789autonepx%.,-+"; }
            }

            public override void ApplyInputDeviceDelta(Vector3 delta, DeltaSpeed speed, StyleLength startValue)
            {
                if (startValue.keyword != StyleKeyword.Undefined)
                    startValue = new StyleLength();

                double sensitivity = NumericFieldDraggerUtility.CalculateIntDragSensitivity((long) startValue.value.value);
                float acceleration = NumericFieldDraggerUtility.Acceleration(speed == DeltaSpeed.Fast, speed == DeltaSpeed.Slow);
                long v = (long) StringToValue(text).value.value;
                v += (long) Math.Round(NumericFieldDraggerUtility.NiceDelta(delta, acceleration) * sensitivity);
                if (parentLengthField.isDelayed)
                {
                    text = ValueToString(NumericFieldDraggerUtility.ClampToInt(v));
                }
                else
                {
                    Length l = new Length(NumericFieldDraggerUtility.ClampToInt(v), parentLengthField.value.value.unit);
                    parentLengthField.value = new StyleLength(l);
                }
            }

            protected override string ValueToString(StyleLength v)
            {
                return v.ToString().ToLower();
            }

            protected override StyleLength StringToValue(string str)
            {
                return ParseString(str, parentLengthField.value);
            }
        }

        static class NumericFieldDraggerUtility
        {
            internal static float Acceleration(bool shiftPressed, bool altPressed)
            {
                return (shiftPressed ? 4 : 1) * (altPressed ? .25f : 1);
            }

            static bool s_UseYSign = false;

            internal static float NiceDelta(Vector2 deviceDelta, float acceleration)
            {
                deviceDelta.y = -deviceDelta.y;

                if (Mathf.Abs(Mathf.Abs(deviceDelta.x) - Mathf.Abs(deviceDelta.y)) / Mathf.Max(Mathf.Abs(deviceDelta.x), Mathf.Abs(deviceDelta.y)) > .1f)
                {
                    if (Mathf.Abs(deviceDelta.x) > Mathf.Abs(deviceDelta.y))
                        s_UseYSign = false;
                    else
                        s_UseYSign = true;
                }

                if (s_UseYSign)
                    return Mathf.Sign(deviceDelta.y) * deviceDelta.magnitude * acceleration;
                else
                    return Mathf.Sign(deviceDelta.x) * deviceDelta.magnitude * acceleration;
            }

            const float kDragSensitivity = .03f;

            internal static double CalculateFloatDragSensitivity(double value)
            {
                if (double.IsInfinity(value) || double.IsNaN(value))
                {
                    return 0.0;
                }
                return Math.Max(1, Math.Pow(Math.Abs(value), 0.5)) * kDragSensitivity;
            }

            internal static long CalculateIntDragSensitivity(long value)
            {
                return (long) Math.Max(1, Math.Pow(Math.Abs((double) value), 0.5) * kDragSensitivity);
            }

            internal static int ClampToInt(long value)
            {
                if (value < int.MinValue)
                    return int.MinValue;

                if (value > int.MaxValue)
                    return int.MaxValue;

                return (int) value;
            }
        }
    }
}
