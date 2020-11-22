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
using JavaScriptEngineSwitcher.Core;

namespace ReactUnity
{
    public class UnityUGUIContext
    {
        public IJsEngine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary NamedAssets { get; private set; }
        public YogaNode RootLayoutNode { get; }

        public ReactScript Script;
        private bool Scheduled = false;
        private List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public StylesheetParser Parser;
        public StyleTree StyleTree;

        public UnityUGUIContext(RectTransform hostElement, IJsEngine engine, StringObjectDictionary assets, ReactScript script)
        {
            Engine = engine;
            NamedAssets = assets;
            Script = script;

            Parser = new StylesheetParser(includeUnknownDeclarations: true);
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
            Host.ResolveStyle(true);
        }

        public void RemoveStyle(string style)
        {
        }
    }
}
