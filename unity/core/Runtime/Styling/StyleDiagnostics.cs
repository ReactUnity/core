using System.Diagnostics;
#if REACT_UNITY_DEVELOPER
using System.Collections.Generic;
#endif

namespace ReactUnity.Styling
{
    /// <summary>
    /// Says out loud what a dropped declaration says nothing about. A value that parses but resolves
    /// to nothing leaves the property at its default with no trace anywhere -- which is the hardest
    /// kind of styling bug to find, since the CSS looks right and nothing is logged.
    /// </summary>
    /// <remarks>
    /// Gated on <c>REACT_UNITY_DEVELOPER</c>, so a shipped build neither pays for it nor fills a
    /// user's console with warnings about CSS they did not write.
    /// </remarks>
    public static class StyleDiagnostics
    {
#if REACT_UNITY_DEVELOPER
        // Once per distinct message: the same declaration is re-resolved on every restyle, and one
        // warning a frame is noise rather than a diagnostic.
        private static readonly HashSet<string> seen = new HashSet<string>();
#endif

        /// <summary>Reports a declaration whose value could not be turned into anything usable.</summary>
        [Conditional("REACT_UNITY_DEVELOPER")]
        public static void Dropped(string property, object value, string reason = null)
        {
#if REACT_UNITY_DEVELOPER
            var message = $"ReactUnity: `{property}: {value}` could not be resolved, so the declaration was dropped."
                + (string.IsNullOrEmpty(reason) ? "" : " " + reason);

            lock (seen)
            {
                if (!seen.Add(message)) return;
            }

            UnityEngine.Debug.LogWarning(message);
#endif
        }
    }
}
