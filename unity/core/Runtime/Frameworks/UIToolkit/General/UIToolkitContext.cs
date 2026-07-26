using System;
using System.Collections.Generic;
using ReactUnity.Styling;
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
            public Action<AudioClip, float, float> OnAudioPlayback;
            public override bool CalculatesLayout => false;

            public List<IconSet> IconSets;
            public IconSet DefaultIconSet;
        }

        public static Func<string, string, UIToolkitContext, IUIToolkitComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new UIToolkitComponent<VisualElement>(context, tag);

        public static Func<string, string, UIToolkitContext, ITextComponent> textCreator =
            (tag, text, context) => new TextComponent<TextElement>(text, context, tag ?? "_text", false);

        public static Dictionary<string, Func<string, string, UIToolkitContext, IReactComponent>> ComponentCreators
            = new Dictionary<string, Func<string, string, UIToolkitContext, IReactComponent>>()
            {
                { "portal", (tag, text, context) => new PortalComponent(context, tag) },
                { "text", (tag, text, context) => new TextComponent<TextElement>(text, context, tag, false) },
                { "br", (tag, text, context) => new BrComponent(context, tag) },
                { "richtext", (tag, text, context) => new TextComponent<TextElement>(text, context, tag, false, true) },
                { "label", (tag, text, context) => new TextComponent<Label>(text, context, tag) },
                { "button", (tag, text, context) => new ButtonComponent<Button>(context, tag) },
                { "view", (tag, text, context) => new UIToolkitComponent<VisualElement>(context, tag) },
                { "a", (tag, text, context) => new AnchorComponent(context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context, tag) },
                { "box", (tag, text, context) => new UIToolkitComponent<Box>(context, tag) },
                { "toggle", (tag, text, context) => new ToggleComponent<Toggle>(context, tag) },
                { "img", (tag, text, context) => new ImageComponent(context, tag) },
                { "image", (tag, text, context) => new ImageComponent(context, tag) },
                { "scroll", (tag, text, context) => new ScrollViewComponent(context, tag) },
                { "input", (tag, text, context) => new TextFieldComponent(context, tag) },
                { "style", (tag, text, context) => new Styling.StyleComponent(context, tag, text) },
                { "script", (tag, text, context) => new Scripting.ScriptComponent(context, tag, text) },
                { "html", (tag, text, context) => new Html.HtmlComponent(context, tag) },
                { "icon", (tag, text, context) => new IconComponent(text, context, tag) },
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
                { "svg", (tag, text, context) => new SvgComponent(context, tag) },
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

        public IconSet DefaultIconSet { get; }
        public Dictionary<string, IconSet> IconSets { get; } = new Dictionary<string, IconSet>() { };


        private Action<AudioClip, float, float> OnAudioPlayback = null;

        public VisualElement HostElement { get; }

        public UIToolkitContext(Options options) : base(options)
        {
            OnAudioPlayback = options.OnAudioPlayback;
            HostElement = options.HostElement;

            if (options.IconSets != null)
            {
                if (options.IconSets.Count > 0) IconSets["default"] = options.IconSets[0];
                foreach (var ic in options.IconSets) IconSets[ic.Name] = ic;
            }

            DefaultIconSet = options.DefaultIconSet;
            if (DefaultIconSet == null)
            {
                if (IconSets.TryGetValue("default", out var def)) DefaultIconSet = def;
            }
        }

        public virtual void Initialize()
        {
            if (Host != null) throw new Exception("Context was already initialized");
            HostElement.styleSheets.Add(ResourcesHelper.UtilityStylesheet);

            Host = new HostComponent(HostElement, this);
            Host.ResolveStyle(true);
        }

        protected override StyleContext CreateStyleContext()
        {
            var ctx = base.CreateStyleContext();
            ctx.Insert(new Styling.StyleSheet(ctx, ResourcesHelper.UseragentStylesheet?.text, -1));
            return ctx;
        }

        protected override ITextComponent CreateTextInternal(string tag = "_text", string text = "")
        {
            return textCreator(tag, text, this);
        }

        protected override IReactComponent CreateDefaultComponentInternal(string tag, string text) => defaultCreator(tag, text, this);

        protected override IReactComponent CreateComponentInternal(string tag, string text)
        {
            if (ComponentCreators.TryGetValue(tag, out var creator)) return creator(tag, text, this);
            else return CreateDefaultComponentInternal(tag, text);
        }

        protected override IReactComponent CreatePseudoComponentInternal(string tag)
        {
            var tc = new TextComponent<TextElement>("", this, tag, false);
            tc.IsPseudoElement = true;
            return tc;
        }

        public override void PlayAudio(AudioClip clip, float volume, float pitch)
        {
            OnAudioPlayback?.Invoke(clip, volume, pitch);
        }
    }
}
