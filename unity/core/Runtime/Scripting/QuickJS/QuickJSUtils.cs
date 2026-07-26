#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using QuickJS.Utils;
using UnityEngine;

namespace ReactUnity.Scripting
{
    internal class QuickJSLogger : IScriptLogger
    {
        public void WriteException(Exception exception)
        {
            try
            {
                Debug.LogException(exception);
                if (exception.InnerException != null)
                    Debug.LogException(exception.InnerException);
            }
            catch (Exception)
            {
            }
        }

        public void Write(LogLevel ll, string text)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (text.IndexOf("Codegen", StringComparison.InvariantCultureIgnoreCase) >= 0) return;
                    Debug.LogWarning(text);
                    return;
                case LogLevel.Error:
                    Debug.LogError(text);
                    return;
                case LogLevel.Info:
                    Debug.Log(text);
                    return;
                default:
                    Debug.Log(text);
                    return;
            }
        }

        public void Write(LogLevel ll, string text, params object[] args)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (text.IndexOf("Codegen", StringComparison.InvariantCultureIgnoreCase) >= 0) return;
                    Debug.LogWarningFormat(text, args);
                    return;
                case LogLevel.Error:
                    Debug.LogErrorFormat(text, args);
                    return;
                case LogLevel.Info:
                    Debug.LogFormat(text, args);
                    return;
                default:
                    Debug.LogFormat(text, args);
                    return;
            }
        }
    }

}

#endif
