using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// The CSS math functions beyond min()/max()/clamp(): round() with its strategies, mod(), rem(),
    /// abs(), sign(), the trigonometric set and the exponential set. Every argument is a calc()
    /// expression, and all-constant inputs fold at parse time.
    /// </summary>
    internal class MathFunction : ICssFunction
    {
        public string Name { get; } = "round";

        internal static readonly Dictionary<string, ComputedMath.Op> Ops = new Dictionary<string, ComputedMath.Op>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "round", ComputedMath.Op.Round },
            { "mod", ComputedMath.Op.Mod },
            { "rem", ComputedMath.Op.Rem },
            { "abs", ComputedMath.Op.Abs },
            { "sign", ComputedMath.Op.Sign },
            { "sin", ComputedMath.Op.Sin },
            { "cos", ComputedMath.Op.Cos },
            { "tan", ComputedMath.Op.Tan },
            { "asin", ComputedMath.Op.Asin },
            { "acos", ComputedMath.Op.Acos },
            { "atan", ComputedMath.Op.Atan },
            { "atan2", ComputedMath.Op.Atan2 },
            { "pow", ComputedMath.Op.Pow },
            { "sqrt", ComputedMath.Op.Sqrt },
            { "hypot", ComputedMath.Op.Hypot },
            { "log", ComputedMath.Op.Log },
            { "exp", ComputedMath.Op.Exp },
        };

        private static readonly Dictionary<string, ComputedMath.Rounding> Strategies = new Dictionary<string, ComputedMath.Rounding>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "nearest", ComputedMath.Rounding.Nearest },
            { "up", ComputedMath.Rounding.Up },
            { "down", ComputedMath.Rounding.Down },
            { "to-zero", ComputedMath.Rounding.ToZero },
        };

        // A trigonometric argument is an angle or a bare number of radians, whatever the property is.
        private static readonly FloatConverter RadianConverter = new FloatConverter(new Dictionary<string, float>
        {
            { "rad", 1 },
            { "deg", Mathf.Deg2Rad },
            { "grad", Mathf.PI / 200 },
            { "turn", 2 * Mathf.PI },
        });

        public bool CanHandleArguments(int count, string name, string[] args)
        {
            if (!Ops.TryGetValue(name, out var op)) return false;

            switch (op)
            {
                case ComputedMath.Op.Round: return count >= 1 && count <= 3;
                case ComputedMath.Op.Mod:
                case ComputedMath.Op.Rem:
                case ComputedMath.Op.Atan2:
                case ComputedMath.Op.Pow: return count == 2;
                case ComputedMath.Op.Log: return count == 1 || count == 2;
                case ComputedMath.Op.Hypot: return count >= 1;
                default: return count == 1;
            }
        }

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var op = Ops[name];
            var strategy = ComputedMath.Rounding.Nearest;
            var start = 0;

            if (op == ComputedMath.Op.Round && args.Length > 1 && Strategies.TryGetValue(args[0].Trim(), out strategy)) start = 1;
            else if (op == ComputedMath.Op.Round && args.Length == 3) return null;

            var values = ParseOperands(args, start, op, converter);
            if (values == null) return null;

            return ComputedMath.Create(values, op, strategy);
        }

        // The property's own converter reads every operand, so round(10px, 4px) sees lengths. When it
        // refuses one, all of them are read as plain numbers instead: mod(7, 3) inside a calc() on a
        // duration is fine, where round(1s, 1) mixes a duration and a number and is not.
        private static List<IComputedValue> ParseOperands(string[] args, int start, ComputedMath.Op op, StyleConverterBase converter)
        {
            var values = new List<IComputedValue>(args.Length - start);
            var numeric = OperandConverter(op) ?? converter;

            for (int i = start; i < args.Length; i++)
            {
                var parsed = numeric == null ? null : CalcFunction.Parse(args[i].Trim(), numeric) as IComputedValue;
                if (parsed == null)
                {
                    if (numeric == AllConverters.FloatConverter || OperandConverter(op) != null) return null;
                    return ParseOperands(args, start, op, AllConverters.FloatConverter);
                }
                values.Add(parsed);
            }

            return values;
        }

        // The converter an operation fixes for its operands, or null for the property's own.
        private static StyleConverterBase OperandConverter(ComputedMath.Op op)
        {
            switch (op)
            {
                case ComputedMath.Op.Sin:
                case ComputedMath.Op.Cos:
                case ComputedMath.Op.Tan:
                    // An angle, or a bare number of radians, whatever the property is.
                    return RadianConverter;

                case ComputedMath.Op.Asin:
                case ComputedMath.Op.Acos:
                case ComputedMath.Op.Atan:
                case ComputedMath.Op.Pow:
                case ComputedMath.Op.Sqrt:
                case ComputedMath.Op.Log:
                case ComputedMath.Op.Exp:
                    // Plain numbers, whatever the property's own unit is.
                    return AllConverters.FloatConverter;

                default:
                    return null;
            }
        }
    }
}
