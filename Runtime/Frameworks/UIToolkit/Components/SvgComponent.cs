using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UIElements;

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
            get
            {
                return content;
            }
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
            get
            {
                return innerContent;
            }
            private set
            {
                innerContent = value;
                RefreshValue();
            }
        }

        public object Source
        {
            get
            {
                return source;
            }
            set
            {
                if (source != value)
                {
                    source = value;
                    SetSource(value);
                }
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
                    InnerContent = text.text;
                    FireEvent("onLoad", new { type = "load" });
                });
        }

        protected void RefreshValue()
        {
#if !REACT_VECTOR_GRAPHICS
            Debug.LogError(
                "UnityEngine.VectorGraphics is not enabled, enable this package through REACT_VECTOR_GRAPHICS to allow for svg");
#else
            Element.RawSvg = InnerContent;
#endif
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
