using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    public interface IObjectCollectionEntry
    {
        void OnCollectionReleased();
    }

    public class ObjectCollection
    {
        public struct Handle
        {
            public int id;
            public int tag;
        }

        private class ObjectRef
        {
            public int next;
            public int tag;
            public WeakReference<IObjectCollectionEntry> target;
        }

        private int _freeIndex = -1;
        private int _activeSlotCount = 0;
        private List<ObjectRef> _map = new List<ObjectRef>();

        public int count => _activeSlotCount;

        public void Clear()
        {
            if (_activeSlotCount > 0)
            {
                for (int i = 0, count = _map.Count; i < count; ++i)
                {
                    var entry = _map[i];
                    IObjectCollectionEntry target;
                    if (entry.target.TryGetTarget(out target))
                    {
                        target.OnCollectionReleased();
                    }
                }
            }
        }

        public void AddObject(IObjectCollectionEntry o, out Handle handle)
        {
            if (o != null)
            {
                if (_freeIndex < 0)
                {
                    var freeEntry = new ObjectRef();
                    var id = _map.Count;
                    _map.Add(freeEntry);
                    ++_activeSlotCount;
                    freeEntry.next = -1;
                    freeEntry.target = new WeakReference<IObjectCollectionEntry>(o);
                    ++freeEntry.tag;
                    handle = new Handle() { id = id, tag = freeEntry.tag };
                }
                else
                {
                    var id = _freeIndex;
                    var freeEntry = _map[id];
                    _freeIndex = freeEntry.next;
                    ++_activeSlotCount;
                    freeEntry.next = -1;
                    freeEntry.target.SetTarget(o);
                    ++freeEntry.tag;
                    handle = new Handle() { id = id, tag = freeEntry.tag };
                }
            }
            else
            {
                handle = new Handle();
            }
        }

        public bool IsHandleValid(Handle handle)
        {
            var id = handle.id;
            if (id >= 0 && id < _map.Count)
            {
                var entry = _map[id];
                if (entry.next == -1 && entry.tag == handle.tag)
                {
                    return true;
                }
            }
            return false;
        }

        public bool TryGetObject(Handle handle, out IObjectCollectionEntry o)
        {
            var id = handle.id;
            if (id >= 0 && id < _map.Count)
            {
                var entry = _map[id];
                if (entry.next == -1 && entry.tag == handle.tag)
                {
                    return entry.target.TryGetTarget(out o);
                }
            }
            o = null;
            return false;
        }

        public bool RemoveObject(Handle handle)
        {
            IObjectCollectionEntry o;
            return RemoveObject(handle, out o);
        }

        public bool RemoveObject(Handle handle, out IObjectCollectionEntry o)
        {
            if (TryGetObject(handle, out o))
            {
                var entry = _map[handle.id];
                entry.next = _freeIndex;
                entry.target.SetTarget(null);
                ++entry.tag;
                _freeIndex = handle.id;
                --_activeSlotCount;
                return true;
            }
            return false;
        }
    }
}
