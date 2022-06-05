using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    using Native;

    public class ObjectCache
    {
        private class ObjectRef
        {
            public int next;
            public object target;
            public bool disposable;
        }

        private bool _disposed;

        private int _freeIndex = -1;
        private int _activeMapSlotCount = 0;

        // it holds any two way binding object (with JS finalizer calling)
        // id => host object
        private List<ObjectRef> _map = new List<ObjectRef>();

        // host object => jsvalue heapptr (dangerous, no ref count)
        private Dictionary<object, JSValue> _rmap = new Dictionary<object, JSValue>(EqualityComparer.Default);

        private JSWeakMap<ScriptValue> _scriptValueMap = new JSWeakMap<ScriptValue>();

        // 刻意与 ScriptValue 隔离
        private JSWeakMap<ScriptDelegate> _delegateMap = new JSWeakMap<ScriptDelegate>();

        // private JSWeakMap<ScriptPromise> _promiseMap = new JSWeakMap<ScriptPromise>();

        private IScriptLogger _logger;

        public ObjectCache(IScriptLogger logger)
        {
            _logger = logger;
        }

        public void ForEachManagedObject(Action<object> callback)
        {
            for (int i = 0, count = _map.Count; i < count; ++i)
            {
                var item = _map[i];
                if (item.next == -1)
                {
                    callback(item.target);
                }
            }
        }

        public int GetManagedObjectCount()
        {
            return _activeMapSlotCount;
        }

        public int GetManagedObjectCap()
        {
            return _map.Count;
        }

        public int GetJSObjectCount()
        {
            return _rmap.Count;
        }

        public int GetDelegateCount()
        {
            return _delegateMap.Count;
        }

        public int GetScriptValueCount()
        {
            return _scriptValueMap.Count;
        }

        // public int GetScriptPromiseCount()
        // {
        //     return _promiseMap.Count;
        // }

        public void Destroy()
        {
            if (_disposed)
            {
                return;
            }
#if JSB_DEBUG
            if (_logger != null)
            {
                _logger.Write(LogLevel.Info, "_activeMapSlotCount {0}", _activeMapSlotCount);
                foreach (var entry in _map)
                {
                    if (entry.target != null)
                    {
                        _logger.Write(LogLevel.Info, "Entry {0}", entry.target);
                    }
                }
                foreach (var entry in _rmap)
                {
                    _logger.Write(LogLevel.Info, "REntry {0} = {1}", entry.Key, entry.Value);
                }
            }
#endif
            _disposed = true;
            _freeIndex = 0;
            _activeMapSlotCount = 0;
            _map.Clear();
            _rmap.Clear();
            _delegateMap.Clear();
            _scriptValueMap.Clear();
            // _promiseMap.Clear();
        }

        /// <summary>
        /// 建立 object to jsvalue 的映射. 
        /// 外部必须自己保证 object 存在的情况下对应的 js value 不会被释放.
        /// </summary>
        public void AddJSValue(object o, JSValue heapptr)
        {
            if (_disposed)
            {
                return;
            }
            if (o != null)
            {
#if JSB_DEBUG
                if (_logger != null)
                {
                    JSValue oldPtr;
                    if (TryGetJSValue(o, out oldPtr))
                    {
                        _logger.Write(LogLevel.Assert, "exists object => js value mapping {0}: {1} => {2}", o, oldPtr, heapptr);
                    }
                }
#endif
                _rmap[o] = heapptr;
            }
        }

        public bool TryGetJSValue(object o, out JSValue heapptr)
        {
            if (o == null)
            {
                heapptr = JSApi.JS_UNDEFINED;
                return false;
            }
            return _rmap.TryGetValue(o, out heapptr);
        }

        public bool RemoveJSValue(object o)
        {
            if (_disposed)
            {
#if JSB_DEBUG
                _logger?.Write(LogLevel.Error, "calling RemoveJSValue after being disposed: {0}", o);
#endif
                return false;
            }
            return o != null && _rmap.Remove(o);
        }

        /// <summary>
        /// register a strong reference of object in ObjectCache
        /// </summary>
        public int AddObject(object o, bool disposable)
        {
            if (_disposed)
            {
#if JSB_DEBUG
                _logger?.Write(LogLevel.Error, "calling AddObject after being disposed: {0}", o);
#endif
                return -1;
            }

            if (o != null)
            {
                if (_freeIndex < 0)
                {
                    var freeEntry = new ObjectRef();
                    var id = _map.Count;
                    _map.Add(freeEntry);
                    ++_activeMapSlotCount;
                    freeEntry.next = -1;
                    freeEntry.target = o;
                    freeEntry.disposable = disposable;
                    return id;
                }
                else
                {
                    var id = _freeIndex;
                    var freeEntry = _map[id];
                    _freeIndex = freeEntry.next;
                    ++_activeMapSlotCount;
                    freeEntry.next = -1;
                    freeEntry.target = o;
                    freeEntry.disposable = disposable;
                    return id;
                }
            }
            return -1;
        }

        public bool SetObjectDisposable(int id, bool disposable)
        {
            if (id >= 0 && id < _map.Count)
            {
                var entry = _map[id];
                if (entry.next == -1)
                {
                    entry.disposable = disposable;
                    return true;
                }
            }

            return false;
        }

        public bool TryGetObject(int id, out object o)
        {
            if (id >= 0 && id < _map.Count)
            {
                var entry = _map[id];
                if (entry.next == -1)
                {
                    o = entry.target;
                    return true;
                }
            }
            o = null;
            return false;
        }

        public bool RemoveObject(int id)
        {
            object o;
            return RemoveObject(id, out o);
        }

        public bool RemoveObject(int id, out object o)
        {
            if (TryGetObject(id, out o))
            {
                var entry = _map[id];
                var disposable = entry.disposable;
                entry.next = _freeIndex;
                entry.target = null;
                _freeIndex = id;
                --_activeMapSlotCount;
                RemoveJSValue(o);
                if (disposable)
                {
                    var jsf = o as IDisposable;
                    if (jsf != null)
                    {
                        jsf.Dispose();
                    }
                }
                return true;
            }
            return false;
        }

        // 覆盖已有记录, 无记录返回 false
        public bool ReplaceObject(int id, object o)
        {
            if (_disposed)
            {
#if JSB_DEBUG
                _logger?.Write(LogLevel.Error, "calling ReplaceObject after being disposed: {0}", o);
#endif
                return false;
            }

            object oldValue;
            if (TryGetObject(id, out oldValue))
            {
                var entry = _map[id];
                entry.target = o;
                JSValue heapptr;
                if (oldValue != null && _rmap.TryGetValue(oldValue, out heapptr))
                {
                    _rmap.Remove(oldValue);
                    _rmap[o] = heapptr;
                }
                return true;
            }
            return false;
        }

        public bool TryGetTypedWeakObject<T>(int id, out T o)
        where T : class
        {
            object obj;
            if (TryGetObject(id, out obj))
            {
                var w = obj as WeakReference;
                o = w != null ? w.Target as T : null;
                return true;
            }
            o = null;
            return false;
        }

        public bool TryGetTypedObject<T>(int id, out T o)
        where T : class
        {
            object obj;
            if (TryGetObject(id, out obj))
            {
                o = obj as T;
                return true;
            }
            o = null;
            return false;
        }

        public bool MatchObjectType(int id, Type type)
        {
            object o;
            if (TryGetObject(id, out o))
            {
                if (o != null)
                {
                    var otype = o.GetType();
                    return otype == type || otype.IsSubclassOf(type) || type.IsAssignableFrom(otype);
                }
                return true;
            }
            return false;
        }

        #region delegate mapping 

        /// <summary>
        /// register a weak reference of ScriptDelegate in ObjectCache
        /// </summary>
        public bool AddDelegate(JSValue jso, ScriptDelegate o)
        {
            if (_disposed)
            {
#if JSB_DEBUG
                _logger?.Write(LogLevel.Error, "calling AddDelegate after being disposed: {0}", o);
#endif
                return false;
            }
            
            _delegateMap.Add(jso, o);
            return true;
        }

        public bool TryGetDelegate(JSValue jso, out ScriptDelegate o)
        {
            return _delegateMap.TryGetValue(jso, out o);
        }

        public bool RemoveDelegate(JSValue jso)
        {
            if (_disposed)
            {
#if JSB_DEBUG
                _logger?.Write(LogLevel.Info, "calling RemoveDelegate after being disposed: {0}", jso);
#endif
                return false;
            }
            
            return _delegateMap.Remove(jso);
        }

        #endregion

        #region script value mapping 

        /// <summary>
        /// register a weak reference of ScriptValue in ObjectCache
        /// </summary>
        public void AddScriptValue(JSValue jso, ScriptValue o)
        {
            if (_disposed)
            {
                return;
            }
            _scriptValueMap.Add(jso, o);
        }

        public bool TryGetScriptValue(JSValue jso, out ScriptValue o)
        {
            ScriptValue value;
            if (_scriptValueMap.TryGetValue(jso, out value))
            {
                o = value;
                return true;
            }
            o = null;
            return false;
        }

        public bool RemoveScriptValue(JSValue jso)
        {
            if (_disposed)
            {
                return false;
            }
            return _scriptValueMap.Remove(jso);
        }

        #endregion 

        // #region script promise mapping 

        // /// <summary>
        // /// register a weak reference of ScriptPromise in ObjectCache
        // /// </summary>
        // public void AddScriptPromise(JSValue jso, ScriptPromise o)
        // {
        //     if (_disposed)
        //     {
        //         return;
        //     }
        //     _promiseMap.Add(jso, o);
        // }

        // public bool TryGetScriptPromise<T>(JSValue jso, out T o)
        // where T : ScriptPromise
        // {
        //     ScriptPromise value;
        //     if (_promiseMap.TryGetValue(jso, out value))
        //     {
        //         o = value as T;
        //         return true;
        //     }
        //     o = null;
        //     return false;
        // }

        // public bool RemoveScriptPromise(JSValue jso)
        // {
        //     if (_disposed)
        //     {
        //         return false;
        //     }
        //     return _promiseMap.Remove(jso);
        // }

        // #endregion 
    }
}