#if !JSB_UNITYLESS
#if UNITY_EDITOR
using System;

namespace QuickJS.Unity
{
    using Native;
    using Binding;
    using UnityEngine;

    public static class ScriptableObjectFix
    {
        [MonoPInvokeCallbackAttribute(typeof(JSCFunction))]
        public static JSValue BindStatic_CreateInstance(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                if (argc == 1)
                {
                    System.Type arg_type;
                    if (!Values.js_get_classvalue(ctx, argv[0], out arg_type))
                    {
                        throw new ParameterException(typeof(ScriptableObject), "CreateInstance", typeof(System.Type), 0);
                    }
                    var inject = js_create_instance(ctx, argv[0], arg_type);
                    if (!inject.IsUndefined())
                    {
                        return inject;
                    }
                    var ret = ScriptableObject.CreateInstance(arg_type);
                    return Values.js_push_classvalue(ctx, ret);
                }

                throw new NotImplementedException();
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        public static JSValue js_create_instance(JSContext ctx, JSValue ctor, Type type)
        {
            if (JSApi.JS_IsConstructor(ctx, ctor) == 1)
            {
                var header = JSApi.jsb_get_payload_header(ctx, ctor);
                if (header.type_id == BridgeObjectType.None) // it's a plain js value
                {
                    var typeDB = ScriptEngine.GetTypeDB(ctx);
                    if (!typeDB.IsConstructorEquals(type, ctor))
                    {
                        Type bridgeType = null;
                        if (type == typeof(UnityEditor.EditorWindow))
                        {
                            bridgeType = typeof(JSEditorWindow);
                        }
                        else if (type == typeof(ScriptableObject))
                        {
                            bridgeType = typeof(JSScriptableObject);
                        }
                        else if (type == typeof(MonoBehaviour))
                        {
                            bridgeType = typeof(JSBehaviourFull);
                        }
                        
                        if (bridgeType != null)
                        {
                            var scriptableObject = (IScriptInstancedObject)ScriptableObject.CreateInstance(bridgeType);
                            var bridgeValue = scriptableObject.SetScriptInstance(ctx, ctor, false);

                            if (!bridgeValue.IsUndefined())
                            {
                                return bridgeValue;
                            }

                            scriptableObject.ReleaseScriptInstance();
                            Object.DestroyImmediate((Object)scriptableObject);
                            return JSApi.JS_NULL;
                        }
                    }
                }
            }

            // fallthrough
            return JSApi.JS_UNDEFINED;
        }
    }
}

#endif // !JSB_UNITYLESS
#endif // UNITY_EDITOR