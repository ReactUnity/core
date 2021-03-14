using System;
using System.Linq;

namespace ReactUnity.Helpers
{
    public static class ReflectionHelpers
    {
        public static Type FindType(string fullName, bool ignoreCase = false, bool searchAllAssemblies = true)
        {
            var type = Type.GetType(fullName, false, ignoreCase);
            if (type != null) return type;

            if (!searchAllAssemblies) return null;

            return AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => !a.IsDynamic)
                .Select(a => a.GetType(fullName, false, ignoreCase))
                .FirstOrDefault(t => t != null);
        }
    }
}
