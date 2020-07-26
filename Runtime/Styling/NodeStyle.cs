using Facebook.Yoga;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        Dictionary<string, object> StyleMap;
        public List<Dictionary<string, object>> CssStyles;
        Dictionary<string, object> DefaultStyle;
        HashSet<string> Changes = new HashSet<string>();
        public bool HasInheritedChanges { get; private set; } = false;

        public NodeStyle Parent;
        public StateStyles StateStyles;

        #region Set/Get
        public float opacity
        {
            set => SetStyleValue("opacity", value);
            get => GetStyleValue<float>("opacity");
        }
        public int zOrder
        {
            set => SetStyleValue("zOrder", value);
            get => GetStyleValue<int>("zOrder");
        }
        public bool hidden
        {
            set => SetStyleValue("hidden", value);
            get => GetStyleValue<bool>("hidden");
        }
        public string cursor
        {
            set => SetStyleValue("cursor", value);
            get => GetStyleValue<string>("cursor");
        }
        public InteractionType interaction
        {
            set => SetStyleValue("interaction", value);
            get => GetStyleValue<InteractionType>("interaction");
        }
        public Color backgroundColor
        {
            set => SetStyleValue("backgroundColor", value);
            get => GetStyleValue<Color>("backgroundColor");
        }
        public object backgroundImage
        {
            set => SetStyleValue("backgroundImage", value);
            get => GetStyleValue("backgroundImage");
        }
        public int borderRadius
        {
            set => SetStyleValue("borderRadius", value);
            get => GetStyleValue<int>("borderRadius");
        }
        public Color borderColor
        {
            set => SetStyleValue("borderColor", value);
            get => GetStyleValue<Color>("borderColor");
        }
        public ShadowDefinition boxShadow
        {
            set => SetStyleValue("boxShadow", value);
            get => GetStyleValue<ShadowDefinition>("boxShadow");
        }
        public Vector2 translate
        {
            set => SetStyleValue("translate", value);
            get => GetStyleValue<Vector2>("translate");
        }
        public bool translateRelative
        {
            set => SetStyleValue("translateRelative", value);
            get => GetStyleValue<bool>("translateRelative");
        }
        public Vector2 scale
        {
            set => SetStyleValue("scale", value);
            get => GetStyleValue<Vector2>("scale");
        }
        public Vector2 pivot
        {
            set => SetStyleValue("pivot", value);
            get => GetStyleValue<Vector2>("pivot");
        }
        public float rotate
        {
            set => SetStyleValue("rotate", value);
            get => GetStyleValue<float>("rotate");
        }
        public TMP_FontAsset font
        {
            set => SetStyleValue("font", value);
            get => GetStyleValue<TMP_FontAsset>("font");
        }
        public Color fontColor
        {
            set => SetStyleValue("fontColor", value);
            get => GetStyleValue<Color>("fontColor");
        }
        public FontWeight fontWeight
        {
            set => SetStyleValue("fontWeight", value);
            get => GetStyleValue<FontWeight>("fontWeight");
        }
        public FontStyles fontStyle
        {
            set => SetStyleValue("fontStyle", value);
            get => GetStyleValue<FontStyles>("fontStyle");
        }
        public YogaValue fontSize
        {
            set => SetStyleValue("fontSize", value);
            get => GetStyleValue<YogaValue>("fontSize");
        }
        public TextAlignmentOptions textAlign
        {
            set => SetStyleValue("textAlign", value);
            get => GetStyleValue<TextAlignmentOptions>("textAlign");
        }
        public TextOverflowModes textOverflow
        {
            set => SetStyleValue("textOverflow", value);
            get => GetStyleValue<TextOverflowModes>("textOverflow");
        }
        public bool textWrap
        {
            set => SetStyleValue("textWrap", value);
            get => GetStyleValue<bool>("textWrap");
        }
        #endregion

        #region Resolved values
        public float fontSizeActual
        {
            get
            {
                if (HasValue("fontSize"))
                {
                    var fs = fontSize;
                    var unit = fs.Unit;

                    if (unit == YogaUnit.Undefined || unit == YogaUnit.Auto) return Parent?.fontSizeActual ?? 0;
                    if (unit == YogaUnit.Point) return fs.Value;
                    return (Parent?.fontSizeActual ?? 0) * fs.Value / 100;
                }

                return Parent?.fontSizeActual ?? 0;
            }
        }
        #endregion

        public NodeStyle()
        {
            StyleMap = new Dictionary<string, object>();
        }

        public NodeStyle(NodeStyle defaultStyle, StateStyles stateStyles) : this()
        {
            DefaultStyle = defaultStyle.StyleMap;
            StateStyles = stateStyles;
        }

        public void CopyStyle(NodeStyle copyFrom)
        {
            StyleMap = new Dictionary<string, object>(copyFrom.StyleMap);
        }

        public object GetStyleValue(StyleProperty prop)
        {
            object value = StateStyles?.GetStyleValue(prop);
            if (value != null) return value;

            if (
                !StyleMap.TryGetValue(prop.name, out value) &&
                (CssStyles == null || !CssStyles.Any(x => x.TryGetValue(prop.name, out value))) &&
                (DefaultStyle == null || !DefaultStyle.TryGetValue(prop.name, out value)))
            {
                if (prop.inherited)
                {
                    return Parent?.GetStyleValue(prop) ?? prop?.defaultValue;
                }

                return prop?.defaultValue;
            }

            return value;
        }

        public object GetStyleValue(string name)
        {
            object value = StateStyles?.GetStyleValue(name);
            if (value != null) return value;

            if (
                !StyleMap.TryGetValue(name, out value) &&
                (CssStyles == null || !CssStyles.Any(x => x.TryGetValue(name, out value))) &&
                (DefaultStyle == null || !DefaultStyle.TryGetValue(name, out value)))
            {
                var prop = StyleProperties.GetStyleProperty(name);

                if (prop != null && prop.inherited)
                {
                    return Parent?.GetStyleValue(prop) ?? prop?.defaultValue;
                }

                return prop?.defaultValue;
            }

            return value;
        }

        public T GetStyleValue<T>(string name)
        {
            var value = GetStyleValue(name);
            return value == null ? default : (T)value;
        }

        public void SetStyleValue(string name, object value)
        {
            object currentValue;

            if (!StyleMap.TryGetValue(name, out currentValue))
            {
                if (value == null) return;
            }

            var changed = currentValue != value;
            if (value == null)
            {
                StyleMap.Remove(name);
            }
            else
            {
                StyleMap[name] = value;
            }

            if (changed)
            {
                Changes.Add(name);
                if (StyleProperties.GetStyleProperty(name).inherited) HasInheritedChanges = true;
            }
        }

        public void MarkChangesSeen()
        {
            Changes.Clear();
            HasInheritedChanges = false;
        }

        public bool HasChange(string name)
        {
            return Changes.Contains(name);
        }

        public bool HasValue(string name)
        {
            return StyleMap.ContainsKey(name) ||
                (CssStyles != null && CssStyles.Any(x => x.ContainsKey(name)))||
                (DefaultStyle != null && DefaultStyle.ContainsKey(name));
        }
    }
}
