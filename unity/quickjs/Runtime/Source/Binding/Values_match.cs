using System;
using System.Reflection;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    // 处理类型匹配
    public partial class Values
    {
        public static bool js_read_wrap(JSContext ctx, JSValue jsValue, out JSValue realValue)
        {
            if (jsValue.IsNullish())
            {
                realValue = jsValue;
                return true;
            }

            var context = ScriptEngine.GetContext(ctx);
            realValue = JSApi.JS_GetProperty(ctx, jsValue, context.GetAtom("value"));
            return !realValue.IsException();
        }

        public static JSValue js_read_wrap(JSContext ctx, JSValue jsValue)
        {
            if (jsValue.IsNullish())
            {
                return jsValue;
            }

            var context = ScriptEngine.GetContext(ctx);
            return JSApi.JS_GetProperty(ctx, jsValue, context.GetAtom("value"));
        }

        // guess real type in Ref<T> / Out<T>
        public static bool js_match_type_hint(JSContext ctx, JSValue jsValue, Type type)
        {
            if (jsValue.IsNullish())
            {
                return false;
            }

            var context = ScriptEngine.GetContext(ctx);
            var jsHintType = JSApi.JS_GetProperty(ctx, jsValue, context.GetAtom("type"));
            if (jsHintType.IsNullish())
            {
                return true;
            }

            var rs = js_match_type(ctx, jsHintType, type);
            JSApi.JS_FreeValue(ctx, jsHintType);
            return rs;
        }

        public static bool js_match_type(JSContext ctx, JSValue jsValue, Type type)
        {
            if (type == null)
            {
                return true;
            }
            if (type == typeof(object))
            {
                return true;
            }
            if (type == typeof(Type)) 
            {
                Type otype;
                // just check if the value is a type without comparing since what expected is a type of Type itself
                return js_get_classvalue(ctx, jsValue, out otype); 
            }

            if (JSApi.JS_IsObject(jsValue))
            {
                if (type == typeof(ScriptFunction) || type.BaseType == typeof(MulticastDelegate))
                {
                    return JSApi.JS_IsFunction(ctx, jsValue) == 1;
                }

                var context = ScriptEngine.GetContext(ctx);
                var type_id = JSApi.JSB_GetBridgeType(ctx, jsValue, context.GetAtom(Values.KeyForCSharpTypeID));
                if (type_id > 0)
                {
                    var types = context.GetTypeDB();
                    var o = types.GetType(type_id);
                    // UnityEngine.Debug.Log($"get type from exported registry {o}:{type_id} expected:{type}");
                    return o != null && (o == type || type.IsAssignableFrom(o));
                }

                var header = JSApi.jsb_get_payload_header(ctx, jsValue);
                switch (header.type_id)
                {
                    case BridgeObjectType.ObjectRef:
                        {
                            var cache = ScriptEngine.GetObjectCache(ctx);
                            return cache.MatchObjectType(header.value, type);
                        }
                    case BridgeObjectType.TypeRef:
                        {
                            return type == typeof(Type);
                        }
                    case BridgeObjectType.ValueType:
                        {
                            break;
                        }
                    default: // plain js object?
                        {
                            if (type.IsValueType)
                            {
                                if (type.IsPrimitive || type.IsEnum)
                                {
                                    return context.CheckNumberType(jsValue);
                                }
                            }
                            else if (type == typeof(string))
                            {
                                return context.CheckStringType(jsValue);
                            }

                            break;
                        }
                }

                if (type.IsArray)
                {
                    return JSApi.JS_IsArray(ctx, jsValue) == 1;
                }

                return type.IsSubclassOf(typeof(ScriptValue));
            }

            if (jsValue.IsNullish())
            {
                return !type.IsValueType && !type.IsPrimitive;
            }

            if (jsValue.IsBoolean())
            {
                return type == typeof(bool);
            }

            if (jsValue.IsString())
            {
                return type == typeof(string);
            }

            if (jsValue.IsNumber())
            {
                if (type.IsEnum || type.IsPrimitive)
                {
                    return true;
                }

                return false;
            }

            if (type == typeof(byte[]))
            {
                size_t psize;
                var ptr = JSApi.JS_GetArrayBuffer(ctx, out psize, jsValue);
                if (ptr != IntPtr.Zero)
                {
                    return true;
                }

                var asBuffer = JSApi.JS_GetProperty(ctx, jsValue, ScriptEngine.GetContext(ctx).GetAtom("buffer"));
                if (asBuffer.IsObject())
                {
                    ptr = JSApi.JS_GetArrayBuffer(ctx, out psize, asBuffer);
                    JSApi.JS_FreeValue(ctx, asBuffer);
                    return ptr != IntPtr.Zero;
                }
                else
                {
                    JSApi.JS_FreeValue(ctx, asBuffer);
                }
            }

            return false;
        }

        // 检查变参参数
        // offset: 从偏移处开始为变参
        public static bool js_match_param_types(JSContext ctx, int offset, JSValue[] argv, Type type)
        {
            var nargs = argv.Length;
            for (var i = offset; i < nargs; i++)
            {
                if (!js_match_type(ctx, argv[i], type))
                {
                    return false;
                }
            }

            return true;
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0)
        {
            return js_match_type(ctx, argv[0], t0);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1, Type t2)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1) && js_match_type(ctx, argv[2], t2);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1, Type t2, Type t3)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1) && js_match_type(ctx, argv[2], t2) && js_match_type(ctx, argv[3], t3);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1, Type t2, Type t3, Type t4)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1) && js_match_type(ctx, argv[2], t2) && js_match_type(ctx, argv[3], t3) && js_match_type(ctx, argv[4], t4);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1, Type t2, Type t3, Type t4, Type t5)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1) && js_match_type(ctx, argv[2], t2) && js_match_type(ctx, argv[3], t3) && js_match_type(ctx, argv[4], t4) && js_match_type(ctx, argv[5], t5);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, Type t0, Type t1, Type t2, Type t3, Type t4, Type t5, Type t6)
        {
            return js_match_type(ctx, argv[0], t0) && js_match_type(ctx, argv[1], t1) && js_match_type(ctx, argv[2], t2) && js_match_type(ctx, argv[3], t3) && js_match_type(ctx, argv[4], t4) && js_match_type(ctx, argv[5], t5) && js_match_type(ctx, argv[6], t6);
        }

        public static bool js_match_types(JSContext ctx, JSValue[] argv, params Type[] types)
        {
            for (int i = 0, size = types.Length; i < size; i++)
            {
                if (!js_match_type(ctx, argv[i], types[i]))
                {
                    return false;
                }
            }

            return true;
        }

        public static bool js_match_parameters(JSContext ctx, JSValue[] argv, ParameterInfo[] parameterInfos)
        {
            for (int i = 0, size = parameterInfos.Length; i < size; i++)
            {
                var parameterInfo = parameterInfos[i];
                var pType = parameterInfo.ParameterType;

                if (i >= argv.Length)
                {
                    if (!parameterInfo.IsOptional)
                    {
                        return false;
                    }
                    continue;
                }

                if (pType.IsByRef)
                {
                    if (!js_match_type_hint(ctx, argv[i], pType.GetElementType()))
                    {
                        return false;
                    }
                }
                else
                {
                    if (!js_match_type(ctx, argv[i], pType))
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        public static bool js_match_parameters_vararg(JSContext ctx, int argc, JSValue[] argv, ParameterInfo[] parameterInfos)
        {
            var size = parameterInfos.Length - 1;
            if (argc < size)
            {
                return false;
            }
            for (var i = 0; i < size; i++)
            {
                var parameterInfo = parameterInfos[i];
                var pType = parameterInfo.ParameterType;
                if (pType.IsByRef)
                {
                    if (!js_match_type_hint(ctx, argv[i], pType.GetElementType()))
                    {
                        return false;
                    }
                }
                else
                {
                    if (!js_match_type(ctx, argv[i], pType))
                    {
                        return false;
                    }
                }
            }

            var varArgType = parameterInfos[size].ParameterType.GetElementType();
            for (var i = size; i < argc; i++)
            {
                if (!js_match_type(ctx, argv[i], varArgType))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
