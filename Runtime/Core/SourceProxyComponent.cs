using System;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity
{
    public abstract class SourceProxyComponent : ProxyComponent, ITextComponent
    {
        public SourceProxyComponent(IContainerComponent cmp) : base(cmp) { }
        public SourceProxyComponent(ReactContext ctx, string tag) : base(new NoopComponent(ctx, tag)) { }

        private string content;
        public override string Content
        {
            get => content;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");
                if (content != value)
                {
                    content = value;
                    if (source == null) ResolvedContent = value;
                }
            }
        }

        private string resolvedContent;
        public string ResolvedContent
        {
            get => resolvedContent;
            private set
            {
                resolvedContent = value;
                RefreshValue();
            }
        }

        private object source;
        public object Source
        {
            get => source;
            set
            {
                if (source != value)
                {
                    source = value;
                    SetSource(value);
                }
            }
        }

        protected abstract void RefreshValue();

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "content":
                    Content = value?.ToString();
                    break;
                case "source":
                    Source = value;
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void SetSource(object value)
        {
            if (!AllConverters.TextReferenceConverter.TryGetConstantValue<TextReference>(value, out var reference)) ResolvedContent = Content;
            else
            {
                reference?.Get(Context, text => {
                    if (value != Source) return;
                    ResolvedContent = text?.text;
                    FireEvent("onLoad", new { type = "load" });
                });
            }
        }
    }
}
