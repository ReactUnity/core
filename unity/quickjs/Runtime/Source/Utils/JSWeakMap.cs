using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    using Native;

    public interface IWeakMapEntry
    {
        void Dispose();
    }

    public class JSWeakMap<T>
    where T : class, IWeakMapEntry
    {
        // weak reference table for script values (dangerous, no ref count)
        private Dictionary<JSValue, WeakReference> _map = new Dictionary<JSValue, WeakReference>();

        /// <summary>
        /// [FOR_DEBUG_ONLY] 
        /// </summary>
        public int Count
        {
            get
            {
#if JSB_DEBUG
                var active = 0;
                foreach (var kv in _map)
                {
                    if (kv.Value.IsAlive)
                    {
                        ++active;
                    }
                }
#endif
                return _map.Count;
            }
        }

        public void Clear()
        {
            var valueMapSize = _map.Count;
            var values = new WeakReference[valueMapSize];
            _map.Values.CopyTo(values, 0);
            _map.Clear();
            for (var i = 0; i < valueMapSize; i++)
            {
                var d = values[i].Target as T;
                if (d != null)
                {
                    d.Dispose();
                }
                else
                {
                }
            }
        }

        public void Add(JSValue jso, T o)
        {
            T old;
            if (TryGetValue(jso, out old))
            {
                old.Dispose();
            }
            _map[jso] = new WeakReference(o);
        }

        public bool TryGetValue(JSValue jso, out T o)
        {
            WeakReference weakRef;
            if (_map.TryGetValue(jso, out weakRef))
            {
                o = weakRef.Target as T;
                return o != null;
            }
            o = default(T);
            return false;
        }

        public bool Remove(JSValue jso)
        {
            WeakReference weakRef;
            var r = false;
            if (_map.TryGetValue(jso, out weakRef))
            {
                r = true;
                _map.Remove(jso);
            }
            return r;
        }

    }
}
