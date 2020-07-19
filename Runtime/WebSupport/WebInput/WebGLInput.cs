using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using AOT;
using System.Collections;

namespace ReactUnity.WebSupport
{
    public class WebGLInput : MonoBehaviour, IComparable<WebGLInput>, IComparable
    {
        static Dictionary<int, WebGLInput> instances = new Dictionary<int, WebGLInput>();
        public bool enableTabText = false;

        int id = -1;
        IInputField input;
        bool blueBlock = false;

        [TooltipAttribute("show input element on canvas. this will make you select text by drag.")]
        public bool showHtmlElement = false;

        private Rect PreviousRect;

        private IInputField Setup()
        {
            if (GetComponent<InputField>()) return new WrappedInputField(GetComponent<InputField>());
            if (GetComponent<TMPro.TMP_InputField>()) return new WrappedTMPInputField(GetComponent<TMPro.TMP_InputField>());
            throw new Exception("Can not Setup WebGLInput!!");
        }

        private void Awake()
        {
            input = Setup();
#if !(UNITY_WEBGL && !UNITY_EDITOR)
            enabled = false;
#endif
        }

        /// <summary>
        /// 対象が選択されたとき
        /// </summary>
        /// <param name="eventData"></param>
        public void OnSelect(/*BaseEventData eventData*/)
        {
            bool isPassword = input.contentType == ContentType.Password;

            id = WebGLInputPlugin.WebGLInputCreate(input.fontSize, input.text, input.placeholder, input.lineType != LineType.SingleLine, isPassword, !showHtmlElement);
            PreviousRect = GetScreenCoordinates(input.RectTransform());
            SizeChanged();

            instances[id] = this;
            WebGLInputPlugin.WebGLInputEnterSubmit(id, input.lineType != LineType.MultiLineNewline);
            WebGLInputPlugin.WebGLInputOnFocus(id, OnFocus);
            WebGLInputPlugin.WebGLInputOnBlur(id, OnBlur);
            WebGLInputPlugin.WebGLInputOnValueChange(id, OnValueChange);
            WebGLInputPlugin.WebGLInputOnEditEnd(id, OnEditEnd);
            WebGLInputPlugin.WebGLInputTab(id, OnTab);
            // default value : https://www.w3schools.com/tags/att_input_maxlength.asp
            WebGLInputPlugin.WebGLInputMaxLength(id, (input.characterLimit > 0) ? input.characterLimit : 524288);
            WebGLInputPlugin.WebGLInputFocus(id);
            WebGLInputPlugin.WebGLInputEnableTabText(id, enableTabText);
            WebGLInputPlugin.WebGLInputSetReadOnly(id, input.ReadOnly);
            WebGLInputPlugin.WebGLInputSetName(id, name);

            if (input.OnFocusSelectAll)
            {
                WebGLInputPlugin.WebGLInputSetSelectionRange(id, 0, input.text.Length);
            }

            WebGLWindow.OnBlurEvent += OnWindowBlur;
        }

        void SizeChanged()
        {
            if (id < 0) return;
            var rect = PreviousRect;
            var x = (int)(rect.x);
            var y = (int)(Screen.height - (rect.y + rect.height));
            WebGLInputPlugin.WebGLInputSetRect(id, x, y, (int)rect.width, (int)rect.height, input.lineHeight);
        }

        void OnWindowBlur()
        {
            blueBlock = true;
        }

        /// <summary>
        /// 画面内の描画範囲を取得する
        /// </summary>
        /// <param name="uiElement"></param>
        /// <returns></returns>
        Rect GetScreenCoordinates(RectTransform uiElement)
        {
            var worldCorners = new Vector3[4];
            uiElement.GetWorldCorners(worldCorners);

            // try to support RenderMode:WorldSpace
            var canvas = uiElement.GetComponentInParent<Canvas>();
            var hasCamera = (canvas.renderMode != RenderMode.ScreenSpaceOverlay) && (canvas.worldCamera != null);
            if (canvas && hasCamera)
            {
                for (var i = 0; i < worldCorners.Length; i++)
                {
                    worldCorners[i] = canvas.worldCamera.WorldToScreenPoint(worldCorners[i]);
                }
            }

            var min = new Vector3(float.MaxValue, float.MaxValue);
            var max = new Vector3(float.MinValue, float.MinValue);
            for (var i = 0; i < worldCorners.Length; i++)
            {
                min.x = Mathf.Min(min.x, worldCorners[i].x);
                min.y = Mathf.Min(min.y, worldCorners[i].y);
                max.x = Mathf.Max(max.x, worldCorners[i].x);
                max.y = Mathf.Max(max.y, worldCorners[i].y);
            }

            return new Rect(min.x, min.y, max.x - min.x, max.y - min.y);
        }

