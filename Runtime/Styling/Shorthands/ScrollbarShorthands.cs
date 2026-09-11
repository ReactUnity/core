using System;
using System.Collections.Generic;
using System.Globalization;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// `scrollbar-color: [thumb] [track]`. The scrollbar pseudo-elements read these through `var()` in the
    /// user-agent sheet, so an author `::scrollbar` rule still wins and `auto` falls back to the defaults.
    /// </summary>
    internal class ScrollbarColorShorthand : StyleShorthand
    {
        internal static readonly VariableProperty ThumbColor = new VariableProperty("--scrollbar-thumb-color");
        internal static readonly VariableProperty TrackColor = new VariableProperty("--scrollbar-track-color");

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty> { ThumbColor, TrackColor };

        public ScrollbarColorShorthand(string name) : base(name) { }

        // `auto` is left to the base class: the stored keyword resolves to nothing and the var() falls back.
        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (!(value is string str)) return null;

            var parts = ParserHelpers.SplitWhitespace(str);
            if (parts.Count == 0 || parts.Count > 2) return null;
            foreach (var part in parts) if (!AllConverters.ColorConverter.TryParse(part, out _)) return null;

            collection[ThumbColor] = ThumbColor.Convert(parts[0]);
            collection[TrackColor] = parts.Count > 1 ? TrackColor.Convert(parts[1]) : new ComputedKeyword(CssKeyword.Initial);
            return ModifiedProperties;
        }
    }

    /// <summary>
    /// `scrollbar-width: auto | thin | none | [length]`, the thickness of both scrollbars. `none` is a zero
    /// size rather than `display: none`, because the ScrollRect toggles the scrollbar object itself to auto-hide.
    /// </summary>
    internal class ScrollbarWidthShorthand : StyleShorthand
    {
        internal static readonly VariableProperty Width = new VariableProperty("--scrollbar-width");

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty> { Width };

        public ScrollbarWidthShorthand(string name) : base(name) { }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            string str;
            if (value is string s) str = s.Trim();
            else if (value is IConvertible c && !(value is bool)) str = c.ToDouble(CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture) + "px";
            else return null;

            if (str.Equals("thin", StringComparison.OrdinalIgnoreCase)) str = "6px";
            else if (str.Equals("none", StringComparison.OrdinalIgnoreCase)) str = "0px";
            else if (!AllConverters.LengthConverter.TryParse(str, out _)) return null;

            collection[Width] = Width.Convert(str);
            return ModifiedProperties;
        }
    }
}
