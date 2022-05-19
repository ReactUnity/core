using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UIToolkit
{
    public class SvgComponent : UIToolkitComponent<SvgElement>
    {
        private string content;

        private string innerContent;

        private object source;

        public SvgComponent(UIToolkitContext context, string tag) : base(context, tag)
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

        public object Source
        {
            get => source;
            set
            {
                if (source == value) return;
                source = value;
                SetSource(value);
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

        private void SetSource(object value)
        {
            if (!AllConverters.TextReferenceConverter.TryGetConstantValue(value,
                    out TextReference reference)) InnerContent = Content;
            else
                reference?.Get(Context, text => {
                    if (value != Source) return;
                    InnerContent = text?.text;
                    FireEvent("onLoad", new { type = "load" });
                });
        }

        protected void RefreshValue()
        {
            Element.RawSvg = InnerContent;
        }


        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            Element.tintColor = ComputedStyle.HasValue(StyleProperties.color)
                ? ComputedStyle.color
                : Color.white;
        }
    }
}
