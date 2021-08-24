using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using ReactUnity.Types;

#if UNITY_EDITOR
using UnityEditor.UIElements;
#endif

namespace ReactUnity.UIToolkit
{
    public interface IUIToolkitComponent<out T> : IReactComponent where T : VisualElement, new()
    {
        T Element { get; }
        VisualElement TargetElement { get; }
    }

    public class UIToolkitComponent<T> : BaseReactComponent<UIToolkitContext>, IUIToolkitComponent<T> where T : VisualElement, new()
    {
        public T Element { get; protected set; }
        public virtual VisualElement TargetElement => Element;
        public override string Name
        {
            get => Element.name;
            set => Element.name = string.IsNullOrWhiteSpace(value) ? DefaultName : value;
        }

        protected Dictionary<Type, object> Manipulators = new Dictionary<Type, object>();
        private string currentCursor = null;

        protected UIToolkitComponent(T element, UIToolkitContext context, string tag) : base(context, tag, true)
        {
            ClassList = new UITClassList(this);
            Element = element;
            Element.userData = Data;
            Name = null;
        }

        public UIToolkitComponent(UIToolkitContext context, string tag, bool isContainer = true) : base(context, tag, isContainer)
        {
            ClassList = new UITClassList(this);
            Element = new T();
            Element.userData = Data;
            Name = null;
        }

        protected override void ApplyLayoutStylesSelf()
        {
            var computed = ComputedStyle;
            TargetElement.style.flexDirection = StylingHelpers.GetStyleEnumCustom<FlexDirection>(computed, LayoutProperties.FlexDirection);
            TargetElement.style.flexWrap = StylingHelpers.GetStyleEnumCustom<Wrap>(computed, LayoutProperties.Wrap);
            TargetElement.style.flexGrow = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexGrow);
            TargetElement.style.flexShrink = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexShrink);

            TargetElement.style.width = StylingHelpers.GetStyleLength(computed, LayoutProperties.Width);
            TargetElement.style.height = StylingHelpers.GetStyleLength(computed, LayoutProperties.Height);
            TargetElement.style.flexBasis = StylingHelpers.GetStyleLength(computed, LayoutProperties.FlexBasis);

            TargetElement.style.minWidth = StylingHelpers.GetStyleLength(computed, LayoutProperties.MinWidth);
            TargetElement.style.minHeight = StylingHelpers.GetStyleLength(computed, LayoutProperties.MinHeight);
            TargetElement.style.maxWidth = StylingHelpers.GetStyleLength(computed, LayoutProperties.MaxWidth);
            TargetElement.style.maxHeight = StylingHelpers.GetStyleLength(computed, LayoutProperties.MaxHeight);

