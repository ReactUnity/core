using System.Collections.Generic;

namespace ReactUnity.Styling
{
    public interface IStyleModifier
    {
        List<IStyleProperty> ModifiedProperties { get; }
        List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value);
    }
}
