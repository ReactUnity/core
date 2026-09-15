using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Utils
{
    /// <summary>Assembly lookups that ask Unity rather than the AppDomain.</summary>
    ///
    /// Unity loads assemblies from a stream, so the AppDomain's list can still hold ones it has
    /// since unloaded, and every Assembly.Location comes back empty.
    public static class AssemblyUtils
    {
        public static IReadOnlyList<Assembly> GetLoadedAssemblies()
        {
#if UNITY_6000_4_OR_NEWER
            return UnityEngine.Assemblies.CurrentAssemblies.GetLoadedAssemblies();
#else
            return System.AppDomain.CurrentDomain.GetAssemblies();
#endif
        }

        /// <summary>The file the assembly was loaded from, or null/empty when that is not known.</summary>
        public static string GetLocation(Assembly assembly)
        {
#if UNITY_6000_4_OR_NEWER
            return UnityEngine.AssemblyExtension.GetLoadedAssemblyPath(assembly);
#else
            return assembly.Location;
#endif
        }
    }
}
