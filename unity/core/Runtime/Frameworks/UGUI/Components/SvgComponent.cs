using System;
using System.Collections.Generic;
using System.Text;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.UGUI
{
    public class SvgComponent : SvgImageComponent
    {
        private string content;
        private string innerContent;
        private string resolvedContent;

        public string Content
        {
            get => content;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");

                if (content == value) return;
                content = value;
                ResolvedContent = value;
            }
        }

        public string InnerContent
        {
            get => innerContent;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");

                if (innerContent == value) return;
                innerContent = value;
                MarkForResolveInnerContent();
            }
        }

        public string ResolvedContent
        {
            get => resolvedContent;
            private set
            {
                resolvedContent = value;
                RefreshValue();
            }
        }

        bool markedForResolveInnerContent = true;
        Dictionary<IStyleProperty, object> WatchedProperties = new Dictionary<IStyleProperty, object>();
        private Dictionary<string, string> SVGAttributes = new Dictionary<string, string>();

        public SvgComponent(UGUIContext context, string tag = "svg") : base(context, tag)
        {
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "content":
                    Content = value?.ToString();
                    break;
                case "innerContent":
                    InnerContent = value?.ToString();
                    break;
                case "src":
                case "source":
                    Source = value;
                    break;
                case "active":
                case "eventViewport":
                case "preserveAspect":
                case "id":
                case "name":
                case "class":
                case "className":
                case "style":
                    base.SetProperty(propertyName, value);
                    break;
                default:
                    var styleProperty = CssProperties.GetProperty(propertyName);

                    if (styleProperty != null)
                    {
                        try
                        {
                            var modified = styleProperty.Modify(Style, value);
                            if (modified != null) foreach (var mod in modified) WatchedProperties[mod] = null;
                        }
                        catch
                        {
                            WatchedProperties[styleProperty] = null;
                        }
                    }
                    else
                    {
                        SVGAttributes[propertyName] = value as string;
                        MarkForResolveInnerContent();
                    }
                    break;
            }
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            var styleChanged = false;

            var changeList = new List<KeyValuePair<IStyleProperty, object>>();

            foreach (var item in WatchedProperties)
            {
                var curValue = ComputedStyle.GetStyleValue<object>(item.Key);

                if (curValue != item.Value)
                {
                    changeList.Add(new KeyValuePair<IStyleProperty, object>(item.Key, curValue));
                    styleChanged = true;
                }
            }

            if (styleChanged)
            {
                foreach (var change in changeList)
                {
                    WatchedProperties[change.Key] = change.Value;
                    SVGAttributes[change.Key.name] = change.Key.Stringify(change.Value);
                }

                MarkForResolveInnerContent();
            }
        }

        public override void Update()
        {
            base.Update();
            if (markedForResolveInnerContent) ResolveInnerContent();
        }

        protected override void SetSource(object value)
        {
            if (!AllConverters.TextReferenceConverter.TryGetConstantValue(value, out TextReference reference))
                ResolvedContent = Content;
            else
                reference?.Get(Context, text => {
                    if (value != Source) return;
                    ResolvedContent = text?.text;
                    FireEvent("onLoad", new { type = "load" });
                });
        }

        protected void RefreshValue()
        {
            var sprite = GraphicsHelpers.GenerateVectorSprite(ResolvedContent);
            SetSprite(sprite);
        }

        protected string ResolveHeader()
        {
            var sb = new StringBuilder();

            sb.Append("<svg");

            foreach (var item in SVGAttributes)
            {
                if (item.Value != null)
                {
                    sb.Append(" ");
                    sb.Append(item.Key);
                    sb.Append("=\"");
                    sb.Append(item.Value);
                    sb.Append("\"");
                }
            }

            sb.Append(">");
            return sb.ToString();
        }

        void MarkForResolveInnerContent()
        {
            markedForResolveInnerContent = true;
        }

        void ResolveInnerContent()
        {
            markedForResolveInnerContent = false;
            if (!string.IsNullOrWhiteSpace(InnerContent))
            {
                ResolvedContent = ResolveHeader() + innerContent + "</svg>";
            }
        }
    }
}
