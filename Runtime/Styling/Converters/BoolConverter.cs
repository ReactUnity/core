using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public class BoolConverter : StyleConverterBase
    {
        HashSet<string> truthyValues;
        HashSet<string> falsyValues;

        protected override Type TargetType => typeof(bool);

        public BoolConverter(string[] truthyValues, string[] falsyValues)
        {
            this.truthyValues = new HashSet<string>(truthyValues ?? new string[0], StringComparer.InvariantCultureIgnoreCase);
            this.falsyValues = new HashSet<string>(falsyValues ?? new string[0], StringComparer.InvariantCultureIgnoreCase);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (truthyValues.Contains(value))
            {
                result = new ComputedConstant(true);
                return true;
            }
            if (falsyValues.Contains(value))
            {
                result = new ComputedConstant(false);
                return true;
            }
            return base.ParseInternal(value, out result);
        }
    }
}
