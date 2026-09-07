using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    [Flags]
    public enum ContainerType
    {
        Normal = 0,
        Size = 1,
        InlineSize = 2,
        /// <summary>Answers <c>scroll-state()</c> queries. Combines with a size type, as in <c>inline-size scroll-state</c>.</summary>
        ScrollState = 4,
    }

    /// <summary>
    /// <c>container-type</c>: <c>normal</c>, <c>size</c> or <c>inline-size</c>, optionally alongside
    /// <c>scroll-state</c>, which lets <c>@container scroll-state(...)</c> read the element.
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
            if (scrollState) type |= ContainerType.ScrollState;
            return Constant(type, out result);
        }

        public override string StringifyTyped(ContainerType value)
        {
            var scrollState = (value & ContainerType.ScrollState) != 0;

            switch (value & ~ContainerType.ScrollState)
            {
                case ContainerType.Size: return scrollState ? "size scroll-state" : "size";
                case ContainerType.InlineSize: return scrollState ? "inline-size scroll-state" : "inline-size";
                default: return scrollState ? "scroll-state" : "normal";
            }
        }
    }
}
