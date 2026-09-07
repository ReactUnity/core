using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    public enum ContainerType
    {
        Normal = 0,
        Size = 1,
        InlineSize = 2,
    }

    /// <summary>
    /// <c>container-type</c>: <c>normal</c>, <c>size</c> or <c>inline-size</c>, optionally alongside
    /// <c>scroll-state</c>. That keyword is accepted so a stylesheet written for the web still parses;
    /// there is no scroll-state query to answer, so it decides nothing.
    /// </summary>
    public class ContainerTypeConverter : TypedStyleConverterBase<ContainerType>
    {
        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var type = ContainerType.Normal;
            var sized = false;
            var scrollState = false;

            foreach (var word in ParserHelpers.SplitWhitespace(value))
            {
                if (!scrollState && word.Equals("scroll-state", StringComparison.OrdinalIgnoreCase)) scrollState = true;
                else if (!sized && word.Equals("normal", StringComparison.OrdinalIgnoreCase)) sized = true;
                else if (!sized && word.Equals("size", StringComparison.OrdinalIgnoreCase))
                {
                    sized = true;
                    type = ContainerType.Size;
                }
                else if (!sized && word.Equals("inline-size", StringComparison.OrdinalIgnoreCase))
                {
                    sized = true;
                    type = ContainerType.InlineSize;
                }
                else return Fail(out result);
            }

            if (!sized && !scrollState) return Fail(out result);
            return Constant(type, out result);
        }

        public override string StringifyTyped(ContainerType value)
        {
            switch (value)
            {
                case ContainerType.Size: return "size";
                case ContainerType.InlineSize: return "inline-size";
                default: return "normal";
            }
        }
    }
}
