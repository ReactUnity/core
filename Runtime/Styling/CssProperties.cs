using System;
using System.Collections.Generic;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Styling
{
    public static class CssProperties
    {
        public static readonly Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>(StringComparer.InvariantCultureIgnoreCase);
        public static readonly HashSet<IStyleProperty> TransitionableProperties = new HashSet<IStyleProperty>();
        private static readonly Dictionary<string, VariableProperty> VariableProperties = new Dictionary<string, VariableProperty>(StringComparer.InvariantCultureIgnoreCase);

        static CssProperties()
        {
            foreach (var kv in StyleProperties.PropertyMap) PropertyMap[kv.Key] = kv.Value;
            foreach (var kv in LayoutProperties.PropertyMap) PropertyMap[kv.Key] = kv.Value;

            foreach (var kv in PropertyMap)
            {
                if (kv.Value.transitionable) TransitionableProperties.Add(kv.Value);
            }
        }

        public static IStyleProperty GetProperty(string name)
        {
            if (name.StartsWith("--"))
            {
                if (VariableProperties.TryGetValue(name, out var val)) return val;
                return VariableProperties[name] = new VariableProperty(name);
            }
            PropertyMap.TryGetValue(name, out var style);
            return style;
        }

        public static IStyleKey GetKey(string name)
        {
            var prop = AllShorthands.GetShorthand(name);
            if (prop == null) return GetProperty(name);
            return prop;
        }
    }
}
