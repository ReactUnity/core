using System;
using System.Reflection;
using System.Collections.Generic;

namespace QuickJS.Binding
{
    using Native;

    // collect all built-in js-cs conversion helper methods
    public partial class Values
    {
        // cast js value to csharp value 
        // TypeCastGet ~ get/rebind: bool js_get_*(JSContext ctx, JSValue val, out T o);
        public static Dictionary<Type, MethodInfo> _JSCastMap = new Dictionary<Type, MethodInfo>();

        // replace the js value reference with another csharp value (for struct)
        public static Dictionary<Type, MethodInfo> _JSRebindMap = new Dictionary<Type, MethodInfo>();

        // cast csharp value to js value
        // TypeCastPush ~ push: JSValue js_push_primitive(JSContext ctx, T o)
        public static Dictionary<Type, MethodInfo> _CSCastMap = new Dictionary<Type, MethodInfo>();

        // construct a js value with given csharp value
        // TypeCastNew ~ new: JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, T o, int type_id, bool disposable)
        public static Dictionary<Type, MethodInfo> _JSNewMap = new Dictionary<Type, MethodInfo>();

        public delegate bool TypeCastGet<T>(JSContext ctx, JSValue val, out T o);

        public delegate JSValue TypeCastPush<T>(JSContext ctx, T o);

        public delegate JSValue TypeCastNew<T>(JSContext ctx, JSValue new_target, T o, int type_id, bool disposable);

        private static void init_cast_map()
        {
            var methods = typeof(Values).GetMethods();
            for (int i = 0, len = methods.Length; i < len; ++i)
            {
                register_type_caster(methods[i]);
            }
        }

        public static bool register_type_caster<T>(TypeCastGet<T> fn)
        {
            return register_type_caster(fn.Method);
        }

        public static bool register_type_caster<T>(TypeCastPush<T> fn)
        {
            return register_type_caster(fn.Method);
        }

        public static bool register_type_caster<T>(TypeCastNew<T> fn)
        {
            return register_type_caster(fn.Method);
        }

