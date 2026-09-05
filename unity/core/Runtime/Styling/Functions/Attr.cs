using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// attr(): reads a <c>data-*</c> prop off the element (or, on a pseudo-element, its originating
    /// element) into a property value. <c>attr(name)</c> is the prop's text, <c>attr(name px)</c>
    /// appends a unit, and <c>attr(name type(&lt;length&gt;))</c> or one of the older type keywords
    /// parses the text as the property would. A fallback after the comma stands in when the prop is
    /// missing or does not parse.
    /// </summary>
    internal class AttrFunction : ICssFunction
    {
        public string Name { get; } = "attr";

        // The type keywords of CSS Values 4, all of which mean "parse it as the property does".
        private static readonly HashSet<string> TypeKeywords = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase)
        {
            "number", "integer", "length", "angle", "time", "frequency", "percentage", "color", "url", "flex", "ident",
        };

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var head = ParserHelpers.SplitWhitespace(args[0]);
            if (head.Count == 0 || head.Count > 2) return null;

            var attribute = head[0];
            // Data props are stored without the prefix the attribute selector also drops.
            if (attribute.FastStartsWith("data-")) attribute = attribute.Substring(5);

            var kind = ComputedAttr.Kind.String;
            string unit = null;

            if (head.Count > 1)
            {
                var type = head[1];
                if (type.Equals("string", StringComparison.OrdinalIgnoreCase) || type.Equals("raw-string", StringComparison.OrdinalIgnoreCase)) kind = ComputedAttr.Kind.String;
                else if (type.FastStartsWith("type(") || TypeKeywords.Contains(type)) kind = ComputedAttr.Kind.Typed;
                else
                {
                    kind = ComputedAttr.Kind.Unit;
                    unit = type;
                }
            }

            string fallback = null;
            if (args.Length > 1)
            {
                var split = argsCombined.Split(new char[] { ',' }, 2);
                if (split.Length > 1) fallback = split[1].Trim();
            }

            return new ComputedAttr(attribute, kind, unit, fallback);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