            TargetElement.style.paddingBottom = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.PaddingBottom, LayoutProperties.Padding);
            TargetElement.style.paddingTop = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.PaddingTop, LayoutProperties.Padding);
            TargetElement.style.paddingLeft = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.PaddingLeft, LayoutProperties.Padding);
            TargetElement.style.paddingRight = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.PaddingRight, LayoutProperties.Padding);

            TargetElement.style.marginBottom = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.MarginBottom, LayoutProperties.Margin);
            TargetElement.style.marginTop = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.MarginTop, LayoutProperties.Margin);
            TargetElement.style.marginLeft = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.MarginLeft, LayoutProperties.Margin);
            TargetElement.style.marginRight = StylingHelpers.GetStyleLengthDouble(computed, LayoutProperties.MarginRight, LayoutProperties.Margin);

            TargetElement.style.left = StylingHelpers.GetStyleLength(computed, LayoutProperties.Left);
            TargetElement.style.right = StylingHelpers.GetStyleLength(computed, LayoutProperties.Right);
            TargetElement.style.top = StylingHelpers.GetStyleLength(computed, LayoutProperties.Top);
            TargetElement.style.bottom = StylingHelpers.GetStyleLength(computed, LayoutProperties.Bottom);

            TargetElement.style.borderLeftWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderLeftWidth, LayoutProperties.BorderWidth);
            TargetElement.style.borderRightWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderRightWidth, LayoutProperties.BorderWidth);
            TargetElement.style.borderTopWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderTopWidth, LayoutProperties.BorderWidth);
            TargetElement.style.borderBottomWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderBottomWidth, LayoutProperties.BorderWidth);

            TargetElement.style.display = StylingHelpers.GetStyleEnumCustom<DisplayStyle>(computed, LayoutProperties.Display);

            var pos = computed.position;
            TargetElement.style.position = pos == PositionType.Relative ? Position.Relative : Position.Absolute;
            TargetElement.style.overflow = StylingHelpers.GetStyleEnumCustom<Overflow>(computed, LayoutProperties.Overflow);

            TargetElement.style.alignContent = StylingHelpers.GetStyleEnumCustom<Align>(computed, LayoutProperties.AlignContent);
            TargetElement.style.alignItems = StylingHelpers.GetStyleEnumCustom<Align>(computed, LayoutProperties.AlignItems);
            TargetElement.style.alignSelf = StylingHelpers.GetStyleEnumCustom<Align>(computed, LayoutProperties.AlignSelf);
            TargetElement.style.justifyContent = StylingHelpers.GetStyleEnumCustom<Justify>(computed, LayoutProperties.JustifyContent);
        }

        protected override void ApplyStylesSelf()
        {
            var computed = ComputedStyle;
            TargetElement.style.backgroundColor = StylingHelpers.GetStyleColor(computed, StyleProperties.backgroundColor);
            TargetElement.style.color = StylingHelpers.GetStyleColor(computed, StyleProperties.color);
#if UNITY_2020_1_OR_NEWER
            TargetElement.style.textOverflow = StylingHelpers.GetStyleEnumCustom<TextOverflow>(computed, StyleProperties.textOverflow);
#endif
            TargetElement.style.visibility = StylingHelpers.GetStyleBoolToEnum(computed, StyleProperties.visibility, Visibility.Visible, Visibility.Hidden);
            TargetElement.style.opacity = StylingHelpers.GetStyleFloat(computed, StyleProperties.opacity);
            TargetElement.style.whiteSpace = StylingHelpers.GetStyleBoolToEnum(computed, StyleProperties.textWrap, WhiteSpace.Normal, WhiteSpace.NoWrap);

            if (computed.HasValue(StyleProperties.fontSize)) TargetElement.style.fontSize = computed.fontSize;
            else TargetElement.style.fontSize = StyleKeyword.Null;

            TargetElement.style.borderBottomLeftRadius = StylingHelpers.GetStyleBorderRadius(computed, StyleProperties.borderBottomLeftRadius);
            TargetElement.style.borderBottomRightRadius = StylingHelpers.GetStyleBorderRadius(computed, StyleProperties.borderBottomRightRadius);
            TargetElement.style.borderTopLeftRadius = StylingHelpers.GetStyleBorderRadius(computed, StyleProperties.borderTopLeftRadius);
            TargetElement.style.borderTopRightRadius = StylingHelpers.GetStyleBorderRadius(computed, StyleProperties.borderTopRightRadius);

            TargetElement.style.borderBottomColor = StylingHelpers.GetStyleBorderColor(computed, StyleProperties.borderBottomColor);
            TargetElement.style.borderTopColor = StylingHelpers.GetStyleBorderColor(computed, StyleProperties.borderTopColor);
            TargetElement.style.borderLeftColor = StylingHelpers.GetStyleBorderColor(computed, StyleProperties.borderLeftColor);
            TargetElement.style.borderRightColor = StylingHelpers.GetStyleBorderColor(computed, StyleProperties.borderRightColor);

            if (computed.HasValue(StyleProperties.backgroundImage)) computed.backgroundImage?.Get(Context, tx => TargetElement.style.backgroundImage = tx);
            else TargetElement.style.backgroundImage = StyleKeyword.Null;

            if (computed.HasValue(StyleProperties.fontStyle) || computed.HasValue(StyleProperties.fontWeight))
                TargetElement.style.unityFontStyleAndWeight = StylingHelpers.ConvertFontStyle(computed.fontStyle, computed.fontWeight);
            else TargetElement.style.unityFontStyleAndWeight = StyleKeyword.Null;


            if (computed.HasValue(StyleProperties.backgroundImage) && computed.HasValue(StyleProperties.backgroundColor))
                TargetElement.style.unityBackgroundImageTintColor = computed.backgroundColor;
            else TargetElement.style.unityBackgroundImageTintColor = StyleKeyword.Null;


            if (computed.HasValue(StyleProperties.textAlign))
            {
                if (StylingHelpers.TextAlignMap.TryGetValue(computed.textAlign, out var value)) TargetElement.style.unityTextAlign = value;
                else TargetElement.style.unityTextAlign = TextAnchor.MiddleCenter;
            }
            else TargetElement.style.unityTextAlign = StyleKeyword.Null;


            if (computed.HasValue(StyleProperties.fontFamily))
            {
                if (computed.fontFamily != null) computed.fontFamily?.Get(Context, x => {
                    if (x?.Font != null) TargetElement.style.unityFont = x?.Font;
#if REACT_TEXTCORE
                    else if (x?.TextCoreFontAsset != null) TargetElement.style.unityFontDefinition = FontDefinition.FromSDFFont(x?.TextCoreFontAsset);
#endif
#if REACT_TMP
                    else if (x?.TmpFontAsset != null) TargetElement.style.unityFont = x?.TmpFontAsset?.sourceFontFile;
#endif
                    else TargetElement.style.unityFont = ResourcesHelper.DefaultFont;
                });
            }
            else TargetElement.style.unityFont = StyleKeyword.Null;


            if (computed.HasValue(StyleProperties.cursor))
            {
                var cursor = ResourcesHelper.UtilityCursorClassPrefix + computed.cursor?.Definition;
                if (currentCursor != cursor)
                {
                    if (currentCursor != null)
                    {
                        TargetElement.RemoveFromClassList(currentCursor);
                        currentCursor = null;
                    }
                    if (cursor != null)
                    {
                        currentCursor = cursor;
                        TargetElement.AddToClassList(currentCursor);
                    }
                }
            }
            else if (currentCursor != null)
            {
                TargetElement.RemoveFromClassList(currentCursor);
                currentCursor = null;
            }

            // Transforms

            if (computed.HasValue(StyleProperties.scale)) TargetElement.transform.scale = new Vector3(computed.scale.x, computed.scale.y, 1);
            else TargetElement.transform.scale = Vector3.one;

            if (computed.HasValue(StyleProperties.rotate)) TargetElement.transform.rotation = Quaternion.Euler(computed.rotate);
            else TargetElement.transform.rotation = Quaternion.identity;



            Vector3 translate;

            var size = TargetElement.layout.size;
            var rect = new Vector2(float.IsNaN(size.x) ? 0 : size.x, float.IsNaN(size.y) ? 0 : size.y);

            if (computed.HasValue(StyleProperties.translate))
            {
                var tran = computed.translate;

                var scale = new Vector2(tran.X.Unit == YogaUnit.Percent ? rect.x / 100 : 1, tran.Y.Unit == YogaUnit.Percent ? rect.y / 100 : 1);
                translate = new Vector2(tran.X.Value * scale.x, -tran.Y.Value * scale.y);
            }
            else translate = Vector3.zero;


            var hasPivot = computed.HasValue(StyleProperties.transformOrigin);

            if (hasPivot)
            {
                var origin = computed.transformOrigin;

                var pivotX = origin.X.Unit == YogaUnit.Percent ? (origin.X.Value / 100) : origin.X.Unit == YogaUnit.Point ? (origin.X.Value / rect.x) : 0.5f;
                var pivotY = origin.Y.Unit == YogaUnit.Percent ? (origin.Y.Value / 100) : origin.Y.Unit == YogaUnit.Point ? (origin.Y.Value / rect.y) : 0.5f;
                var pivot = new Vector3(pivotX, 1 - pivotY, 0);

                if (pivot == Vector3.zero) TargetElement.transform.position = translate;
                else
                {
                    Vector3 deltaPosition = -pivot;    // get change in pivot
                    deltaPosition.Scale(rect);           // apply sizing
                    deltaPosition.Scale(TargetElement.transform.scale);          // apply scaling
                    deltaPosition = TargetElement.transform.rotation * deltaPosition; // apply rotation

                    var counter = new Vector3(pivot.x, pivot.y, 0);
                    counter.Scale(rect);

                    var pos = deltaPosition + translate + counter;
                    TargetElement.transform.position = new Vector3(pos.x, pos.y, 0);
                }

#if UNITY_2021_2_OR_NEWER
                // TODO: Versions before 2021.2 does not have this property, so we need the above hack
                // But using the official way should be faster to use for >2021.2
                // So we should write a separate logic for before 2021.2 and after
                TargetElement.style.transformOrigin = new TransformOrigin(0, 0, 0);
#endif
            }
            else TargetElement.transform.position = translate;
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            Element.RemoveFromHierarchy();
        }

        #region Setters

        public override Action AddEventListener(string eventName, Callback fun)
        {
            var (register, unregister) = EventHandlerMap.GetEventMethods(eventName);

            if (register == null)
            {
                return base.AddEventListener(eventName, fun);
            }

            EventCallback<EventBase> callAction = (e) => fun.Call(e, this);

            register.Invoke(Element, new object[] { callAction, TrickleDown.NoTrickleDown });
            return () => unregister.Invoke(Element, new object[] { callAction, TrickleDown.NoTrickleDown });
        }

        public override void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "name":
                    Element.name = value?.ToString();
                    return;
                case "focusable":
                    Element.focusable = Convert.ToBoolean(value);
                    return;
