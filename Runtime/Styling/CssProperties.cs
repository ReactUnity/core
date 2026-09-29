using System;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Helpers;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Styling
{
    public static class CssProperties
    {
        public static readonly Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>(StringComparer.OrdinalIgnoreCase);
        public static readonly HashSet<IStyleProperty> TransitionableProperties = new HashSet<IStyleProperty>();
        // Custom property names are case-sensitive, as VariableProperty's equality is.
        private static readonly Dictionary<string, VariableProperty> VariableProperties = new Dictionary<string, VariableProperty>(StringComparer.Ordinal);
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
            if (name.FastStartsWith("--")) return GetVariable(name);
            if (PropertyMap.TryGetValue(StripVendorPrefix(name), out var style)) return style;
            return null;
        }

        /// <summary>
        /// The one instance for a custom property name, so a declaration block probed for it compares
        /// references instead of names.
        /// </summary>
        internal static VariableProperty GetVariable(string name)
        {
            if (VariableProperties.TryGetValue(name, out var val)) return val;
            return VariableProperties[name] = new VariableProperty(name);
        }

        // Every declaration of a sheet looks its name up, and a case-insensitive map folds each character to hash it.
        private static readonly Dictionary<string, IStyleKey> Keys = new Dictionary<string, IStyleKey>(StringComparer.Ordinal);
        private const int KeysLimit = 4096;

        public static IStyleKey GetKey(string name)
        {
            if (Keys.TryGetValue(name, out var known)) return known;

            IStyleKey key = AllShorthands.GetShorthand(StripVendorPrefix(name));
            if (key == null) key = GetProperty(name);
            // An unknown name is not kept, since PropertyMap is public and may yet learn it.
            if (key == null) return null;

            if (Keys.Count >= KeysLimit) Keys.Clear();
            return Keys[name] = key;
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
