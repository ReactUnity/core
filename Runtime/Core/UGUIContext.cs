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
using ReactUnity.Helpers;
using ReactUnity.Schedulers;

namespace ReactUnity
{
    public class ReactContext
    {
        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public IHostComponent Host { get; protected set; }
        public StringObjectDictionary Globals { get; private set; }
        public bool IsDevServer { get; }

        public ReactScript Script { get; }
        public IUnityScheduler Scheduler { get; }

        protected bool Scheduled = false;
        protected List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public StylesheetParser Parser;
        public StyleTree StyleTree;

        public Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();

        public ReactContext(StringObjectDictionary assets, ReactScript script, IUnityScheduler scheduler, bool isDevServer)
        {
            Globals = assets;
            Script = script;
            IsDevServer = isDevServer;
            Scheduler = scheduler;

            Parser = new StylesheetParser(true, true, true, true, true);
            StyleTree = new StyleTree(Parser);
        }


        public virtual void scheduleLayout(System.Action callback = null)
        {
            Scheduled = true;
            ScheduledCallbacks.Add(callback);
        }

        public virtual void InsertStyle(string style, int importanceOffset = 0)
        {
            if (string.IsNullOrWhiteSpace(style)) return;

            var stylesheet = StyleTree.Parser.Parse(style);

            foreach (var rule in stylesheet.FontfaceSetRules)
            {
                FontFamilies[(ParserMap.StringConverter.Convert(rule.Family) as string).ToLowerInvariant()] =
                    ParserMap.FontReferenceConverter.Convert(rule.Source) as FontReference;
            }

            foreach (var rule in stylesheet.StyleRules.OfType<StyleRule>())
            {
                StyleTree.AddStyle(rule, importanceOffset);
            }

            Host.ResolveStyle(true);
        }

        public virtual void RemoveStyle(string style)
        {
        }

        public virtual string ResolvePath(string path)
        {
            if (IsDevServer) return Script.DevServerFile + path;
            var res = Path.GetDirectoryName(Script.GetResolvedSourcePath()) + path;
            if (Script.ScriptSource == ScriptSource.Resource) return GetResourceUrl(res);
            return res;
        }

        public virtual ReactScript CreateStaticScript(string path)
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

    public class UGUIContext : ReactContext
    {
        public YogaNode RootLayoutNode { get; }

        public UGUIContext(RectTransform hostElement, StringObjectDictionary assets, ReactScript script, IUnityScheduler scheduler, bool isDevServer)
            : base(assets, script, scheduler, isDevServer)
        {
            Host = new HostComponent(hostElement, this);
            RootLayoutNode = Host.Layout;

            InsertStyle(ResourcesHelper.UseragentStylesheet?.text, -1);
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
    }
}
