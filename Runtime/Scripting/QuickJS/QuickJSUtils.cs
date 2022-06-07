#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using QuickJS.Utils;
using UnityEngine;

namespace ReactUnity.Scripting
{
    internal class QuickJSLogger : IScriptLogger
    {
        public void WriteException(Exception exception)
        {
            try
            {
                Debug.LogException(exception);
                if (exception.InnerException != null)
                    Debug.LogException(exception.InnerException);
            }
            catch (Exception)
            {
            }
        }

        public void Write(LogLevel ll, string text)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (text.IndexOf("Codegen", StringComparison.InvariantCultureIgnoreCase) >= 0) return;
                    Debug.LogWarning(text);
                    return;
                case LogLevel.Error:
                    Debug.LogError(text);
                    return;
                case LogLevel.Info:
                    Debug.Log(text);
                    return;
                default:
                    Debug.Log(text);
                    return;
            }
        }

        public void Write(LogLevel ll, string text, params object[] args)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (text.IndexOf("Codegen", StringComparison.InvariantCultureIgnoreCase) >= 0) return;
                    Debug.LogWarningFormat(text, args);
                    return;
                case LogLevel.Error:
                    Debug.LogErrorFormat(text, args);
                    return;
                case LogLevel.Info:
                    Debug.LogFormat(text, args);
                    return;
                default:
                    Debug.LogFormat(text, args);
                    return;
            }
        }
    }

    public class QuickJSNamespaceReference : IDictionary<string, object>
    {
        QuickJSEngine _engine;
        Assembly[] _allowedAssemblies;
        private readonly string _path;

        public ICollection<string> Keys => new string[0];
        public ICollection<object> Values => new object[0];

        public int Count => 0;

        public bool IsReadOnly => true;

        public object this[string key]
        {
            get => Get(key);
            set { }
        }

        public QuickJSNamespaceReference(QuickJSEngine engine, string path, Assembly[] allowedAssemblies)
        {
            _engine = engine;
            _path = path;
            _allowedAssemblies = allowedAssemblies;
        }

        public object Get(string property)
        {
            var newPath = _path + "." + property;

            return GetPath(newPath);
        }

        public object GetPath(string path)
        {
            Type type;
            var lookupAssemblies = new[] { Assembly.GetCallingAssembly(), Assembly.GetExecutingAssembly() };

            foreach (var assembly in lookupAssemblies)
            {
                type = assembly.GetType(path);
                if (type != null)
                {
                    return _engine.CreateTypeReference(type);
                }
            }

            // search in lookup assemblies
            var comparedPath = path.Replace("+", ".");
            foreach (var assembly in _allowedAssemblies)
            {
                type = assembly.GetType(path);
                if (type != null)
                {
                    return _engine.CreateTypeReference(type);
                }

                var lastPeriodPos = path.LastIndexOf(".", StringComparison.Ordinal);
                var trimPath = path.Substring(0, lastPeriodPos);
                type = GetType(assembly, trimPath);
                if (type != null)
                {
                    foreach (Type nType in GetAllNestedTypes(type))
                    {
                        if (nType.FullName.Replace("+", ".").Equals(comparedPath))
                        {
                            return _engine.CreateTypeReference(nType);
                        }
                    }
                }
            }

            // search for type in mscorlib
            type = System.Type.GetType(path);
            if (type != null)
            {
                return _engine.CreateTypeReference(type);
            }

            // the new path doesn't represent a known class, thus return a new namespace instance
            return new QuickJSNamespaceReference(_engine, path, _allowedAssemblies);
        }

        /// <summary>   Gets a type. </summary>
        ///<remarks>Nested type separators are converted to '.' instead of '+' </remarks>
        /// <param name="assembly"> The assembly. </param>
        /// <param name="typeName"> Name of the type. </param>
        ///
        /// <returns>   The type. </returns>
        private static Type GetType(Assembly assembly, string typeName)
        {
            var compared = typeName.Replace("+", ".");
            Type[] types = assembly.GetTypes();
            foreach (Type t in types)
            {
                if (t.FullName.Replace("+", ".") == compared)
                {
                    return t;
                }
            }

            return null;
        }

        private static Type[] GetAllNestedTypes(Type type)
        {
            var types = new List<Type>();
            AddNestedTypesRecursively(types, type);
            return types.ToArray();
        }

        private static void AddNestedTypesRecursively(List<Type> types, Type type)
        {
            Type[] nestedTypes = type.GetNestedTypes(BindingFlags.Public);
            foreach (Type nestedType in nestedTypes)
            {
                types.Add(nestedType);
                AddNestedTypesRecursively(types, nestedType);
            }
        }

        public override string ToString()
        {
            return "[Namespace: " + _path + "]";
        }

        public void Add(string key, object value)
        {
        }

        public bool ContainsKey(string key)
        {
            return true;
        }

        public bool Remove(string key)
        {
            return false;
        }

        public bool TryGetValue(string key, out object value)
        {
            try
            {
                value = Get(key);
                return true;
            }
            catch
            {
                value = null;
                return false;
            }
        }

        public void Add(KeyValuePair<string, object> item)
        {
        }

        public void Clear()
        {
        }

        public bool Contains(KeyValuePair<string, object> item)
        {
            return true;
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
        }

        public bool Remove(KeyValuePair<string, object> item)
        {
            return false;
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return null;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return null;
        }
    }
}

#endif
