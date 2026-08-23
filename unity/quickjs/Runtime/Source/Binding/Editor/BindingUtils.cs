using System;
using System.Collections.Generic;
using System.Linq;

namespace QuickJS.Binding
{
    /// The naming and type helpers the reflect-binding path needs. They used to live in
    /// `CodeGenUtils` alongside the runtime C# compiler, which went with the codegen.
    public static class BindingUtils
    {
        /// <summary>
        /// Check if the type directly implements the given interface
        /// </summary>
        public static bool IsDirectlyImplements(Type type, Type interfaceType)
        {
            return type.BaseType != null && interfaceType.IsAssignableFrom(type) && !interfaceType.IsAssignableFrom(type.BaseType);
        }

        public static string Normalize(string name)
        {
            var gArgIndex = name.IndexOf("<");
            return gArgIndex < 0 ? name : name.Substring(0, gArgIndex);
        }

        public static string[] NormalizeEx(string[] values, string additional)
        {
            var list = new List<string>(values.Length + 1);
            list.AddRange(values);
            list.Add(additional);
            return Normalize(list.ToArray());
        }

        public static string[] Normalize(params string[] values)
        {
            return (from value in values where !string.IsNullOrEmpty(value) select value).ToArray();
        }

        public static string Concat(string sp, params string[] values)
        {
            return string.Join(sp, Normalize(values));
        }
    }
}
