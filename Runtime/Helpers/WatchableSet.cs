using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.Helpers
{
    public class WatchableSet<T> : ICollection<T>, ISet<T>, IWatchable<HashSet<T>>
    {
        private event Action<HashSet<T>> changed;

        HashSet<T> original = new HashSet<T>();

        public int Count => original.Count;

        public bool IsReadOnly => false;

        public HashSet<T> Value => new HashSet<T>(original);

        internal virtual void OnAdd(T item)
        {
            Change();
        }
        internal virtual void OnRemove(T item)
        {
            Change();
        }
        internal virtual void OnBeforeChange() { }
        internal virtual void OnAfterChange()
        {
            Change();
        }

        #region Main Functions

        public T[] GetArray() => original.ToArray();

        public bool Add(T item)
        {
            var result = original.Add(item);
            if (result) OnAdd(item);
            return result;
        }

        public bool Toggle(T item)
        {
            var result = original.Add(item);
            if (result) OnAdd(item);
            else
            {
                original.Remove(item);
                OnRemove(item);
            }

            return result;
        }

        public bool ToggleWithoutNotify(T item)
        {
            var result = original.Add(item);
            if (!result) original.Remove(item);
            return result;
        }

        public bool Toggle(T item, bool toggle)
        {
            if (toggle) return Add(item);
            return Remove(item);
        }

        public bool ToggleWithoutNotify(T item, bool toggle)
        {
            if (toggle) return AddWithoutNotify(item);
            return RemoveWithoutNotify(item);
        }

        public bool AddWithoutNotify(T item) => original.Add(item);

        public bool Remove(T item)
        {
            var removed = original.Remove(item);
            if (removed) OnRemove(item);
            return removed;
        }

        public bool RemoveWithoutNotify(T item) => original.Remove(item);

        public void Clear()
        {
            var hasAny = original.Count > 0;
            if (!hasAny) return;
            OnBeforeChange();
            original.Clear();
            OnAfterChange();
        }

        #endregion

        #region Interface Implementations

        public void ClearWithoutNotify() => original.Clear();

        public bool Contains(T item) => original.Contains(item);

        public void CopyTo(T[] array, int arrayIndex) => original.CopyTo(array, arrayIndex);

        public void ExceptWith(IEnumerable<T> other)
        {
            OnBeforeChange();
            original.ExceptWith(other);
            OnAfterChange();
        }

        public IEnumerator<T> GetEnumerator() => original.GetEnumerator();

        public void IntersectWith(IEnumerable<T> other)
        {
            OnBeforeChange();
            original.IntersectWith(other);
            OnAfterChange();
        }

        public bool IsProperSubsetOf(IEnumerable<T> other) => original.IsProperSubsetOf(other);

        public bool IsProperSupersetOf(IEnumerable<T> other) => original.IsProperSupersetOf(other);

        public bool IsSubsetOf(IEnumerable<T> other) => original.IsSubsetOf(other);

        public bool IsSupersetOf(IEnumerable<T> other) => original.IsSupersetOf(other);

        public bool Overlaps(IEnumerable<T> other) => original.Overlaps(other);

        public bool SetEquals(IEnumerable<T> other) => original.SetEquals(other);

        public void SymmetricExceptWith(IEnumerable<T> other)
        {
            OnBeforeChange();
            original.SymmetricExceptWith(other);
            OnAfterChange();
        }

        public void UnionWith(IEnumerable<T> other)
        {
            OnBeforeChange();
            original.UnionWith(other);
            OnAfterChange();
        }

        void ICollection<T>.Add(T item)
        {
            var added = original.Add(item);
            if (added) OnAdd(item);
        }

        IEnumerator IEnumerable.GetEnumerator() => original.GetEnumerator();

        public void Change()
        {
            changed?.Invoke(Value);
        }

        public Action AddListener(object cb)
        {
            var callback = Callback.From(cb);
            var listener = new Action<HashSet<T>>((val) => callback.Call(val));
            changed += listener;
            return () => changed -= listener;
        }

        #endregion
    }
}
