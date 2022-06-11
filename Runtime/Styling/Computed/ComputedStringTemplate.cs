using System.Collections.Generic;
using System.Text;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedStringTemplate : IComputedValue
    {
        internal class CustomVariableStringConverter : IStyleConverter
        {
            public IComputedValue Convert(object value)
            {
                if (value is string s) return new ComputedConstant(s);
                return null;
            }

            public string Stringify(object value) => value as string;
        }

        internal static CustomVariableStringConverter VariableStringConverter = new CustomVariableStringConverter();

        public IList<string> Template { get; }
        public IList<ComputedVariable> Variables { get; }

        public ComputedStringTemplate(IList<string> template, IList<ComputedVariable> variables)
        {
            Template = template;
            Variables = variables;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var result = new StringBuilder();

            if (Variables.Count < Template.Count - 1) return null;

            for (int i = 0; i < Template.Count - 1; i++)
            {
                var tmp = Template[i];
                var variable = Variables[i];

                var varValue = variable.ResolveValue(prop, style, VariableStringConverter) as string;

                if (varValue == null) return null;

                result.Append(tmp);
                result.Append(varValue);
            }

            result.Append(Template[Template.Count - 1]);

            return converter.Convert(result.ToString());
        }

    }
}
