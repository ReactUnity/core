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

        public struct CalcValue
        {
            public float Value;
            public bool HasUnit;
        }

        public IList<IComputedValue> Values;
        public IList<CalcOperator> Operators;
        public StyleConverterBase Converter;
        public bool AllowUnitless;

        public ComputedCalc(IList<IComputedValue> values, IList<CalcOperator> operators, StyleConverterBase converter)
        {
            Values = values;
            Operators = operators;

            if (converter is FloatConverter ff)
            {
                Converter = ff.CalcConverter;
                AllowUnitless = ff.AllowSuffixless;
            }
            else if (converter is CalcConverter cc)
            {
                Converter = converter;
                AllowUnitless = cc.AllowsUnitless;
            }
            else
            {
                Converter = converter;
                AllowUnitless = true;
            }
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

            var res = Evaluate(results, Operators, AllowUnitless, true);
            if (res.HasValue) return res.Value;
            return null;
        }

        public static bool Create(out IComputedValue result, List<object> values, IList<CalcOperator> operators, StyleConverterBase converter)
        {
            var resultValues = new List<IComputedValue>();
            var allConstants = true;

            if (converter is FloatConverter fc) converter = fc.CalcConverter;

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

                var allowUnitless = true;
                if (converter is FloatConverter ff) allowUnitless = ff.AllowSuffixless;
                else if (converter is CalcConverter cc) allowUnitless = cc.AllowsUnitless;
                else allowUnitless = true;

                var res = Evaluate(constants, operators, allowUnitless, true);
                if (res.HasValue) return new ComputedConstant(res.Value);
                return null;
            }

            return new ComputedCalc(values, operators, converter);
        }

        private static float? Evaluate(IList<object> values, IList<CalcOperator> operators, bool allowUnitless, bool multiplyPass)
        {
            if (values.Count == 0) return null;

            bool hasUnit;
            float value;

            if (values[0] is float f)
            {
                value = f;
                hasUnit = false;
            }
            else if (values[0] is CalcValue cv)
            {
                value = cv.Value;
                hasUnit = cv.HasUnit;
            }
            else return null;

            var nextObjects = new List<object>();
            var nextOps = new List<CalcOperator>();

            for (int i = 1; i < values.Count; i++)
            {
                var cur = values[i];
                var op = operators[i - 1];
                bool curHasUnit;
                float curValue;

                if (cur is float ff)
                {
                    curValue = ff;
                    curHasUnit = false;
                }
                else if (cur is CalcValue cvv)
                {
                    curValue = cvv.Value;
                    curHasUnit = cvv.HasUnit;
                }
                else return null;


                if (!multiplyPass)
                {
                    switch (op)
                    {
                        case CalcOperator.Add:
                            value += curValue;
                            if (!allowUnitless && (hasUnit != curHasUnit)) return null;
                            hasUnit = hasUnit && curHasUnit;
                            break;
                        case CalcOperator.Subtract:
                            value -= curValue;
                            if (!allowUnitless && (hasUnit != curHasUnit)) return null;
                            hasUnit = hasUnit && curHasUnit;
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
                            value *= curValue;
                            if (!allowUnitless && hasUnit && curHasUnit) return null;
                            hasUnit = hasUnit || curHasUnit;
                            break;
                        case CalcOperator.Divide:
                            if (curValue == 0) return null;
                            value /= curValue;
                            if (curHasUnit) return null;
                            hasUnit = hasUnit || curHasUnit;
                            break;
                        case CalcOperator.Add:
                        case CalcOperator.Subtract:
                            nextObjects.Add(new CalcValue
                            {
                                Value = value,
                                HasUnit = hasUnit,
                            });
                            nextOps.Add(op);
                            value = curValue;
                            break;
                        case CalcOperator.None:
                        default:
                            return null;
                    }
                }
            }

            if (multiplyPass)
            {
                nextObjects.Add(new CalcValue
                {
                    Value = value,
                    HasUnit = hasUnit,
                });
                return Evaluate(nextObjects, nextOps, allowUnitless, false);
            }

            if (!allowUnitless && !hasUnit) return null;

            return value;
        }
    }
}
