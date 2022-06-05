using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;

namespace QuickJS.Binding
{
    public class DefaultBindingLogger : IBindingLogger
    {
        private Utils.LogLevel _logLevel;

        public DefaultBindingLogger(Utils.LogLevel logLevel = Utils.LogLevel.Info)
        {
            _logLevel = logLevel;
        }

        public void Log(string message)
        {
            if (_logLevel > Utils.LogLevel.Info)
            {
                return;
            }
#if JSB_UNITYLESS
            Console.WriteLine("[INFO  ] {0}", message);
#else
            UnityEngine.Debug.Log(message);
#endif
        }

        public void LogWarning(string message)
        {
            if (_logLevel > Utils.LogLevel.Warn)
            {
                return;
            }
#if JSB_UNITYLESS
            Console.WriteLine("[WARN  ] {0}", message);
#else
            UnityEngine.Debug.LogWarning(message);
#endif
        }

        public void LogError(string message)
        {
            if (_logLevel > Utils.LogLevel.Error)
            {
                return;
            }
#if JSB_UNITYLESS
            Console.WriteLine("[ERROR ] {0}", message);
#else
            UnityEngine.Debug.LogError(message);
#endif
        }
    }
}
