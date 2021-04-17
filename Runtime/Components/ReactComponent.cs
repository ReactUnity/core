using ExCSS;
using Facebook.Yoga;
using ReactUnity.EventHandlers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Interop;
using ReactUnity.Layout;
using ReactUnity.StateHandlers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Styling.Types;
using ReactUnity.Visitors;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class ReactComponent : IReactComponent
    {
        #region Statics / Defaults
        private static readonly HashSet<string> EmptyClassList = new HashSet<string>();
        public static readonly NodeStyle TagDefaultStyle = new NodeStyle();
        public static readonly YogaNode TagDefaultLayout = new YogaNode();
        public virtual NodeStyle DefaultStyle => TagDefaultStyle;
        public virtual YogaNode DefaultLayout => TagDefaultLayout;
        #endregion

        public UGUIContext Context { get; }
        public GameObject GameObject { get; private set; }
        public RectTransform RectTransform { get; private set; }
        public IContainerComponent Parent { get; private set; }

        public InlineData Data { get; private set; } = new InlineData("Data");
        public ReactElement Component { get; private set; }
        public YogaNode Layout { get; private set; }
        public NodeStyle ComputedStyle { get; private set; }
        public StateStyles StateStyles { get; private set; }

        [TypescriptRemap("../properties/style", "InlineStyleRemap")]
        public InlineData Style { get; protected set; } = new InlineData("Style");

        public BorderAndBackground BorderAndBackground { get; protected set; }
        public MaskAndImage MaskAndImage { get; protected set; }

        private Selectable selectable;
        public Selectable Selectable
        {
            get => selectable;
            internal set
            {
                selectable = value;
                UpdateBackgroundGraphic(false, true);
            }
        }
        public CanvasGroup CanvasGroup => GetComponent<CanvasGroup>();
        public Canvas Canvas => GetComponent<Canvas>();

        public bool IsPseudoElement { get; set; } = false;
        public string Tag { get; set; } = "";
        public string ClassName { get; set; } = "";
        public HashSet<string> ClassList { get; private set; } = EmptyClassList;

        public string TextContent => new TextContentVisitor().Get(this);
        public string Name => GameObject.name;
        ReactContext IReactComponent.Context => Context;


        private bool markedStyleResolve;
        private bool markedStyleResolveRecursive;
        protected List<int> Deferreds = new List<int>();


        ReactComponent(UGUIContext context)
        {
            Context = context;
            Style.changed += StyleChanged;
            Data.changed += StyleChanged;

            Deferreds.Add(Context.Dispatcher.OnEveryUpdate(() =>
            {
                if (markedStyleResolve) ResolveStyle(markedStyleResolveRecursive);
            }));
        }

        protected ReactComponent(RectTransform existing, UGUIContext context) : this(context)
        {
            GameObject = existing.gameObject;
            RectTransform = existing;

            StateStyles = new StateStyles(this);
            ComputedStyle = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);
        }

        public ReactComponent(UGUIContext context, string tag) : this(context)
        {
            Tag = tag;
            GameObject = new GameObject();
            RectTransform = AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;


            StateStyles = new StateStyles(this);
            ComputedStyle = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);

            Component = AddComponent<ReactElement>();
            Component.Layout = Layout;
            Component.Style = ComputedStyle;
            Component.Component = this;
        }

        protected void StyleChanged(string key, object value, InlineData style)
        {
            MarkForStyleResolving(style.Identifier != "Style" || key == null || StyleProperties.IsInherited(key));
        }

        protected void MarkForStyleResolving(bool recursive)
        {
            markedStyleResolveRecursive = markedStyleResolveRecursive || recursive;
            markedStyleResolve = true;
        }

        public virtual void Destroy()
        {
            GameObject.DestroyImmediate(GameObject);
            Parent.Children.Remove(this);
            Parent.Layout.RemoveChild(Layout);
            Parent.ScheduleLayout();
            foreach (var item in Deferreds) Context.Dispatcher.StopDeferred(item);
        }

        #region Setters

        public virtual void SetParent(IContainerComponent parent, IReactComponent insertBefore = null, bool insertAfter = false)
        {
            if (Parent != null) parent.UnregisterChild(this);

            Parent = parent;

            if (Parent == null) return;

            insertBefore ??= (insertAfter ? null : parent.AfterPseudo);

            if (insertBefore == null)
            {
                parent.RegisterChild(this);
            }
            else
            {
                var ind = parent.Children.IndexOf(insertBefore);
                if (insertAfter) ind++;

                parent.RegisterChild(this, ind);
            }

            ComputedStyle.Parent = parent.ComputedStyle;
            ResolveStyle(true);

            Parent.ScheduleLayout();

        }

        public virtual void SetEventListener(string eventName, Callback fun)
        {
            var eventType = EventHandlerMap.GetEventType(eventName);
            if (eventType == null) throw new System.Exception($"Unknown event name specified, '{eventName}'");

            // Remove
            var handler = GameObject.GetComponent(eventType) as IEventHandler;
            handler?.ClearListeners();

            // No event to add
            if (fun == null) return;

            if (handler == null) handler = AddComponent(eventType) as IEventHandler;

            Action<BaseEventData> callAction = (e) => fun.Call(e, this);
            handler.OnEvent += callAction;
        }

        public virtual void SetData(string propertyName, object value)
        {
            Data[propertyName] = value;
        }

        public virtual void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "name":
                    GameObject.name = value?.ToString();
                    return;
                case "className":
                    ClassName = value?.ToString();
                    ClassList = string.IsNullOrWhiteSpace(ClassName) ? EmptyClassList :
                        new HashSet<string>(ClassName.Split(new char[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries));
                    return;
                default:
                    throw new System.Exception($"Unknown property name specified, '{propertyName}'");
            }
        }

        #endregion

        #region Style / Layout

        public void ScheduleLayout()
        {
            Context.ScheduleLayout();
        }

        public virtual void ResolveStyle(bool recursive = false)
        {
            markedStyleResolve = false;
            markedStyleResolveRecursive = false;

            var inlineStyles = RuleHelpers.GetRuleDic(Style);
            var inlineLayouts = RuleHelpers.GetLayoutDic(Style) ?? new List<LayoutValue>();

            List<RuleTreeNode<StyleData>> matchingRules;
            if (Tag == "_before") matchingRules = Parent.BeforeRules;
            else if (Tag == "_after") matchingRules = Parent.AfterRules;
            else matchingRules = Context.StyleTree.GetMatchingRules(this).ToList();

            var importantIndex = Math.Max(0, matchingRules.FindIndex(x => x.Specifity <= RuleHelpers.ImportantSpecifity));
            var cssStyles = new List<Dictionary<string, object>> { };

            for (int i = 0; i < importantIndex; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);
            cssStyles.Add(inlineStyles);
            for (int i = importantIndex; i < matchingRules.Count; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);

            ComputedStyle.CssStyles = cssStyles;


            var layoutUpdated = false;
            if (ComputedStyle.CssLayouts != null)
            {
                foreach (var item in ComputedStyle.CssLayouts) item.SetDefault(Layout, DefaultLayout);
                layoutUpdated = ComputedStyle.CssLayouts.Count > 0;
            }

            ComputedStyle.CssLayouts = matchingRules.Where(x => x.Data?.Layouts != null).SelectMany(x => x.Data?.Layouts).Concat(inlineLayouts).ToList();

            for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
            inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
            for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));

            layoutUpdated = layoutUpdated || ComputedStyle.CssLayouts.Count > 0;

            ApplyStyles();
            ComputedStyle.MarkChangesSeen();
            if (layoutUpdated)
            {
                ApplyLayoutStyles();
                ScheduleLayout();
            }
        }

        public virtual void ApplyLayoutStyles()
        {
            ResolveOpacityAndInteractable();
            SetOverflow();
            UpdateBackgroundGraphic(true, false);
        }

        public virtual void ApplyStyles()
        {
            ResolveTransform();
            ResolveOpacityAndInteractable();
            SetZIndex();
            SetOverflow();
            SetCursor();
            UpdateBackgroundGraphic(false, true);
        }

        #endregion


        #region Style Functions

        protected void ResolveTransform()
        {
            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var origin = ComputedStyle.transformOrigin;
            var rect = RectTransform.sizeDelta;
            var pivotX = origin.X.Unit == YogaUnit.Percent ? (origin.X.Value / 100) : origin.X.Unit == YogaUnit.Point ? (origin.X.Value / rect.x) : 0.5f;
            var pivotY = origin.Y.Unit == YogaUnit.Percent ? (origin.Y.Value / 100) : origin.Y.Unit == YogaUnit.Point ? (origin.Y.Value / rect.y) : 0.5f;
            var pivot = new Vector2(pivotX, pivotY);
            Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
            deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
            deltaPosition.Scale(RectTransform.localScale);          // apply scaling
            deltaPosition = RectTransform.rotation * deltaPosition; // apply rotation

            RectTransform.pivot = pivot;                            // change the pivot
            RectTransform.localPosition -= deltaPosition;           // reverse the position change


            // Restore rotation and scale
            var scale = ComputedStyle.scale;
            RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(ComputedStyle.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = ComputedStyle.opacity;
            var visibility = ComputedStyle.visibility;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = ComputedStyle.pointerEvents;

            if (!visibility || none) opacity = 0;
            if (none) interaction = PointerEvents.None;

            var isTransparent = opacity < 1;
            var isInvisible = opacity == 0;

            var hasInteraction = interaction == PointerEvents.All || (!isInvisible && interaction == PointerEvents.Visible);


            var group = CanvasGroup;
            // Group does not exist and there is no need for it, quit early
            if (!group && !isTransparent && hasInteraction) return;
            if (!group) group = AddComponent<CanvasGroup>();

            group.alpha = opacity;
            group.interactable = hasInteraction;

            if (interaction == PointerEvents.None) group.blocksRaycasts = false;
            else if (isInvisible && interaction == PointerEvents.Visible) group.blocksRaycasts = false;
            else group.blocksRaycasts = true;
        }

        private void SetOverflow()
        {
            var mask = MaskAndImage;

            // Mask is not defined and there is no need for it
            if (Layout.Overflow == YogaOverflow.Visible && mask == null) return;

            if (mask == null) mask = MaskAndImage = new MaskAndImage(RectTransform, Context);

            mask.SetEnabled(Layout.Overflow != YogaOverflow.Visible);
            mask.SetBorderRadius(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomLeftRadius, ComputedStyle.borderBottomRightRadius);
        }

        private void SetCursor()
        {
            if (string.IsNullOrWhiteSpace(ComputedStyle.cursor)) return;
            var handler = GetOrAddComponent<CursorHandler>();
            handler.Cursor = ComputedStyle.cursor;
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderAny = Layout.BorderWidth > 0 || Layout.BorderLeftWidth > 0 || Layout.BorderRightWidth > 0
                || Layout.BorderTopWidth > 0 || Layout.BorderBottomWidth > 0
                || Layout.BorderStartWidth > 0 || Layout.BorderEndWidth > 0;
            if (borderAny) return true;

            if (ComputedStyle.borderRadius > 0 && ComputedStyle.borderColor.a > 0) return true;
            if (ComputedStyle.backgroundColor.a > 0) return true;
            if (ComputedStyle.backgroundImage != null) return true;
            if (ComputedStyle.boxShadow != null) return true;

            return false;
        }

        public virtual BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle)
        {
            if (Selectable)
            {
                Selectable.transition = ComputedStyle.appearance == Appearance.None ? Selectable.Transition.None : Selectable.Transition.ColorTint;
                if (ComputedStyle.navigation != Navigation.Mode.Automatic)
                    Selectable.navigation = new Navigation() { mode = ComputedStyle.navigation };
            }

            if (!HasBorderOrBackground()) return null;

            BorderAndBackground image = BorderAndBackground;

            if (image == null)
            {
                updateStyle = true;
                updateLayout = true;
                image = new BorderAndBackground(RectTransform);

                if (Selectable) Selectable.targetGraphic = image.Background.GetComponent<Image>();
                BorderAndBackground = image;
            }

            if (updateLayout)
            {
                image.SetBorderSize(Layout);
            }
            if (updateStyle)
            {
                ComputedStyle.backgroundImage.Get(Context, (res) =>
                {
                    Sprite sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
                    image.SetBackgroundColorAndImage(ComputedStyle.backgroundColor, sprite);
                });
                image.SetBoxShadow(ComputedStyle.boxShadow);
                Deferreds.Add(Context.Dispatcher.OnceUpdate(() =>
                {
                    if (!GameObject) return;
                    var borderSprite = BorderGraphic.CreateBorderSprite(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomLeftRadius, ComputedStyle.borderBottomRightRadius);
                    image.SetBorderImage(borderSprite);
                }));

                image.SetBorderColor(ComputedStyle.borderColor);
            }

            return image;
        }

        private void SetZIndex()
        {
            var z = ComputedStyle.zIndex;
            Canvas canvas = Canvas;
            if (!canvas && z == 0) return;
            if (!canvas)
            {
                canvas = AddComponent<Canvas>();
                AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = z != 0;
            canvas.sortingOrder = z;
        }

        #endregion


        #region Component Tree Functions

        public IReactComponent QuerySelector(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChild(this);
        }

        public List<IReactComponent> QuerySelectorAll(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChildren(this);
        }

        public virtual void Accept(ReactComponentVisitor visitor)
        {
            visitor.Visit(this);
        }

        #endregion


        #region UI/Event Utilities

        public Vector2 GetRelativePosition(float x, float y)
        {
            var screenPoint = new Vector2(x, y);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(GameObject.transform as RectTransform, screenPoint, RectTransform.GetComponentInParent<Canvas>().worldCamera, out var pos);
            return pos;
        }

        #endregion


        #region Add/Get Component Utilities

        public CType GetComponent<CType>() where CType : Component
        {
            return GameObject.GetComponent<CType>();
        }

        public object GetComponent(Type type)
        {
            return GameObject.GetComponent(type);
        }

        public CType GetOrAddComponent<CType>() where CType : Component
        {
            return GameObject.GetComponent<CType>() ?? GameObject.AddComponent<CType>();
        }

        public CType AddComponent<CType>() where CType : Component
        {
            return AddComponent(typeof(CType)) as CType;
        }

        public object AddComponent(Type type)
        {
            if (type == null) return null;

            var requiredComponents = type.GetCustomAttributes(typeof(RequireComponent), true).OfType<RequireComponent>();

            foreach (var req in requiredComponents)
            {
                if (req.m_Type0 != null && !GameObject.GetComponent(req.m_Type0)) AddComponent(req.m_Type0);
                if (req.m_Type1 != null && !GameObject.GetComponent(req.m_Type1)) AddComponent(req.m_Type1);
                if (req.m_Type2 != null && !GameObject.GetComponent(req.m_Type2)) AddComponent(req.m_Type2);
            }

            var res = GameObject.AddComponent(type);

            if (typeof(Selectable).IsAssignableFrom(type) && !Selectable) Selectable = res as Selectable;

            return res;
        }

        #endregion
    }
}
