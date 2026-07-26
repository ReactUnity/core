using QuickJS.Native;

namespace QuickJS
{
    /// <summary>
    /// ScriptValue holds a strong reference of js value, so it relies on C# object finalizer (or the runtime managed object cache) to release.
    /// Directly creating a ScriptValue instance outside is not allowed, use js_get_classvalue(ctx, val, out scriptValue) if you want to get a ScriptValue instance from a JSValue.
    /// </summary>
    public sealed class ScriptValue : GCObject, Utils.IWeakMapEntry
    {
        private /*readonly*/ JSValue _jsValue;

        internal ScriptValue(ScriptContext context, JSValue jsValue)
        : base(context)
        {
            _jsValue = jsValue;
            JSApi.JS_DupValue(context, jsValue);
            context.GetObjectCache().AddScriptValue(_jsValue, this);
        }

        public static implicit operator JSValue(ScriptValue value)
        {
            return value._jsValue;
        }

        protected override void OnDisposing(ScriptContext context)
        {
            var jsValue = _jsValue;
            _jsValue = JSApi.JS_UNDEFINED;
            context.GetRuntime().FreeScriptValue(jsValue);
        }

        public override int GetHashCode()
        {
            return _jsValue.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            if (obj is ScriptValue)
            {
                var other = (ScriptValue)obj;
                return other._jsValue == _jsValue;
            }

            if (obj is JSValue)
            {
                var other = (JSValue)obj;
                return other == _jsValue;
            }

            return false;
        }

        public T GetProperty<T>(string key)
        {
            var ctx = (JSContext)this;
            var propVal = JSApi.JS_GetPropertyStr(ctx, _jsValue, key);
            if (propVal.IsException())
            {
                var ex = ctx.GetExceptionString();
                throw new JSException(ex);
            }

            object o;
            if (Binding.Values.js_get_var(ctx, propVal, typeof(T), out o))
            {
                JSApi.JS_FreeValue(ctx, propVal);
                return (T)o;
            }
            JSApi.JS_FreeValue(ctx, propVal);
            throw new JSException("invalid cast");
        }

        public void SetProperty(string key, object value)
        {
            var context = GetContext();
            var key_atom = context.GetAtom(key);
            var ctx = (JSContext)context;
            var jsValue = Binding.Values.js_push_var(ctx, value);
            JSApi.JS_SetProperty(ctx, _jsValue, key_atom, jsValue);
        }

        public override string ToString()
        {
            var context = GetContext();
            if (context == null)
            {
                return null;
            }
            return JSApi.GetString(context, _jsValue);
        }

        public string JSONStringify()
        {
            var ctx = (JSContext)this;
            if (ctx == JSContext.Null)
            {
                return null;
            }
            var rval = JSApi.JS_JSONStringify(ctx, _jsValue, JSApi.JS_UNDEFINED, JSApi.JS_UNDEFINED);
            var str = JSApi.GetString(ctx, rval);
            JSApi.JS_FreeValue(ctx, rval);
            return str;
        }
    }
}
