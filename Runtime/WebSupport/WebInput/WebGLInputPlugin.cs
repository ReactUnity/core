using System;
using System.Runtime.InteropServices; // for DllImport

namespace ReactUnity.WebSupport
{
    internal class WebGLInputPlugin
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        [DllImport("__Internal")]
        public static extern int WebGLInputCreate(int fontSize, string text, string placeholder, bool isMultiLine, bool isPassword, bool isHidden);

        [DllImport("__Internal")]
        public static extern void WebGLInputSetRect(int id, int x, int y, int width, int height, float lineHeight);

        [DllImport("__Internal")]
        public static extern void WebGLInputEnterSubmit(int id, bool flag);

        [DllImport("__Internal")]
        public static extern void WebGLInputTab(int id, Action<int, int> cb);

        [DllImport("__Internal")]
        public static extern void WebGLInputFocus(int id);

        [DllImport("__Internal")]
        public static extern void WebGLInputOnFocus(int id, Action<int> cb);

        [DllImport("__Internal")]
        public static extern void WebGLInputOnBlur(int id, Action<int> cb);

        [DllImport("__Internal")]
        public static extern void WebGLInputOnValueChange(int id, Action<int, string> cb);

        [DllImport("__Internal")]
        public static extern void WebGLInputOnEditEnd(int id, Action<int, string> cb);

        [DllImport("__Internal")]
        public static extern int WebGLInputSelectionStart(int id);

        [DllImport("__Internal")]
        public static extern int WebGLInputSelectionEnd(int id);

        [DllImport("__Internal")]
        public static extern int WebGLInputSelectionDirection(int id);

        [DllImport("__Internal")]
        public static extern void WebGLInputSetSelectionRange(int id, int start, int end);

        [DllImport("__Internal")]
        public static extern void WebGLInputMaxLength(int id, int maxlength);

        [DllImport("__Internal")]
        public static extern void WebGLInputText(int id, string text);

        [DllImport("__Internal")]
        public static extern bool WebGLInputIsFocus(int id);

        [DllImport("__Internal")]
        public static extern void WebGLInputDelete(int id);
        
        [DllImport("__Internal")]
        public static extern void WebGLInputEnableTabText(int id, bool enable);
        
        [DllImport("__Internal")]
        public static extern void WebGLInputSetReadOnly(int id, bool readOnly);

        [DllImport("__Internal")]
        public static extern void WebGLInputSetName(int id, string name);
#else

        public static int WebGLInputCreate(int fontSize, string text, string placeholder, bool isMultiLine, bool isPassword, bool isHidden)
        {
            return 0;
        }
        public static void WebGLInputSetRect(int id, int x, int y, int width, int height, float lineHeight)
        {
            UnityEngine.Debug.Log($"Setting Web Input with x:{x}, y:{y}, width:{width}, height:{height}, lineHeight:{lineHeight}");
        }

        public static void WebGLInputEnterSubmit(int id, bool flag) { }
        public static void WebGLInputTab(int id, Action<int, int> cb) { }
        public static void WebGLInputFocus(int id) { }
        public static void WebGLInputOnFocus(int id, Action<int> cb) { }
        public static void WebGLInputOnBlur(int id, Action<int> cb) { }
        public static void WebGLInputOnValueChange(int id, Action<int, string> cb) { }
        public static void WebGLInputOnEditEnd(int id, Action<int, string> cb) { }
        public static int WebGLInputSelectionStart(int id) { return 0; }
        public static int WebGLInputSelectionEnd(int id) { return 0; }
        public static int WebGLInputSelectionDirection(int id) { return 0; }
        public static void WebGLInputSetSelectionRange(int id, int start, int end) { }
        public static void WebGLInputMaxLength(int id, int maxlength) { }
        public static void WebGLInputText(int id, string text) { }
        public static bool WebGLInputIsFocus(int id) { return false; }
        public static void WebGLInputDelete(int id) { }
        public static void WebGLInputEnableTabText(int id, bool enable) { }
        public static void WebGLInputSetReadOnly(int id, bool readOnly) { }
        public static void WebGLInputSetName(int id, string name) { }

#endif
    }

}
