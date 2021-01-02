using System.Collections.Generic;
using UnityEngine;
using Jint;
using ReactUnity.Components;
using ReactUnity.Types;
using Facebook.Yoga;
using ReactUnity.Interop;
using ExCSS;
using System.Linq;
using ReactUnity.StyleEngine;
using System.IO;
using ReactUnity.Styling;
using System.Text.RegularExpressions;

namespace ReactUnity
{
    public class UnityUGUIContext
    {
        private static Regex ExtensionRegex = new Regex(@"\.\w+$");
        private static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public Jint.Engine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary Globals { get; private set; }
        public YogaNode RootLayoutNode { get; }
        public bool IsDevServer { get; }

        public ReactScript Script;
        private bool Scheduled = false;
        private List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public StylesheetParser Parser;
        public StyleTree StyleTree;

        public Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();

        public UnityUGUIContext(RectTransform hostElement, Jint.Engine engine, StringObjectDictionary assets, ReactScript script, bool isDevServer)
        {
            Engine = engine;
            Globals = assets;
            Script = script;
            IsDevServer = isDevServer;

            Parser = new StylesheetParser(true, true, true, true, true);
            StyleTree = new StyleTree(Parser);

            Host = new HostComponent(hostElement, this);
            Host.Tag = "_root";
            RootLayoutNode = Host.Layout;
            Host.ResolveStyle(true);

            MainThreadDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    RootLayoutNode.CalculateLayout();
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();
                }
            });
        }


        public void scheduleLayout(System.Action callback = null)
        {
            Scheduled = true;
            ScheduledCallbacks.Add(callback);
        }

        public void InsertStyle(string style)
        {
            var stylesheet = StyleTree.Parser.Parse(style);

            foreach (var rule in stylesheet.StyleRules.OfType<StyleRule>())
            {
                StyleTree.AddStyle(rule);
            }

            foreach (var rule in stylesheet.FontfaceSetRules)
            {
                FontFamilies[(ParserMap.StringConverter.Convert(rule.Family) as string).ToLowerInvariant()] =
                    ParserMap.FontReferenceConverter.Convert(rule.Source) as FontReference;
            }
            Host.ResolveStyle(true);
        }

        public void RemoveStyle(string style)
        {
        }

        public string ResolvePath(string path)
        {
            if (IsDevServer) return Script.DevServerFile + path;
            var res = Path.GetDirectoryName(Script.GetResolvedSourcePath()) + path;
            if (Script.ScriptSource == ScriptSource.Resource) return GetResourceUrl(res);
            return res;
        }

        public ReactScript CreateStaticScript(string path)
        {
            var src = new ReactScript();
            src.ScriptSource = IsDevServer ? ScriptSource.Url : Script.ScriptSource;
            src.UseDevServer = IsDevServer;
            src.SourcePath = ResolvePath(path);

            return src;
        }

        private string GetResourceUrl(string fullUrl)
        {
            var splits = ResourcesRegex.Split(fullUrl);
            var url = splits[splits.Length - 1];

            return ExtensionRegex.Replace(url, "");
        }
    }
}
