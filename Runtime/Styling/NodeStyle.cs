using System.Collections.Generic;
using ReactUnity.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using NavigationMode = UnityEngine.UI.Navigation.Mode;

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

        public float opacity => GetStyleValue(StyleProperties.opacity);
        public int zIndex => GetStyleValue(StyleProperties.zIndex);
        public bool visibility => GetStyleValue(StyleProperties.visibility);
        public PositionType position => GetStyleValue(StyleProperties.position);
        public CursorList cursor => GetStyleValue(StyleProperties.cursor);
        public PointerEvents pointerEvents => GetStyleValue(StyleProperties.pointerEvents);
        public ImageReference maskImage => GetStyleValue(StyleProperties.maskImage);
        public float borderTopLeftRadius => GetStyleValue(StyleProperties.borderTopLeftRadius);
        public float borderTopRightRadius => GetStyleValue(StyleProperties.borderTopRightRadius);
        public float borderBottomLeftRadius => GetStyleValue(StyleProperties.borderBottomLeftRadius);
        public float borderBottomRightRadius => GetStyleValue(StyleProperties.borderBottomRightRadius);
        public Color borderLeftColor => GetStyleValue(StyleProperties.borderLeftColor);
        public Color borderRightColor => GetStyleValue(StyleProperties.borderRightColor);
        public Color borderTopColor => GetStyleValue(StyleProperties.borderTopColor);
        public Color borderBottomColor => GetStyleValue(StyleProperties.borderBottomColor);
        public BoxShadowList boxShadow => GetStyleValue(StyleProperties.boxShadow);
        public YogaValue2 transformOrigin => GetStyleValue(StyleProperties.transformOrigin);
        public YogaValue2 translate => GetStyleValue(StyleProperties.translate);
        public Vector2 scale => GetStyleValue(StyleProperties.scale);
        public Vector3 rotate => GetStyleValue(StyleProperties.rotate);
        public FontReference fontFamily => GetStyleValue(StyleProperties.fontFamily);
        public Color color => GetStyleValue(StyleProperties.color);
        public FontWeight fontWeight => GetStyleValue(StyleProperties.fontWeight);
        public FontStyles fontStyle => GetStyleValue(StyleProperties.fontStyle);
        public float fontSize => GetStyleValue(StyleProperties.fontSize);
        public float lineHeight => GetStyleValue(StyleProperties.lineHeight);
        public float letterSpacing => GetStyleValue(StyleProperties.letterSpacing);
        public float wordSpacing => GetStyleValue(StyleProperties.wordSpacing);
        public TextAlignmentOptions textAlign => GetStyleValue(StyleProperties.textAlign);
        public TextOverflowModes textOverflow => GetStyleValue(StyleProperties.textOverflow);
        public bool textWrap => GetStyleValue(StyleProperties.textWrap);
        public int maxLines => GetStyleValue(StyleProperties.maxLines);
        public float textStrokeWidth => GetStyleValue(StyleProperties.textStrokeWidth);
        public Color textStrokeColor => GetStyleValue(StyleProperties.textStrokeColor);
        public string content => GetStyleValue(StyleProperties.content);
        public Appearance appearance => GetStyleValue(StyleProperties.appearance);
        public NavigationMode navigation => GetStyleValue(StyleProperties.navigation);
        public float stateDuration => GetStyleValue(StyleProperties.stateDuration);
        public ObjectFit objectFit => GetStyleValue(StyleProperties.objectFit);
        public YogaValue2 objectPosition => GetStyleValue(StyleProperties.objectPosition);
        public Color backgroundColor => GetStyleValue(StyleProperties.backgroundColor);
        public CssValueList<ImageDefinition> backgroundImage => GetStyleValue(StyleProperties.backgroundImage);
        public BackgroundBlendMode backgroundBlendMode => GetStyleValue(StyleProperties.backgroundBlendMode);
        public CssValueList<TransitionProperty> transitionProperty => GetStyleValue(StyleProperties.transitionProperty);
        public CssValueList<float> transitionDuration => GetStyleValue(StyleProperties.transitionDuration);
        public CssValueList<TimingFunction> transitionTimingFunction => GetStyleValue(StyleProperties.transitionTimingFunction);
        public CssValueList<float> transitionDelay => GetStyleValue(StyleProperties.transitionDelay);
        public CssValueList<AnimationPlayState> transitionPlayState => GetStyleValue(StyleProperties.transitionPlayState);
        public CssValueList<float> animationDelay => GetStyleValue(StyleProperties.animationDelay);
        public CssValueList<AnimationDirection> animationDirection => GetStyleValue(StyleProperties.animationDirection);
        public CssValueList<float> animationDuration => GetStyleValue(StyleProperties.animationDuration);
        public CssValueList<AnimationFillMode> animationFillMode => GetStyleValue(StyleProperties.animationFillMode);
        public CssValueList<int> animationIterationCount => GetStyleValue(StyleProperties.animationIterationCount);
        public CssValueList<string> animationName => GetStyleValue(StyleProperties.animationName);
        public CssValueList<AnimationPlayState> animationPlayState => GetStyleValue(StyleProperties.animationPlayState);
        public CssValueList<TimingFunction> animationTimingFunction => GetStyleValue(StyleProperties.animationTimingFunction);
        public CssValueList<AudioReference> audioClip => GetStyleValue(StyleProperties.audioClip);
        public CssValueList<int> audioIterationCount => GetStyleValue(StyleProperties.audioIterationCount);
        public CssValueList<float> audioDelay => GetStyleValue(StyleProperties.audioDelay);

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

            return Cache[prop] = GetStyleValueSpecial(value, prop, activeStyle ?? this) ?? prop?.defaultValue;
        }

        private object GetStyleValueSpecial(object value, IStyleProperty prop, NodeStyle activeStyle)
        {
            if (value == null) return null;
            if (value is CssKeyword ck)
            {
                if (ck == CssKeyword.Invalid || ck == CssKeyword.NoKeyword || ck == CssKeyword.Invalid) return null;
                else if (ck == CssKeyword.Inherit) return Parent?.GetRawStyleValue(prop, true);
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
            if (value != null && !typeof(T).IsAssignableFrom(value.GetType()) && !typeof(T).IsEnum)
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
