using System;
using System.Collections.Generic;
using System.Text;
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
        private string resolvedContent;
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

        bool markedForResolveInnerContent = true;
        Dictionary<IStyleProperty, object> WatchedProperties = new Dictionary<IStyleProperty, object>();
        private Dictionary<string, string> SVGAttributes = new Dictionary<string, string>();

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
                case "source":
                    Source = value;
                    break;
                case "focusable":
                case "bind":
                case "tooltip":
                case "viewDataKey":
                case "tabIndex":
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

        private void SetSource(object value)
        {
            if (!AllConverters.TextReferenceConverter.TryGetConstantValue(value,
                    out TextReference reference)) ResolvedContent = Content;
            else
                reference?.Get(Context, text => {
                    if (value != Source) return;
                    ResolvedContent = text?.text;
                    FireEvent("onLoad", new { type = "load" });
                });
        }


        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            Element.tintColor = ComputedStyle.HasValue(StyleProperties.color)
                ? ComputedStyle.color
                : Color.white;

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

        protected void RefreshValue()
        {
            Element.RawSvg = ResolvedContent;
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
