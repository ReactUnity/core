using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedCalc : IComputedValue
    {
        public enum CalcOperator
        {
            None = 0,
            Add = 1,
            Subtract = 2,
            Multiply = 3,
            Divide = 4,
        }

        public IList<IComputedValue> Values;
        public IList<CalcOperator> Operators;
        public StyleConverterBase Converter;

        public ComputedCalc(IList<IComputedValue> values, IList<CalcOperator> operators, StyleConverterBase converter)
        {
            Values = values;
            Converter = converter;
            Operators = operators;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var count = Values.Count;
            var results = new List<object>(count);

            for (int i = 0; i < count; i++)
            {
                var value = Values[i];
                var computed = value?.ResolveValue(prop, style, converter);
                if (computed == null) return null;
                results.Add(computed);
            }

            var res = Evaluate(results, Operators);
            if (res.HasValue) return res.Value;
            return null;
        }

        public static bool Create(out IComputedValue result, List<object> values, IList<CalcOperator> operators, StyleConverterBase converter)
        {
            var resultValues = new List<IComputedValue>();
            var allConstants = true;

            for (int i = 0; i < values.Count; i++)
            {
                var value = values[i];

                if (!converter.TryConvert(value, out var partResult))
                {
                    result = null;
                    return false;
                }

                resultValues.Add(partResult);
                allConstants &= partResult is IComputedConstant;
            }

            result = Create(resultValues, operators, converter, allConstants);
            return result != null;
        }

        public static IComputedValue Create(IList<IComputedValue> values, IList<CalcOperator> operators, StyleConverterBase converter, bool? allConstants = null)
        {
            if (!allConstants.HasValue) allConstants = values.All(x => x is IComputedConstant);

            if (allConstants.Value)
            {
                var constants = values.OfType<IComputedConstant>().Select(x => x.ConstantValue).ToArray();

                var res = Evaluate(constants, operators);
                if (res.HasValue) return new ComputedConstant(res.Value);
                return null;
            }

            return new ComputedCalc(values, operators, converter);
        }

        private static float? Evaluate(IList<object> values, IList<CalcOperator> operators, bool multiplyPass = true)
        {
            if (values.Count == 0) return null;

            if (!(values[0] is float f)) return null;

            var value = f;

            var nextObjects = new List<object>();
            var nextOps = new List<CalcOperator>();

            for (int i = 1; i < values.Count; i++)
            {
                var cur = values[i];
                var op = operators[i - 1];

                if (!(cur is float c)) return null;

                if (!multiplyPass)
                {
                    switch (op)
                    {
                        case CalcOperator.Add:
                            value += c;
                            break;
                        case CalcOperator.Subtract:
                            value -= c;
                            break;
                        case CalcOperator.None:
                        default:
                            return null;
                    }
                }
                else
                {

                    switch (op)
                    {
                        case CalcOperator.Multiply:
                            value *= c;
                            break;
                        case CalcOperator.Divide:
                            if (c == 0) return null;
                            value /= c;
                            break;
                        case CalcOperator.Add:
                        case CalcOperator.Subtract:
                            nextObjects.Add(value);
                            nextOps.Add(op);
                            value = c;
                            break;
                        case CalcOperator.None:
                        default:
                            return null;
                    }
                }
            }

            if (multiplyPass)
            {
                nextObjects.Add(value);
                return Evaluate(nextObjects, nextOps, false);
            }

            return value;
        }
    }
}
