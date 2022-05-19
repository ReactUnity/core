using System;
using ReactUnity.Helpers;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.UGUI
{
    public class SvgComponent : SvgImageComponent
    {
        private string content;
        private string innerContent;
        private object source;

        public SvgComponent(UGUIContext context, string tag = "svg") : base(context, tag)
        {
        }

        public string Content
        {
            get => content;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");

                if (content == value) return;
                content = value;
                InnerContent = value;
            }
        }

        public string InnerContent
        {
            get => innerContent;
            private set
            {
                innerContent = value;
                RefreshValue();
            }
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

        protected override void SetSource(object value)
        {
            if (!AllConverters.TextReferenceConverter.TryGetConstantValue(value, out TextReference reference))
                InnerContent = Content;
            else
                reference?.Get(Context, text => {
                    if (value != Source) return;
                    InnerContent = text?.text;
                    FireEvent("onLoad", new { type = "load" });
                });
        }

        protected void RefreshValue()
        {
            var sprite = GraphicsHelpers.GenerateVectorSprite(InnerContent);
            SetSprite(sprite);
        }
    }
}
