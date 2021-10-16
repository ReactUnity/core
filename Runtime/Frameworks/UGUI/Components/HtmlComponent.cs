using System;
using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.UGUI
{
    public class HtmlComponent : UGUIComponent
    {
        private string content;
        public string Content
        {
            get => content;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");
                if (content != value)
                {
                    content = value;
                    if (source == null) InnerHtml = value;
                }
            }
        }

        private string innerHtml;
        public string InnerHtml
        {
            get => innerHtml;
            private set
            {
                innerHtml = value;
                Clean();
                Create(value);
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

        public HtmlComponent(UGUIContext ctx, string tag = "html") : base(ctx, tag, true)
        {
        }

        private void Clean()
        {
            for (int i = Children.Count - 1; i >= 0; i--)
            {
                var child = Children[i];
                child.Remove();
            }
        }

        private void Create(string content)
        {
            Context.Html.InsertHtml(content, this);
        }

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
            var reference = AllConverters.TextReferenceConverter.Convert(value) as TextReference;

            if (reference == null) InnerHtml = Content;
            else reference.Get(Context, text => {
                if (value != Source) return;
                InnerHtml = text.text;
            });
        }
    }
}
