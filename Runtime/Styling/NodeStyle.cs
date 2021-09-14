using System.Collections.Generic;
using ReactUnity.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        Dictionary<string, object> StyleMap;
        List<IDictionary<IStyleProperty, object>> CssStyles;
        NodeStyle Fallback;
        public bool HasInheritedChanges { get; private set; } = false;

        public ReactContext Context;
        public NodeStyle Parent;
        Dictionary<IStyleProperty, object> Cache;

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
        public PositionType position
        {
            set => SetStyleValue(StyleProperties.position, value);
            get => GetStyleValue<PositionType>(StyleProperties.position);
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
        public BackgroundBlendMode backgroundBlendMode
        {
            set => SetStyleValue(StyleProperties.backgroundBlendMode, value);
            get => GetStyleValue<BackgroundBlendMode>(StyleProperties.backgroundBlendMode);
        }
        public ImageReference maskImage
        {
            set => SetStyleValue(StyleProperties.maskImage, value);
            get => GetStyleValue<ImageReference>(StyleProperties.maskImage);
        }
        public float borderTopLeftRadius
        {
            set => SetStyleValue(StyleProperties.borderTopLeftRadius, value);
            get => GetStyleValue<float>(StyleProperties.borderTopLeftRadius);
        }
        public float borderTopRightRadius
        {
            set => SetStyleValue(StyleProperties.borderTopRightRadius, value);
            get => GetStyleValue<float>(StyleProperties.borderTopRightRadius);
        }
        public float borderBottomLeftRadius
        {
            set => SetStyleValue(StyleProperties.borderBottomLeftRadius, value);
            get => GetStyleValue<float>(StyleProperties.borderBottomLeftRadius);
        }
        public float borderBottomRightRadius
        {
            set => SetStyleValue(StyleProperties.borderBottomRightRadius, value);
            get => GetStyleValue<float>(StyleProperties.borderBottomRightRadius);
        }
        public Color borderLeftColor
        {
            set => SetStyleValue(StyleProperties.borderLeftColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderLeftColor);
        }
        public Color borderRightColor
        {
            set => SetStyleValue(StyleProperties.borderRightColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderRightColor);
        }
        public Color borderTopColor
        {
            set => SetStyleValue(StyleProperties.borderTopColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderTopColor);
        }
        public Color borderBottomColor
        {
            set => SetStyleValue(StyleProperties.borderBottomColor, value);
            get => GetStyleValue<Color>(StyleProperties.borderBottomColor);
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
        public float fontSize
        {
            set => SetStyleValue(StyleProperties.fontSize, value);
            get => GetStyleValue<float>(StyleProperties.fontSize);
        }
        public float lineHeight
        {
            set => SetStyleValue(StyleProperties.lineHeight, value);
            get => GetStyleValue<float>(StyleProperties.lineHeight);
        }
        public float letterSpacing
        {
            set => SetStyleValue(StyleProperties.letterSpacing, value);
            get => GetStyleValue<float>(StyleProperties.letterSpacing);
        }
        public float wordSpacing
        {
            set => SetStyleValue(StyleProperties.wordSpacing, value);
            get => GetStyleValue<float>(StyleProperties.wordSpacing);
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
        public Color textStrokeColor
        {
            set => SetStyleValue(StyleProperties.textStrokeColor, value);
            get => GetStyleValue<Color>(StyleProperties.textStrokeColor);
        }
        public float textStrokeWidth
        {
            set => SetStyleValue(StyleProperties.textStrokeWidth, value);
            get => GetStyleValue<float>(StyleProperties.textStrokeWidth);
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
        public float stateDuration
        {
            set => SetStyleValue(StyleProperties.stateDuration, value);
            get => GetStyleValue<float>(StyleProperties.stateDuration);
        }

        public CssValueList<float> transitionDuration => GetStyleValue(StyleProperties.transitionDuration);
        public CssValueList<float> transitionDelay => GetStyleValue(StyleProperties.transitionDelay);
        public CssValueList<TimingFunction> transitionTimingFunction => GetStyleValue(StyleProperties.transitionTimingFunction);
        public CssValueList<TransitionProperty> transitionProperty => GetStyleValue(StyleProperties.transitionProperty);
        public CssValueList<AnimationPlayState> transitionPlayState => GetStyleValue(StyleProperties.transitionPlayState);

        public CssValueList<float> animationDelay => GetStyleValue(StyleProperties.animationDelay);
        public CssValueList<AnimationDirection> animationDirection => GetStyleValue(StyleProperties.animationDirection);
        public CssValueList<float> animationDuration => GetStyleValue(StyleProperties.animationDuration);
        public CssValueList<AnimationFillMode> animationFillMode => GetStyleValue(StyleProperties.animationFillMode);
        public CssValueList<int> animationIterationCount => GetStyleValue(StyleProperties.animationIterationCount);
        public CssValueList<string> animationName => GetStyleValue(StyleProperties.animationName);
        public CssValueList<AnimationPlayState> animationPlayState => GetStyleValue(StyleProperties.animationPlayState);
        public CssValueList<TimingFunction> animationTimingFunction => GetStyleValue(StyleProperties.animationTimingFunction);

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

        public NodeStyle(ReactContext context, NodeStyle fallback = null, List<IDictionary<IStyleProperty, object>> cssStyles = null)
        {
            Context = context;
            StyleMap = new Dictionary<string, object>();
            Fallback = fallback;
            CssStyles = cssStyles;
        }

        public void UpdateParent(NodeStyle parent)
        {
            Parent = parent;
            Fallback?.UpdateParent(parent);
            Cache?.Clear();
        }

        public object GetRawStyleValue(IStyleProperty prop, bool fromChild = false, NodeStyle activeStyle = null)
        {
            if (fromChild) HasInheritedChanges = true;

            if (Cache == null) Cache = new Dictionary<IStyleProperty, object>();
            else if (Cache.TryGetValue(prop, out var cached)) return cached;

            object value;
            var name = prop.name;

            if (
                !StyleMap.TryGetValue(name, out value) &&
                !CssTryGetValue(prop, out value))
            {
                if (Fallback != null)
                {
                    value = Fallback.GetRawStyleValue(prop, fromChild, this);
                }
                else if (prop.inherited)
                {
                    value = Parent?.GetRawStyleValue(prop, true) ?? prop?.defaultValue;
                }
                else value = prop?.defaultValue;
            }

            return Cache[prop] = GetStyleValueSpecial(value, prop, activeStyle ?? this);
        }

        private object GetStyleValueSpecial(object value, IStyleProperty prop, NodeStyle activeStyle)
        {
            if (value == null) return null;
            if (value is CssKeyword ck)
            {
                if (ck == CssKeyword.Invalid) return null;
                else if (ck == CssKeyword.Inherit) return Parent?.GetRawStyleValue(prop) ?? prop?.defaultValue;
                else if (ck == CssKeyword.Auto || ck == CssKeyword.None || ck == CssKeyword.Initial || ck == CssKeyword.Unset || ck == CssKeyword.Default)
                    return prop?.defaultValue;
            }
            return value;
        }
        public T GetStyleValue<T>(StyleProperty<T> prop, bool convert = false) => GetStyleValue<T>(prop as IStyleProperty, convert);

        public T GetStyleValue<T>(IStyleProperty prop, bool convert = false)
        {
            var value = GetRawStyleValue(prop);
            if (value is IComputedValue d) value = d.GetValue(prop, this);
            if (value == null) return default;
            if (convert && value.GetType() != typeof(T)) value = prop.Convert(value);

#if UNITY_EDITOR
            if (value != null && value.GetType() != typeof(T) && !typeof(T).IsEnum)
            {
                Debug.LogError($"Error while converting {value} from type {value.GetType()} to {typeof(T)}");
            }
#endif

            return (T) value;
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

            if (changed)
            {
                if (value == null) StyleMap.Remove(name);
                else StyleMap[name] = value;

                Cache.Remove(prop);
                if (prop.inherited) HasInheritedChanges = true;
            }
        }

        public void MarkChangesSeen()
        {
            HasInheritedChanges = false;
        }

        public bool HasValue(IStyleProperty prop)
        {
            return StyleMap.ContainsKey(prop.name) ||
                CssHasValue(prop) ||
                (Fallback != null && Fallback.HasValue(prop));
        }

        private bool CssTryGetValue(IStyleProperty prop, out object res)
        {
            if (CssStyles == null)
            {
                res = null;
                return false;
            }
            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (dic.TryGetValue(prop, out res)) return true;
            }
            res = null;
            return false;
        }

        private bool CssHasValue(IStyleProperty prop)
        {
            if (CssStyles == null) return false;
            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (dic.ContainsKey(prop)) return true;
            }
            return false;
        }
    }
}
