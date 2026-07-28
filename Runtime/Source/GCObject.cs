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
                OnDisposing(context);
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
