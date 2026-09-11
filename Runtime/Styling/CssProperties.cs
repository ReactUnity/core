using System;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Helpers;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Styling
{
    public static class CssProperties
    {
        public static readonly Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>(StringComparer.InvariantCultureIgnoreCase);
        public static readonly HashSet<IStyleProperty> TransitionableProperties = new HashSet<IStyleProperty>();
        private static readonly Dictionary<string, VariableProperty> VariableProperties = new Dictionary<string, VariableProperty>(StringComparer.InvariantCultureIgnoreCase);
        public static readonly List<IStyleProperty> AllProperties;

        static CssProperties()
        {
            foreach (var kv in StyleProperties.PropertyMap) PropertyMap[kv.Key] = kv.Value;
            foreach (var kv in LayoutProperties.PropertyMap) PropertyMap[kv.Key] = kv.Value;
            foreach (var kv in SVGProperties.PropertyMap) PropertyMap[kv.Key] = kv.Value;

            var allProperties = new HashSet<IStyleProperty>();

            foreach (var kv in PropertyMap)
            {
                allProperties.Add(kv.Value);
                if (kv.Value.transitionable) TransitionableProperties.Add(kv.Value);
            }
            AllProperties = allProperties.ToList();
        }

        public static IStyleProperty GetProperty(string name)
        {
            if (name.FastStartsWith("--"))
            {
                if (VariableProperties.TryGetValue(name, out var val)) return val;
                return VariableProperties[name] = new VariableProperty(name);
            }
            if (PropertyMap.TryGetValue(StripVendorPrefix(name), out var style)) return style;
            return null;
        }

        public static IStyleKey GetKey(string name)
        {
            var prop = AllShorthands.GetShorthand(StripVendorPrefix(name));
            if (prop == null) return GetProperty(name);
            return prop;
        }

        // `-webkit-line-clamp` is what Tailwind's `line-clamp-*` emits, and `-webkit-text-stroke` is
        // the only spelling of that property most people know. A custom property starts with two dashes.
        internal static string StripVendorPrefix(string name)
        {
            if (name.Length < 3 || name[0] != '-' || name[1] == '-') return name;
            var end = name.IndexOf('-', 1);
            return end < 0 ? name : name.Substring(end + 1);
        }
    }
}
