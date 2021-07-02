using ReactUnity.Schedulers;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using ReactUnity.StyleEngine;
using ReactUnity.Helpers;
using ReactUnity.Dispatchers;
using ReactUnity.UIToolkit.StateHandlers;

namespace ReactUnity.UIToolkit
{
    public class UIToolkitContext : ReactContext
    {
        public static Func<string, string, UIToolkitContext, IEditorComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new EditorComponent<VisualElement>(context, tag);

        public static Func<string, UIToolkitContext, ITextComponent> textCreator =
            (text, context) => new TextComponent<TextElement>(text, context, "_text", false);

        public static Dictionary<string, Func<string, string, UIToolkitContext, IEditorComponent<VisualElement>>> ComponentCreators
            = new Dictionary<string, Func<string, string, UIToolkitContext, IEditorComponent<VisualElement>>>()
            {
                { "text", (tag, text, context) => new TextComponent<TextElement>(text, context, tag, false) },
                { "label", (tag, text, context) => new TextComponent<Label>(text, context, tag) },
                { "button", (tag, text, context) => new ButtonComponent<Button>(context, tag) },
                { "view", (tag, text, context) => new EditorComponent<VisualElement>(context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context) },
                { "box", (tag, text, context) => new EditorComponent<Box>(context, tag) },
                { "toggle", (tag, text, context) => new ToggleComponent<Toggle>(context, tag) },
                { "image", (tag, text, context) => new ImageComponent(context, tag) },
                { "scroll", (tag, text, context) => new EditorComponent<ScrollView>(context, tag) }, // TODO
                { "input", (tag, text, context) => new BaseFieldComponent<TextField, string>(context, tag) }, // TODO
                { "helpbox", (tag, text, context) => new EditorComponent<HelpBox>(context, tag) }, // TODO
                { "foldout", (tag, text, context) => new ValueComponent<Foldout, bool>(context, tag) }, // TODO
                { "popup", (tag, text, context) => new TextComponent<PopupWindow>(text, context, tag) },
                { "slider", (tag, text, context) => new BaseSliderComponent<Slider, float>(context, tag) },
                { "sliderint", (tag, text, context) => new BaseSliderComponent<SliderInt, int>(context, tag) },
                { "range", (tag, text, context) => new RangeComponent(context)},
                { "repeat", (tag, text, context) => new EditorComponent<RepeatButton>(context, tag) }, // TODO:
                { "scroller", (tag, text, context) => new EditorComponent<Scroller>(context, tag) }, // TODO:
                { "list", (tag, text, context) => new BindableComponent<ListView>(context, tag) }, // TODO:
                { "imgui", (tag, text, context) => new IMGUIComponent(context) },
                { "template", (tag, text, context) => new BindableComponent<TemplateContainer>(context, tag) },
                { "progress", (tag, text, context) => new ValueComponent<ProgressBar, float>(context, tag) },
            };

        public override Dictionary<string, Type> StateHandlers { get; }
            = new Dictionary<string, Type>()
            {
                { "active", typeof(ActiveStateHandler) },
                { "focus", typeof(FocusStateHandler) },
                { "hover", typeof(HoverStateHandler) },
            };

        private Action<AudioClip> OnAudioPlayback = null;

        public UIToolkitContext(VisualElement hostElement, GlobalRecord globals, ReactScript script, IDispatcher dispatcher,
            IUnityScheduler scheduler, IMediaProvider mediaProvider, bool isDevServer, Action onRestart = null, Action<AudioClip> onAudioPlayback = null)
            : base(globals, script, dispatcher, scheduler, mediaProvider, isDevServer, onRestart, LayoutMergeMode.Both, false)
        {
            OnAudioPlayback = onAudioPlayback;

            Host = new HostComponent(hostElement, this);
            InsertStyle(ResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);

            hostElement.styleSheets.Add(ResourcesHelper.UtilityStylesheet);
        }

        public override ITextComponent CreateText(string text)
        {
            return textCreator(text, this);
        }

        public override IReactComponent CreateComponent(string tag, string text)
        {
            IEditorComponent<VisualElement> res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
                res = creator(tag, text, this);
            else res = defaultCreator(tag, text, this);
            if (res.Element != null) res.Element.name = $"<{tag}>";
            return res;
        }

        public override IReactComponent CreatePseudoComponent(string tag)
        {
            var tc = new TextComponent<TextElement>("", this, tag, false);
            tc.IsPseudoElement = true;
            tc.Element.name = tag;
            return tc;
        }

        public override void PlayAudio(AudioClip clip)
        {
            OnAudioPlayback?.Invoke(clip);
        }
    }
}
