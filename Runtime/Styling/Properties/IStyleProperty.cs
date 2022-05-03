using System;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling
{
    public interface IStyleProperty : IStyleKey, IStyleConverter
    {
        string name { get; }
        Type type { get; }
        object defaultValue { get; }
        bool transitionable { get; }
        bool inherited { get; }
        bool affectsLayout { get; }
        object GetStyle(NodeStyle style);
    }
}