#if UNITY_EDITOR
                case "bind":
                    if (value is UnityEditor.SerializedObject so) Element.Bind(so);
                    else Element.Unbind();
                    return;
#endif
                case "tooltip":
                    Element.tooltip = value?.ToString();
                    return;
                case "tabIndex":
                    Element.tabIndex = Convert.ToInt32(value);
                    return;
                case "viewDataKey":
                    Element.viewDataKey = value?.ToString();
                    return;
                default:
                    base.SetProperty(property, value);
                    return;
            }
        }

        #endregion

        public override object GetComponent(Type type)
        {
            if (Manipulators.TryGetValue(type, out var val)) return val;
            return null;
        }

        public override object AddComponent(Type type)
        {
            var instance = Activator.CreateInstance(type);
            if (instance is IManipulator m)
            {
                TargetElement.AddManipulator(m);
                Manipulators[type] = m;
            }

            return instance;
        }

        protected override bool InsertChild(IReactComponent child, int index = -1)
        {
            if (child is IUIToolkitComponent<VisualElement> u)
            {
                if (index >= 0) Element.Insert(index, u.Element);
                else Element.Add(u.Element);
                return true;
            }
            return false;
        }

        protected override bool DeleteChild(IReactComponent child)
        {
            if (child is IUIToolkitComponent<VisualElement> u)
            {
                if (u.Element.parent == Element)
                {
                    Element.Remove(u.Element);
                    return true;
                }
                return false;
            }
            return false;
        }

        public void CaptureMouse()
        {
            MouseCaptureController.CaptureMouse(TargetElement);
        }

        public void ReleaseMouse()
        {
            MouseCaptureController.ReleaseMouse(TargetElement);
        }

        public bool HasMouseCapture()
        {
            return MouseCaptureController.HasMouseCapture(TargetElement);
        }

        public class UITClassList : ClassList
        {
            private readonly IUIToolkitComponent<T> Component;

            public UITClassList(IUIToolkitComponent<T> component) : base(component)
            {
                Component = component;
            }

            internal override void OnAdd(string item)
            {
                base.OnAdd(item);
                Component.TargetElement.AddToClassList(item);
            }

            internal override void OnRemove(string item)
            {
                base.OnRemove(item);
                Component.TargetElement.RemoveFromClassList(item);
            }

            internal override void OnBeforeChange()
            {
                base.OnBeforeChange();
                foreach (var item in Component.ClassList)
                    Component.TargetElement.RemoveFromClassList(item);
            }

            internal override void OnAfterChange()
            {
                base.OnAfterChange();
                foreach (var item in Component.ClassList)
                    Component.TargetElement.AddToClassList(item);
            }
        }
    }
}
