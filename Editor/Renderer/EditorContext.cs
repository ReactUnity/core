using ReactUnity.Editor.Renderer.Components;
using ReactUnity.Editor.Renderer.Styling;
using ReactUnity.Helpers;
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
        public static Func<string, string, EditorContext, IEditorReactComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new EditorReactComponent<Box>(context, tag);

        public static Func<string, EditorContext, ITextComponent> textCreator =
            (text, context) => new EditorTextComponent(text, context, "_text");

        public static Dictionary<string, Func<string, string, EditorContext, IEditorReactComponent<VisualElement>>> ComponentCreators
            = new Dictionary<string, Func<string, string, EditorContext, IEditorReactComponent<VisualElement>>>()
            {
                { "text", (tag, text, context) => new EditorTextComponent(text, context, tag) },
                { "button", (tag, text, context) => new EditorButtonComponent(context) },
                { "view", (tag, text, context) => new EditorReactComponent<Box>(context, "view") },
                { "toggle", (tag, text, context) => new EditorReactComponent<Toggle>(context, "toggle") },
                { "image", (tag, text, context) => new EditorReactComponent<Image>(context, "image") },
                { "scroll", (tag, text, context) => new EditorReactComponent<ScrollView>(context, "scroll") },
                { "input", (tag, text, context) => new EditorReactComponent<TextField>(context, "input") },
                { "helpbox", (tag, text, context) => new EditorReactComponent<HelpBox>(context, "helpbox") },
                { "foldout", (tag, text, context) => new EditorReactComponent<Foldout>(context, "foldout") },
                { "popup", (tag, text, context) => new EditorReactComponent<PopupWindow>(context, "popup") },
                { "slider", (tag, text, context) => new EditorReactComponent<Slider>(context, "slider") },
                { "stepper", (tag, text, context) => new EditorReactComponent<SliderInt>(context, "stepper") },
                { "range", (tag, text, context) => new EditorReactComponent<MinMaxSlider>(context, "range") },
                { "repeat", (tag, text, context) => new EditorReactComponent<RepeatButton>(context, "repeat") },
                { "scroller", (tag, text, context) => new EditorReactComponent<Scroller>(context, "scroller") },
                { "list", (tag, text, context) => new EditorReactComponent<ListView>(context, "list") },
                { "imgui", (tag, text, context) => new EditorReactComponent<IMGUIContainer>(context, "imgui") },
                { "template", (tag, text, context) => new EditorReactComponent<TemplateContainer>(context, "template") },
            };

        public EditorContext(VisualElement hostElement, StringObjectDictionary globals, ReactScript script, IUnityScheduler scheduler, bool isDevServer, Action onRestart = null)
            : base(globals, script, scheduler, isDevServer, onRestart)
        {
            Host = new EditorHostComponent(hostElement, this);
            InsertStyle(EditorResourcesHelper.UseragentStylesheet?.text, -1);
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
            IEditorReactComponent<VisualElement> res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
                res = creator(tag, text, this);
            else res = defaultCreator(tag, text, this);
            if (res.Element != null) res.Element.name = $"<{tag}>";
            return res;
        }
    }
}
