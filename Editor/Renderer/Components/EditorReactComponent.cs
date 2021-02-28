using Facebook.Yoga;
using ReactUnity.Editor.Renderer.Events;
using ReactUnity.Editor.Renderer.Styling;
using ReactUnity.Interop;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;
using Label = UnityEngine.UIElements.Label;

namespace ReactUnity.Editor.Renderer.Components
{
    public interface IEditorReactComponent<out T> : IReactComponent
    {
        T Element { get; }
    }

    public class EditorReactComponent<T> : IEditorReactComponent<T>, IContainerComponent where T : VisualElement, new()
    {
        private static readonly HashSet<string> EmptyClassList = new HashSet<string>();

        public static readonly YogaNode DefaultLayout = new YogaNode();

        public EditorContext Context { get; }
        public IContainerComponent Parent { get; private set; }
        public T Element { get; protected set; }

        public YogaNode Layout { get; private set; }
        public NodeStyle Style { get; private set; }
        public ExpandoObject Inline { get; protected set; } = new ExpandoObject();

        public bool IsPseudoElement { get; private set; }
        public string Name => Element.name;
        public string Tag { get; private set; }
        public string ClassName { get; private set; }
        public HashSet<string> ClassList { get; private set; } = EmptyClassList;

        public StateStyles StateStyles { get; private set; }
        public Dictionary<string, object> Data { get; private set; } = new Dictionary<string, object>();

        public List<IReactComponent> Children { get; } = new List<IReactComponent>();
        public IReactComponent BeforePseudo { get; private set; }
        public IReactComponent AfterPseudo { get; private set; }

        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }


        Dictionary<string, object> EventHandlers = new Dictionary<string, object>();

        public EditorReactComponent(T element, EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = element;
            Element.userData = Data;

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public EditorReactComponent(EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = new T();
            Element.userData = Data;

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public void Accept(ReactComponentVisitor visitor)
        {
            visitor.Visit(this);
        }

        public void ApplyLayoutStyles()
        {
            Element.style.flexDirection = (FlexDirection) Layout.FlexDirection;
            Element.style.flexWrap = (Wrap) Layout.Wrap;
            Element.style.flexGrow = Layout.FlexGrow;
            Element.style.flexShrink = Layout.FlexShrink;

            Element.style.width = StylingHelpers.YogaValueToStyleLength(Layout.Width);
            Element.style.height = StylingHelpers.YogaValueToStyleLength(Layout.Height);
            Element.style.flexBasis = StylingHelpers.YogaValueToStyleLength(Layout.FlexBasis);

            Element.style.minWidth = StylingHelpers.YogaValueToStyleLength(Layout.MinWidth);
            Element.style.minHeight = StylingHelpers.YogaValueToStyleLength(Layout.MinHeight);
            Element.style.maxWidth = StylingHelpers.YogaValueToStyleLength(Layout.MaxWidth);
            Element.style.maxHeight = StylingHelpers.YogaValueToStyleLength(Layout.MaxHeight);

            Element.style.paddingBottom = StylingHelpers.YogaValueToStyleLength(Layout.PaddingBottom);
            Element.style.paddingTop = StylingHelpers.YogaValueToStyleLength(Layout.PaddingTop);
            Element.style.paddingLeft = StylingHelpers.YogaValueToStyleLength(Layout.PaddingLeft);
            Element.style.paddingRight = StylingHelpers.YogaValueToStyleLength(Layout.PaddingRight);

            Element.style.marginBottom = StylingHelpers.YogaValueToStyleLength(Layout.MarginBottom);
            Element.style.marginTop = StylingHelpers.YogaValueToStyleLength(Layout.MarginTop);
            Element.style.marginLeft = StylingHelpers.YogaValueToStyleLength(Layout.MarginLeft);
            Element.style.marginRight = StylingHelpers.YogaValueToStyleLength(Layout.MarginRight);

            Element.style.left = StylingHelpers.YogaValueToStyleLength(Layout.Left);
            Element.style.right = StylingHelpers.YogaValueToStyleLength(Layout.Right);
            Element.style.top = StylingHelpers.YogaValueToStyleLength(Layout.Top);
            Element.style.bottom = StylingHelpers.YogaValueToStyleLength(Layout.Bottom);

            Element.style.borderLeftWidth = StylingHelpers.NormalizeFloat(Layout.BorderLeftWidth);
            Element.style.borderRightWidth = StylingHelpers.NormalizeFloat(Layout.BorderRightWidth);
            Element.style.borderTopWidth = StylingHelpers.NormalizeFloat(Layout.BorderTopWidth);
            Element.style.borderBottomWidth = StylingHelpers.NormalizeFloat(Layout.BorderBottomWidth);

            Element.style.display = (DisplayStyle) Layout.Display;
            Element.style.position = (Position) Layout.PositionType;
            Element.style.overflow = (Overflow) Layout.Overflow;

            Element.style.alignContent = (Align) Layout.AlignContent;
            Element.style.alignItems = (Align) Layout.AlignItems;
            Element.style.alignSelf = (Align) Layout.AlignSelf;
            Element.style.justifyContent = (Justify) Layout.JustifyContent;
        }

        public virtual void ApplyStyles()
        {
            Element.style.backgroundColor = Style.backgroundColor;
            Element.style.color = Style.color;
            Element.style.textOverflow = (TextOverflow) Style.textOverflow;
            Element.style.visibility = Style.visibility ? Visibility.Visible : Visibility.Hidden;
            Element.style.opacity = Style.opacity;
            Element.style.fontSize = Style.fontSizeActual;
            Element.style.whiteSpace = Style.textWrap ? WhiteSpace.Normal : WhiteSpace.NoWrap;

            Element.style.borderBottomLeftRadius = Element.style.borderBottomRightRadius = Element.style.borderTopLeftRadius = Element.style.borderTopRightRadius = Style.borderRadius;
            Element.style.borderBottomColor = Element.style.borderTopColor = Element.style.borderLeftColor = Element.style.borderRightColor = Style.borderColor;

            Style.backgroundImage?.Get(Context, tx => Element.style.backgroundImage = tx);
            Element.style.unityFontStyleAndWeight = StylingHelpers.ConvertFontStyle(Style.fontStyle, Style.fontWeight);

            if (StylingHelpers.TextAlignMap.TryGetValue(Style.textAlign, out var value)) Element.style.unityTextAlign = value;
            else Element.style.unityTextAlign = TextAnchor.MiddleCenter;

            Element.style.unityBackgroundImageTintColor = Style.backgroundColor;
            if (Style.fontFamily != null) Style.fontFamily?.Get(Context, x =>
            {
                if (x?.sourceFontFile) Element.style.unityFont = x?.sourceFontFile;
                else Element.style.unityFont = EditorResourcesHelper.DefaultFont;
            });
        }

        public void Destroy()
        {
            Element.RemoveFromHierarchy();
        }

        public void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = Style.HasInheritedChanges;


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

            for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
            inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
            for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));

