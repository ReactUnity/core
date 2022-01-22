using System;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Helpers;
using ReactUnity.UGUI.Behaviours;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class InputComponent : UGUIComponent, IInputComponent
    {
        public string Value
        {
            get => InputField.text;
            set
            {
                InputField.SetTextWithoutNotify(value);
                MarkStyleUpdateWithSiblings(true);
            }
        }

        public bool Disabled
        {
            get => !InputField.interactable;
            set
            {
                InputField.interactable = !value;
                MarkStyleUpdateWithSiblings(true);
            }
        }

        public bool ReadOnly
        {
            get => InputField.readOnly;
            set
            {
                InputField.readOnly = value;
                MarkStyleUpdateWithSiblings(true);
            }
        }

        private string placeholder;
        public string Placeholder
        {
            get => placeholder;
            set
            {
                placeholder = value;
                PlaceholderComponent.SetText(placeholder);
                MarkStyleUpdateWithSiblings(true);
            }
        }

        public bool PlaceholderShown => string.IsNullOrEmpty(Value) && !string.IsNullOrEmpty(Placeholder);

        public TMP_InputField InputField { get; private set; }
        public ContainerComponent TextViewport { get; set; }
        public TextComponent TextComponent { get; set; }
        public TextComponent PlaceholderComponent { get; set; }

        public InputComponent(string text, UGUIContext context) : base(context, "input")
        {
            // Input field's properties must be fully assigned before OnEnable is called
            GameObject.SetActive(false);

            AddComponent<ScrollEventBubbling>();
            InputField = AddComponent<TMP_InputField>();

            TextViewport = new ContainerComponent(context, "_viewport");
            TextViewport.IsPseudoElement = true;
            TextViewport.GameObject.name = "[Text Viewport]";
            TextViewport.Style["flex-grow"] = 1;
            TextViewport.SetParent(this);
            TextViewport.AddComponent<RectMask2D>();


            PlaceholderComponent = new TextComponent("", context, "_placeholder");
            PlaceholderComponent.IsPseudoElement = true;
            PlaceholderComponent.GameObject.name = "[Placeholder]";
            PlaceholderComponent.Layout.PositionType = YogaPositionType.Absolute;
            PlaceholderComponent.SetParent(TextViewport);
            PlaceholderComponent.Component.enabled = false;
            var phRect = PlaceholderComponent.RectTransform;
            phRect.pivot = Vector2.one / 2;
            phRect.anchorMin = Vector2.zero;
            phRect.anchorMax = Vector2.one;
            phRect.sizeDelta = Vector2.zero;
            phRect.offsetMin = Vector2.zero;
            phRect.offsetMax = Vector2.zero;



            TextComponent = new TextComponent(text, context, "_value");
            TextComponent.IsPseudoElement = true;
            TextComponent.GameObject.name = "[Text]";
            TextComponent.SetParent(TextViewport);
            TextComponent.Component.enabled = false;
            var textRect = TextComponent.RectTransform;
            textRect.pivot = Vector2.one / 2;
            textRect.anchorMin = Vector2.zero;
            textRect.anchorMax = Vector2.one;
            textRect.sizeDelta = Vector2.zero;
            textRect.offsetMin = Vector2.zero;
            textRect.offsetMax = Vector2.zero;


            InputField.textViewport = TextViewport.RectTransform;
            InputField.textComponent = TextComponent.Text;
            InputField.placeholder = PlaceholderComponent.Text;
            InputField.fontAsset = TextComponent.Text.font;

            GameObject.SetActive(true);
            SetText(text);
        }

        public void SetText(string text)
        {
            InputField.text = text;
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            TextComponent.Measurer.enabled = Layout.Width.Unit == YogaUnit.Auto;
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();
            InputField.pointSize = ComputedStyle.fontSize;
        }

        public void Focus()
        {
            InputField.Select();
        }

        public void Activate()
        {
            Focus();
        }

        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onEndEdit":
                    var l1 = new UnityAction<string>(x => callback.Call(x, this));
                    InputField.onEndEdit.AddListener(l1);
                    return () => InputField.onEndEdit.RemoveListener(l1);
                case "onReturn":
                    var l2 = new UnityAction<string>(x => callback.Call(x, this));
                    InputField.onSubmit.AddListener(l2);
                    return () => InputField.onSubmit.RemoveListener(l2);
                case "onChange":
                    var l3 = new UnityAction<string>(x => callback.Call(x, this));
                    InputField.onValueChanged.AddListener(l3);
                    return () => InputField.onValueChanged.RemoveListener(l3);
                case "onTextSelection":
                    var l4 = new UnityAction<string, int, int>((x, i, j) => callback.Call(x, i, j, this));
                    InputField.onTextSelection.AddListener(l4);
                    return () => InputField.onTextSelection.RemoveListener(l4);
                case "onEndTextSelection":
                    var l5 = new UnityAction<string, int, int>((x, i, j) => callback.Call(x, i, j, this));
                    InputField.onEndTextSelection.AddListener(l5);
                    return () => InputField.onEndTextSelection.RemoveListener(l5);
                default:
                    return base.AddEventListener(eventName, callback);
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "placeholder":
                    Placeholder = value?.ToString() ?? "";
                    return;
                case "value":
                    Value = value?.ToString() ?? "";
                    return;
                case "disabled":
                    Disabled = Convert.ToBoolean(value);
                    return;
                case "characterLimit":
                    InputField.characterLimit = Convert.ToInt32(value);
                    return;
                case "lineLimit":
                    InputField.lineLimit = Convert.ToInt32(value);
                    return;
                case "readonly":
                    InputField.readOnly = Convert.ToBoolean(value);
                    return;
                case "richText":
                    InputField.richText = Convert.ToBoolean(value);
                    return;
                case "contentType":
                    var val = AllConverters.Get<TMP_InputField.ContentType>().Convert(value);
                    if (val is TMP_InputField.ContentType ct) InputField.contentType = ct;
                    else InputField.contentType = TMP_InputField.ContentType.Standard;
                    Value = Value; // Workaround to fix password switching bug
                    return;
                case "keyboardType":
                    var val2 = AllConverters.Get<TouchScreenKeyboardType>().Convert(value);
                    if (val2 is TouchScreenKeyboardType ct2) InputField.keyboardType = ct2;
                    else InputField.keyboardType = TouchScreenKeyboardType.Default;
                    return;
                case "lineType":
                    var val3 = AllConverters.Get<TMP_InputField.LineType>().Convert(value);
                    if (val3 is TMP_InputField.LineType lt) InputField.lineType = lt;
                    else InputField.lineType = TMP_InputField.LineType.SingleLine;
                    return;
                case "validation":
                    var val4 = AllConverters.Get<TMP_InputField.CharacterValidation>().Convert(value);
                    if (val4 is TMP_InputField.CharacterValidation cv) InputField.characterValidation = cv;
                    else InputField.characterValidation = TMP_InputField.CharacterValidation.None;
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
