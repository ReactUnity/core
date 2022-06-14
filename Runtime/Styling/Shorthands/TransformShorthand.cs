using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    internal class TransformShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.translate,
            StyleProperties.translateZ,
            StyleProperties.rotate,
            StyleProperties.scale,
        };

        public TransformShorthand(string name) : base(name) { }

        private YogaValue SumYogaValues(YogaValue lhs, YogaValue rhs)
        {
            if (lhs.Unit != rhs.Unit) return rhs;

            if (lhs.Unit == YogaUnit.Point) return YogaValue.Point(lhs.Value + rhs.Value);
            if (lhs.Unit == YogaUnit.Percent) return YogaValue.Percent(lhs.Value + rhs.Value);
            return YogaValue.Point(0);
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            // TODO: handle computed variables

            var calls = ParserHelpers.SplitWhitespace(value?.ToString());
            var count = calls.Count;

            var translate = YogaValue2.Zero;
            var scale = Vector3.one;
            var rotate = Quaternion.identity;
            var z = YogaValue.Point(0);

            for (int ci = 0; ci < count; ci++)
            {
                var expression = calls[ci];

                if (string.IsNullOrWhiteSpace(expression)) continue;

                var (name, args, argsCombined) = ParserHelpers.ParseFunction(expression);

                var argCount = args.Length;

                object xArg, yArg, zArg;

                if (args == null || argCount == 0) continue;

                switch (name)
                {
                    case "translate":
                        if (argCount > 2) continue;
                        xArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[0], YogaValue.Point(0));
                        if (xArg is YogaValue xv) translate = new YogaValue2(SumYogaValues(translate.X, xv), translate.Y);

                        if (argCount > 1)
                        {
                            yArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[1], YogaValue.Point(0));
                            if (yArg is YogaValue yv) translate = new YogaValue2(translate.X, SumYogaValues(translate.Y, yv));
                        }

                        break;
                    case "translate3d":
                        if (argCount != 3) continue;
                        xArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[0], YogaValue.Point(0));
                        yArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[1], YogaValue.Point(0));
                        zArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[2], YogaValue.Point(0));

                        if (xArg is YogaValue xv3) translate = new YogaValue2(SumYogaValues(translate.X, xv3), translate.Y);
                        if (yArg is YogaValue yv3) translate = new YogaValue2(translate.X, SumYogaValues(translate.Y, yv3));
                        if (zArg is YogaValue zv3) z = SumYogaValues(z, zv3);

                        break;
                    case "translateX":
                        if (argCount != 1) continue;

                        xArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[0], YogaValue.Point(0));
                        if (xArg is YogaValue xv1) translate = new YogaValue2(SumYogaValues(translate.X, xv1), translate.Y);

                        break;
                    case "translateY":
                        if (argCount != 1) continue;

                        yArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[0], YogaValue.Point(0));
                        if (yArg is YogaValue yv1) translate = new YogaValue2(translate.X, SumYogaValues(translate.Y, yv1));

                        break;
                    case "translateZ":
                        if (argCount != 1) continue;

                        zArg = AllConverters.YogaValueConverter.TryGetConstantValue(args[0], YogaValue.Point(0));
                        if (zArg is YogaValue zv1) z = SumYogaValues(z, zv1);

                        break;
                    case "rotate":
                    case "rotateZ":
                        if (argCount != 1) continue;

                        zArg = AllConverters.AngleConverter.TryGetConstantValue(args[0], 0f);
                        if (zArg is float rz1) rotate *= Quaternion.Euler(0, 0, rz1);

                        break;
                    case "rotate3d":
                        if (argCount != 3) continue;
                        xArg = AllConverters.AngleConverter.TryGetConstantValue(args[0], 0f);
                        yArg = AllConverters.AngleConverter.TryGetConstantValue(args[1], 0f);
                        zArg = AllConverters.AngleConverter.TryGetConstantValue(args[2], 0f);
                        if (xArg is float rx3 && yArg is float ry3 && zArg is float rz3)
                            rotate *= Quaternion.Euler(rx3, ry3, rz3);

                        break;
                    case "rotateX":
                        if (argCount != 1) continue;

                        xArg = AllConverters.AngleConverter.TryGetConstantValue(args[0], 0f);
                        if (xArg is float rx1) rotate *= Quaternion.Euler(rx1, 0, 0);
                        break;
                    case "rotateY":
                        if (argCount != 1) continue;

                        yArg = AllConverters.AngleConverter.TryGetConstantValue(args[0], 0f);
                        if (yArg is float ry1) rotate *= Quaternion.Euler(0, ry1, 0);
                        break;
                    case "scale":
                        if (argCount > 2) continue;
                        xArg = AllConverters.FloatConverter.TryGetConstantValue(args[0], 0f);
                        if (xArg is float xs) scale = new Vector3(scale.x * xs, scale.y, scale.z);

                        if (argCount > 1)
                        {
                            yArg = AllConverters.FloatConverter.TryGetConstantValue(args[1], 0f);
                            if (yArg is float ys) scale = new Vector3(scale.x, scale.y * ys, scale.z);
                        }
                        else if (xArg is float ys) scale = new Vector3(scale.x, scale.y * ys, scale.z);

                        break;
                    case "scale3d":
                        if (argCount != 3) continue;
                        xArg = AllConverters.FloatConverter.TryGetConstantValue(args[0], 1f);
                        yArg = AllConverters.FloatConverter.TryGetConstantValue(args[1], 1f);
                        zArg = AllConverters.FloatConverter.TryGetConstantValue(args[2], 1f);

                        if (xArg is float xs3) scale = new Vector3(scale.x * xs3, scale.y, scale.z);
                        if (yArg is float ys3) scale = new Vector3(scale.x, scale.y * ys3, scale.z);
                        if (zArg is float zs3) scale = new Vector3(scale.x, scale.y, scale.z * zs3);

                        break;
                    case "scaleX":
                        if (argCount != 1) continue;
                        xArg = AllConverters.FloatConverter.TryGetConstantValue(args[0], 1f);
                        if (xArg is float xs1) scale = new Vector3(scale.x * xs1, scale.y, scale.z);
                        break;
                    case "scaleY":
                        if (argCount != 1) continue;
                        xArg = AllConverters.FloatConverter.TryGetConstantValue(args[0], 1f);
                        if (xArg is float ys1) scale = new Vector3(scale.x, scale.y * ys1, scale.z);
                        break;
                    case "scaleZ":
                        if (argCount != 1) continue;
                        xArg = AllConverters.FloatConverter.TryGetConstantValue(args[0], 1f);
                        if (xArg is float zs1) scale = new Vector3(scale.x, scale.y, scale.z * zs1);
                        break;
                    default:
                        break;
                }
            }

            collection[StyleProperties.translate] = translate;
            collection[StyleProperties.translateZ] = z;
            collection[StyleProperties.rotate] = rotate.eulerAngles;
            collection[StyleProperties.scale] = scale;

            return ModifiedProperties;
        }
    }
}
