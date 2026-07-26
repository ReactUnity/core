using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class WarningHelpers
    {
        static Dictionary<string, bool> Warned = new Dictionary<string, bool>();

        public static bool WarnOnce(string warningName, string warningText)
        {
            if (!Warned.TryGetValue(warningName, out var warned)) warned = false;

            if (!warned)
            {
                Warned[warningName] = true;
                Debug.LogWarning(warningText);
                return true;
            }

            return false;
        }

        public static void ResetWarning(string warningName)
        {
            Warned[warningName] = false;
        }
    }
}
