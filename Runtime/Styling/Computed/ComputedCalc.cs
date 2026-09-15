using System.Collections.Generic;
using System.Linq;
using Yoga;
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

            /// <summary>
            /// Percentage points, carried apart from <see cref="Value"/> rather than resolved on
            /// sight. Yoga has no calc(), but it does have a percentage unit -- so a calculation
            /// that comes out as a pure percentage, which is every fraction utility a CSS framework
            /// emits (`calc(1/2 * 100%)`), can be handed to it exactly.
            /// </summary>
            public float Percent;

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
                // Resolved as a calc operand rather than as the property's own value, so that a
                // var() holding `100%` arrives here as a percentage term and not as a bare number.
                var computed = value?.ResolveValue(prop, style, Converter ?? converter);
                if (computed == null) return null;
                results.Add(computed);
            }

            var res = Evaluate(results, Operators, AllowUnitless, true);
            return Materialize(res, Converter, prop, style, converter);
        }

        /// <summary>
        /// What a finished calculation is worth: a percentage where nothing but percentages
        /// survived, a plain length where nothing did, and nothing at all where both did -- there
        /// is no Yoga value for `100% - 10px`, and a wrong number is worse than a dropped one.
        /// </summary>
        private static object Materialize(CalcValue? res, StyleConverterBase converter, IStyleProperty prop, NodeStyle style, IStyleConverter outerConverter)
        {
            if (!res.HasValue) return null;
            var val = res.Value;

            if (val.Percent != 0)
            {
                if (val.Value != 0)
                {
                    StyleDiagnostics.Dropped(prop?.name ?? "calc()", $"calc({val.Percent}% + {val.Value}px)",
                        "A calculation mixing a percentage with a length has no layout value to resolve to.");
                    return null;
                }
                return YogaValue.Percent(val.Percent);
            }

            if (val.HasUnit) return val.Value;
            return Suffixless(val.Value, converter).ResolveValue(prop, style, outerConverter);
        }

        /// <summary>
        /// What is left of a calculation with no unit in it is a plain number, which is not always a
        /// length: `line-height: calc(1.5 * 2)` is three times the font size. The base converter says.
        /// </summary>
        private static IComputedValue Suffixless(float value, StyleConverterBase converter)
        {
            var fc = converter is CalcConverter cc ? cc.BaseConverter : converter as FloatConverter;
            if (fc == null) return new ComputedConstant(value);
            return fc.Suffixless(value);
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
                if (!res.HasValue) return null;
                var val = res.Value;

                if (val.Percent != 0)
                {
                    if (val.Value != 0) return null;
                    return new ComputedConstant(YogaValue.Percent(val.Percent));
                }

                if (val.HasUnit) return new ComputedConstant(val.Value);
                return Suffixless(val.Value, converter);
            }

            return new ComputedCalc(values, operators, converter);
        }

        /// <summary>
        /// A length or a percentage as a calculation term. This is what a sub-expression that has
        /// already been worked out comes back as, so it has to be an operand again as it stands.
        /// </summary>
        internal static CalcValue? FromYoga(YogaValue value)
        {
            if (value.Unit == YogaUnit.Point) return new CalcValue { Value = value.Value, HasUnit = true };
            if (value.Unit == YogaUnit.Percent) return new CalcValue { Percent = value.Value, HasUnit = true };
            return null;
        }

        private static bool Read(object value, out CalcValue result)
        {
            if (value is float f)
            {
                result = new CalcValue { Value = f };
                return true;
            }

            if (value is CalcValue cv)
            {
                result = cv;
                return true;
            }

            // A parenthesised group is folded before the calculation around it is, and a group that
            // came out as a percentage was folded to a YogaValue -- which is every negative fraction
            // utility, `calc(calc(1 / 2 * 100%) * -1)`.
            if (value is YogaValue yoga)
            {
                var read = FromYoga(yoga);
                if (read.HasValue)
                {
                    result = read.Value;
                    return true;
                }
            }

            result = default;
            return false;
        }

        private static CalcValue? Evaluate(IList<object> values, IList<CalcOperator> operators, bool allowUnitless, bool multiplyPass)
        {
            if (values.Count == 0) return null;
            if (!Read(values[0], out var acc)) return null;

            var nextObjects = new List<object>();
            var nextOps = new List<CalcOperator>();

            for (int i = 1; i < values.Count; i++)
            {
                var op = operators[i - 1];
                if (!Read(values[i], out var cur)) return null;

                if (!multiplyPass)
                {
                    switch (op)
                    {
                        case CalcOperator.Add:
                        case CalcOperator.Subtract:
                            var sign = op == CalcOperator.Add ? 1 : -1;
                            acc.Value += sign * cur.Value;
                            acc.Percent += sign * cur.Percent;
                            if (!allowUnitless && (acc.HasUnit != cur.HasUnit)) return null;
                            acc.HasUnit = acc.HasUnit && cur.HasUnit;
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
                            // One side has to be a plain number: a percentage of a percentage is not
                            // a quantity, and neither is an area.
                            if (acc.Percent != 0 && cur.Percent != 0) return null;
                            if (!allowUnitless && acc.HasUnit && cur.HasUnit) return null;
                            acc.Percent = acc.Percent * cur.Value + cur.Percent * acc.Value;
                            acc.Value *= cur.Value;
                            acc.HasUnit = acc.HasUnit || cur.HasUnit;
                            break;
                        case CalcOperator.Divide:
                            if (cur.Value == 0) return null;
                            if (cur.HasUnit || cur.Percent != 0) return null;
                            acc.Value /= cur.Value;
                            acc.Percent /= cur.Value;
                            break;
                        case CalcOperator.Add:
                        case CalcOperator.Subtract:
                            nextObjects.Add(acc);
                            nextOps.Add(op);
                            acc = cur;
                            break;
                        case CalcOperator.None:
                        default:
                            return null;
                    }
                }
            }

            if (multiplyPass)
            {
                nextObjects.Add(acc);
                return Evaluate(nextObjects, nextOps, allowUnitless, false);
            }

            if (!allowUnitless && !acc.HasUnit) return null;

            // CSS Values 4: a top-level calculation that comes out as NaN or an infinity takes the
            // largest value the implementation supports instead. Left as they are, `infinity * 1px`
            // -- which is what `rounded-full` compiles to -- turns into NaN the moment anything
            // scales it, and a NaN radius paints no element at all.
            acc.Value = FloatConverter.Finite(acc.Value);
            acc.Percent = FloatConverter.Finite(acc.Percent);

            return acc;
        }
    }
}
