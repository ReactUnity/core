using System;
using QuickJS.Native;

namespace QuickJS
{
    public abstract class GCObject
    {
        private ScriptContext _context;

        public JSContext ctx => _context;

        public GCObject(ScriptContext context)
        {
            _context = context;
        }

        ~GCObject()
        {
            Dispose(false);
        }

        // should only be invoked on the script runtime thread
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // should only be invoked on the script runtime thread or C# gc thread (from C# finalizer)
        private void Dispose(bool bManaged)
        {
            var context = _context;
            if (context != null)
            {
                _context = null;

                // A finalizer that runs after the context is gone has nothing to free: the value
                // it holds died with the runtime. Asking anyway reached a guard that logged
                // "enqueue pending action after the runtime shutdown" as an error, which in a
                // Unity test run fails whichever test the GC thread happened to interrupt.
                if (context.IsValid()) OnDisposing(context);
            }
        }

        public static implicit operator JSContext(GCObject value)
        {
            return value != null ? value._context : JSContext.Null;
        }

        public ScriptContext GetContext()
        {
            return _context;
        }

        protected abstract void OnDisposing(ScriptContext context);
    }
}
