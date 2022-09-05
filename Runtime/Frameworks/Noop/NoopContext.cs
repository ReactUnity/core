using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Noop
{
    internal class NoopContext : ReactContext
    {
        public new class Options : ReactContext.Options
        {
            public RectTransform HostElement;
        }

        static public Dictionary<string, Func<string, string, NoopContext, IReactComponent>> ComponentCreators { get; }
            = new Dictionary<string, Func<string, string, NoopContext, IReactComponent>>
            {
                { "view", (tag, text, context) => new NoopComponent(context, tag) },
                { "text", (tag, text, context) => new NoopComponent(context, tag) },
                { "style", (tag, text, context) => new StyleComponent(context, tag, text) },
                { "script", (tag, text, context) => new Scripting.ScriptComponent(context, tag, text) },
                { "html", (tag, text, context) => new Html.HtmlComponent(context, tag) },
            };


        public override Dictionary<string, Type> StateHandlers { get; }
            = new Dictionary<string, Type>()
            {
            };

        public static Func<string, string, NoopContext, NoopComponent> defaultCreator =
            (tag, text, context) => new NoopComponent(context, tag);

        public static Func<string, NoopContext, ITextComponent> textCreator =
            (text, context) => new NoopComponent(context, "text");

        public NoopContext(Options options) : base(options)
        {
            Host = new NoopComponent(this, "host");
            Host.ResolveStyle(true);
        }

        protected override StyleContext CreateStyleContext()
        {
            var ctx = base.CreateStyleContext();
            ctx.Insert(new StyleSheet(ctx, ResourcesHelper.UseragentStylesheet?.text, -1));
            return ctx;
        }

        protected override IReactComponent CreateDefaultComponentInternal(string tag, string text) => defaultCreator(tag, text, this);

        protected override IReactComponent CreateComponentInternal(string tag, string text)
        {
            if (ComponentCreators.TryGetValue(tag, out var creator)) return creator(tag, text, this);
            else return CreateDefaultComponent(tag, text);
        }

        protected override ITextComponent CreateTextInternal(string text)
        {
            return textCreator(text, this);
        }

        protected override IReactComponent CreatePseudoComponentInternal(string tag)
        {
            var tc = new NoopComponent(this, tag);
            return tc;
        }

        public override void PlayAudio(AudioClip clip) { }
    }
}
