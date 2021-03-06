
using Jint;
using ReactUnity.Interop;
using System;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.DomProxies
{
    public class ConsoleProxy
    {
        Jint.Engine engine;
        static Regex replaceRegex = new Regex("%[dso]");

        public ConsoleProxy(Jint.Engine engine)
        {
            this.engine = engine;
        }

        private void GenericLog(object msg, Action<string> baseCaller, params object[] subs)
        {
            string res = msg?.ToString() ?? "";

            var matches = replaceRegex.Matches(res);


            var aStringBuilder = new StringBuilder(res);

            for (int i = matches.Count - 1; i >= 0; i--)
            {
                var match = matches[i];
                var sub = subs.Length > i ? subs[i] : match.Value;

                aStringBuilder.Remove(match.Index, match.Length);
                aStringBuilder.Insert(match.Index, sub);
            }

            baseCaller(aStringBuilder.ToString());
        }

        public void log(object msg)
        {
            GenericLog(msg, Debug.Log);
        }
        public void log(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void info(object msg)
        {
            GenericLog(msg, Debug.Log);
        }
        public void info(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void debug(object msg)
        {
            GenericLog(msg, Debug.Log);
        }
        public void debug(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void warn(object msg)
        {
            GenericLog(msg, Debug.LogWarning);
        }
        public void warn(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.LogWarning, subs);
        }

        public void error(object msg)
        {
            GenericLog(msg, Debug.LogError);
        }
        public void error(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.LogError, subs);
        }

        public void dir(object msg)
        {
            GenericLog(msg, Debug.Log);
        }
        public void dir(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void clear()
        {
            AdaptiveDispatcher.OnUpdate(() => Debug.ClearDeveloperConsole());
        }

        public void assert(bool val)
        {
            Debug.Assert(val);
        }
    }
}
