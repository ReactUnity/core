#if !JSB_UNITYLESS
using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Unity
{
    public class UnityBindingUtils : Binding.IBindingUtils
    {
        public string ReplacePathVars(string value)
        {
            return Unity.UnityHelper.ReplacePathVars(value);
        }

        public bool IsExplicitEditorType(Type type)
        {
            return Unity.UnityHelper.IsExplicitEditorType(type);
        }
    }
}
#endif