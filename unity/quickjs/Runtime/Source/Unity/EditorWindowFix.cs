#if !JSB_UNITYLESS
#if UNITY_EDITOR
using System;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;

namespace QuickJS.Unity
{
    using Native;
    using Binding;
    using UnityEngine;
    using UnityEditor;

    public static class EditorWindowFix
    {
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue BindStatic_GetWindow(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                //TODO: 需要补充 GetWindow 其余重载匹配
                if (argc == 1)
                {
                    System.Type arg_editorType;
                    if (!Values.js_get_classvalue(ctx, argv[0], out arg_editorType))
                    {
                        throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(System.Type), 0);
                    }
                    var inject = js_get_window(ctx, argv[0], arg_editorType, false, null, true);
                    if (!inject.IsUndefined())
                    {
                        return inject;
                    }
                    var ret = UnityEditor.EditorWindow.GetWindow(arg_editorType);
                    return Values.js_push_classvalue(ctx, ret);
                }
                else if (argc == 2)
                {
                    if (Values.js_match_type(ctx, argv[0], typeof(Type)) && Values.js_match_type(ctx, argv[1], typeof(bool)))
                    {
                        System.Type arg_editorType;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg_editorType))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(System.Type), 0);
                        }
                        bool arg_utility;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg_utility))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(bool), 1);
                        }
                        var inject = js_get_window(ctx, argv[0], arg_editorType, arg_utility, null, true);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = UnityEditor.EditorWindow.GetWindow(arg_editorType);
                        return Values.js_push_classvalue(ctx, ret);
                    }
                }
                else if (argc == 3)
                {
                    if (Values.js_match_type(ctx, argv[0], typeof(Type)) && Values.js_match_type(ctx, argv[1], typeof(bool)) && Values.js_match_type(ctx, argv[2], typeof(string)))
                    {
                        System.Type arg_editorType;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg_editorType))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(System.Type), 0);
                        }
                        bool arg_utility;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg_utility))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(bool), 1);
                        }
                        string arg_title;
                        if (!Values.js_get_primitive(ctx, argv[2], out arg_title))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(string), 2);
                        }
                        var inject = js_get_window(ctx, argv[0], arg_editorType, arg_utility, arg_title, true);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = UnityEditor.EditorWindow.GetWindow(arg_editorType);
                        return Values.js_push_classvalue(ctx, ret);
                    }
                }
                else if (argc == 4)
                {
                    if (Values.js_match_type(ctx, argv[0], typeof(Type)) && Values.js_match_type(ctx, argv[1], typeof(bool)) && Values.js_match_type(ctx, argv[2], typeof(string)) && Values.js_match_type(ctx, argv[3], typeof(bool)))
                    {
                        System.Type arg_editorType;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg_editorType))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(System.Type), 0);
                        }
                        bool arg_utility;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg_utility))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(bool), 1);
                        }
                        string arg_title;
                        if (!Values.js_get_primitive(ctx, argv[2], out arg_title))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(string), 2);
                        }
                        bool arg_focus;
                        if (!Values.js_get_primitive(ctx, argv[3], out arg_focus))
                        {
                            throw new ParameterException(typeof(UnityEditor.EditorWindow), "GetWindow", typeof(bool), 3);
                        }
                        var inject = js_get_window(ctx, argv[0], arg_editorType, arg_utility, arg_title, arg_focus);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = UnityEditor.EditorWindow.GetWindow(arg_editorType);
                        return Values.js_push_classvalue(ctx, ret);
                    }
                }
                throw new NoSuitableMethodException("GetWindow", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        // as extended method
        // public static T CreateWindow<T>(string title, params Type[] desiredDockNextTo) where T : EditorWindow
        // public static T CreateWindow<T>(params Type[] desiredDockNextTo) where T : EditorWindow
        [JSCFunction(true,
            "<T extends EditorWindow>(type: { new(): T }, ...desiredDockNextTo: any[]): T",
            "<T extends EditorWindow>(type: { new(): T }, title: string, ...desiredDockNextTo: any[]): T")]
        public static JSValue CreateWindow(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            if (argc == 0 || JSApi.JS_IsConstructor(ctx, argv[0]) != 1)
            {
                throw new ParameterException("type", typeof(Type), 0);
            }

            if (argc > 1)
            {
                var firstAsTitle = argv[1].IsString() || argv[1].IsNullish();
                var title = firstAsTitle ? JSApi.GetString(ctx, argv[1]) : null;
                var firstArgIndex = firstAsTitle ? 2 : 1;

                return _new_js_editor_window(ctx, argv[0], false, title, argv, firstArgIndex);
            }

            return _new_js_editor_window(ctx, argv[0], false, null, null, 0);
        }

        //TODO fix type checking
        private static bool __type_equals(EditorWindow editorWindow, JSContext ctx, JSValue value)
        {
            var jsEditorWindow = editorWindow as JSEditorWindow;
            if (jsEditorWindow != null)
            {
                if (jsEditorWindow.IsInstanceOf(value) == 1)
                {
                    return true;
                }
            }

            Type type;
            if (Values.js_get_classvalue(ctx, value, out type))
            {
                var editorWindowType = editorWindow.GetType();
                if (editorWindowType == type || editorWindowType.IsSubclassOf(type))
                {
                    return true;
                }
            }

            return false;
        }

        private static bool __dock(EditorWindow val, JSContext ctx, JSValue[] desiredDockNextTo)
        {
            if (desiredDockNextTo == null || desiredDockNextTo.Length == 0)
            {
                return false;
            }

            try
            {
                var ContainerWindow = typeof(EditorWindow).Assembly.GetType("UnityEditor.ContainerWindow");
                var ContainerWindow_windows = ContainerWindow.GetProperty("windows", BindingFlags.Public | BindingFlags.Static);
                var ContainerWindow_rootView = ContainerWindow.GetProperty("rootView", BindingFlags.Public | BindingFlags.Instance);

                var View = typeof(EditorWindow).Assembly.GetType("UnityEditor.View");
                var View_allChildren = View.GetProperty("allChildren", BindingFlags.Public | BindingFlags.Instance);
                var DockArea = typeof(EditorWindow).Assembly.GetType("UnityEditor.DockArea");
                var DockArea_Panes = DockArea.GetField("m_Panes", BindingFlags.NonPublic | BindingFlags.Instance);
                var DockArea_AddTab = DockArea.GetMethod("AddTab", new Type[] { typeof(EditorWindow), typeof(bool) });

                // foreach (var desired in desiredDockNextTo)
                for (var dIndex = 0; dIndex < desiredDockNextTo.Length; dIndex++)
                {
                    var desired = desiredDockNextTo[dIndex];
                    // ContainerWindow[]
                    var windows = (Array)ContainerWindow_windows.GetMethod.Invoke(null, null);
                    for (var wIndex = 0; wIndex < windows.Length; wIndex++)
                    {
                        var containerWindow = windows.GetValue(wIndex);
                        var rootView = ContainerWindow_rootView.GetMethod.Invoke(containerWindow, null);
                        // View[]
                        var allChildren = (Array)View_allChildren.GetMethod.Invoke(rootView, null);
                        for (var vIndex = 0; vIndex < allChildren.Length; vIndex++)
                        {
                            var view = allChildren.GetValue(vIndex);
                            var dockArea = view; //  as DockArea

                            // DockArea.m_Panes: internal List<EditorWindow> 
                            if (!((UnityEngine.Object)dockArea == null) && DockArea.IsInstanceOfType(dockArea))
                            {
                                if ((DockArea_Panes.GetValue(dockArea) as List<EditorWindow>).Any((EditorWindow pane) => __type_equals(pane, ctx, desired)))
                                {
                                    DockArea_AddTab.Invoke(dockArea, new object[] { val, true }); // dockArea.AddTab(val);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                Debug.LogError(exception);
            }

            return false;
        }

        // inject: GetWindow(Type)
        public static JSValue js_get_window(JSContext ctx, JSValue ctor, Type type, bool utility, string title, bool focus)
        {
            if (JSApi.JS_IsConstructor(ctx, ctor) == 1)
            {
                var header = JSApi.jsb_get_payload_header(ctx, ctor);
                if (header.type_id == BridgeObjectType.None) // it's a plain js value
                {
                    if (type == typeof(EditorWindow))
                    {
                        var bridgeValue = _js_get_window_clone(ctx, ctor, utility, title, focus);
                        if (!bridgeValue.IsUndefined())
                        {
                            return bridgeValue;
                        }

                        return JSApi.JS_NULL; // or return an empty array?
                    }
                }
            }

            return JSApi.JS_UNDEFINED;
        }

        private static JSValue _js_get_window_clone(JSContext ctx, JSValue ctor, bool utility, string title, bool focus)
        {
            var t = typeof(JSEditorWindow);
            var array = Resources.FindObjectsOfTypeAll(t);
            var editorWindow = _get_js_editor_window(array, ctor);
            if (!editorWindow)
            {
                return _new_js_editor_window(ctx, ctor, utility, title, null, 0);
            }
            else if (focus)
            {
                editorWindow.Show();
                editorWindow.Focus();
            }

            return editorWindow.CloneValue();
        }

        private static JSValue _new_js_editor_window(JSContext ctx, JSValue ctor, bool utility, string title, JSValue[] desiredDockNextTo, int desiredDockNextToOffset)
        {
            var editorWindow = ScriptableObject.CreateInstance<JSEditorWindow>();
            var val = editorWindow.SetScriptInstance(ctx, ctor, true);

            if (val.IsUndefined())
            {
                editorWindow.ReleaseScriptInstance();
                Object.DestroyImmediate(editorWindow);
                return ctx.ThrowInternalError("failed to bind script");
            }

            if (title != null)
            {
                editorWindow.titleContent = new GUIContent(title);
            }

            __dock(editorWindow, ctx, desiredDockNextTo);
            if (utility)
            {
                editorWindow.ShowUtility();
            }
            else
            {
                editorWindow.Show();
            }

            return val;
        }

        private static JSEditorWindow _get_js_editor_window(Object[] array, JSValue ctor)
        {
            for (int i = 0, len = array.Length; i < len; i++)
            {
                var ew = (JSEditorWindow)array[i];
                if (ew.IsInstanceOf(ctor) == 1)
                {
                    return ew;
                }
            }
            return null;
        }
    }
}
#endif
#endif