        public static bool register_type_caster(MethodInfo method)
        {
            if (!method.IsGenericMethodDefinition && method.IsStatic && method.IsPublic)
            {
                var parameters = method.GetParameters();

                if (parameters.Length < 2 || parameters[0].ParameterType != typeof(JSContext))
                {
                    return false;
                }

                if (parameters.Length == 5)
                {
                    if (parameters[1].ParameterType == typeof(JSValue))
                    {
                        // JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, T o, int type_id, bool disposable)
                        if (method.Name == "NewBridgeClassObject")
                        {
                            var type = parameters[2].ParameterType;
                            _JSNewMap[type] = method;
                            return true;
                        }
                    }
                }
                else if (parameters.Length == 3)
                {
                    // should only collect the method name with the expected signature, 
                    // bool js_get_*(JSContext ctx, JSValue val, out T o);
                    if (parameters[2].ParameterType.IsByRef && parameters[1].ParameterType == typeof(JSValue))
                    {
                        var type = parameters[2].ParameterType.GetElementType();
                        switch (method.Name)
                        {
                            case "js_rebind_this":
                                _JSRebindMap[type] = method;
                                return true;
                            case "js_get_primitive":
                            case "js_get_structvalue":
                            case "js_get_classvalue":
                                _JSCastMap[type] = method;
                                return true;
                        }
                    }
                }
                else if (parameters.Length == 2)
                {
                    // JSValue js_push_primitive(JSContext ctx, T o)
                    if (method.Name.StartsWith("js_push_"))
                    {
                        var type = parameters[1].ParameterType;

                        _CSCastMap[type] = method;
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool js_rebind_var(JSContext ctx, JSValue this_obj, Type type, object o)
        {
            MethodInfo method;
            if (_JSRebindMap.TryGetValue(type, out method))
            {
                var parameters = new object[3] { ctx, this_obj, o };
                return (bool)method.Invoke(o, parameters);
            }
            return false;
        }

        /// <summary>
        /// convert csharp object `o` to jsvalue with o.GetType()
        /// NOTE: auto conversion to JS Array is deliberately ignored to avoid unnecessary gc alloc. 
        ///       jsb.ToArray() is available to use to convert a C# Array to JS Array. 
        /// Type conversions will be processed by _CSCastMap. 
        /// ScriptValue is processed in Values_push_class.cs => public static JSValue js_push_classvalue(JSContext ctx, ScriptValue o)
        /// JSValue is processed in Values_push_primitive.cs => public static JSValue js_push_primitive(JSContext ctx, JSValue o)
        /// </summary>
        public static JSValue js_push_var(JSContext ctx, object o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }

            var type = o.GetType();

            if (type.IsEnum)
            {
                return js_push_primitive(ctx, Convert.ToInt32(o));
            }

            MethodInfo cast;
            do
            {
                if (_CSCastMap.TryGetValue(type, out cast))
                {
                    var parameters = new object[2] { ctx, o };
                    var rval = (JSValue)cast.Invoke(null, parameters);
                    return rval;
                }
                type = type.BaseType;
            } while (type != null);

            //NOTE: 2. fallthrough, push as object
            return js_push_classvalue(ctx, o);
        }

        public static JSValue js_new_var(JSContext ctx, JSValue new_target, Type type, object o, int type_id, bool disposable)
        {
            // most of NewBridgeClassObject are overrided for struct-type, no need to traverse their BaseType
            // all class-type can be directly tackled as 'object'
            MethodInfo cast;
            if (_JSNewMap.TryGetValue(type, out cast))
            {
                var parameters = new object[5] { ctx, new_target, o, type_id, disposable };
                var rval = (JSValue)cast.Invoke(null, parameters);
                return rval;
            }

            return NewBridgeClassObject(ctx, new_target, o, type_id, disposable);
        }

        /// <summary>
        /// Converts js value to C# object without giving C# type information.
        /// It will try to convert by the type of the js value.
        /// </summary>
        public static bool js_get_var(JSContext ctx, JSValue val, out object o)
        {
            return GetObjectFallthrough(ctx, val, out o);
        }

        public static bool js_get_var(JSContext ctx, JSValue val, out object[] o)
        {
            if (JSApi.JS_IsArray(ctx, val) == 1)
            {
                var lengthVal = JSApi.JS_GetProperty(ctx, val, JSApi.JS_ATOM_length);
                if (JSApi.JS_IsException(lengthVal))
                {
                    o = null;
                    return WriteScriptError(ctx);
                }

                int length;
                JSApi.JS_ToInt32(ctx, out length, lengthVal);
                JSApi.JS_FreeValue(ctx, lengthVal);
                var array = new object[length];
                for (var i = 0U; i < length; i++)
                {
                    var eVal = JSApi.JS_GetPropertyUint32(ctx, val, i);
                    object e;
                    if (js_get_var(ctx, eVal, out e))
                    {
                        array.SetValue(e, i);
                        JSApi.JS_FreeValue(ctx, eVal);
                    }
                    else
                    {
                        o = null;
                        JSApi.JS_FreeValue(ctx, eVal);
                        return false;
                    }
                }
                o = array;
                return true;
            }

            return GetObjectFallthrough(ctx, val, out o);
        }

        /// <summary>
        /// Converts a js value to C# object with the given type.
        /// NOTE: js_get_primitive/structvalue/classvalue() are perfered to use when object type is known at compile-time.
        /// This method is primarily used when compile-time inference isn't possible.
        /// </summary>
        /// <param name="val">Source js value to convert</param>
        /// <param name="type">Expected type of object o</param>
        /// <param name="o">target object converted from js value</param>
        public static bool js_get_var(JSContext ctx, JSValue val, Type type, out object o)
        {
            if (val.IsNullish() || type == typeof(void))
            {
                o = null;
                return true;
            }

            if (type.BaseType == typeof(MulticastDelegate))
            {
                Delegate d;
                var rs = js_get_delegate(ctx, val, type, out d);
                o = d;
                return rs;
            }

            var lookupType = type;
            MethodInfo cast;
            while (lookupType != null && lookupType != typeof(object))
            {
                if (_JSCastMap.TryGetValue(lookupType, out cast))
                {
                    var parameters = new object[3] { ctx, val, null };
                    var rval = (bool)cast.Invoke(null, parameters);
                    o = parameters[2];
                    return rval;
                }
                lookupType = lookupType.BaseType;
            }

            if (type.IsArray)
            {
                if (type.GetArrayRank() == 1 && JSApi.JS_IsArray(ctx, val) == 1)
                {
                    var lengthVal = JSApi.JS_GetProperty(ctx, val, JSApi.JS_ATOM_length);
                    if (JSApi.JS_IsException(lengthVal))
                    {
                        o = null;
                        return WriteScriptError(ctx);
                    }

                    var elementType = type.GetElementType();
                    int length;
                    JSApi.JS_ToInt32(ctx, out length, lengthVal);
                    JSApi.JS_FreeValue(ctx, lengthVal);
                    var array = Array.CreateInstance(elementType, length);
                    for (var i = 0U; i < length; i++)
                    {
                        var eVal = JSApi.JS_GetPropertyUint32(ctx, val, i);
                        object e;
                        if (js_get_var(ctx, eVal, elementType, out e))
                        {
                            array.SetValue(e, i);
                            JSApi.JS_FreeValue(ctx, eVal);
                        }
                        else
                        {
                            o = null;
                            JSApi.JS_FreeValue(ctx, eVal);
                            return false;
                        }
                    }
                    o = array;
                    return true;
                }
            }

            if (type.IsEnum)
            {
                return js_get_enumvalue(ctx, val, type, out o);
            }

            if (val.IsString())
            {
                if (type.IsAssignableFrom(typeof(string)))
                {
                    string t;
                    var r = js_get_primitive(ctx, val, out t);
                    o = t;
                    return r;
                }
                o = null;
                return false;
            }

            if (val.IsBoolean())
            {
                if (type.IsAssignableFrom(typeof(bool)))
                {
                    bool t;
                    var r = js_get_primitive(ctx, val, out t);
                    o = t;
                    return r;
                }
                o = null;
                return false;
            }

            if (val.IsNumber())
            {
                if (type.IsAssignableFrom(typeof(double)))
                {
                    double t;
                    var r = js_get_primitive(ctx, val, out t);
                    o = t;
                    return r;
                }
                o = null;
                return false;
            }

            if (js_get_cached_object(ctx, val, out o))
            {
                return true;
            }

            if (type == typeof(object))
            {
                var targetType = typeof(object);

                // Detect value type and convert to it
                var header = JSApi.jsb_get_payload_header(ctx, val);

                if (header.type_id != BridgeObjectType.None)
                {
                    var context = ScriptEngine.GetContext(ctx);
                    var type_id = JSApi.JSB_GetBridgeType(ctx, val, context.GetAtom(Values.KeyForCSharpTypeID));
                    if (type_id > 0)
                    {
                        var types = context.GetTypeDB();
                        var t = types.GetType(type_id);

                        if (t != null)
                        {
                            targetType = t;
                        }
                    }
                }

                if (_JSCastMap.TryGetValue(targetType, out cast))
                {
                    var parameters = new object[3] { ctx, val, null };
                    var rval = (bool)cast.Invoke(null, parameters);
                    o = parameters[2];
                    return rval;
                }
            }

            o = null;
            return false;
        }
    }
}
