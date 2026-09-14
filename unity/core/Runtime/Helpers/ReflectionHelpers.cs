using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ReactUnity.Helpers
{
    public static class ReflectionHelpers
    {
        /// <summary>The assemblies Unity currently has loaded.</summary>
        ///
        /// Not the same list as the AppDomain's, which can still hold assemblies Unity has since
        /// unloaded -- reflecting over one of those leaks it, or throws.
        public static IReadOnlyList<Assembly> GetLoadedAssemblies()
        {
#if UNITY_6000_4_OR_NEWER
            return UnityEngine.Assemblies.CurrentAssemblies.GetLoadedAssemblies();
#else
            return AppDomain.CurrentDomain.GetAssemblies();
#endif
        }

        public static Type FindType(string fullName, bool ignoreCase = false, bool searchAllAssemblies = true)
        {
            var type = Type.GetType(fullName, false, ignoreCase);
            if (type != null) return type;

            if (!searchAllAssemblies) return null;

            return GetLoadedAssemblies()
                .Where(a => !a.IsDynamic)
                .Select(a => a.GetType(fullName, false, ignoreCase))
                .FirstOrDefault(t => t != null);
        }
    }
}
