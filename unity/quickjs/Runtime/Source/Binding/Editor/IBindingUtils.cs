using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    public interface IBindingUtils
    {
        string ReplacePathVars(string value);

        bool IsExplicitEditorType(Type type);
    }

    public class DefaultBindingUtils : IBindingUtils
    {
        public string ReplacePathVars(string value)
        {
            value = value.Replace("${platform}", "unityless");
            return value;
        }

        public bool IsExplicitEditorType(Type type)
        {
            return false;
        }
    }
}