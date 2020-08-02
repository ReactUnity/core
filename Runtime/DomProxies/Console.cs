
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
        Engine engine;
        static Regex replaceRegex = new Regex("%[dso]");

        public ConsoleProxy(Engine engine)
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

        public void log(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void info(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void debug(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public void warn(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.LogWarning, subs);
        }

        public void error(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.LogError, subs);

            var lastNode = engine.GetLastSyntaxNode();
            Debug.LogError($"Runtime exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
        }

        public void clear()
        {
            MainThreadDispatcher.OnUpdate(() => Debug.ClearDeveloperConsole());
        }

        public void assert(bool val)
        {
            Debug.Assert(val);
        }
    }
}
