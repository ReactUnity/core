using ExCSS;
using Facebook.Yoga;
using ReactUnity.EventHandlers;
using ReactUnity.Interop;
using ReactUnity.Layout;
using ReactUnity.StateHandlers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Styling.Types;
using ReactUnity.Visitors;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class UnityComponent
    {
        private static HashSet<string> EmptyClassList = new HashSet<string>();

        public UnityUGUIContext Context { get; }
        public static NodeStyle TagDefaultStyle { get; } = new NodeStyle();
        public static YogaNode TagDefaultLayout { get; } = new YogaNode();
        public virtual NodeStyle DefaultStyle => TagDefaultStyle;
        public virtual YogaNode DefaultLayout => TagDefaultLayout;

        public GameObject GameObject { get; private set; }
        public RectTransform RectTransform { get; private set; }
        public ContainerComponent Parent { get; private set; }


        public Dictionary<string, object> Data { get; private set; } = new Dictionary<string, object>();
        public ReactElement Component { get; private set; }
        public YogaNode Layout { get; private set; }
        public NodeStyle Style { get; private set; }
        public StateStyles StateStyles { get; private set; }
        public ExpandoObject Inline { get; protected set; } = new ExpandoObject();

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

        public bool IsPseudoElement = false;
        public string Tag { get; set; } = "";
        public string ClassName { get; set; } = "";
        public HashSet<string> ClassList { get; private set; }

        public string TextContent => new TextContentVisitor().Get(this);

        protected UnityComponent(RectTransform existing, UnityUGUIContext context)
        {
            Context = context;
            GameObject = existing.gameObject;
            RectTransform = existing;

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);
        }

        public UnityComponent(UnityUGUIContext context, string tag)
        {
            Tag = tag;
            Context = context;
            GameObject = new GameObject();
            RectTransform = AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;


            StateStyles = new StateStyles(this);
            Style = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);

            Component = AddComponent<ReactElement>();
            Component.Layout = Layout;
            Component.Style = Style;
            Component.Component = this;
        }

        public virtual void Destroy()
        {
            GameObject.DestroyImmediate(GameObject);
            Parent.Children.Remove(this);
            Parent.Layout.RemoveChild(Layout);
            Parent.ScheduleLayout();
        }

        public virtual void SetParent(ContainerComponent parent, UnityComponent insertBefore = null, bool insertAfter = false)
        {
            Parent = parent;
            RectTransform.SetParent(parent.Container, false);

            insertBefore = insertBefore ?? (insertAfter ? null : parent.AfterPseudo);

            if (insertBefore == null)
            {
                parent.Children.Add(this);
                parent.Layout.AddChild(Layout);
            }
            else
            {
                var ind = parent.Children.IndexOf(insertBefore);
                if (insertAfter) ind++;

                parent.Children.Insert(ind, this);
                parent.Layout.Insert(ind, Layout);
                RectTransform.SetSiblingIndex(ind);
            }

            Style.Parent = parent.Style;
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

            Action<BaseEventData> callAction = (e) => fun.Call(e);
            handler.OnEvent += callAction;
        }

        public CType GetComponent<CType>() where CType : Component
        {
            return GameObject.GetComponent<CType>();
        }

        public Component GetComponent(Type type)
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

        public Component AddComponent(Type type)
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

        public virtual void SetData(string propertyName, object value)
        {
            Data[propertyName] = value;
            ResolveStyle(true);
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

        public void ScheduleLayout(System.Action callback = null)
        {
            Context.scheduleLayout(callback);
        }

        public virtual void ResolveStyle(bool recursive = false)
        {
            var inlineStyles = RuleHelpers.GetRuleDic(Inline);
            var inlineLayouts = RuleHelpers.GetLayoutDic(Inline) ?? new List<LayoutValue>();

            List<RuleTreeNode<StyleData>> matchingRules;
            if (Tag == "_before") matchingRules = Parent.BeforeRules;
            else if (Tag == "_after") matchingRules = Parent.AfterRules;
            else matchingRules = Context.StyleTree.GetMatchingRules(this).ToList();

            var importantIndex = Math.Max(0, matchingRules.FindIndex(x => x.Specifity <= RuleHelpers.ImportantSpecifity));
            var cssStyles = new List<Dictionary<string, object>> { };

            for (int i = 0; i < importantIndex; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);
            cssStyles.Add(inlineStyles);
            for (int i = importantIndex; i < matchingRules.Count; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);

            Style.CssStyles = cssStyles;


            if (Style.CssLayouts != null)
                foreach (var item in Style.CssLayouts) item.SetDefault(Layout, DefaultLayout);
            Style.CssLayouts = matchingRules.Where(x => x.Data?.Layouts != null).SelectMany(x => x.Data?.Layouts).Concat(inlineLayouts).ToList();
            //foreach (var item in Style.CssLayouts) item.Set(Layout, DefaultLayout);

            for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
            inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
            for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));

            ApplyStyles();
            Style.MarkChangesSeen();
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

        protected void ResolveTransform()
        {
            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var origin = Style.transformOrigin;
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
            var scale = Style.scale;
            RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(0, 0, Style.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = Style.opacity;
            var visibility = Style.visibility;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = Style.pointerEvents;

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

            if (mask == null) mask = MaskAndImage = new MaskAndImage(RectTransform);

            mask.SetEnabled(Layout.Overflow != YogaOverflow.Visible);
            mask.SetBorderRadius(Style.borderRadius);
        }

        private void SetCursor()
        {
            if (string.IsNullOrWhiteSpace(Style.cursor)) return;
            var handler = GetOrAddComponent<CursorHandler>();
            handler.Cursor = Style.cursor;
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderAny = Layout.BorderWidth > 0 || Layout.BorderLeftWidth > 0 || Layout.BorderRightWidth > 0
                || Layout.BorderTopWidth > 0 || Layout.BorderBottomWidth > 0
                || Layout.BorderStartWidth > 0 || Layout.BorderEndWidth > 0;
            if (borderAny) return true;

            if (Style.borderRadius > 0 && Style.borderColor.a > 0) return true;
            if (Style.backgroundColor.a > 0) return true;
            if (Style.backgroundImage != null) return true;
            if (Style.boxShadow != null) return true;

            return false;
        }

        public virtual BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle)
        {
            if (Selectable)
            {
                Selectable.transition = Style.appearance == Appearance.None ? Selectable.Transition.None : Selectable.Transition.ColorTint;
                if (Style.navigation != Navigation.Mode.Automatic)
                    Selectable.navigation = new Navigation() { mode = Style.navigation };
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
                Style.backgroundImage.Get(Context, (res) =>
                {
                    Sprite sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
                    image.SetBackgroundColorAndImage(Style.backgroundColor, sprite);
                });
                image.SetBoxShadow(Style.boxShadow);
                MainThreadDispatcher.OnUpdate(() =>
                {
                    if (!GameObject) return;
                    var borderSprite = BorderGraphic.CreateBorderSprite(Style.borderRadius);
                    image.SetBorderImage(borderSprite);
                });

                image.SetBorderColor(Style.borderColor);
            }

            return image;
        }

        private void SetZIndex()
        {
            var z = Style.zIndex;
            Canvas canvas = Canvas;
            if (!canvas && z == 0) return;
            if (!canvas)
            {
                canvas = AddComponent<Canvas>();
                AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = true;
            canvas.sortingOrder = z;
        }

        public UnityComponent QuerySelector(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChild(this);
        }

        public List<UnityComponent> QuerySelectorAll(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChildren(this);
        }

        public virtual void Accept(UnityComponentVisitor visitor)
        {
            visitor.Visit(this);
        }

        public Vector2 GetRelativePosition(float x, float y)
        {
            var screenPoint = new Vector2(x, y);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(GameObject.transform as RectTransform, screenPoint, Context.Host.Canvas.worldCamera, out var pos);
            return pos;
        }
    }
}
