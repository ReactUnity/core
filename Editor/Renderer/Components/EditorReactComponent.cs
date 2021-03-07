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

        public EditorContext Context { get; }
        public IContainerComponent Parent { get; private set; }
        public T Element { get; protected set; }

        public YogaNode Layout { get; private set; }
        public List<LayoutValue> LayoutValues { get; private set; } = new List<LayoutValue>();
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
            Element.style.flexDirection = StylingHelpers.GetStyleEnumCustom<FlexDirection>(Style, LayoutProperties.FlexDirection);
            Element.style.flexWrap = StylingHelpers.GetStyleEnumCustom<Wrap>(Style, LayoutProperties.Wrap);
            Element.style.flexGrow = StylingHelpers.GetStyleFloat(Style, LayoutProperties.FlexGrow);
            Element.style.flexShrink = StylingHelpers.GetStyleFloat(Style, LayoutProperties.FlexShrink);

            Element.style.width = StylingHelpers.GetStyleLength(Style, LayoutProperties.Width);
            Element.style.height = StylingHelpers.GetStyleLength(Style, LayoutProperties.Height);
            Element.style.flexBasis = StylingHelpers.GetStyleLength(Style, LayoutProperties.FlexBasis);

            Element.style.minWidth = StylingHelpers.GetStyleLength(Style, LayoutProperties.MinWidth);
            Element.style.minHeight = StylingHelpers.GetStyleLength(Style, LayoutProperties.MinHeight);
            Element.style.maxWidth = StylingHelpers.GetStyleLength(Style, LayoutProperties.MaxWidth);
            Element.style.maxHeight = StylingHelpers.GetStyleLength(Style, LayoutProperties.MaxHeight);

            Element.style.paddingBottom = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.PaddingBottom, LayoutProperties.Padding);
            Element.style.paddingTop = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.PaddingTop, LayoutProperties.Padding);
            Element.style.paddingLeft = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.PaddingLeft, LayoutProperties.Padding);
            Element.style.paddingRight = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.PaddingRight, LayoutProperties.Padding);

            Element.style.marginBottom = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.MarginBottom, LayoutProperties.Margin);
            Element.style.marginTop = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.MarginTop, LayoutProperties.Margin);
            Element.style.marginLeft = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.MarginLeft, LayoutProperties.Margin);
            Element.style.marginRight = StylingHelpers.GetStyleLengthDouble(Style, LayoutProperties.MarginRight, LayoutProperties.Margin);

            Element.style.left = StylingHelpers.GetStyleLength(Style, LayoutProperties.Left);
            Element.style.right = StylingHelpers.GetStyleLength(Style, LayoutProperties.Right);
            Element.style.top = StylingHelpers.GetStyleLength(Style, LayoutProperties.Top);
            Element.style.bottom = StylingHelpers.GetStyleLength(Style, LayoutProperties.Bottom);

            Element.style.borderLeftWidth = StylingHelpers.GetStyleFloatDouble(Style, LayoutProperties.BorderLeftWidth, LayoutProperties.BorderWidth);
            Element.style.borderRightWidth = StylingHelpers.GetStyleFloatDouble(Style, LayoutProperties.BorderRightWidth, LayoutProperties.BorderWidth);
            Element.style.borderTopWidth = StylingHelpers.GetStyleFloatDouble(Style, LayoutProperties.BorderTopWidth, LayoutProperties.BorderWidth);
            Element.style.borderBottomWidth = StylingHelpers.GetStyleFloatDouble(Style, LayoutProperties.BorderBottomWidth, LayoutProperties.BorderWidth);

            Element.style.display = StylingHelpers.GetStyleEnumCustom<DisplayStyle>(Style, LayoutProperties.Display);
            Element.style.position = StylingHelpers.GetStyleEnumCustom<Position>(Style, LayoutProperties.PositionType);
            Element.style.overflow = StylingHelpers.GetStyleEnumCustom<Overflow>(Style, LayoutProperties.Overflow);

            Element.style.alignContent = StylingHelpers.GetStyleEnumCustom<Align>(Style, LayoutProperties.AlignContent);
            Element.style.alignItems = StylingHelpers.GetStyleEnumCustom<Align>(Style, LayoutProperties.AlignItems);
            Element.style.alignSelf = StylingHelpers.GetStyleEnumCustom<Align>(Style, LayoutProperties.AlignSelf);
            Element.style.justifyContent = StylingHelpers.GetStyleEnumCustom<Justify>(Style, LayoutProperties.JustifyContent);
        }

        public virtual void ApplyStyles()
        {
            Element.style.backgroundColor = StylingHelpers.GetStyleColor(Style, StyleProperties.backgroundColor);
            Element.style.color = StylingHelpers.GetStyleColor(Style, StyleProperties.color);
            Element.style.textOverflow = StylingHelpers.GetStyleEnumCustom<TextOverflow>(Style, StyleProperties.textOverflow);
            Element.style.visibility = StylingHelpers.GetStyleBoolToEnum(Style, StyleProperties.visibility, Visibility.Visible, Visibility.Hidden);
            Element.style.opacity = StylingHelpers.GetStyleFloat(Style, StyleProperties.opacity);
            Element.style.whiteSpace = StylingHelpers.GetStyleBoolToEnum(Style, StyleProperties.textWrap, WhiteSpace.Normal, WhiteSpace.NoWrap);

            if (Style.HasValue(StyleProperties.fontSize)) Element.style.fontSize = Style.fontSizeActual;
            else Element.style.fontSize = StyleKeyword.Null;

            Element.style.borderBottomLeftRadius = StylingHelpers.GetStyleBorderRadius(Style, StyleProperties.borderBottomLeftRadius);
            Element.style.borderBottomRightRadius = StylingHelpers.GetStyleBorderRadius(Style, StyleProperties.borderBottomRightRadius);
            Element.style.borderTopLeftRadius = StylingHelpers.GetStyleBorderRadius(Style, StyleProperties.borderTopLeftRadius);
            Element.style.borderTopRightRadius = StylingHelpers.GetStyleBorderRadius(Style, StyleProperties.borderTopRightRadius);

            Element.style.borderBottomColor = StylingHelpers.GetStyleBorderColor(Style, StyleProperties.borderBottomColor);
            Element.style.borderTopColor = StylingHelpers.GetStyleBorderColor(Style, StyleProperties.borderTopColor);
            Element.style.borderLeftColor = StylingHelpers.GetStyleBorderColor(Style, StyleProperties.borderLeftColor);
            Element.style.borderRightColor = StylingHelpers.GetStyleBorderColor(Style, StyleProperties.borderRightColor);

            if (Style.HasValue(StyleProperties.backgroundImage)) Style.backgroundImage?.Get(Context, tx => Element.style.backgroundImage = tx);
            else Element.style.backgroundImage = StyleKeyword.Null;

            if (Style.HasValue(StyleProperties.fontStyle) || Style.HasValue(StyleProperties.fontWeight))
                Element.style.unityFontStyleAndWeight = StylingHelpers.ConvertFontStyle(Style.fontStyle, Style.fontWeight);
            else Element.style.unityFontStyleAndWeight = StyleKeyword.Null;

            if (Style.HasValue(StyleProperties.textAlign))
            {
                if (StylingHelpers.TextAlignMap.TryGetValue(Style.textAlign, out var value)) Element.style.unityTextAlign = value;
                else Element.style.unityTextAlign = TextAnchor.MiddleCenter;
            }
            else Element.style.unityTextAlign = StyleKeyword.Null;

            if (Style.HasValue(StyleProperties.backgroundColor)) Element.style.unityBackgroundImageTintColor = Style.backgroundColor;
            else Element.style.unityBackgroundImageTintColor = StyleKeyword.Null;

            if (Style.HasValue(StyleProperties.fontFamily))
            {
                if (Style.fontFamily != null) Style.fontFamily?.Get(Context, x =>
                {
                    if (x?.sourceFontFile) Element.style.unityFont = x?.sourceFontFile;
                    else Element.style.unityFont = EditorResourcesHelper.DefaultFont;
                });
            }
            else Element.style.unityFont = StyleKeyword.Null;
        }

        public void Destroy()
        {
            Element.RemoveFromHierarchy();
        }

        public void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = Style.HasInheritedChanges;


            var inlineStyles = RuleHelpers.GetRuleDic(Inline);
            var inlineLayouts = RuleHelpers.GetLayoutDic(Inline);
            if (inlineLayouts != null) foreach (var l in inlineLayouts) inlineStyles[l.prop.name] = l.value;

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
