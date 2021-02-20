using ReactUnity.Editor.Renderer.Components;
using ReactUnity.Interop;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class EditorContext : ReactContext
    {
        public static Func<string, string, EditorContext, EditorReactComponent> defaultCreator =
            (tag, text, context) => new EditorReactComponent(context, tag);

        public static Func<string, EditorContext, ITextComponent> textCreator =
            (text, context) => new EditorTextComponent(text, context, "_text");

        public static Dictionary<string, Func<string, string, EditorContext, EditorReactComponent>> ComponentCreators
            = new Dictionary<string, Func<string, string, EditorContext, EditorReactComponent>>()
            {
                { "text", (tag, text, context) => new EditorTextComponent(text, context, tag) },
                { "view", (tag, text, context) => new EditorReactComponent(context, "view") },
            };

        public EditorContext(VisualElement hostElement, StringObjectDictionary globals, ReactScript script, IUnityScheduler scheduler, bool isDevServer, Action onRestart = null)
            : base(globals, script, scheduler, isDevServer, onRestart)
        {
            Host = new EditorReactComponent(hostElement, this, "_root");
            Host.ResolveStyle(true);

            EditorDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();
                }
            });
        }

        public override ITextComponent CreateText(string text)
        {
            return textCreator(text, this);
        }

        public override IReactComponent CreateComponent(string tag, string text)
        {
            EditorReactComponent res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
                res = creator(tag, text, this);
            else res = defaultCreator(tag, text, this);
            if (res.Element != null) res.Element.name = $"<{tag}>";
            return res;
        }
    }
}
