#if !JSB_UNITYLESS
using System;
using System.Reflection;

namespace QuickJS.Unity
{
    using Native;
    using Binding;
    using UnityEngine;

    public static class ComponentFix
    {
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponent(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                do
                {
                    if (argc == 1)
                    {
                        if (Values.js_match_type(ctx, argv[0], typeof(System.Type)))
                        {
                            UnityEngine.Component self;
                            if (!Values.js_get_classvalue(ctx, this_obj, out self))
                            {
                                throw new ThisBoundException();
                            }
                            System.Type arg0;
                            if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                            {
                                throw new ParameterException(typeof(UnityEngine.Component), "GetComponent", typeof(System.Type), 0);
                            }
                            var inject = Values._js_game_object_get_component(ctx, argv[0], self, arg0);
                            if (!inject.IsUndefined())
                            {
                                return inject;
                            }
                            var ret = self.GetComponent(arg0);
                            return Values.js_push_classvalue(ctx, ret);
                        }
                        if (Values.js_match_type(ctx, argv[0], typeof(string)))
                        {
                            UnityEngine.Component self;
                            if (!Values.js_get_classvalue(ctx, this_obj, out self))
                            {
                                throw new ThisBoundException();
                            }
                            string arg0;
                            if (!Values.js_get_primitive(ctx, argv[0], out arg0))
                            {
                                throw new ParameterException(typeof(UnityEngine.Component), "GetComponent", typeof(string), 0);
                            }
                            var ret = self.GetComponent(arg0);
                            return Values.js_push_classvalue(ctx, ret);
                        }
                    }
                } while (false);
                throw new NoSuitableMethodException("GetComponent", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponentInChildren(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                do
                {
                    if (argc == 2)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentInChildren", typeof(System.Type), 0);
                        }
                        bool arg1;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg1))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentInChildren", typeof(bool), 1);
                        }
                        var inject = Values._js_game_object_get_component_in_children(ctx, argv[0], self, arg0, arg1);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentInChildren(arg0, arg1);
                        return Values.js_push_classvalue(ctx, ret);
                    }
                    if (argc == 1)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentInChildren", typeof(System.Type), 0);
                        }
                        var inject = Values._js_game_object_get_component_in_children(ctx, argv[0], self, arg0, false);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentInChildren(arg0);
                        return Values.js_push_classvalue(ctx, ret);
                    }
                } while (false);
                throw new NoSuitableMethodException("GetComponentInChildren", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponentsInChildren(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                do
                {
                    if (argc == 2)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInChildren", typeof(System.Type), 0);
                        }
                        bool arg1;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg1))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInChildren", typeof(bool), 1);
                        }
                        var inject = Values._js_game_object_get_components_in_children(ctx, argv[0], self, arg0, arg1);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentsInChildren(arg0, arg1);
                        return Values.PushArray(ctx, ret);
                    }
                    if (argc == 1)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInChildren", typeof(System.Type), 0);
                        }
                        var inject = Values._js_game_object_get_components_in_children(ctx, argv[0], self, arg0, false);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentsInChildren(arg0);
                        return Values.PushArray(ctx, ret);
                    }
                } while (false);
                throw new NoSuitableMethodException("GetComponentsInChildren", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponentInParent(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                if (argc == 1)
                {
                    UnityEngine.Component self;
                    if (!Values.js_get_classvalue(ctx, this_obj, out self))
                    {
                        throw new ThisBoundException();
                    }
                    System.Type arg0;
                    if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                    {
                        throw new ParameterException(typeof(UnityEngine.Component), "GetComponentInParent", typeof(System.Type), 0);
                    }
                    var inject = Values._js_game_object_get_component_in_parent(ctx, argv[0], self, arg0, false);
                    if (!inject.IsUndefined())
                    {
                        return inject;
                    }
                    var ret = self.GetComponentInParent(arg0);
                    return Values.js_push_classvalue(ctx, ret);
                }
                throw new NoSuitableMethodException("GetComponentInParent", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponentsInParent(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                do
                {
                    if (argc == 2)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInParent", typeof(System.Type), 0);
                        }
                        bool arg1;
                        if (!Values.js_get_primitive(ctx, argv[1], out arg1))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInParent", typeof(bool), 1);
                        }
                        var inject = Values._js_game_object_get_components_in_parent(ctx, argv[0], self, arg0, arg1);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentsInParent(arg0, arg1);
                        return Values.PushArray(ctx, ret);
                    }
                    if (argc == 1)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponentsInParent", typeof(System.Type), 0);
                        }
                        var inject = Values._js_game_object_get_components_in_parent(ctx, argv[0], self, arg0, false);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponentsInParent(arg0);
                        return Values.PushArray(ctx, ret);
                    }
                } while (false);
                throw new NoSuitableMethodException("GetComponentsInParent", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue Bind_GetComponents(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                do
                {
                    if (argc == 2)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponents", typeof(System.Type), 0);
                        }
                        System.Collections.Generic.List<UnityEngine.Component> arg1;
                        if (!Values.js_get_classvalue(ctx, argv[1], out arg1))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponents", typeof(System.Collections.Generic.List<UnityEngine.Component>), 1);
                        }
                        var inject = Values._js_game_object_get_components(ctx, argv[0], self, arg0, arg1);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        self.GetComponents(arg0, arg1);
                        return JSApi.JS_UNDEFINED;
                    }
                    if (argc == 1)
                    {
                        UnityEngine.Component self;
                        if (!Values.js_get_classvalue(ctx, this_obj, out self))
                        {
                            throw new ThisBoundException();
                        }
                        System.Type arg0;
                        if (!Values.js_get_classvalue(ctx, argv[0], out arg0))
                        {
                            throw new ParameterException(typeof(UnityEngine.Component), "GetComponents", typeof(System.Type), 0);
                        }
                        var inject = Values._js_game_object_get_components(ctx, argv[0], self, arg0);
                        if (!inject.IsUndefined())
                        {
                            return inject;
                        }
                        var ret = self.GetComponents(arg0);
                        return Values.PushArray(ctx, ret);
                    }
                } while (false);
                throw new NoSuitableMethodException("GetComponents", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
    }
}
#endif