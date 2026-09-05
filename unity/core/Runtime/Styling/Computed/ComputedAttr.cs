using System;
using System.Globalization;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// The value of an attr(): a data prop of the element the style belongs to, read when the style is
    /// resolved, so a change to the prop re-reads it along with the rest of the element's style.
    /// </summary>
    public struct ComputedAttr : IComputedValue
    {
        public enum Kind { String, Unit, Typed }

        public string Attribute { get; }
        public Kind Type { get; }
        public string Unit { get; }
        public string Fallback { get; }

        public ComputedAttr(string attribute, Kind type, string unit, string fallback)
        {
            Attribute = attribute;
            Type = type;
            Unit = unit;
            Fallback = fallback;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var component = style?.Component;
            // A pseudo-element has no props of its own; attr() reads the element it belongs to.
            if (component != null && component.IsPseudoElement) component = component.Parent;

            object raw = null;
            if (component == null || !component.Data.TryGetValue(Attribute, out raw) || raw == null || raw is DBNull)
                return Fallback == null ? null : converter.Convert(Fallback);

            var text = Stringify(raw);
            if (Type == Kind.Unit) text += Unit;

            var converted = converter.Convert(text);
            if (converted == null && Fallback != null) converted = converter.Convert(Fallback);
            return converted;
        }

        // A prop set from JS is whatever was passed, so a number or a bool reads as its CSS text.
        private static string Stringify(object value)
        {
            if (value is bool b) return b ? "true" : "false";
            if (value is IFormattable f) return f.ToString(null, CultureInfo.InvariantCulture);
            return value.ToString();
        }
    }
}
