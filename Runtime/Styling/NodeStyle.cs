using Facebook.Yoga;
using ReactUnity.Styling.Types;
using ReactUnity.Types;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        Dictionary<string, object> StyleMap;
        public List<Dictionary<string, object>> CssStyles;
        public List<LayoutValue> CssLayouts;
        Dictionary<string, object> DefaultStyle;
        public bool HasInheritedChanges { get; private set; } = false;

        public NodeStyle Parent;
        public StateStyles StateStyles;

        #region Set/Get

        public float opacity
        {
            set => SetStyleValue(StyleProperties.opacity, value);
            get => GetStyleValue<float>(StyleProperties.opacity);
        }
        public int zIndex
        {
            set => SetStyleValue(StyleProperties.zIndex, value);
            get => GetStyleValue<int>(StyleProperties.zIndex);
        }
        public bool visibility
        {
            set => SetStyleValue(StyleProperties.visibility, value);
            get => GetStyleValue<bool>(StyleProperties.visibility);
        }
        public string cursor
        {
            set => SetStyleValue(StyleProperties.cursor, value);
            get => GetStyleValue<string>(StyleProperties.cursor);
        }
        public PointerEvents pointerEvents
        {
            set => SetStyleValue(StyleProperties.pointerEvents, value);
            get => GetStyleValue<PointerEvents>(StyleProperties.pointerEvents);
        }
        public Color backgroundColor
        {
            set => SetStyleValue(StyleProperties.backgroundColor, value);
            get => GetStyleValue<Color>(StyleProperties.backgroundColor);
        }
        public ImageReference backgroundImage
        {
            set => SetStyleValue(StyleProperties.backgroundImage, value);
            get => GetStyleValue<ImageReference>(StyleProperties.backgroundImage);
        }
        public int borderRadius
        {
            set => SetStyleValue(StyleProperties.borderRadius, value);
            get => GetStyleValue<int>(StyleProperties.borderRadius);
        }
        public Color borderColor
        {
            set => SetStyleValue(StyleProperties.borderColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public ShadowDefinition boxShadow
        {
            set => SetStyleValue(StyleProperties.boxShadow, value);
            get => GetStyleValue<ShadowDefinition>(StyleProperties.boxShadow);
        }
        public YogaValue2 translate
        {
            set => SetStyleValue(StyleProperties.translate, value);
            get => GetStyleValue<YogaValue2>(StyleProperties.translate);
        }
        public Vector2 scale
        {
            set => SetStyleValue(StyleProperties.scale, value);
            get => GetStyleValue<Vector2>(StyleProperties.scale);
        }
        public YogaValue2 transformOrigin
        {
            set => SetStyleValue(StyleProperties.transformOrigin, value);
            get => GetStyleValue<YogaValue2>(StyleProperties.transformOrigin);
        }
        public float rotate
        {
            set => SetStyleValue(StyleProperties.rotate, value);
            get => GetStyleValue<float>(StyleProperties.rotate);
        }
        public FontReference fontFamily
        {
            set => SetStyleValue(StyleProperties.fontFamily, value);
            get => GetStyleValue<FontReference>(StyleProperties.fontFamily);
        }
        public Color color
        {
            set => SetStyleValue(StyleProperties.color, value);
            get => GetStyleValue<Color>(StyleProperties.color);
        }
        public FontWeight fontWeight
        {
            set => SetStyleValue(StyleProperties.fontWeight, value);
            get => GetStyleValue<FontWeight>(StyleProperties.fontWeight);
        }
        public FontStyles fontStyle
        {
            set => SetStyleValue(StyleProperties.fontStyle, value);
            get => GetStyleValue<FontStyles>(StyleProperties.fontStyle);
        }
        public YogaValue fontSize
        {
            set => SetStyleValue(StyleProperties.fontSize, value);
            get => GetStyleValue<YogaValue>(StyleProperties.fontSize);
        }
        public TextAlignmentOptions textAlign
        {
            set => SetStyleValue(StyleProperties.textAlign, value);
            get => GetStyleValue<TextAlignmentOptions>(StyleProperties.textAlign);
        }
        public TextOverflowModes textOverflow
        {
            set => SetStyleValue(StyleProperties.textOverflow, value);
            get => GetStyleValue<TextOverflowModes>(StyleProperties.textOverflow);
        }
        public bool textWrap
        {
            set => SetStyleValue(StyleProperties.textWrap, value);
            get => GetStyleValue<bool>(StyleProperties.textWrap);
        }
        public string content
        {
            set => SetStyleValue(StyleProperties.content, value);
            get => GetStyleValue<string>(StyleProperties.content);
        }
        public Appearance appearance
        {
            set => SetStyleValue(StyleProperties.appearance, value);
            get => GetStyleValue<Appearance>(StyleProperties.appearance);
        }
        public Navigation.Mode navigation
        {
            set => SetStyleValue(StyleProperties.navigation, value);
            get => GetStyleValue<Navigation.Mode>(StyleProperties.navigation);
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

        public NodeStyle(StateStyles stateStyles) : this()
        {
            StateStyles = stateStyles;
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

        public object GetStyleValue(IStyleProperty prop, bool fromChild = false)
        {
            if (fromChild) HasInheritedChanges = true;

            object value;
            var name = prop.name;

            if (
                !StyleMap.TryGetValue(name, out value) &&
                (CssStyles == null || !CssStyles.Any(x => x.TryGetValue(name, out value))) &&
                (DefaultStyle == null || !DefaultStyle.TryGetValue(name, out value)))
            {
                if (prop.inherited)
                {
                    return Parent?.GetStyleValue(prop, true) ?? prop?.defaultValue;
                }

                return prop?.defaultValue;
            }

            return GetStyleValueSpecial(value, prop);
        }

        private object GetStyleValueSpecial(object value, IStyleProperty prop)
        {
            if (Equals(value, SpecialNames.CantParse)) return null;
            else if (Equals(value, SpecialNames.Initial) || Equals(value, SpecialNames.Unset)) return prop?.defaultValue;
            else if (Equals(value, SpecialNames.Inherit)) return Parent?.GetStyleValue(prop) ?? prop?.defaultValue;
            return value;
        }

        public T GetStyleValue<T>(IStyleProperty prop)
        {
            var value = GetStyleValue(prop);
            return value == null ? default : (T) value;
        }


        public void SetStyleValue(IStyleProperty prop, object value)
        {
            var name = prop.name;
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
                if (prop.inherited) HasInheritedChanges = true;
            }
        }

        public void MarkChangesSeen()
        {
            HasInheritedChanges = false;
        }

        public bool HasValue(string name)
        {
            return StyleMap.ContainsKey(name) ||
                (CssStyles != null && CssStyles.Any(x => x.ContainsKey(name))) ||
                (DefaultStyle != null && DefaultStyle.ContainsKey(name));
        }
    }
}
