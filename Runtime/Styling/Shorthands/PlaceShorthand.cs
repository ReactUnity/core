using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// place-content, place-items and place-self: the align value, then the justify value, which is
    /// the same one when left out. Yoga has no justify-items or justify-self, so those two shorthands
    /// set their align property alone and only check that the second value is a keyword they know.
    /// </summary>
    internal class PlaceShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }

        private readonly IStyleProperty Align;
        private readonly IStyleProperty Justify;
        private readonly StyleConverterBase AlignConverter;
        private readonly StyleConverterBase JustifyConverter;

        public PlaceShorthand(string name, IStyleProperty align, IStyleProperty justify = null) : base(name)
        {
            Align = align;
            Justify = justify;
            AlignConverter = LayoutProperties.AlignConverter;
            JustifyConverter = justify == null ? AlignConverter : LayoutProperties.JustifyConverter;

            ModifiedProperties = justify == null ? new List<IStyleProperty> { align } : new List<IStyleProperty> { align, justify };
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => AlignConverter.CanHandleKeyword(keyword);

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var splits = ParserHelpers.SplitWhitespace(value.ToString());
            if (splits.Count == 0 || splits.Count > 2) return null;

            if (!AlignConverter.TryParse(splits[0], out var align)) return null;

            var justifyText = splits.Count > 1 ? splits[1] : splits[0];
            if (!JustifyConverter.TryParse(justifyText, out var justify))
            {
                // A single value that only the align side knows -- `baseline`, say -- resets the other.
                if (splits.Count > 1) return null;
                justify = Justify == null ? null : new ComputedConstant(Justify.defaultValue);
            }

            collection[Align] = align;
            if (Justify != null) collection[Justify] = justify;
            return ModifiedProperties;
        }
    }
}
