using Facebook.Yoga;
using ReactUnity.Editor.Events;
using ReactUnity.Editor.Renderer;
using ReactUnity.Editor.Styling;
using ReactUnity.Interop;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public interface IEditorComponent<out T> : IReactComponent
    {
        T Element { get; }
    }

    public class EditorComponent<T> : IEditorComponent<T>, IContainerComponent where T : VisualElement, new()
    {
        private static readonly HashSet<string> EmptyClassList = new HashSet<string>();

        public EditorContext Context { get; }
        public IContainerComponent Parent { get; private set; }
        public T Element { get; protected set; }

        public YogaNode Layout { get; private set; }
        public List<LayoutValue> LayoutValues { get; private set; } = new List<LayoutValue>();
        public NodeStyle ComputedStyle { get; private set; }
        public Dictionary<string, object> Inline { get; protected set; } = new Dictionary<string, object>();

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
        ReactContext IReactComponent.Context => Context;

        protected Dictionary<string, object> EventHandlers = new Dictionary<string, object>();
        protected Dictionary<Type, object> Manipulators = new Dictionary<Type, object>();
        private string currentCursor = null;

        public EditorComponent(T element, EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = element;
            Element.userData = Data;

            StateStyles = new StateStyles(this);
            ComputedStyle = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public EditorComponent(EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = new T();
            Element.userData = Data;

            StateStyles = new StateStyles(this);
            ComputedStyle = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public void Accept(ReactComponentVisitor visitor)
        {
            visitor.Visit(this);
        }

        public void ApplyLayoutStyles()
        {
            Element.style.flexDirection = StylingHelpers.GetStyleEnumCustom<FlexDirection>(ComputedStyle, LayoutProperties.FlexDirection);
            Element.style.flexWrap = StylingHelpers.GetStyleEnumCustom<Wrap>(ComputedStyle, LayoutProperties.Wrap);
            Element.style.flexGrow = StylingHelpers.GetStyleFloat(ComputedStyle, LayoutProperties.FlexGrow);
            Element.style.flexShrink = StylingHelpers.GetStyleFloat(ComputedStyle, LayoutProperties.FlexShrink);

            Element.style.width = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Width);
            Element.style.height = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Height);
            Element.style.flexBasis = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.FlexBasis);

            Element.style.minWidth = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.MinWidth);
            Element.style.minHeight = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.MinHeight);
            Element.style.maxWidth = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.MaxWidth);
            Element.style.maxHeight = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.MaxHeight);

            Element.style.paddingBottom = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.PaddingBottom, LayoutProperties.Padding);
            Element.style.paddingTop = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.PaddingTop, LayoutProperties.Padding);
            Element.style.paddingLeft = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.PaddingLeft, LayoutProperties.Padding);
            Element.style.paddingRight = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.PaddingRight, LayoutProperties.Padding);

            Element.style.marginBottom = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.MarginBottom, LayoutProperties.Margin);
            Element.style.marginTop = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.MarginTop, LayoutProperties.Margin);
            Element.style.marginLeft = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.MarginLeft, LayoutProperties.Margin);
            Element.style.marginRight = StylingHelpers.GetStyleLengthDouble(ComputedStyle, LayoutProperties.MarginRight, LayoutProperties.Margin);

            Element.style.left = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Left);
            Element.style.right = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Right);
            Element.style.top = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Top);
            Element.style.bottom = StylingHelpers.GetStyleLength(ComputedStyle, LayoutProperties.Bottom);

            Element.style.borderLeftWidth = StylingHelpers.GetStyleFloatDouble(ComputedStyle, LayoutProperties.BorderLeftWidth, LayoutProperties.BorderWidth);
            Element.style.borderRightWidth = StylingHelpers.GetStyleFloatDouble(ComputedStyle, LayoutProperties.BorderRightWidth, LayoutProperties.BorderWidth);
            Element.style.borderTopWidth = StylingHelpers.GetStyleFloatDouble(ComputedStyle, LayoutProperties.BorderTopWidth, LayoutProperties.BorderWidth);
            Element.style.borderBottomWidth = StylingHelpers.GetStyleFloatDouble(ComputedStyle, LayoutProperties.BorderBottomWidth, LayoutProperties.BorderWidth);

            Element.style.display = StylingHelpers.GetStyleEnumCustom<DisplayStyle>(ComputedStyle, LayoutProperties.Display);
            Element.style.position = StylingHelpers.GetStyleEnumCustom<Position>(ComputedStyle, LayoutProperties.PositionType);
            Element.style.overflow = StylingHelpers.GetStyleEnumCustom<Overflow>(ComputedStyle, LayoutProperties.Overflow);

            Element.style.alignContent = StylingHelpers.GetStyleEnumCustom<Align>(ComputedStyle, LayoutProperties.AlignContent);
            Element.style.alignItems = StylingHelpers.GetStyleEnumCustom<Align>(ComputedStyle, LayoutProperties.AlignItems);
            Element.style.alignSelf = StylingHelpers.GetStyleEnumCustom<Align>(ComputedStyle, LayoutProperties.AlignSelf);
            Element.style.justifyContent = StylingHelpers.GetStyleEnumCustom<Justify>(ComputedStyle, LayoutProperties.JustifyContent);
        }

        public virtual void ApplyStyles()
        {
            Element.style.backgroundColor = StylingHelpers.GetStyleColor(ComputedStyle, StyleProperties.backgroundColor);
            Element.style.color = StylingHelpers.GetStyleColor(ComputedStyle, StyleProperties.color);
            Element.style.textOverflow = StylingHelpers.GetStyleEnumCustom<TextOverflow>(ComputedStyle, StyleProperties.textOverflow);
            Element.style.visibility = StylingHelpers.GetStyleBoolToEnum(ComputedStyle, StyleProperties.visibility, Visibility.Visible, Visibility.Hidden);
            Element.style.opacity = StylingHelpers.GetStyleFloat(ComputedStyle, StyleProperties.opacity);
            Element.style.whiteSpace = StylingHelpers.GetStyleBoolToEnum(ComputedStyle, StyleProperties.textWrap, WhiteSpace.Normal, WhiteSpace.NoWrap);

            if (ComputedStyle.HasValue(StyleProperties.fontSize)) Element.style.fontSize = ComputedStyle.fontSizeActual;
            else Element.style.fontSize = StyleKeyword.Null;

            Element.style.borderBottomLeftRadius = StylingHelpers.GetStyleBorderRadius(ComputedStyle, StyleProperties.borderBottomLeftRadius);
            Element.style.borderBottomRightRadius = StylingHelpers.GetStyleBorderRadius(ComputedStyle, StyleProperties.borderBottomRightRadius);
            Element.style.borderTopLeftRadius = StylingHelpers.GetStyleBorderRadius(ComputedStyle, StyleProperties.borderTopLeftRadius);
            Element.style.borderTopRightRadius = StylingHelpers.GetStyleBorderRadius(ComputedStyle, StyleProperties.borderTopRightRadius);

            Element.style.borderBottomColor = StylingHelpers.GetStyleBorderColor(ComputedStyle, StyleProperties.borderBottomColor);
            Element.style.borderTopColor = StylingHelpers.GetStyleBorderColor(ComputedStyle, StyleProperties.borderTopColor);
            Element.style.borderLeftColor = StylingHelpers.GetStyleBorderColor(ComputedStyle, StyleProperties.borderLeftColor);
            Element.style.borderRightColor = StylingHelpers.GetStyleBorderColor(ComputedStyle, StyleProperties.borderRightColor);

            if (ComputedStyle.HasValue(StyleProperties.backgroundImage)) ComputedStyle.backgroundImage?.Get(Context, tx => Element.style.backgroundImage = tx);
            else Element.style.backgroundImage = StyleKeyword.Null;

            if (ComputedStyle.HasValue(StyleProperties.fontStyle) || ComputedStyle.HasValue(StyleProperties.fontWeight))
                Element.style.unityFontStyleAndWeight = StylingHelpers.ConvertFontStyle(ComputedStyle.fontStyle, ComputedStyle.fontWeight);
            else Element.style.unityFontStyleAndWeight = StyleKeyword.Null;


            if (ComputedStyle.HasValue(StyleProperties.backgroundImage) && ComputedStyle.HasValue(StyleProperties.backgroundColor))
                Element.style.unityBackgroundImageTintColor = ComputedStyle.backgroundColor;
            else Element.style.unityBackgroundImageTintColor = StyleKeyword.Null;


            if (ComputedStyle.HasValue(StyleProperties.textAlign))
            {
                if (StylingHelpers.TextAlignMap.TryGetValue(ComputedStyle.textAlign, out var value)) Element.style.unityTextAlign = value;
                else Element.style.unityTextAlign = TextAnchor.MiddleCenter;
            }
            else Element.style.unityTextAlign = StyleKeyword.Null;


            if (ComputedStyle.HasValue(StyleProperties.fontFamily))
            {
                if (ComputedStyle.fontFamily != null) ComputedStyle.fontFamily?.Get(Context, x =>
                {
                    if (x?.sourceFontFile) Element.style.unityFont = x?.sourceFontFile;
                    else Element.style.unityFont = EditorResourcesHelper.DefaultFont;
                });
            }
            else Element.style.unityFont = StyleKeyword.Null;


            if (ComputedStyle.HasValue(StyleProperties.cursor))
            {
                var cursor = EditorResourcesHelper.UtilityCursorClassPrefix + ComputedStyle.cursor;
                if (currentCursor != cursor)
                {
                    if (currentCursor != null)
                    {
                        Element.RemoveFromClassList(currentCursor);
                        currentCursor = null;
                    }
                    if (cursor != null)
                    {
                        currentCursor = cursor;
                        Element.AddToClassList(currentCursor);
                    }
                }
            }
            else if (currentCursor != null)
            {
                Element.RemoveFromClassList(currentCursor);
                currentCursor = null;
            }

            // Transforms

            //Element.transform.position -= (Vector3)(Element.layout.size / 2);

            if (ComputedStyle.HasValue(StyleProperties.scale)) Element.transform.scale = new Vector3(ComputedStyle.scale.x, ComputedStyle.scale.y, 1);
            else Element.transform.scale = Vector3.one;

            if (ComputedStyle.HasValue(StyleProperties.rotate)) Element.transform.rotation = Quaternion.Euler(0, 0, ComputedStyle.rotate);
            else Element.transform.rotation = Quaternion.identity;

            if (ComputedStyle.HasValue(StyleProperties.translate)) Element.transform.position = ComputedStyle.translate.AsVector();
            else Element.transform.position = Vector3.zero;

            //Element.transform.position += (Vector3)(Element.layout.size / 2);
        }

        public void Destroy()
        {
            Element.RemoveFromHierarchy();
        }

        public void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = ComputedStyle.HasInheritedChanges;


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

            ComputedStyle.CssStyles = cssStyles;
            ApplyStyles();
            ApplyLayoutStyles();
            ComputedStyle.MarkChangesSeen();


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
            if (Parent != null) Parent.UnregisterChild(this);

            Parent = parent;

            if (Parent == null) return;

            relativeTo = relativeTo ?? (insertAfter ? null : parent.AfterPseudo);

            if (relativeTo == null)
            {
                parent.RegisterChild(this);
            }
            else
            {
                var ind = parent.Children.IndexOf(relativeTo);
                if (insertAfter) ind++;

                parent.RegisterChild(this, ind);
            }

            ComputedStyle.Parent = parent.ComputedStyle;
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

            EventCallback<EventBase> callAction = (e) => fun.Call(e, this);

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

                    foreach (var cls in ClassList)
                    {
                        Element.AddToClassList(cls);
                        ResolveStyle(true);
                    }
                    return;
                default:
                    throw new Exception($"Unknown property name specified, '{property}'");
            }
        }

        #endregion

        public object GetComponent(Type type)
        {
            if (Manipulators.TryGetValue(type, out var val)) return val;
            return null;
        }

        public object AddComponent(Type type)
        {
            var instance = Activator.CreateInstance(type);
            if (instance is IManipulator m)
            {
                Element.AddManipulator(m);
                Manipulators[type] = m;
            }

            return instance;
        }

        public void RegisterChild(IReactComponent child, int index = -1)
        {
            if (child is IEditorComponent<VisualElement> u)
            {
                if (index >= 0)
                {
                    Element.Insert(index, u.Element);
                    Children.Insert(index, u);
                    Layout.Insert(index, u.Layout);
                }
                else
                {
                    Element.Add(u.Element);
                    Children.Add(u);
                    Layout.AddChild(u.Layout);
                }
            }
        }

        public void UnregisterChild(IReactComponent child)
        {
            if (child is IEditorComponent<VisualElement> u)
            {
                Element.Remove(u.Element);
                Children.Remove(u);
                Layout.RemoveChild(u.Layout);
            }
        }

        public void CaptureMouse()
        {
            MouseCaptureController.CaptureMouse(Element);
        }

        public void ReleaseMouse()
        {
            MouseCaptureController.ReleaseMouse(Element);
        }

        public bool HasMouseCapture()
        {
            return MouseCaptureController.HasMouseCapture(Element);
        }
    }
}
