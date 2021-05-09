using ReactUnity.Animations;
using ReactUnity.Styling.Types;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class TimingFunctionConverter : IStyleParser, IStyleConverter
    {
        static private IStyleConverter TypeConverter = new EnumConverter<TimingFunctionType>(false);
        static private IStyleConverter StepConverter = new EnumConverter<StepsJumpMode>(false);

        public object Convert(object value)
        {
            if (value is TimingFunction f) return f;

            var type = TypeConverter.Convert(value);

            if (type is TimingFunctionType tt)
                return TimingFunctions.Get(tt);

            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            var fn = ParserHelpers.ParseFunction(value);

            if (fn == null) return SpecialNames.CantParse;

            var name = fn[0];

            if (name == "steps" && (fn.Length == 2 || fn.Length == 3))
            {
                var a1 = ConverterMap.IntConverter.Convert(fn[1]);
                var a2 = StepConverter.Convert(fn[2]);

                var stepMode = a2 is StepsJumpMode s2 ? s2 : StepsJumpMode.None;

                if (a1 is int f1)
                    return TimingFunctions.Steps(f1, stepMode);
            }
            else if (name == "cubic-bezier" && fn.Length == 5)
            {
                var a1 = ConverterMap.FloatConverter.Convert(fn[1]);
                var a2 = ConverterMap.FloatConverter.Convert(fn[2]);
                var a3 = ConverterMap.FloatConverter.Convert(fn[3]);
                var a4 = ConverterMap.FloatConverter.Convert(fn[4]);

                if (a1 is float f1 &&
                    a2 is float f2 &&
                    a3 is float f3 &&
                    a4 is float f4)
                    return CubicBezierFunction.Create(f1, f2, f3, f4);
            }
            throw new System.NotImplementedException();
        }
    }
}
