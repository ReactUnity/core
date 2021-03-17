using Facebook.Yoga;
using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Interop;
using ReactUnity.Styling;
using System;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class InputComponent : ContainerComponent
    {
        public static YogaNode InputDefaultLayout { get; } = new YogaNode()
        {
            Padding = 8,
            MinHeight = 40,
            MinWidth = 200,
            MaxWidth = YogaValue.Percent(100),
            Overflow = YogaOverflow.Hidden
        };

        public static NodeStyle InputDefaultStyle { get; } = new NodeStyle()
        {
            backgroundColor = Color.white,
            borderRadius = 8,
            fontSize = 24,
            cursor = "text",
            appearance = Styling.Types.Appearance.Input,
        };

        public override YogaNode DefaultLayout => InputDefaultLayout;
        public override NodeStyle DefaultStyle => InputDefaultStyle;

        public string Value
        {
            get => InputField.text;
            set
            {
                InputField.text = value;
                Placeholder.ApplyStyles();
            }
        }


        private TMP_InputField InputField { get; set; }
        private ContainerComponent TextViewport { get; set; }
        private TextComponent TextComponent { get; set; }
        private TextComponent Placeholder { get; set; }

        public InputComponent(string text, UGUIContext context) : base(context, "input")
        {
            // Input field's properties must be fully assigned before OnEnable is called
            GameObject.SetActive(false);

            InputField = AddComponent<TMP_InputField>();

            TextViewport = new ContainerComponent(context, "_viewport");
            TextViewport.IsPseudoElement = true;
            TextViewport.GameObject.name = "[Text Viewport]";
            TextViewport.SetParent(this);
            TextViewport.AddComponent<RectMask2D>();


            Placeholder = new TextComponent("", context, "_placeholder");
            Placeholder.IsPseudoElement = true;
            Placeholder.GameObject.name = "[Placeholder]";
            Placeholder.Layout.PositionType = YogaPositionType.Absolute;
            Placeholder.SetParent(TextViewport);


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
            InputField.placeholder = Placeholder.Text;
            InputField.fontAsset = TextComponent.Text.font;

            GameObject.SetActive(true);
            SetText(text);
        }

        public void SetText(string text)
        {
            InputField.text = text;
        }

        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();
            TextComponent.Measurer.enabled = Layout.Width.Unit == YogaUnit.Auto;
        }

        public override void ResolveStyle(bool recursive = false)
        {
            base.ResolveStyle(recursive);

            var c = TextComponent.Style.color;
            Placeholder.Style.color = new Color(c.r, c.g, c.b, c.a * 0.5f);
            Placeholder.ApplyStyles();
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            InputField.pointSize = Style.fontSizeActual;
        }

        public void Focus()
        {
            InputField.Select();
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
                    Placeholder.SetText(value.ToString());
                    return;
                case "value":
                    InputField.text = value.ToString();
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
                    InputField.contentType = (TMP_InputField.ContentType)System.Convert.ToInt32(value);
                    return;
                case "keyboardType":
                    InputField.keyboardType = (TouchScreenKeyboardType)System.Convert.ToInt32(value);
                    return;
                case "lineType":
                    InputField.lineType = (TMP_InputField.LineType)System.Convert.ToInt32(value);
                    return;
                case "validation":
                    InputField.characterValidation = (TMP_InputField.CharacterValidation)System.Convert.ToInt32(value);
                    return;
                case "webSupport":
                    var enabled = System.Convert.ToBoolean(value);
                    var cmp = SetWebGLSupport(enabled);
                    if (!enabled && cmp) UnityEngine.Object.Destroy(cmp);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private WebSupport.WebGLInput SetWebGLSupport(bool createIfDoesNotExist)
        {
            var cmp = GetComponent<WebSupport.WebGLInput>();
            if (createIfDoesNotExist && !cmp) AddComponent<WebSupport.WebGLInput>();
            return cmp;
        }
    }
}
