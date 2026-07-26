#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;

    /// <summary>
    /// indicates a script class
    /// (case-sensitive)
    /// </summary>
    [Serializable]
    public struct JSScriptRef
    {
        /// <summary>
        /// sourceFile will be broken down into modulePath and className by the editor, 
        /// but not necessary for instantiating the script class instance
        /// </summary>
        public string sourceFile;

        /// <summary>
        /// the actual script loaded, it's parsed from sourceFile and be resolved by ScriptRuntime.pathResolver. 
        /// </summary>
        public string modulePath;

        /// <summary>
        /// it specifies the exported target class used for bridging of Unity's facilities
        /// </summary>
        public string className;

        public void Reset()
        {
            sourceFile = null;
            modulePath = null;
            className = null;
        }

        public bool IsEmpty()
        {
            return string.IsNullOrEmpty(modulePath) && string.IsNullOrEmpty(className);
        }

        public bool IsSameScript(JSScriptRef other)
        {
            return modulePath == other.modulePath && className == other.className;
        }

        public static string ToClassPath(string modulePath, string className)
        {
            if (string.IsNullOrEmpty(modulePath))
            {
                return className ?? string.Empty;
            }

            return string.IsNullOrEmpty(className) ? string.Empty : $"{modulePath.Replace('/', '.')}.{className}";
        }

        public string ToClassPath()
        {
            return ToClassPath(modulePath, className);
        }
    }
}
#endif
