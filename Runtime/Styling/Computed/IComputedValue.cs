using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// Computed values are a mechanism required to implement some advanced CSS features.
    /// In CSS, some values depend on the runtime conditions, and cannot be determined statically.
    /// Example to such values are: var(..), currentColor, em, rem, calc(..) and some percentage values.
    /// A computed value will be evaluated just-in-time and return the actual value of the property.
    /// A computed value can also return another computed value, thus creating a chain of computed values,
    /// which needs to be resolved until an actual value is received.
    /// </summary>
    public interface IComputedValue
    {
        object GetValue(IStyleProperty targetProp, NodeStyle targetStyle, IStyleConverter converter);
    }

    public interface IComputedConstant
    {
        object ConstantValue { get; }
    }

    public static class ComputedValueExtensions
    {
        static public object ResolveValue(this IComputedValue cv, IStyleProperty targetProp, NodeStyle targetStyle, IStyleConverter converter)
        {
            object value = cv;

            var loop = 0;
            while (value is IComputedValue vl)
            {
                if (loop > 16)
                {
                    throw new System.Exception("Endless loop of computed value detected");
                }

                value = vl.GetValue(targetProp, targetStyle, converter);

                loop++;
            }

            return value;
        }
    }
}
