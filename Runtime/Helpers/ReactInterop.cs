#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ReactUnity.Scripting;

namespace ReactUnity.Helpers
{
    public class ReactInterop : Dictionary<string, object>, IDisposable
#if REACT_CLEARSCRIPT
        , Microsoft.ClearScript.IPropertyBag
#endif
    {
        private IJavaScriptEngine Engine;

        public ReactInterop(IJavaScriptEngine engine)
        {
            Engine = engine;
        }

        public void InitializeDefault()
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            Add("System", Engine.CreateNamespaceReference("System", typeof(object).Assembly));
            Add("UnityEngine", Engine.CreateNamespaceReference("UnityEngine", assemblies.Where(x => x.FullName.StartsWith("UnityEngine.")).ToArray()));
            Add("ReactUnity", Engine.CreateNamespaceReference("ReactUnity", assemblies.Where(x => x.FullName.StartsWith("ReactUnity.")).ToArray()));
            Add("Facebook", Engine.CreateNamespaceReference("Facebook", typeof(Facebook.Yoga.YogaValue).Assembly));
#if UNITY_EDITOR
            Add("UnityEditor", Engine.CreateNamespaceReference("UnityEditor", assemblies.Where(x => x.FullName.StartsWith("UnityEditor.")).ToArray()));
#endif
            Add("GetType", new Func<string, object>(GetType));
            Add("GetNamespace", new Func<string, object>(GetNamespace));
        }

        public object GetType(string typeName)
        {
            return Engine.CreateTypeReference(ReflectionHelpers.FindType(typeName, true));
        }

        public object GetNamespace(string nsName)
        {
            return Engine.CreateNamespaceReference(nsName);
        }

        public object GetNamespace(string nsName, Assembly assembly)
        {
            return Engine.CreateNamespaceReference(nsName, assembly);
        }

        public object AddType<T>(string name)
        {
            return AddType(name, typeof(T));
        }

        public object AddType(string name, Type type)
        {
            var typeRef = Engine.CreateTypeReference(type);
            this[name] = typeRef;
            return typeRef;
        }

        public object AddNamespace(string name, string nsName, params Assembly[] assemblies)
        {
            var nsRef = Engine.CreateNamespaceReference(nsName, assemblies);
            this[name] = nsRef;
            return nsRef;
        }

        public void Dispose()
        {
            Clear();
        }
    }
}
