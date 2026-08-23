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
            Console.WriteLine("[INFO  ] {0}", message);
        }

        public void LogWarning(string message)
        {
            if (_logLevel > Utils.LogLevel.Warn)
            {
                return;
            }
            Console.WriteLine("[WARN  ] {0}", message);
        }

        public void LogError(string message)
        {
            if (_logLevel > Utils.LogLevel.Error)
            {
                return;
            }
            Console.WriteLine("[ERROR ] {0}", message);
        }
    }
}
