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

namespace ReactUnity
{
    public class UnityUGUIContext
    {
        public Engine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary NamedAssets { get; private set; }
        public YogaNode RootLayoutNode { get; }

        private bool Scheduled = false;
        private List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public RuleTree RuleTree;

        public UnityUGUIContext(RectTransform hostElement, Engine engine, StringObjectDictionary assets)
        {
            Engine = engine;
            NamedAssets = assets;

            var parser = new StylesheetParser(includeUnknownDeclarations: true);
            RuleTree = new RuleTree(parser);

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
            var stylesheet = RuleTree.Parser.Parse(style);

            foreach (var rule in stylesheet.StyleRules.OfType<StyleRule>())
            {
                RuleTree.AddRule(rule);
            }
            Host.ResolveStyle(true);
        }

        public void RemoveStyle(string style)
        {
        }
    }
}
