using ReactUnity.Styling.Types;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class Vector2Parser : IStyleParser
    {
        public FloatParser FloatParser = new FloatParser();
        char[] splitters = new char[] { ' ' };

        public object FromString(string value)
        {
            var values = value.Split(splitters);

            if (values.Length == 1)
            {
                var pr = FloatParser.FromString(values[0]);
                if (pr is float fl) return new Vector2(fl, fl);
            }

            if (values.Length == 2)
            {
                var pr1 = FloatParser.FromString(values[0]);
                var pr2 = FloatParser.FromString(values[1]);
                if (pr1 is float fl1)
                    if (pr2 is float fl2)
                        return new Vector2(fl1, fl2);
            }

            return SpecialNames.CantParse;
        }
    }
}
