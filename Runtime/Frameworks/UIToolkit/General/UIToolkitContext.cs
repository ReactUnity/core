using System;
using System.Collections.Generic;
using ReactUnity.Scheduling;
using ReactUnity.UIToolkit.StateHandlers;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class UIToolkitContext : ReactContext
    {
        public new class Options : ReactContext.Options
        {
            public VisualElement HostElement;
            public Action<AudioClip> OnAudioPlayback;
            public override bool CalculatesLayout => false;
        }

        public static Func<string, string, UIToolkitContext, IUIToolkitComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new UIToolkitComponent<VisualElement>(context, tag);

        public static Func<string, UIToolkitContext, ITextComponent> textCreator =
            (text, context) => new TextComponent<TextElement>(text, context, "_text", false);

        public static Dictionary<string, Func<string, string, UIToolkitContext, IReactComponent>> ComponentCreators
            = new Dictionary<string, Func<string, string, UIToolkitContext, IReactComponent>>()
            {
                { "text", (tag, text, context) => new TextComponent<TextElement>(text, context, tag, false) },
                { "label", (tag, text, context) => new TextComponent<Label>(text, context, tag) },
                { "button", (tag, text, context) => new ButtonComponent<Button>(context, tag) },
                { "view", (tag, text, context) => new UIToolkitComponent<VisualElement>(context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context) },
                { "box", (tag, text, context) => new UIToolkitComponent<Box>(context, tag) },
                { "toggle", (tag, text, context) => new ToggleComponent<Toggle>(context, tag) },
                { "image", (tag, text, context) => new ImageComponent(context, tag) },
                { "scroll", (tag, text, context) => new UIToolkitComponent<ScrollView>(context, tag) }, // TODO
                { "input", (tag, text, context) => new TextFieldComponent(context, tag) },
                { "style", (tag, text, context) => new StyleComponent(context, tag, text) },
                { "script", (tag, text, context) => new ScriptComponent(context, tag, text) },
                { "html", (tag, text, context) => new Html.HtmlComponent(context, tag) },
#if UNITY_2020_1_OR_NEWER
                { "helpbox", (tag, text, context) => new UIToolkitComponent<HelpBox>(context, tag) }, // TODO
#endif
                { "foldout", (tag, text, context) => new ValueComponent<Foldout, bool>(context, tag) }, // TODO
                { "popup", (tag, text, context) => new TextComponent<PopupWindow>(text, context, tag) },
                { "slider", (tag, text, context) => new BaseSliderComponent<Slider, float>(context, tag) },
                { "sliderint", (tag, text, context) => new BaseSliderComponent<SliderInt, int>(context, tag) },
                { "range", (tag, text, context) => new RangeComponent(context)},
                { "repeat", (tag, text, context) => new UIToolkitComponent<RepeatButton>(context, tag) }, // TODO:
                { "scroller", (tag, text, context) => new UIToolkitComponent<Scroller>(context, tag) }, // TODO:
                { "list", (tag, text, context) => new BindableComponent<ListView>(context, tag) }, // TODO:
                { "imgui", (tag, text, context) => new IMGUIComponent(context) },
                { "template", (tag, text, context) => new BindableComponent<TemplateContainer>(context, tag) },
#if UNITY_2021_2_OR_NEWER
                { "progress", (tag, text, context) => new ValueComponent<ProgressBar, float>(context, tag) },
#endif
            };

        public override Dictionary<string, Type> StateHandlers { get; }
            = new Dictionary<string, Type>()
            {
                { "active", typeof(ActiveStateHandler) },
                { "focus", typeof(FocusStateHandler) },
                { "hover", typeof(HoverStateHandler) },
            };

        private Action<AudioClip> OnAudioPlayback = null;

        public VisualElement HostElement { get; }

        public UIToolkitContext(Options options) : base(options)
        {
            OnAudioPlayback = options.OnAudioPlayback;
            HostElement = options.HostElement;
        }

        public virtual void Initialize()
        {
            if (Host != null) throw new Exception("Context was already initialized");
            HostElement.styleSheets.Add(ResourcesHelper.UtilityStylesheet);

            Host = new HostComponent(HostElement, this);
            InsertStyle(ResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);
        }

        public override ITextComponent CreateText(string text)
        {
            return textCreator(text, this);
        }

        public override IReactComponent CreateDefaultComponent(string tag, string text) => defaultCreator(tag, text, this);

        public override IReactComponent CreateComponent(string tag, string text)
        {
            if (ComponentCreators.TryGetValue(tag, out var creator)) return creator(tag, text, this);
            else return CreateDefaultComponent(tag, text);
        }

        public override IReactComponent CreatePseudoComponent(string tag)
        {
            var tc = new TextComponent<TextElement>("", this, tag, false);
            tc.IsPseudoElement = true;
            return tc;
        }

        public override void PlayAudio(AudioClip clip)
        {
            OnAudioPlayback?.Invoke(clip);
        }
    }
}
