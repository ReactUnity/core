using System;

namespace ReactUnity.Styling
{
    public interface IStyleProperty : IStyleKey
    {
        string name { get; }
        Type type { get; }
        object defaultValue { get; }
        bool transitionable { get; }
        bool inherited { get; }
        bool affectsLayout { get; }
        object GetStyle(NodeStyle style);
        object Convert(object value);
    }
}
