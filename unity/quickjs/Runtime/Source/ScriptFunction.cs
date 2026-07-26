using System;
using QuickJS.Native;

namespace QuickJS
{
    public class ScriptFunction : GCObject, Utils.Invokable
    {
        private JSValue _fnValue;
        private JSValue _thisValue;
        private JSValue[] _args;

        public ScriptFunction(ScriptContext context, JSValue fnValue)
            : base(context)
        {
            _fnValue = JSApi.JS_DupValue(context, fnValue);
            _thisValue = JSApi.JS_UNDEFINED;
        }

        public ScriptFunction(ScriptContext context, JSValue fnValue, JSValue thisValue)
            : base(context)
        {
            _fnValue = JSApi.JS_DupValue(context, fnValue);
            _thisValue = JSApi.JS_DupValue(context, thisValue);
        }

        public ScriptFunction(ScriptContext context, JSValue fnValue, JSValue thisValue, JSValue[] args)
            : base(context)
        {
            var ctx = (JSContext)context;
            _fnValue = JSApi.JS_DupValue(context, fnValue);
            _thisValue = JSApi.JS_DupValue(context, thisValue);
            _args = args;
            for (int i = 0, count = _args.Length; i < count; i++)
            {
                JSApi.JS_DupValue(ctx, _args[i]);
            }
        }

        public void SetBound(JSValue thisValue)
        {
            var ctx = (JSContext)this;
            JSApi.JS_FreeValue(ctx, _thisValue);
            _thisValue = JSApi.JS_DupValue(ctx, thisValue);
        }

        public unsafe void SetArguments(int offset, int size, JSValue[] values)
        {
            fixed (JSValue* ptr = values)
            {
                SetArguments(offset, size, ptr);
            }
        }

        public unsafe void SetArguments(int offset, int size, JSValue* values)
        {
            var ctx = (JSContext)this;
            
            if (_args != null)
            {
                JSApi.JS_FreeValue(ctx, _args);
            }

            if (size > 0)
            {
                _args = new JSValue[size];
                for (var i = 0; i < size; ++i)
                {
                    _args[i] = JSApi.JS_DupValue(ctx, values[offset + i]);
                }
            }
            else
            {
                _args = null;
            }
        }

        public static implicit operator JSValue(ScriptFunction value)
        {
            return value != null ? value._fnValue : JSApi.JS_UNDEFINED;
        }

        protected override void OnDisposing(ScriptContext context)
        {
            var fnValue = _fnValue;
            var thisValue = _thisValue;
            var args = _args;

            _fnValue = JSApi.JS_UNDEFINED;
            _thisValue = JSApi.JS_UNDEFINED;
            _args = null;

            context.FreeValue(fnValue);
            context.FreeValue(thisValue);
            context.FreeValues(args);
        }

        public unsafe void Invoke()
        {
            Invoke(typeof(void));
        }

        public unsafe T Invoke<T>()
        {
            return (T)Invoke(typeof(T));
        }

        private unsafe object Invoke(Type resultType)
        {
            var ctx = (JSContext)this;
            if (ctx == JSContext.Null)
            {
                return null;
            }

            var argc = _args == null ? 0 : _args.Length;
            fixed (JSValue* ptr = _args)
            {
                var rVal = JSApi.JS_Call(ctx, _fnValue, _thisValue, argc, ptr);
                if (JSApi.JS_IsException(rVal))
                {
                    var ex = ctx.GetExceptionString();
                    throw new JSException(ex);
                }

                object resultObject = null;
                Binding.Values.js_get_var(ctx, rVal, resultType, out resultObject);
                JSApi.JS_FreeValue(ctx, rVal);
                return resultObject;
            }
        }

        public void Invoke(object arg1)
        {
            Invoke(typeof(void), arg1);
        }

        public T Invoke<T>(object arg1)
        {
            return (T)Invoke(typeof(T), arg1);
        }

        public unsafe object Invoke(Type resultType, object arg1)
        {
            var ctx = (JSContext)this;
            if (ctx == JSContext.Null)
            {
                return null;
            }

            var val = Binding.Values.js_push_var(ctx, arg1);
            var args = stackalloc[] { val };
            var rVal = _Invoke(ctx, 1, args);
            if (JSApi.JS_IsException(rVal))
            {
                var ex = ctx.GetExceptionString();
                JSApi.JS_FreeValue(ctx, val);
                throw new JSException(ex);
            }
            object rObj = null;
            Binding.Values.js_get_var(ctx, rVal, resultType, out rObj);
            JSApi.JS_FreeValue(ctx, rVal);
            JSApi.JS_FreeValue(ctx, val);
            return rObj;
        }

        public void Invoke(params object[] parameters)
        {
            Invoke(typeof(void), parameters);
        }

        public T Invoke<T>(params object[] parameters)
        {
            return (T)Invoke(typeof(T), parameters);
        }

        public unsafe object Invoke(Type resultType, params object[] parameters)
        {
            var ctx = (JSContext)this;
            if (ctx == JSContext.Null)
            {
                return null;
            }

            var count = parameters.Length;
            var args = stackalloc JSValue[count];
            for (var i = 0; i < count; i++)
            {
                args[i] = Binding.Values.js_push_var(ctx, parameters[i]);
            }
            var rVal = _Invoke(ctx, count, args);
            if (JSApi.JS_IsException(rVal))
            {
                var ex = ctx.GetExceptionString();
                JSApi.JS_FreeValue(ctx, count, args);
                throw new JSException(ex);
            }
            object rObj = null;
            Binding.Values.js_get_var(ctx, rVal, resultType, out rObj);
            JSApi.JS_FreeValue(ctx, rVal);
            JSApi.JS_FreeValue(ctx, count, args);
            return rObj;
        }

        // unsafe primitive call, will not change ref count of jsvalue in argv
        public unsafe JSValue _Invoke(JSContext ctx, int argc, JSValue* argv)
        {
            var rVal = JSApi.JS_Call(ctx, _fnValue, _thisValue, argc, argv);
            return rVal;
        }
    }
}