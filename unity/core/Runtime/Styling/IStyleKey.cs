using System.Collections.Generic;

namespace ReactUnity.Styling
{
    public interface IStyleKey
    {
        List<IStyleProperty> ModifiedProperties { get; }
        List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value);
    }
}