            ApplyStyles();
            ApplyLayoutStyles();
            Style.MarkChangesSeen();


            if (inheritedChanges || recursive)
            {
                BeforeRules = Context.StyleTree.GetMatchingBefore(this).ToList();
                //if (BeforeRules.Count > 0) AddBefore();
                //else RemoveBefore();
                BeforePseudo?.ResolveStyle();

                foreach (var child in Children)
                    child.ResolveStyle(true);

                AfterRules = Context.StyleTree.GetMatchingAfter(this).ToList();
                //if (AfterRules.Count > 0) AddAfter();
                //else RemoveAfter();
                AfterPseudo?.ResolveStyle();
            }
        }

        public void ScheduleLayout(Action callback = null)
        {
            Context.scheduleLayout(callback);
        }



        #region Setters

        public void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            Parent = parent;

            relativeTo = relativeTo ?? (insertAfter ? null : parent.AfterPseudo);

            if (relativeTo == null)
            {
                parent.RegisterChild(this);
                parent.Children.Add(this);
                parent.Layout.AddChild(Layout);
            }
            else
            {
                var ind = parent.Children.IndexOf(relativeTo);
                if (insertAfter) ind++;

                parent.RegisterChild(this, ind);
                parent.Children.Insert(ind, this);
                parent.Layout.Insert(ind, Layout);
            }

            Style.Parent = parent.Style;
            ResolveStyle(true);

            Parent.ScheduleLayout();
        }

        public void SetData(string property, object value)
        {
            Data[property] = value;
            ResolveStyle(true);
        }

        public virtual void SetEventListener(string eventName, Callback fun)
        {
            var (register, unregister) = EditorEventHandlerMap.GetEventMethods(eventName);

            // Remove
            if (EventHandlers.TryGetValue(eventName, out var existingHandler))
            {
                unregister.Invoke(Element, new object[] { existingHandler, TrickleDown.NoTrickleDown });
                EventHandlers.Remove(eventName);
            }

            // No event to add
            if (fun == null) return;

            EventCallback<EventBase> callAction = (e) => fun.Call(e);

            register.Invoke(Element, new object[] { callAction, TrickleDown.NoTrickleDown });
            EventHandlers[eventName] = callAction;
        }

        public virtual void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "name":
                    Element.name = value?.ToString();
                    return;
                case "focusable":
                    Element.focusable = Convert.ToBoolean(value);
                    return;
                case "className":
                    foreach (var cls in ClassList) Element.RemoveFromClassList(cls);

                    ClassName = value?.ToString();
                    ClassList = string.IsNullOrWhiteSpace(ClassName) ? EmptyClassList :
                        new HashSet<string>(ClassName.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries));

                    foreach (var cls in ClassList) Element.AddToClassList(cls);
                    return;
                default:
                    throw new Exception($"Unknown property name specified, '{property}'");
            }
        }

        #endregion

        public object GetComponent(Type type)
        {
            throw new NotImplementedException();
        }

        public object AddComponent(Type type)
        {
            throw new NotImplementedException();
        }

        public void RegisterChild(IReactComponent child, int index = -1)
        {
            if (child is IEditorReactComponent<VisualElement> u)
            {
                if (index >= 0) Element.Insert(index, u.Element);
                else Element.Add(u.Element);
            }
        }
    }
}
