using System;
using QuickJS.Native;

namespace QuickJS
{
    public abstract class ScriptPromise : GCObject, Utils.IObjectCollectionEntry
    {
        private Utils.ObjectCollection.Handle _handle;

        private JSValue _promise;
        private JSValue _on_resolve;
        private JSValue _on_reject;

        public JSValue promiseValue => _promise;
        public JSValue onResolveValue => _on_resolve;
        public JSValue onRejectValue => _on_reject;

        internal ScriptPromise(JSContext ctx)
        : this(ScriptEngine.GetContext(ctx))
        {
        }

        internal ScriptPromise(ScriptContext context)
        : base(context)
        {
            _promise = JSApi.JS_NewPromiseCapability(context, out _on_resolve, out _on_reject);
            context.GetRuntime().AddManagedObject(this, out _handle);
            // context.GetObjectCache().AddScriptPromise(_promise, this);
        }

        protected override void OnDisposing(ScriptContext context)
        {
            var on_resolve = _on_resolve;
            var on_reject = _on_reject;
            var promise = _promise;

            _on_resolve = JSApi.JS_UNDEFINED;
            _on_reject = JSApi.JS_UNDEFINED;
            _promise = JSApi.JS_UNDEFINED;
            var runtime = context.GetRuntime();
            runtime.FreeValue(promise);
            runtime.FreeValue(on_resolve);
            runtime.FreeValue(on_reject);
            runtime.FreeManagedObject(_handle);
            // context.GetRuntime().FreeScriptPromise(promise, on_resolve, on_reject);
        }

        public static implicit operator JSValue(ScriptPromise value)
        {
            return value != null ? value._promise : JSApi.JS_UNDEFINED;
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            Dispose();
        }
        #endregion

        public void Reject(object value = null)
        {
            Invoke(_on_reject, value);
        }

        /// <summary>
        /// 完成此 Promise
        /// </summary>
        /// <param name="index">0 表示成功, 1 表示失败</param>
        /// <param name="value">传参给回调</param>
        protected unsafe void Invoke(JSValue callback, object value)
        {
            var ctx = (JSContext)this;
            if (ctx == JSContext.Null)
            {
                throw new NullReferenceException("already released");
            }
            
            if (JSApi.JS_IsFunction(ctx, callback) != 1)
            {
                Dispose();
                return;
            }

            var backVal = Binding.Values.js_push_var(ctx, value);
            if (backVal.IsException())
            {
                var ex = ctx.GetExceptionString();
                Dispose();
                throw new JSException(ex);
            }

            var argv = stackalloc[] { backVal };
            var rval = JSApi.JS_Call(ctx, callback, JSApi.JS_UNDEFINED, 1, argv);
            JSApi.JS_FreeValue(ctx, backVal);
            if (rval.IsException())
            {
                var ex = ctx.GetExceptionString();
                Dispose();
                throw new JSException(ex);
            }

            JSApi.JS_FreeValue(ctx, rval);
            Dispose();

            var runtime = ScriptEngine.GetRuntime(ctx);
            if (runtime != null)
            {
                runtime.ExecutePendingJob();
            }
        }
    }

    public class TypedScriptPromise<TResult> : ScriptPromise
    {
        public TypedScriptPromise(ScriptContext context)
        : base(context)
        {
        }

        public void Resolve(TResult value)
        {
            Invoke(onResolveValue, value);
        }
    }

    public class AnyScriptPromise : ScriptPromise
    {
        public AnyScriptPromise(ScriptContext context)
        : base(context)
        {
        }

        public void Resolve(object value = null)
        {
            Invoke(onResolveValue, value);
        }
    }
}
