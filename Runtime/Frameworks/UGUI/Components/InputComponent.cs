using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Helpers;
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
                InputField.text = value;
                MarkForStyleResolving(true);
            }
        }

        public bool Disabled
        {
            get => !InputField.interactable;
            set
            {
                InputField.interactable = !value;
                MarkForStyleResolving(true);
            }
        }

        public bool ReadOnly
        {
            get => InputField.readOnly;
            set
            {
                InputField.readOnly = value;
                MarkForStyleResolving(true);
            }
        }

        private string placeholder;
        public string Placeholder
        {
            get => placeholder;
            set
            {
                placeholder = value;
                MarkForStyleResolving(true);
            }
        }

        public bool PlaceholderShown => !string.IsNullOrEmpty(Value) && !string.IsNullOrEmpty(Placeholder);

        public TMP_InputField InputField { get; private set; }
        private ContainerComponent TextViewport { get; set; }
        private TextComponent TextComponent { get; set; }
        private TextComponent PlaceholderCmp { get; set; }

        public InputComponent(string text, UGUIContext context) : base(context, "input")
        {
            // Input field's properties must be fully assigned before OnEnable is called
            GameObject.SetActive(false);

            InputField = AddComponent<TMP_InputField>();

            TextViewport = new ContainerComponent(context, "_viewport");
            TextViewport.IsPseudoElement = true;
            TextViewport.GameObject.name = "[Text Viewport]";
            TextViewport.Style["flex-grow"] = 1;
            TextViewport.SetParent(this);
            TextViewport.AddComponent<RectMask2D>();


            PlaceholderCmp = new TextComponent("", context, "_placeholder");
            PlaceholderCmp.IsPseudoElement = true;
            PlaceholderCmp.GameObject.name = "[Placeholder]";
            PlaceholderCmp.Layout.PositionType = YogaPositionType.Absolute;
            PlaceholderCmp.SetParent(TextViewport);


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
            InputField.placeholder = PlaceholderCmp.Text;
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

        public override void ResolveStyle(bool recursive = false)
        {
            base.ResolveStyle(recursive);

            var c = TextComponent.ComputedStyle.color;
            PlaceholderCmp.ComputedStyle.color = new Color(c.r, c.g, c.b, c.a * 0.5f);
            PlaceholderCmp.ApplyStyles();
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

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onEndEdit":
                    InputField.onEndEdit.RemoveAllListeners();
                    if (callback != null) InputField.onEndEdit.AddListener(new UnityAction<string>(x => callback.Call(x, this)));
                    return;
                case "onReturn":
                    InputField.onSubmit.RemoveAllListeners();
                    if (callback != null) InputField.onSubmit.AddListener(new UnityAction<string>(x => callback.Call(x, this)));
                    return;
                case "onChange":
                    InputField.onValueChanged.RemoveAllListeners();
                    if (callback != null) InputField.onValueChanged.AddListener(new UnityAction<string>(x => callback.Call(x, this)));
                    return;
                case "onTextSelection":
                    InputField.onTextSelection.RemoveAllListeners();
                    if (callback != null) InputField.onTextSelection.AddListener(
                        new UnityAction<string, int, int>((x, i, j) => callback.Call(x, i, j, this)));
                    return;
                case "onEndTextSelection":
                    InputField.onEndTextSelection.RemoveAllListeners();
                    if (callback != null) InputField.onEndTextSelection.AddListener(
                        new UnityAction<string, int, int>((x, i, j) => callback.Call(x, i, j, this)));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
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
                    Disabled = System.Convert.ToBoolean(value);
                    return;
                case "characterLimit":
                    InputField.characterLimit = System.Convert.ToInt32(value);
                    return;
                case "lineLimit":
                    InputField.lineLimit = System.Convert.ToInt32(value);
                    return;
                case "readonly":
                    InputField.readOnly = System.Convert.ToBoolean(value);
                    return;
                case "richText":
                    InputField.richText = System.Convert.ToBoolean(value);
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
