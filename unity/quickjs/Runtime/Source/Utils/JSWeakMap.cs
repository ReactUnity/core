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
#if !JSB_UNITYLESS
                if (active != _map.Count)
                {
                    UnityEngine.Debug.LogFormat("unbalanced WeakMap<{0}> {1} != {2}", typeof(T).Name, active, _map.Count);
                }
#endif
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
#if JSB_DEBUG && !JSB_UNITYLESS
            UnityEngine.Debug.LogFormat("WeakMap<{0}>.Clear: {1}", typeof(T).Name, valueMapSize);
#endif
            for (var i = 0; i < valueMapSize; i++)
            {
                var d = values[i].Target as T;
                if (d != null)
                {
#if JSB_DEBUG && !JSB_UNITYLESS
                    UnityEngine.Debug.LogFormat("    {0}: {1}", i, d);
#endif
                    d.Dispose();
                }
                else
                {
#if JSB_DEBUG && !JSB_UNITYLESS
                    UnityEngine.Debug.LogFormat("    {0}: {1}", i, "null");
#endif
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
#if JSB_DEBUG && !JSB_UNITYLESS
                UnityEngine.Debug.LogFormat("WeakMap<{0}>.Remove: {1} = {2}", typeof(T).Name, jso, weakRef.Target);
#endif
            }
            return r;
        }

    }
}
