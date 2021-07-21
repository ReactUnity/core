using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Animations;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        Dictionary<string, object> StyleMap;
        public List<Dictionary<string, object>> CssStyles;
        Dictionary<string, object> DefaultStyle;
        NodeStyle Fallback;
        public bool HasInheritedChanges { get; private set; } = false;

        public NodeStyle Parent;

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
        public CursorList cursor
        {
            set => SetStyleValue(StyleProperties.cursor, value);
            get => GetStyleValue<CursorList>(StyleProperties.cursor);
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
        public float borderRadius
        {
            set => SetStyleValue(StyleProperties.borderRadius, value);
            get => GetStyleValue<float>(StyleProperties.borderRadius);
        }
        public float borderTopLeftRadius
        {
            set => SetStyleValue(StyleProperties.borderTopLeftRadius, value);
            get => HasValue(StyleProperties.borderTopLeftRadius.name) ? GetStyleValue<float>(StyleProperties.borderTopLeftRadius) : GetStyleValue<float>(StyleProperties.borderRadius);
        }
        public float borderTopRightRadius
        {
            set => SetStyleValue(StyleProperties.borderTopRightRadius, value);
            get => HasValue(StyleProperties.borderTopRightRadius.name) ? GetStyleValue<float>(StyleProperties.borderTopRightRadius) : GetStyleValue<float>(StyleProperties.borderRadius);
        }
        public float borderBottomLeftRadius
        {
            set => SetStyleValue(StyleProperties.borderBottomLeftRadius, value);
            get => HasValue(StyleProperties.borderBottomLeftRadius.name) ? GetStyleValue<float>(StyleProperties.borderBottomLeftRadius) : GetStyleValue<float>(StyleProperties.borderRadius);
        }
        public float borderBottomRightRadius
        {
            set => SetStyleValue(StyleProperties.borderBottomRightRadius, value);
            get => HasValue(StyleProperties.borderBottomRightRadius.name) ? GetStyleValue<float>(StyleProperties.borderBottomRightRadius) : GetStyleValue<float>(StyleProperties.borderRadius);
        }
        public Color borderColor
        {
            set => SetStyleValue(StyleProperties.borderColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public Color borderLeftColor
        {
            set => SetStyleValue(StyleProperties.borderLeftColor, value);
            get => HasValue(StyleProperties.borderLeftColor.name) ? GetStyleValue<Color>(StyleProperties.borderLeftColor) : GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public Color borderRightColor
        {
            set => SetStyleValue(StyleProperties.borderRightColor, value);
            get => HasValue(StyleProperties.borderRightColor.name) ? GetStyleValue<Color>(StyleProperties.borderRightColor) : GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public Color borderTopColor
        {
            set => SetStyleValue(StyleProperties.borderTopColor, value);
            get => HasValue(StyleProperties.borderTopColor.name) ? GetStyleValue<Color>(StyleProperties.borderTopColor) : GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public Color borderBottomColor
        {
            set => SetStyleValue(StyleProperties.borderBottomColor, value);
            get => HasValue(StyleProperties.borderBottomColor.name) ? GetStyleValue<Color>(StyleProperties.borderBottomColor) : GetStyleValue<Color>(StyleProperties.borderColor);
        }
        public BoxShadowList boxShadow
        {
            set => SetStyleValue(StyleProperties.boxShadow, value);
            get => GetStyleValue<BoxShadowList>(StyleProperties.boxShadow);
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
        public Vector3 rotate
        {
            set => SetStyleValue(StyleProperties.rotate, value);
            get => GetStyleValue<Vector3>(StyleProperties.rotate);
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
        public TransitionList transition
        {
            set => SetStyleValue(StyleProperties.transition, value);
            get => GetStyleValue<TransitionList>(StyleProperties.transition);
        }
        public AnimationList animation
        {
            set => SetStyleValue(StyleProperties.animation, value);
            get => GetStyleValue<AnimationList>(StyleProperties.animation);
        }
        public AudioList audio
        {
            set => SetStyleValue(StyleProperties.audio, value);
            get => GetStyleValue<AudioList>(StyleProperties.audio);
        }
        public ObjectFit objectFit
        {
            set => SetStyleValue(StyleProperties.objectFit, value);
            get => GetStyleValue<ObjectFit>(StyleProperties.objectFit);
        }
        public YogaValue2 objectPosition
        {
            set => SetStyleValue(StyleProperties.objectPosition, value);
            get => GetStyleValue<YogaValue2>(StyleProperties.objectPosition);
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

        public NodeStyle(NodeStyle defaultStyle = null, NodeStyle fallback = null)
        {
            StyleMap = new Dictionary<string, object>();
            DefaultStyle = defaultStyle?.StyleMap;
            Fallback = fallback;
        }

        public void CopyStyle(NodeStyle copyFrom)
        {
            StyleMap = new Dictionary<string, object>(copyFrom.StyleMap);
        }

        public object GetRawStyleValue(IStyleProperty prop, bool fromChild = false, NodeStyle activeStyle = null)
        {
            if (fromChild) HasInheritedChanges = true;

            object value;
            var name = prop.name;

            if (
                !StyleMap.TryGetValue(name, out value) &&
                !OwnTryGetValue(name, out value) &&
                (DefaultStyle == null || !DefaultStyle.TryGetValue(name, out value)))
            {
                if (Fallback != null)
                {
                    return Fallback.GetRawStyleValue(prop, fromChild, this);
                }

                if (prop.inherited)
                {
                    return Parent?.GetRawStyleValue(prop, true) ?? prop?.defaultValue;
                }

                return prop?.defaultValue;
            }

            return GetStyleValueSpecial(value, prop, activeStyle ?? this);
        }

        private object GetStyleValueSpecial(object value, IStyleProperty prop, NodeStyle activeStyle)
        {
            if (value == null) return null;
            if (Equals(value, CssKeyword.CurrentColor))
            {
                if (prop as StyleProperty<Color> == StyleProperties.color)
                    return Parent?.GetRawStyleValue(StyleProperties.color);
                return activeStyle?.GetRawStyleValue(StyleProperties.color);
            }
            if (Equals(value, CssKeyword.Invalid)) return null;
            else if (Equals(value, CssKeyword.Initial) || Equals(value, CssKeyword.Unset)) return prop?.defaultValue;
            else if (Equals(value, CssKeyword.Inherit)) return Parent?.GetRawStyleValue(prop) ?? prop?.defaultValue;
            return value;
        }

        public T GetStyleValue<T>(IStyleProperty prop)
        {
            var value = GetRawStyleValue(prop);
            if (value is IDynamicValue d) value = d.Convert(prop, this);

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

        public bool HasValue(IStyleProperty prop)
        {
            return HasValue(prop.name);
        }

        public bool HasValue(string name)
        {
            return StyleMap.ContainsKey(name) ||
                OwnHasValue(name) ||
                (DefaultStyle != null && DefaultStyle.ContainsKey(name)) ||
                (Fallback != null && Fallback.HasValue(name));
        }

        private bool OwnTryGetValue(string name, out object res)
        {
            if (CssStyles == null)
            {
                res = null;
                return false;
            }
            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (dic.TryGetValue(name, out res)) return true;
            }
            res = null;
            return false;
        }

        private bool OwnHasValue(string name)
        {
            if (CssStyles == null) return false;
            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (dic.ContainsKey(name)) return true;
            }
            return false;
        }
    }
}
