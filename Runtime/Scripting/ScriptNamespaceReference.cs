#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ReactUnity.Scripting
{
    public class ScriptNamespaceReference :
        IDictionary<string, object>
#if REACT_CLEARSCRIPT
        , Microsoft.ClearScript.IPropertyBag
#endif
    {
        IJavaScriptEngine _engine;
        Assembly[] _allowedAssemblies;
        private readonly string _path;

        private ICollection<string> keys;
        public ICollection<string> Keys => keys ?? (keys = CalculateKeys());

        private ICollection<object> values;
        public ICollection<object> Values => values ?? (values = CalculateValues());

        public int Count => 0;

        public bool IsReadOnly => true;

        public object this[string key]
        {
            get => Get(key);
            set { }
        }

        public ScriptNamespaceReference(IJavaScriptEngine engine, string path, Assembly[] allowedAssemblies)
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

            var assemblies = _allowedAssemblies.Length > 0 ? _allowedAssemblies : AppDomain.CurrentDomain.GetAssemblies();
            foreach (var assembly in assemblies)
            {
                type = assembly.GetType(path);
                if (type != null)
                {
                    return _engine.CreateTypeReference(type);
                }

                var lastPeriodPos = path.LastIndexOf(".", StringComparison.Ordinal);
                var trimPath = path.Substring(lastPeriodPos + 1);
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
            return new ScriptNamespaceReference(_engine, path, _allowedAssemblies);
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

        private ICollection<string> CalculateKeys()
        {
            var lookupAssemblies = new[] { Assembly.GetCallingAssembly(), Assembly.GetExecutingAssembly() };

            IEnumerable<string> result = new List<string>();

            foreach (var assembly in lookupAssemblies)
            {
                result = result.Concat(GetKeysOfNamespaceInAssembly(assembly));
            }

            var assemblies = _allowedAssemblies.Length > 0 ? _allowedAssemblies : AppDomain.CurrentDomain.GetAssemblies();
            foreach (var assembly in assemblies)
            {
                result = result.Concat(GetKeysOfNamespaceInAssembly(assembly));
            }

            result = result.Concat(GetKeysOfNamespaceInAssembly(typeof(System.Type).Assembly));

            return result.Distinct().ToList();
        }

        private IEnumerable<string> GetKeysOfNamespaceInAssembly(Assembly assembly)
        {
            return assembly.GetTypes()
                ?.Where(x => x.Namespace == null ? string.IsNullOrWhiteSpace(_path) : x.Namespace.StartsWith(_path))
                ?.Select(x => x.FullName.Replace(_path + ".", ""))
                ?.Select(x => x.Contains('.') ? x.Substring(0, x.IndexOf('.')) : x)
                ?? new string[0];
        }

        private ICollection<object> CalculateValues()
        {
            return Keys.Select(Get).ToList();
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
