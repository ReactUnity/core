using System;
using System.Reflection;
using QuickJS.Native;

namespace QuickJS.Binding
{
    public interface IDynamicMethod
    {
        JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv);
    }

    public abstract class DynamicMethodBase : IDynamicMethod
    {
        public abstract int GetParameterCount();

        public abstract bool CheckArgs(JSContext ctx, int argc, JSValue[] argv);

        public abstract JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv);
    }

    /// <summary>
    /// primitive JSCFunction
    /// </summary>
    public class DynamicPrimitiveMethod : DynamicMethodBase
    {
        private MethodBase _methodInfo;

        public DynamicPrimitiveMethod(DynamicType type, MethodBase methodInfo)
        {
            _methodInfo = methodInfo;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            //TODO: args check 
            return true;
        }

        public override int GetParameterCount()
        {
            return 0;
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            var rval = _methodInfo.Invoke(null, new object[] { ctx, this_obj, argc, argv });
            return (JSValue)rval;
        }
    }

    public static class DynamicMethodFactory
    {
        public static DynamicMethodBase CreateMethod(DynamicType type, MethodInfo methodInfo, bool asExtensionAnyway)
        {
            if (Values.IsVarargParameter(methodInfo.GetParameters()))
            {
                return new DynamicVariadicMethod(type, methodInfo, asExtensionAnyway);
            }
            return new DynamicMethod(type, methodInfo, asExtensionAnyway);
        }
    }

    public class DynamicMethod : DynamicMethodBase
    {
        private DynamicType _type;
        private bool _isExtension;
        private MethodInfo _methodInfo;

        private ParameterInfo[] _inputParameters;
        private ParameterInfo[] _methodParameters;

        public DynamicMethod(DynamicType type, MethodInfo methodInfo, bool asExtensionAnyway)
        {
            _type = type;
            _isExtension = asExtensionAnyway;
            _methodInfo = methodInfo;
            _methodParameters = _methodInfo.GetParameters();

            var paramStartIndex = _isExtension ? 1 : 0;
            var argIndex = 0;
            for (var i = paramStartIndex; i < _methodParameters.Length; i++)
            {
                var p = _methodParameters[i];
                if (!Values.IsContextualType(p.ParameterType))
                {
                    argIndex++;
                }
            }
            _inputParameters = new ParameterInfo[argIndex];
            argIndex = 0;
            for (var i = paramStartIndex; i < _methodParameters.Length; i++)
            {
                var p = _methodParameters[i];
                if (!Values.IsContextualType(p.ParameterType))
                {
                    _inputParameters[argIndex++] = p;
                }
            }
        }

        public override int GetParameterCount()
        {
            return _inputParameters.Length;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            if (_inputParameters.Length != argc)
            {
                return false;
            }

            return Values.js_match_parameters(ctx, argv, _inputParameters);
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            if (!_methodInfo.IsPublic && !_type.privateAccess)
            {
                return ctx.ThrowInternalError("method is inaccessible due to its protection level");
            }
            object self = null;
            if (_isExtension || !_methodInfo.IsStatic)
            {
                if (!Values.js_get_var(ctx, this_obj, _type.type, out self) || !_type.CheckThis(self))
                {
                    throw new ThisBoundException();
                }
            }
            var nArgs = _methodParameters.Length;
            var requiredArgNum = nArgs;
            var args = new object[nArgs];
            var argvIndex = 0;
            var paramIndex = 0;
            var bBackValues = false;

            if (_isExtension)
            {
                args[paramIndex++] = self;
                --requiredArgNum;
            }
            for (; paramIndex < nArgs; paramIndex++)
            {
                var parameterInfo = _methodParameters[paramIndex];
                var pType = parameterInfo.ParameterType;
                if (Values.IsContextualType(pType))
                {
                    args[paramIndex] = Values.GetContext(ctx, pType);
                }
                else
                {
                    if (pType.IsByRef)
                    {
                        bBackValues = true;
                        if (!parameterInfo.IsOut)
                        {
                            JSValue realArgValue;
                            if (!Values.js_read_wrap(ctx, argv[argvIndex], out realArgValue))
                            {
                                return realArgValue;
                            }
                            if (!Values.js_get_var(ctx, realArgValue, pType.GetElementType(), out args[paramIndex]))
                            {
                                JSApi.JS_FreeValue(ctx, realArgValue);
                                return ctx.ThrowInternalError($"failed to cast val byref #{argvIndex}");
                            }
                            JSApi.JS_FreeValue(ctx, realArgValue);
                        }
                    }
                    else
                    {
                        if (argvIndex >= argv.Length)
                        {
                            args[paramIndex] = null;
                        }
                        else if (!Values.js_get_var(ctx, argv[argvIndex], pType, out args[paramIndex]))
                        {
                            return ctx.ThrowInternalError($"failed to cast val #{argvIndex}");
                        }
                    }
                    argvIndex++;
                }
            }

            var ret = _methodInfo.Invoke(_isExtension ? null : self, args);

            if (bBackValues)
            {
                argvIndex = 0;
                for (var i = 0; i < nArgs; i++)
                {
                    var parameterInfo = _methodParameters[i];
                    var pType = parameterInfo.ParameterType;
                    if (!Values.IsContextualType(pType))
                    {
                        if (pType.IsByRef)
                        {
                            var backValue = Values.js_push_var(ctx, args[i]);
                            var valueAtom = ScriptEngine.GetContext(ctx).GetAtom("value");
                            JSApi.JS_SetProperty(ctx, argv[argvIndex], valueAtom, backValue);
                        }

                        argvIndex++;
                    }
                }
            }

            if (_type.type.IsValueType && !_methodInfo.IsStatic)
            {
                Values.js_rebind_var(ctx, this_obj, _type.type, self);
            }

            if (_methodInfo.ReturnType != typeof(void))
            {
                return Values.js_push_var(ctx, ret);
            }

            return JSApi.JS_UNDEFINED;
        }
    }

    public class DynamicVariadicMethod : DynamicMethodBase
    {
        private DynamicType _type;
        private bool _isExtension;
        private MethodInfo _methodInfo;

        private ParameterInfo[] _inputParameters;
        private ParameterInfo[] _methodParameters;

        public DynamicVariadicMethod(DynamicType type, MethodInfo methodInfo, bool asExtensionAnyway)
        {
            _type = type;
            _isExtension = asExtensionAnyway;
            _methodInfo = methodInfo;
            _methodParameters = _methodInfo.GetParameters();
            // _isVarargMethod = Values.IsVarargParameter(_methodParameters);

            var paramStartIndex = _isExtension ? 1 : 0;
            var argIndex = 0;
            for (var i = paramStartIndex; i < _methodParameters.Length; i++)
            {
                var p = _methodParameters[i];
                if (!Values.IsContextualType(p.ParameterType))
                {
                    argIndex++;
                }
            }
            _inputParameters = new ParameterInfo[argIndex];
            argIndex = 0;
            for (var i = paramStartIndex; i < _methodParameters.Length; i++)
            {
                var p = _methodParameters[i];
                if (!Values.IsContextualType(p.ParameterType))
                {
                    _inputParameters[argIndex++] = p;
                }
            }
        }

        public override int GetParameterCount()
        {
            return _inputParameters.Length;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            if (_inputParameters.Length - 1 > argc)
            {
                return false;
            }

            return Values.js_match_parameters_vararg(ctx, argc, argv, _inputParameters);
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            if (!_methodInfo.IsPublic && !_type.privateAccess)
            {
                return ctx.ThrowInternalError("method is inaccessible due to its protection level");
            }
            object self = null;
            if (_isExtension || !_methodInfo.IsStatic)
            {
                if (!Values.js_get_var(ctx, this_obj, _type.type, out self) || !_type.CheckThis(self))
                {
                    throw new ThisBoundException();
                }
            }
            var nArgs = _methodParameters.Length;
            var requiredArgNum = nArgs;
            var args = new object[nArgs];
            var argvIndex = 0;
            var paramIndex = 0;
            var bBackValues = false;

            if (_isExtension)
            {
                args[paramIndex++] = self;
                --requiredArgNum;
            }
            for (; paramIndex < nArgs; paramIndex++)
            {
                var parameterInfo = _methodParameters[paramIndex];
                var pType = parameterInfo.ParameterType;
                if (Values.IsContextualType(pType))
                {
                    args[paramIndex] = Values.GetContext(ctx, pType);
                }
                else
                {
                    if (/*_isVarargMethod && */paramIndex == nArgs - 1)
                    {
                        var varArgLength = argc - requiredArgNum + 1;
                        var varArgType = pType.GetElementType();
                        var varArgArray = Array.CreateInstance(varArgType, varArgLength);
                        for (var varArgIndex = 0; varArgIndex < varArgLength; varArgIndex++)
                        {
                            object varArgElement = null;
                            if (!Values.js_get_var(ctx, argv[argvIndex++], varArgType, out varArgElement))
                            {
                                return ctx.ThrowInternalError($"failed to cast val vararg #{varArgIndex}");
                            }
                            varArgArray.SetValue(varArgElement, varArgIndex);
                        }
                        args[paramIndex] = varArgArray;
                    }
                    else
                    {
                        if (pType.IsByRef)
                        {
                            bBackValues = true;
                            if (!parameterInfo.IsOut)
                            {
                                JSValue realArgValue;
                                if (!Values.js_read_wrap(ctx, argv[argvIndex], out realArgValue))
                                {
                                    return realArgValue;
                                }
                                if (!Values.js_get_var(ctx, realArgValue, pType.GetElementType(), out args[paramIndex]))
                                {
                                    JSApi.JS_FreeValue(ctx, realArgValue);
                                    return ctx.ThrowInternalError($"failed to cast val byref #{argvIndex}");
                                }
                                JSApi.JS_FreeValue(ctx, realArgValue);
                            }
                        }
                        else
                        {
                            if (!Values.js_get_var(ctx, argv[argvIndex], pType, out args[paramIndex]))
                            {
                                return ctx.ThrowInternalError($"failed to cast val #{argvIndex}");
                            }
                        }
                        argvIndex++;
                    }
                }
            }

            var ret = _methodInfo.Invoke(_isExtension ? null : self, args);

            if (bBackValues)
            {
                argvIndex = 0;
                for (var i = 0; i < nArgs; i++)
                {
                    var parameterInfo = _methodParameters[i];
                    var pType = parameterInfo.ParameterType;
                    if (!Values.IsContextualType(pType))
                    {
                        if (/*_isVarargMethod && */i == nArgs - 1)
                        {
                        }
                        else
                        {
                            if (pType.IsByRef)
                            {
                                var backValue = Values.js_push_var(ctx, args[i]);
                                var valueAtom = ScriptEngine.GetContext(ctx).GetAtom("value");
                                JSApi.JS_SetProperty(ctx, argv[argvIndex], valueAtom, backValue);
                            }

                            argvIndex++;
                        }
                    }
                }
            }

            if (_type.type.IsValueType && !_methodInfo.IsStatic)
            {
                Values.js_rebind_var(ctx, this_obj, _type.type, self);
            }

            if (_methodInfo.ReturnType != typeof(void))
            {
                return Values.js_push_var(ctx, ret);
            }

            return JSApi.JS_UNDEFINED;
        }
    }

    public class DynamicDelegateMethod : IDynamicMethod
    {
        private Delegate _delegate;

        public DynamicDelegateMethod(Delegate d)
        {
            _delegate = d;
        }

        public JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            var self = _delegate.Target;
            var methodInfo = _delegate.Method;
            var parameters = methodInfo.GetParameters();
            var nArgs = Math.Min(argc, parameters.Length);
            var args = new object[nArgs];
            for (var i = 0; i < nArgs; i++)
            {
                if (!Values.js_get_var(ctx, argv[i], parameters[i].ParameterType, out args[i]))
                {
                    return ctx.ThrowInternalError("failed to cast val");
                }
            }
            var ret = methodInfo.Invoke(self, args);

            if (methodInfo.ReturnType != typeof(void))
            {
                return Values.js_push_var(ctx, ret);
            }

            return JSApi.JS_UNDEFINED;
        }
    }

    public class DynamicCrossBindConstructor : DynamicMethodBase
    {
        public DynamicCrossBindConstructor()
        {
        }

        public override int GetParameterCount()
        {
            return 0;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            return true;
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            return JSApi.jsb_crossbind_constructor(ctx, this_obj);
        }
    }

    public class DynamicDefaultConstructor : DynamicMethodBase
    {
        private DynamicType _type;

        public DynamicDefaultConstructor(DynamicType type)
        {
            _type = type;
        }

        public override int GetParameterCount()
        {
            return 0;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            return true;
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            var inst = Activator.CreateInstance(_type.type);
            var val = Values.NewBridgeClassObject(ctx, this_obj, inst, _type.id, false);
            return val;
        }
    }

    public class DynamicConstructor : DynamicMethodBase
    {
        private DynamicType _type;
        private ConstructorInfo _ctor;
        private ParameterInfo[] _parameters;
        private bool _disposable;

        public DynamicConstructor(DynamicType type, ConstructorInfo ctor)
        : this(type, ctor, false)
        {
        }

        public DynamicConstructor(DynamicType type, ConstructorInfo ctor, bool disposable)
        {
            _type = type;
            _ctor = ctor;
            _parameters = _ctor.GetParameters();
            _disposable = disposable;
        }

        public override int GetParameterCount()
        {
            return _parameters.Length;
        }

        public override bool CheckArgs(JSContext ctx, int argc, JSValue[] argv)
        {
            if (_parameters.Length != argc)
            {
                return false;
            }

            return Values.js_match_parameters(ctx, argv, _parameters);
        }

        public override JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            if (!_ctor.IsPublic && !_type.privateAccess)
            {
                return ctx.ThrowInternalError("constructor is inaccessible due to its protection level");
            }

            var nArgs = Math.Min(argc, _parameters.Length);
            var args = new object[nArgs];
            for (var i = 0; i < nArgs; i++)
            {
                if (!Values.js_get_var(ctx, argv[i], _parameters[i].ParameterType, out args[i]))
                {
                    return ctx.ThrowInternalError("failed to cast val");
                }
            }

            var inst = _ctor.Invoke(args);
            var val = Values.js_new_var(ctx, this_obj, _type.type, inst, _type.id, _disposable);
            return val;
        }
    }

    public class DynamicMethodInvoke : IDynamicMethod
    {
        private JSCFunction _method;

        public DynamicMethodInvoke(JSCFunction method)
        {
            _method = method;
        }

        public JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            return _method.Invoke(ctx, this_obj, argc, argv);
        }
    }
}
