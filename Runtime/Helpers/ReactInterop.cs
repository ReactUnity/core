#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections.Concurrent;
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
        private readonly IJavaScriptEngine Engine;
        ConcurrentDictionary<string, object> typeCache = new ConcurrentDictionary<string, object>();
        ConcurrentDictionary<string, object> namespaceCache = new ConcurrentDictionary<string, object>();


        public ReactInterop(IJavaScriptEngine engine)
        {
            Engine = engine;
        }

        public void InitializeDefault()
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            Add("System", Engine.CreateNamespaceReference("System", typeof(object).Assembly));
            Add("UnityEngine", Engine.CreateNamespaceReference("UnityEngine", assemblies.Where(x => x.FullName.FastStartsWith("UnityEngine.")).ToArray()));
            Add("ReactUnity", Engine.CreateNamespaceReference("ReactUnity", assemblies.Where(x => x.FullName.FastStartsWith("ReactUnity.")).ToArray()));
            Add("Yoga", Engine.CreateNamespaceReference("Yoga", typeof(Yoga.YogaValue).Assembly));
#if UNITY_EDITOR
            Add("UnityEditor", Engine.CreateNamespaceReference("UnityEditor", assemblies.Where(x => x.FullName.FastStartsWith("UnityEditor.")).ToArray()));
#endif
            Add("GetType", new Func<string, object>(GetType));
            Add("GetNamespace", new Func<string, object>(GetNamespace));
            Add("MakeGenericType", new Func<Type, Type[], object>(MakeGenericType));
        }

        public object GetType(string typeName) => typeCache.GetOrAdd(typeName, CreateType);
        private object CreateType(string typeName) => Engine.CreateTypeReference(ReflectionHelpers.FindType(typeName, true));

        public object GetNamespace(string nsName) => namespaceCache.GetOrAdd(nsName, CreateNamespace);
        private object CreateNamespace(string nsName) => Engine.CreateNamespaceReference(nsName);

        public object GetNamespace(string nsName, Assembly assembly)
        {
            return Engine.CreateNamespaceReference(nsName, assembly);
        }

        public object AddType<T>(string name) => AddType(name, typeof(T));

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

        public object MakeGenericType(Type type, Type[] types)
        {
            return Engine.CreateTypeReference(type.MakeGenericType(types));
        }

        public void Dispose()
        {
            Clear();
        }
    }
}