        void DeactivateInputField()
        {
            WebGLInputPlugin.WebGLInputDelete(id);
            input.DeactivateInputField();
            instances.Remove(id);
            id = -1;
            WebGLWindow.OnBlurEvent -= OnWindowBlur;
        }

        [MonoPInvokeCallback(typeof(Action<int>))]
        static void OnFocus(int id)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            UnityEngine.WebGLInput.captureAllKeyboardInput = false;
#endif
        }

        [MonoPInvokeCallback(typeof(Action<int>))]
        static void OnBlur(int id)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            UnityEngine.WebGLInput.captureAllKeyboardInput = true;
#endif
            instances[id].StartCoroutine(Blue(id));
        }
        static IEnumerator Blue(int id)
        {
            yield return null;
            if (!instances.ContainsKey(id)) yield break;

            var block = instances[id].blueBlock;    // get blue block state
            instances[id].blueBlock = false;        // reset instalce block state
            if (block) yield break;                 // if block. break it!!

            instances[id].DeactivateInputField();
        }

        [MonoPInvokeCallback(typeof(Action<int, string>))]
        static void OnValueChange(int id, string value)
        {
            if (!instances.ContainsKey(id)) return;

            var instance = instances[id];
            var index = instance.input.caretPosition;
            if (!instance.input.ReadOnly)
            {
                instance.input.text = value;
            }


            // InputField.ContentType.Name が Name の場合、先頭文字が強制的大文字になるため小文字にして比べる
            if (instance.input.contentType == ContentType.Name)
            {
                if (string.Compare(instance.input.text, value, true) == 0)
                {
                    value = instance.input.text;
                }
            }

            // InputField の ContentType による整形したテキストを HTML の input に再設定します
            if (value != instance.input.text)
            {
                WebGLInputPlugin.WebGLInputText(id, instance.input.text);
                WebGLInputPlugin.WebGLInputSetSelectionRange(id, index, index);
            }
        }
        [MonoPInvokeCallback(typeof(Action<int, string>))]
        static void OnEditEnd(int id, string value)
        {
            if (!instances[id].input.ReadOnly)
            {
                instances[id].input.text = value;
            }
        }
        [MonoPInvokeCallback(typeof(Action<int, int>))]
        static void OnTab(int id, int value)
        {
            WebGLInputTabFocus.OnTab(instances[id], value);
        }

        void Update()
        {
            if (input == null || !input.isFocused) return;

            var rect = GetScreenCoordinates(input.RectTransform());
            if (rect != PreviousRect)
            {
                PreviousRect = rect;
                SizeChanged();
            }

            if (!instances.ContainsKey(id))
            {
                OnSelect();
            }
            else if (!WebGLInputPlugin.WebGLInputIsFocus(id))
            {
                WebGLInputPlugin.WebGLInputFocus(id);
            }

            var start = WebGLInputPlugin.WebGLInputSelectionStart(id);
            var end = WebGLInputPlugin.WebGLInputSelectionEnd(id);

            if (WebGLInputPlugin.WebGLInputSelectionDirection(id) == -1)
            {
                input.selectionFocusPosition = start;
                input.selectionAnchorPosition = end;
            }
            else
            {
                input.selectionFocusPosition = end;
                input.selectionAnchorPosition = start;
            }

            input.Rebuild();
        }
        private void OnEnable()
        {
            WebGLInputTabFocus.Add(this);
        }
        private void OnDisable()
        {
            WebGLInputTabFocus.Remove(this);
        }
        public int CompareTo(WebGLInput other)
        {
            var a = GetScreenCoordinates(input.RectTransform());
            var b = GetScreenCoordinates(other.input.RectTransform());
            var res = b.y.CompareTo(a.y);
            if (res == 0) res = a.x.CompareTo(b.x);
            return res;
        }

        public int CompareTo(object obj)
        {
            return CompareTo(obj as WebGLInput);
        }

        static class WebGLInputTabFocus
        {
            static List<WebGLInput> inputs = new List<WebGLInput>();

            public static void Add(WebGLInput input)
            {
                inputs.Add(input);
                if (inputs.Count > 1) inputs.Sort();
            }

            public static void Remove(WebGLInput input)
            {
                inputs.Remove(input);
            }

            public static void OnTab(WebGLInput input, int value)
            {
                if (inputs.Count <= 1) return;
                var index = inputs.IndexOf(input);
                index += value;
                if (index < 0) index = inputs.Count - 1;
                else if (index >= inputs.Count) index = 0;
                inputs[index].input.ActivateInputField();
            }
        }
    }
}
