using System.Collections.Generic;
using Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using NavigationMode = UnityEngine.UI.Navigation.Mode;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        // Values set on this node directly, which is how a transition or animation writes its frame.
        private PropertyTable StyleMap;
        private List<IDictionary<IStyleProperty, object>> CssStyles;
        private NodeStyle Fallback;
        private PropertyTable Cache;
        // Computed values resolved, dropped with Cache: an inherited default resolves by walking every ancestor.
        private PropertyTable Resolved;
        // Physical properties answered by ResolveLogical, dropped with Cache.
        private Dictionary<IStyleProperty, IStyleProperty> Logical;
        // Set while resolving when a value read state outside the cascade, which no cache clear would follow.
        private static bool readLiveState;
        // Set once an `inherit` or `unset` has read the parent, which a compositor-only parent update may then have moved.
        private bool readsParent;
        // The declaration blocks merged on first read, each property keeping the first block's value,
        // so a read is one lookup rather than one per block. Merged again once an inline block is written.
        private PropertyTable declared;
        private bool declaredBuilt;
        private int declaredStamp;
        // The blocks that can still be written, found once: only an inline block is, and it is usually the only one.
        private Reactive.ReactiveDictionary<IStyleProperty, object>[] liveBlocks;
        // What a merged entry holds when the winning declaration is a revert-layer, which only the walk resolves.
        private static readonly object NeedsWalk = new object();

        public bool HasInheritedChanges { get; private set; } = false;

        public ReactContext Context { get; }
        public NodeStyle Parent { get; private set; }
        public IRevertCalculator RevertCalculator { get; }

        /// <summary>The element this is the style of, when it is one's resolved style rather than a bare style bag.</summary>
        public IReactComponent Component { get; }

        #region Getters

        public int order => GetStyleValue(LayoutProperties.Order);
        public float opacity => GetStyleValue(StyleProperties.opacity);
        public int? zIndex => GetStyleValue(StyleProperties.zIndex);
        public SortingLayer? sortingLayer => GetStyleValue(StyleProperties.sortingLayer);
        public bool visibility => GetStyleValue(StyleProperties.visibility);
        public PositionType position => GetStyleValue(StyleProperties.position);
        public ICssValueList<Types.Cursor> cursor => GetStyleValue(StyleProperties.cursor);
        public Isolation isolation => GetStyleValue(StyleProperties.isolation);
        public PointerEvents pointerEvents => GetStyleValue(StyleProperties.pointerEvents);
        public ContainerType containerType => GetStyleValue(StyleProperties.containerType);
        public string containerName => GetStyleValue(StyleProperties.containerName);
        public ColorScheme colorScheme => GetStyleValue(StyleProperties.colorScheme);
        public ScrollbarGutter scrollbarGutter => GetStyleValue(StyleProperties.scrollbarGutter);
        public ScrollBehavior scrollBehavior => GetStyleValue(StyleProperties.scrollBehavior);
        public ScrollSnapType scrollSnapType => GetStyleValue(StyleProperties.scrollSnapType);
        public ScrollSnapAlign scrollSnapAlign => GetStyleValue(StyleProperties.scrollSnapAlign);
        public ScrollSnapStop scrollSnapStop => GetStyleValue(StyleProperties.scrollSnapStop);
        public OverscrollBehavior overscrollBehaviorX => GetStyleValue(StyleProperties.overscrollBehaviorX);
        public OverscrollBehavior overscrollBehaviorY => GetStyleValue(StyleProperties.overscrollBehaviorY);
        public YogaValue scrollPaddingTop => GetStyleValue(StyleProperties.scrollPaddingTop);
        public YogaValue scrollPaddingRight => GetStyleValue<YogaValue>(ResolveLogical(StyleProperties.scrollPaddingRight));
        public YogaValue scrollPaddingBottom => GetStyleValue(StyleProperties.scrollPaddingBottom);
        public YogaValue scrollPaddingLeft => GetStyleValue<YogaValue>(ResolveLogical(StyleProperties.scrollPaddingLeft));
        public float scrollMarginTop => GetStyleValue(StyleProperties.scrollMarginTop);
        public float scrollMarginRight => GetStyleValue<float>(ResolveLogical(StyleProperties.scrollMarginRight));
        public float scrollMarginBottom => GetStyleValue(StyleProperties.scrollMarginBottom);
        public float scrollMarginLeft => GetStyleValue<float>(ResolveLogical(StyleProperties.scrollMarginLeft));
        public YogaValue2 borderTopLeftRadius => GetStyleValue<YogaValue2>(ResolveLogical(StyleProperties.borderTopLeftRadius));
        public YogaValue2 borderTopRightRadius => GetStyleValue<YogaValue2>(ResolveLogical(StyleProperties.borderTopRightRadius));
        public YogaValue2 borderBottomLeftRadius => GetStyleValue<YogaValue2>(ResolveLogical(StyleProperties.borderBottomLeftRadius));
        public YogaValue2 borderBottomRightRadius => GetStyleValue<YogaValue2>(ResolveLogical(StyleProperties.borderBottomRightRadius));
        public float outlineOffset => GetStyleValue(StyleProperties.outlineOffset);
        public float outlineWidth => GetStyleValue(StyleProperties.outlineWidth);
        public Color outlineColor => GetStyleValue(StyleProperties.outlineColor);
        public BorderStyle outlineStyle => GetStyleValue(StyleProperties.outlineStyle);
        public Color borderLeftColor => GetStyleValue<Color>(ResolveLogical(StyleProperties.borderLeftColor));
        public Color borderRightColor => GetStyleValue<Color>(ResolveLogical(StyleProperties.borderRightColor));
        public Color borderTopColor => GetStyleValue(StyleProperties.borderTopColor);
        public Color borderBottomColor => GetStyleValue(StyleProperties.borderBottomColor);
        public BorderStyle borderLeftStyle => GetStyleValue<BorderStyle>(ResolveLogical(StyleProperties.borderLeftStyle));
        public BorderStyle borderRightStyle => GetStyleValue<BorderStyle>(ResolveLogical(StyleProperties.borderRightStyle));
        public BorderStyle borderTopStyle => GetStyleValue(StyleProperties.borderTopStyle);
        public BorderStyle borderBottomStyle => GetStyleValue(StyleProperties.borderBottomStyle);
        public ICssValueList<BoxShadow> boxShadow => GetStyleValue(StyleProperties.boxShadow);
        public YogaValue2 transformOrigin => GetStyleValue(StyleProperties.transformOrigin);
        public YogaValue2 translate => GetStyleValue(StyleProperties.translate);
        public YogaValue translateZ => GetStyleValue(StyleProperties.translateZ);
        public Vector3 scale => GetStyleValue(StyleProperties.scale);
        public Vector3 rotate => GetStyleValue(StyleProperties.rotate);
        // Negative is not a value CSS accepts, and a projection from behind the viewer is not one
        // anything could draw, so it reads as `none` rather than turning the subtree inside out.
        public float perspective => Mathf.Max(0, GetStyleValue(StyleProperties.perspective));
        public YogaValue2 perspectiveOrigin => GetStyleValue(StyleProperties.perspectiveOrigin);
        public BackfaceVisibility backfaceVisibility => GetStyleValue(StyleProperties.backfaceVisibility);
        public FontReference fontFamily => GetStyleValue(StyleProperties.fontFamily);
        public Color color => GetStyleValue(StyleProperties.color);
        public FontWeight fontWeight => GetStyleValue(StyleProperties.fontWeight);
        public FontStyles fontStyle => GetStyleValue(StyleProperties.fontStyle);
        public TextTransform textTransform => GetStyleValue(StyleProperties.textTransform);
        public float fontSize => GetStyleValue(StyleProperties.fontSize);
        public float lineHeight => GetStyleValue(StyleProperties.lineHeight);
        public float letterSpacing => GetStyleValue(StyleProperties.letterSpacing);
        public float wordSpacing => GetStyleValue(StyleProperties.wordSpacing);
        public TextAlignmentOptions textAlign => GetStyleValue(StyleProperties.textAlign);
        public VerticalAlignmentOptions verticalAlign => GetStyleValue(StyleProperties.verticalAlign);
        public TextOverflowModes textOverflow => GetStyleValue(StyleProperties.textOverflow);
        public WhiteSpace whiteSpace => GetStyleValue(StyleProperties.whiteSpace);
        public ICssValueList<BoxShadow> textShadow => GetStyleValue(StyleProperties.textShadow);
        public Color caretColor => GetStyleValue(StyleProperties.caretColor);
        public YogaOverflow overflowX => GetStyleValue(StyleProperties.overflowX);
        public YogaOverflow overflowY => GetStyleValue(StyleProperties.overflowY);
        public int maxLines => GetStyleValue(StyleProperties.maxLines);
        public float textStrokeWidth => GetStyleValue(StyleProperties.textStrokeWidth);
        public Color textStrokeColor => GetStyleValue(StyleProperties.textStrokeColor);
        public Color textDecorationColor => GetStyleValue(StyleProperties.textDecorationColor);
        public string content => GetStyleValue(StyleProperties.content);
        public Appearance appearance => GetStyleValue(StyleProperties.appearance);
        public NavigationMode navigation => GetStyleValue(StyleProperties.navigation);
        public float stateDuration => GetStyleValue(StyleProperties.stateDuration);
        public ObjectFit objectFit => GetStyleValue(StyleProperties.objectFit);
        public YogaValue2 objectPosition => GetStyleValue(StyleProperties.objectPosition);

        public ImageDefinition borderImageSource => GetStyleValue(StyleProperties.borderImageSource);
        public BorderImageSlice borderImageSlice => GetStyleValue(StyleProperties.borderImageSlice);
        public ICssFourDirectional<BackgroundRepeat> borderImageRepeat => GetStyleValue(StyleProperties.borderImageRepeat);
        public ICssFourDirectional<YogaValue> borderImageOutset => GetStyleValue(StyleProperties.borderImageOutset);
        public ICssFourDirectional<YogaValue> borderImageWidth => GetStyleValue(StyleProperties.borderImageWidth);

        public Color backgroundColor => GetStyleValue(StyleProperties.backgroundColor);
        public ICssValueList<ImageDefinition> backgroundImage => GetStyleValue(StyleProperties.backgroundImage);
        public ICssValueList<YogaValue> backgroundPositionX => GetStyleValue(StyleProperties.backgroundPositionX);
        public ICssValueList<YogaValue> backgroundPositionY => GetStyleValue(StyleProperties.backgroundPositionY);
        public ICssValueList<BackgroundSize> backgroundSize => GetStyleValue(StyleProperties.backgroundSize);
        public ICssValueList<BackgroundRepeat> backgroundRepeatX => GetStyleValue(StyleProperties.backgroundRepeatX);
        public ICssValueList<BackgroundRepeat> backgroundRepeatY => GetStyleValue(StyleProperties.backgroundRepeatY);
        public ICssValueList<BackgroundBlendMode> backgroundBlendMode => GetStyleValue(StyleProperties.backgroundBlendMode);
        public ICssValueList<BackgroundBox> backgroundClip => GetStyleValue(StyleProperties.backgroundClip);

        public ICssValueList<ImageDefinition> maskImage => GetStyleValue(StyleProperties.maskImage);
        public ICssValueList<YogaValue> maskPositionX => GetStyleValue(StyleProperties.maskPositionX);
        public ICssValueList<YogaValue> maskPositionY => GetStyleValue(StyleProperties.maskPositionY);
        public ICssValueList<BackgroundSize> maskSize => GetStyleValue(StyleProperties.maskSize);
        public ICssValueList<BackgroundRepeat> maskRepeatX => GetStyleValue(StyleProperties.maskRepeatX);
        public ICssValueList<BackgroundRepeat> maskRepeatY => GetStyleValue(StyleProperties.maskRepeatY);
        public ICssValueList<MaskMode> maskMode => GetStyleValue(StyleProperties.maskMode);

        public ClipPath clipPath => GetStyleValue(StyleProperties.clipPath);
        public ShapeRendering shapeRendering => GetStyleValue(StyleProperties.shapeRendering);
        public ImageRendering imageRendering => GetStyleValue(StyleProperties.imageRendering);

        public FilterDefinition filter => GetStyleValue(StyleProperties.filter);
        public FilterDefinition backdropFilter => GetStyleValue(StyleProperties.backdropFilter);
        public BackgroundBlendMode mixBlendMode => GetStyleValue(StyleProperties.mixBlendMode);

        public ICssValueList<TransitionProperty> transitionProperty => GetStyleValue(StyleProperties.transitionProperty);
        public ICssValueList<float> transitionDuration => GetStyleValue(StyleProperties.transitionDuration);
        public ICssValueList<TimingFunction> transitionTimingFunction => GetStyleValue(StyleProperties.transitionTimingFunction);
        public ICssValueList<float> transitionDelay => GetStyleValue(StyleProperties.transitionDelay);
        public ICssValueList<AnimationPlayState> transitionPlayState => GetStyleValue(StyleProperties.transitionPlayState);

        public float motionDuration => GetStyleValue(StyleProperties.motionDuration);
        public TimingFunction motionTimingFunction => GetStyleValue(StyleProperties.motionTimingFunction);
        public float motionDelay => GetStyleValue(StyleProperties.motionDelay);

        public ICssValueList<float> animationDelay => GetStyleValue(StyleProperties.animationDelay);
        public ICssValueList<AnimationDirection> animationDirection => GetStyleValue(StyleProperties.animationDirection);
        public ICssValueList<float> animationDuration => GetStyleValue(StyleProperties.animationDuration);
        public ICssValueList<AnimationFillMode> animationFillMode => GetStyleValue(StyleProperties.animationFillMode);
        public ICssValueList<int> animationIterationCount => GetStyleValue(StyleProperties.animationIterationCount);
        public ICssValueList<string> animationName => GetStyleValue(StyleProperties.animationName);
        public ICssValueList<AnimationPlayState> animationPlayState => GetStyleValue(StyleProperties.animationPlayState);
        public ICssValueList<TimingFunction> animationTimingFunction => GetStyleValue(StyleProperties.animationTimingFunction);
        public ICssValueList<AnimationTimeline> animationTimeline => GetStyleValue(StyleProperties.animationTimeline);
        public ICssValueList<AnimationRangeBoundary> animationRangeStart => GetStyleValue(StyleProperties.animationRangeStart);
        public ICssValueList<AnimationRangeBoundary> animationRangeEnd => GetStyleValue(StyleProperties.animationRangeEnd);
        public string scrollTimelineName => GetStyleValue(StyleProperties.scrollTimelineName);
        public TimelineAxis scrollTimelineAxis => GetStyleValue(StyleProperties.scrollTimelineAxis);
        public string viewTimelineName => GetStyleValue(StyleProperties.viewTimelineName);
        public TimelineAxis viewTimelineAxis => GetStyleValue(StyleProperties.viewTimelineAxis);
        public YogaValue2 viewTimelineInset => GetStyleValue(StyleProperties.viewTimelineInset);
        public string timelineScope => GetStyleValue(StyleProperties.timelineScope);
        public ICssValueList<AudioReference> audioClip => GetStyleValue(StyleProperties.audioClip);
        public ICssValueList<int> audioIterationCount => GetStyleValue(StyleProperties.audioIterationCount);
        public ICssValueList<float> audioDelay => GetStyleValue(StyleProperties.audioDelay);
        public ICssValueList<float> audioVolume => GetStyleValue(StyleProperties.audioVolume);
        public ICssValueList<float> audioPitch => GetStyleValue(StyleProperties.audioPitch);

        #endregion

        public NodeStyle(
            ReactContext context,
            NodeStyle fallback = null,
            List<IDictionary<IStyleProperty, object>> cssStyles = null,
            IRevertCalculator revertCalculator = null,
            IReactComponent component = null
        )
        {
            Context = context;
            Component = component;
            Fallback = fallback;
            CssStyles = cssStyles;
            RevertCalculator = revertCalculator;
        }

        public void UpdateParent(NodeStyle parent)
        {
            Parent = parent;
            Fallback?.UpdateParent(parent);
            // The merged declarations are this node's own, so they outlive a change of parent.
            Cache.Clear();
            Resolved.Clear();
            Logical?.Clear();
        }

        /// <summary>
        /// A parent update that moved nothing but compositor properties. None of them inherit, so only an
        /// explicit <c>inherit</c> reads them off the parent, and a style that never met one keeps its cache.
        /// </summary>
        internal void UpdateParentCompositor(NodeStyle parent)
        {
            if (Parent != parent || readsParent)
            {
                UpdateParent(parent);
                return;
            }
            Fallback?.UpdateParentCompositor(parent);
        }

        // Nothing resolves against these, so a transition writing them each frame keeps the rest resolved.
        private static bool IsolatedWrite(IStyleProperty prop) =>
            ReferenceEquals(prop, StyleProperties.opacity) || ReferenceEquals(prop, StyleProperties.translate)
            || ReferenceEquals(prop, StyleProperties.rotate) || ReferenceEquals(prop, StyleProperties.scale);

        /// <summary>
        /// Called by a computed value that reads something outside the cascade -- a prop, a viewport or
        /// container size, a font still loading -- so that neither it nor what it feeds into is cached.
        /// </summary>
        internal static void MarkLiveRead() => readLiveState = true;

        public object GetRawStyleValue(IStyleProperty prop, bool fromChild = false, NodeStyle activeStyle = null) =>
            GetRawStyleValue(prop, PropertyTable.SlotOf(prop), fromChild, activeStyle);

        private object GetRawStyleValue(IStyleProperty prop, int slot, bool fromChild, NodeStyle activeStyle)
        {
            if (fromChild) HasInheritedChanges = true;

            var cached = Cache.Get(prop, slot);
            if (cached != null) return PropertyTable.Unwrap(cached);

            var value = StyleMap.Get(prop, slot);
            if (value == null) value = CssGet(prop, slot);

            if (value != null) value = PropertyTable.Unwrap(value);
            else if (Fallback != null) value = Fallback.GetRawStyleValue(prop, slot, fromChild, this);
            else if (prop.inherited) value = Parent?.GetRawStyleValue(prop, slot, true, null) ?? prop.defaultValue;
            else value = prop.defaultValue;

            var result = GetStyleValueSpecial(value, prop, activeStyle ?? this) ?? prop?.defaultValue;
            Cache.Set(prop, slot, result);
            return result;
        }

        /// <summary>
        /// The value declared on this node itself, skipping the walk up to the parent that an
        /// inherited property does. A custom property registered with <c>inherits: false</c> cannot
        /// be read any other way, since a variable is inherited otherwise.
        /// </summary>
        public object GetOwnStyleValue(IStyleProperty prop)
        {
            var slot = PropertyTable.SlotOf(prop);
            var value = StyleMap.Get(prop, slot) ?? CssGet(prop, slot);
            if (value == null) return Fallback?.GetOwnStyleValue(prop);

            return GetStyleValueSpecial(PropertyTable.Unwrap(value), prop, this);
        }

        private object GetStyleValueSpecial(object value, IStyleProperty prop, NodeStyle activeStyle)
        {
            if (value == null) return null;
            if (value is CssKeyword ck)
            {
                if (ck == CssKeyword.NoKeyword) return null;
                else if (ck == CssKeyword.Inherit) return ReadParent(prop, activeStyle);
                else if (ck == CssKeyword.Unset)
                {
                    if (prop != null && prop.inherited) return ReadParent(prop, activeStyle);
                    return prop?.defaultValue;
                }
                else if (ck == CssKeyword.Auto || ck == CssKeyword.None || ck == CssKeyword.Initial || ck == CssKeyword.Default)
                    return prop?.defaultValue;
                else if (ck == CssKeyword.Revert || ck == CssKeyword.RevertLayer)
                    return ComputedKeyword.Revert;
            }
            return value;
        }
        private object ReadParent(IStyleProperty prop, NodeStyle activeStyle)
        {
            readsParent = true;
            if (activeStyle != null) activeStyle.readsParent = true;
            return Parent?.GetRawStyleValue(prop, true);
        }

        public T GetStyleValue<T>(StyleProperty<T> prop, bool convert = false) => GetStyleValue<T>(prop, prop.slot, prop, convert);

        public T GetStyleValue<T>(IStyleProperty prop, bool convert = false) =>
            GetStyleValue<T>(prop, PropertyTable.SlotOf(prop), prop is VariableProperty ? AllConverters.RawConverter : prop, convert);

        private T GetStyleValue<T>(IStyleProperty prop, int slot, IStyleConverter converter, bool convert)
        {
            var value = GetRawStyleValue(prop, slot, false, null);

            if (value is IComputedValue dd) value = Resolve(dd, prop, slot, converter);

            if (value == null)
            {
                value = prop.defaultValue;
                if (value is IComputedValue d) value = d.ResolveValue(prop, this, converter);
            }
            else if (convert && value.GetType() != typeof(T))
            {
                value = prop.Convert(value);
                if (value is IComputedValue d) value = d.ResolveValue(prop, this, converter);

                if (value == null)
                {
                    value = prop.defaultValue;
                    if (value is IComputedValue dv) value = dv.ResolveValue(prop, this, converter);
                }
            }

            if (value != null && !(value is T) && !TypeFacts<T>.IsEnum)
            {
#if UNITY_EDITOR
                Debug.LogError($"Error while converting {value} from type {value.GetType()} to {typeof(T)}");
#endif
                // The property is left at its default rather than the cast being taken: a converter
                // that answered with the wrong type is a bug, and not one worth a torn-down frame.
                value = prop.defaultValue;
                if (value is IComputedValue mismatched) value = mismatched.ResolveValue(prop, this, converter);
                if (value != null && !(value is T)) value = null;
            }

            if (value == null && TypeFacts<T>.IsValueType) return default(T);

            return (T) value;
        }

        /// <summary>A property's value on this node, resolved but not converted to its type, as a computed value reads it.</summary>
        internal object GetResolvedValue(IStyleProperty prop, bool fromChild = false)
        {
            var slot = PropertyTable.SlotOf(prop);
            var value = GetRawStyleValue(prop, slot, fromChild, null);
            return value is IComputedValue computed ? Resolve(computed, prop, slot, prop is VariableProperty ? AllConverters.RawConverter : prop) : value;
        }

        private object Resolve(IComputedValue computed, IStyleProperty prop, int slot, IStyleConverter converter)
        {
            var hit = Resolved.Get(prop, slot);
            if (hit != null) return PropertyTable.Unwrap(hit);

            var outer = readLiveState;
            readLiveState = false;
            try
            {
                var value = computed.ResolveValue(prop, this, converter);
                if (!readLiveState) Resolved.Set(prop, slot, value);
                return value;
            }
            finally { readLiveState |= outer; }
        }

        // Asked of T on every read, and each is a reflection call under Mono.
        private static class TypeFacts<T>
        {
            public static readonly bool IsEnum = typeof(T).IsEnum;
            public static readonly bool IsValueType = typeof(T).IsValueType;
        }

        public void SetStyleValue(IStyleProperty prop, object value)
        {
            var slot = PropertyTable.SlotOf(prop);
            var currentValue = StyleMap.Get(prop, slot);
            if (currentValue == null && value == null) return;

            var changed = PropertyTable.Unwrap(currentValue) != value;

            if (changed)
            {
                if (value == null) StyleMap.Remove(prop, slot);
                else StyleMap.Set(prop, slot, value);

                Cache.Remove(prop, slot);
                if (IsolatedWrite(prop)) Resolved.Remove(prop, slot);
                else
                {
                    // Anything else may be resolved against it, as an em is against font-size.
                    Resolved.Clear();
                    Logical?.Clear();
                }
                if (prop.inherited) HasInheritedChanges = true;
            }
        }

        public void MarkChangesSeen()
        {
            HasInheritedChanges = false;
        }

        public bool HasValue(IStyleProperty prop)
        {
            var slot = PropertyTable.SlotOf(prop);
            for (var style = this; style != null; style = style.Fallback)
                if (style.StyleMap.Get(prop, slot) != null || style.CssHasValue(prop, slot)) return true;
            return false;
        }

        /// <summary>
        /// The property to read in place of a physical one: the inline-axis logical property covering
        /// the same edge, when that was declared. A logical declaration wins over the physical one it
        /// covers whichever order they were written in, which is how Yoga already resolves its Start
        /// edge against Left. Anything with no logical counterpart is returned as it came.
        /// </summary>
        public IStyleProperty ResolveLogical(IStyleProperty prop)
        {
            if (prop == null || !StyleProperties.InlineCounterparts.TryGetValue(prop, out var pair)) return prop;
            if (Logical != null && Logical.TryGetValue(prop, out var known)) return known;

            // Neither spelling declared is the overwhelming majority, and it answers without having to
            // resolve a direction at all.
            var resolved = prop;
            if (HasValue(pair[0]) || HasValue(pair[1]))
            {
                var logical = pair[IsRtl ? 1 : 0];
                if (HasValue(logical)) resolved = logical;
            }

            return (Logical ??= new Dictionary<IStyleProperty, IStyleProperty>())[prop] = resolved;
        }

        /// <summary>Whether this element resolves to a right-to-left direction.</summary>
        /// <remarks>
        /// Walked up the cascade rather than read back off the Yoga node. <c>direction</c> is a layout
        /// property, so it is not inherited on this side, and the node it is pushed to only reports a
        /// resolved direction once a layout has run -- which would leave a border a pass behind the
        /// rule that changed it. This is the walk Yoga does, one step earlier.
        /// </remarks>
        private bool IsRtl
        {
            get
            {
                for (var style = this; style != null; style = style.Parent)
                {
                    var dir = style.GetStyleValue(LayoutProperties.StyleDirection);
                    if (dir != YogaDirection.Inherit) return dir == YogaDirection.RTL;
                }
                return false;
            }
        }

        /// <summary>The declared value as a table entry: null when nothing declares it, <see cref="PropertyTable.Unwrap"/> otherwise.</summary>
        private object CssGet(IStyleProperty prop, int slot)
        {
            if (CssStyles == null) return null;

            object res;
            if (slot < 0)
            {
                // Custom properties are walked rather than merged: every element declares dozens of
                // Tailwind's --tw-* and reads few of them, and the blocks are the live declarations.
                res = null;
                var found = false;
                for (int i = 0; i < CssStyles.Count && !found; i++) found = CssStyles[i].TryGetValue(prop, out res);
                if (!found) return null;
                if (IsRevertLayer(res)) res = NeedsWalk;
            }
            else
            {
                EnsureDeclared();
                res = declared.GetSlot(slot);
                if (res == null) return null;
            }

            if (res != NeedsWalk) return res ?? PropertyTable.StoredNull;
            return WalkDeclarations(prop, out res) ? res ?? PropertyTable.StoredNull : null;
        }

        // Merges the built-in properties declared, again if an inline block was written since.
        private void EnsureDeclared()
        {
            if (declaredBuilt && liveBlocks.Length == 0) return;
            var stamp = BlockVersions();
            if (declaredBuilt && stamp == declaredStamp) return;
            declaredStamp = stamp;
            declaredBuilt = true;

            declared.Clear();
            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (dic.Count == 0) continue;
                if (dic is StyleRecord record)
                {
                    var n = record.Slotted(out var slots, out var values);
                    for (int j = 0; j < n; j++)
                    {
                        var slot = slots[j];
                        if (declared.GetSlot(slot) != null) continue;
                        var value = values[j];
                        declared.SetSlot(slot, IsRevertLayer(value) ? NeedsWalk : value);
                    }
                }
                else if (dic is Dictionary<IStyleProperty, object> concrete)
                    foreach (var kv in concrete) Merge(ref declared, kv.Key, kv.Value);
                else
                    foreach (var kv in dic) Merge(ref declared, kv.Key, kv.Value);
            }
        }

        // Only an inline block is written after it is built, and every write bumps its version, so
        // the sum moves whenever one of them does.
        private int BlockVersions()
        {
            if (liveBlocks == null)
            {
                var found = new List<Reactive.ReactiveDictionary<IStyleProperty, object>>(1);
                for (int i = 0; i < CssStyles.Count; i++)
                    if (CssStyles[i] is Reactive.ReactiveDictionary<IStyleProperty, object> live) found.Add(live);
                liveBlocks = found.ToArray();
            }

            var sum = 0;
            for (int i = 0; i < liveBlocks.Length; i++) sum += liveBlocks[i].Version;
            return sum;
        }

        private static void Merge(ref PropertyTable merged, IStyleProperty key, object value)
        {
            var slot = PropertyTable.SlotOf(key);
            if (slot >= 0 && merged.GetSlot(slot) == null) merged.Set(key, slot, IsRevertLayer(value) ? NeedsWalk : value);
        }

        private bool WalkDeclarations(IStyleProperty prop, out object res)
        {
            // The layers a `revert-layer` declaration took out of the cascade. Their declarations
            // are all passed over, which is what rolling a layer back means: the winner becomes
            // whatever would have won had the layer never been declared at all.
            List<CascadeLayer> reverted = null;

            for (int i = 0; i < CssStyles.Count; i++)
            {
                var dic = CssStyles[i];
                if (!dic.TryGetValue(prop, out var value)) continue;

                var layer = (dic as StyleRecord)?.Layer;
                if (layer != null && reverted != null && reverted.Contains(layer)) continue;

                if (!IsRevertLayer(value))
                {
                    res = value;
                    return true;
                }

                if (reverted == null) reverted = new List<CascadeLayer>(1);

                // Unlayered, so there is no earlier layer to roll back to -- only the origin.
                if (layer == null) break;

                reverted.Add(layer);
            }

            // Nothing was left once the reverted layers were passed over, so the cascade rolls
            // back past this origin, which is what `revert` does.
            res = reverted == null ? null : RevertedValue;
            return reverted != null;
        }

        private static readonly object RevertedValue = ComputedKeyword.Revert;

        private static bool IsRevertLayer(object value) =>
            (value is ComputedKeyword ck && ck.Keyword == CssKeyword.RevertLayer) ||
            (value is CssKeyword raw && raw == CssKeyword.RevertLayer);

        private bool CssHasValue(IStyleProperty prop, int slot) => CssStyles != null && CssGet(prop, slot) != null;

        /// <summary>
        /// A per-property table: an array indexed by slot for the built-in properties, where a dictionary
        /// cost several times as much per lookup, and a dictionary only for custom properties, which have none.
        /// A mutable struct, so it is only ever used through the field that holds it.
        /// </summary>
        /// <remarks>
        /// An entry is null when absent and <see cref="StoredNull"/> for a stored null, and the slot is
        /// passed in, found once per read: an out parameter costs Mono a write barrier on every probe.
        /// </remarks>
        private struct PropertyTable
        {
            public static readonly object StoredNull = new object();

            private object[] slots;
            private Dictionary<IStyleProperty, object> custom;
            private bool dirty;

            public static int SlotOf(IStyleProperty prop) => prop is IStyleSlot s ? s.Slot : -1;

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public static object Unwrap(object entry) => ReferenceEquals(entry, StoredNull) ? null : entry;

            [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.AggressiveInlining)]
            public object GetSlot(int slot) => slots != null && (uint) slot < (uint) slots.Length ? slots[slot] : null;

            public object Get(IStyleProperty prop, int slot)
            {
                if (slot >= 0) return slots != null && slot < slots.Length ? slots[slot] : null;
                if (custom == null || !custom.TryGetValue(prop, out var value)) return null;
                return value ?? StoredNull;
            }

            public void Set(IStyleProperty prop, int slot, object value)
            {
                dirty = true;
                if (slot >= 0)
                {
                    if (slots == null || slot >= slots.Length) System.Array.Resize(ref slots, System.Math.Max(slot + 1, StyleSlots.Count));
                    slots[slot] = value ?? StoredNull;
                }
                else (custom ??= new Dictionary<IStyleProperty, object>())[prop] = value;
            }

            public void SetSlot(int slot, object value)
            {
                dirty = true;
                if (slots == null || slot >= slots.Length) System.Array.Resize(ref slots, System.Math.Max(slot + 1, StyleSlots.Count));
                slots[slot] = value ?? StoredNull;
            }

            public void Remove(IStyleProperty prop, int slot)
            {
                if (slot >= 0)
                {
                    if (slots != null && slot < slots.Length) slots[slot] = null;
                }
                else custom?.Remove(prop);
            }

            public void Clear()
            {
                if (!dirty) return;
                dirty = false;
                if (slots != null) System.Array.Clear(slots, 0, slots.Length);
                custom?.Clear();
            }
        }
    }
}
