using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace QuickJS.Utils
{
    using Native;

    public class DefaultScriptLogger : IScriptLogger
    {
        
        public void WriteException(Exception exception)
        {
            System.Console.WriteLine(exception);
        }

        public void Write(LogLevel ll, string text)
        {
            switch (ll)
            {
                case LogLevel.Info: System.Console.WriteLine("[INFO  ] {0}", text); return;
                case LogLevel.Warn: System.Console.WriteLine("[WARN  ] {0}", text); return;
                case LogLevel.Error: System.Console.WriteLine("[ERROR ] {0}", text); return;
                default: System.Console.WriteLine("[ASSERT] {0}", text); return;
            }
        }

        public void Write(LogLevel ll, string fmt, params object[] args)
        {
            switch (ll)
            {
                case LogLevel.Info: System.Console.WriteLine("[INFO  ] {0}", string.Format(fmt, args)); return;
                case LogLevel.Warn: System.Console.WriteLine("[WARN  ] {0}", string.Format(fmt, args)); return;
                case LogLevel.Error: System.Console.WriteLine("[ERROR ] {0}", string.Format(fmt, args)); return;
                default: System.Console.WriteLine("[ASSERT] {0}", string.Format(fmt, args)); return;
            }
        }

    }
}
