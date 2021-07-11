using System.Collections.Generic;
using UnityEngine;
using ReactUnity.Helpers;
using ReactUnity.Schedulers;
using System;
using ReactUnity.UGUI.StateHandlers;
using ReactUnity.StyleEngine;
using ReactUnity.Dispatchers;

namespace ReactUnity.UGUI
{
    public class UGUIContext : ReactContext
    {
        static public Dictionary<string, Func<string, string, UGUIContext, UGUIComponent>> ComponentCreators { get; }
            = new Dictionary<string, Func<string, string, UGUIContext, UGUIComponent>>
            {
                { "text", (tag, text, context) => new TextComponent(text, context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context) },
                { "view", (tag, text, context) => new ContainerComponent(context, "view") },
                { "button", (tag, text, context) => new ButtonComponent(context) },
                { "toggle", (tag, text, context) => new ToggleComponent(context) },
                { "input", (tag, text, context) => new InputComponent(text, context) },
                { "scroll", (tag, text, context) => new ScrollComponent(context) },
                { "image", (tag, text, context) => new ImageComponent(context) },
                { "rawimage", (tag, text, context) => new RawImageComponent(context) },
                { "svg", (tag, text, context) => new SvgComponent(context) },
                { "render", (tag, text, context) => new RenderComponent(context) },
                { "object", (tag, text, context) => new ObjectComponent(context) },
                { "video", (tag, text, context) => new VideoComponent(context) },
            };


        public override Dictionary<string, Type> StateHandlers { get; }
            = new Dictionary<string, Type>()
            {
                { "active", typeof(ActiveStateHandler) },
                { "focus", typeof(FocusStateHandler) },
                { "focus-within", typeof(FocusWithinStateHandler) },
                { "focus-visible", typeof(FocusVisibleStateHandler) },
                { "hover", typeof(HoverStateHandler) },
            };

        public static Func<string, string, UGUIContext, UGUIComponent> defaultCreator =
            (tag, text, context) => new ContainerComponent(context, tag);

        public static Func<string, UGUIContext, ITextComponent> textCreator =
            (text, context) => new TextComponent(text, context, "_text") { IsPseudoElement = true };

        public UGUIContext(RectTransform hostElement, GlobalRecord globals, ScriptSource script, IDispatcher dispatcher, IUnityScheduler scheduler, IMediaProvider mediaProvider, bool isDevServer, Action onRestart)
            : base(globals, script, dispatcher, scheduler, mediaProvider, isDevServer, onRestart, LayoutMergeMode.Both, true)
        {
            Host = new HostComponent(hostElement, this);
            InsertStyle(ResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);
        }

        public override IReactComponent CreateComponent(string tag, string text)
        {
            UGUIComponent res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
                res = creator(tag, text, this);
            else res = defaultCreator(tag, text, this);
            res.GameObject.name = $"<{tag}>";
            return res;
        }

        public override ITextComponent CreateText(string text)
        {
            return textCreator(text, this);
        }

        public override IReactComponent CreatePseudoComponent(string tag)
        {
            var tc = new TextComponent("", this, tag);
            tc.IsPseudoElement = true;
            tc.GameObject.name = tag;
            return tc;
        }

        public override void PlayAudio(AudioClip clip)
        {
            var source = (Host as HostComponent).GetOrAddComponent<AudioSource>();
            source.PlayOneShot(clip);
        }
    }
}
