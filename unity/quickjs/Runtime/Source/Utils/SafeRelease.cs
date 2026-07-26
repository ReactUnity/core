using System.Collections.Generic;

namespace QuickJS.Utils
{
    using Native;

    public class SafeRelease : IObjectCollectionEntry
    {
        private ScriptContext _context;
        private List<JSValue> _values = new List<JSValue>();
        private ObjectCollection.Handle _handle;

        public JSValue this[int index]
        {
            get { return _values[index]; }
        }

        public bool isValid => _context != null;

        public SafeRelease(ScriptContext context)
        {
            _context = context;
            _context.GetRuntime().AddManagedObject(this, out _handle);
        }

        public SafeRelease(ScriptContext context, JSValue value)
        {
            _context = context;
            _values.Add(value);
            _context.GetRuntime().AddManagedObject(this, out _handle);
        }

        public SafeRelease(ScriptContext context, JSValue value1, JSValue value2)
        {
            _context = context;
            _values.Add(value1);
            _values.Add(value2);
            _context.GetRuntime().AddManagedObject(this, out _handle);
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            Release();
        }
        #endregion

        public JSValue[] ToArray()
        {
            return _values.ToArray();
        }

        public unsafe SafeRelease Append(int len, JSValue* values)
        {
            for (int i = 0; i < len; i++)
            {
                _values.Add(values[i]);
            }

            return this;
        }

        public SafeRelease Append(params JSValue[] values)
        {
            for (int i = 0, size = values.Length; i < size; i++)
            {
                _values.Add(values[i]);
            }

            return this;
        }

        public void Release()
        {
            if (_context != null)
            {
                var context = _context;
                _context = null;
                var runtime = context.GetRuntime();
                if (runtime != null)
                {
                    runtime.RemoveManagedObject(_handle);
                }
                var len = _values.Count;
                for (var i = 0; i < len; i++)
                {
                    JSApi.JS_FreeValue(context, _values[i]);
                }

                _values.Clear();
            }
        }
    }
}