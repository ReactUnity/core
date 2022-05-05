using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.Scripting.DomProxies
{
    public class ConsoleProxy
    {
        static Regex replaceRegex = new Regex("%[dso]");

        ReactContext ctx;

        private Dictionary<string, int> Counters = new Dictionary<string, int>();

        public ConsoleProxy(ReactContext ctx)
        {
            this.ctx = ctx;
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
        }

        public void dir(object msg, params object[] subs)
        {
            GenericLog(msg, Debug.Log, subs);
        }

        public int count(object msg = null)
        {
            string name = msg?.ToString() ?? "default";
            if (!Counters.TryGetValue(name, out var count))
            {
                count = 1;
            }
            Counters[name] = count + 1;


            Debug.Log($"{name}: {count}");
            return count;
        }

        public void clear()
        {
            ctx.Dispatcher.OnceUpdate(() => Debug.ClearDeveloperConsole());
        }

        public void assert(bool val)
        {
            Debug.Assert(val);
        }
    }
}
