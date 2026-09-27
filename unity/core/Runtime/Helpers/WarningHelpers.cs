using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class WarningHelpers
    {
        static Dictionary<string, bool> Warned = new Dictionary<string, bool>();

        // Once per play session: with domain reload off, statics outlive it.
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void ResetAll() => Warned.Clear();

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
