using System;
using System.Collections;
using System.Collections.Generic;

namespace ReactUnity.Helpers
{
    public class WatchableList<T> : IList<T>, IWatchable<IList<T>>
    {
        private event Action<IList<T>> changed;

        List<T> original = new List<T>();

        public int Count => original.Count;

        public bool IsReadOnly => false;

        public IList<T> Value => original.AsReadOnly();

        public T this[int index]
        {
            get => original[index];
            set
            {
                OnBeforeChange();
                original[index] = value;
                OnAfterChange();
            }
        }

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

        public void Add(T item)
        {
            original.Add(item);
            OnAdd(item);
        }

        public void AddWithoutNotify(T item) => original.Add(item);

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

        public IEnumerator<T> GetEnumerator() => original.GetEnumerator();

        void ICollection<T>.Add(T item)
        {
            original.Add(item);
            OnAdd(item);
        }

        IEnumerator IEnumerable.GetEnumerator() => original.GetEnumerator();

        public void Change()
        {
            changed?.Invoke(Value);
        }

        public Action AddListener(object cb)
        {
            var callback = Callback.From(cb);
            var listener = new Action<IList<T>>((val) => callback.Call(val));
            return AddListener(listener);
        }

        public Action AddListener(Action<IList<T>> listener)
        {
            changed += listener;
            return () => changed -= listener;
        }

        public int IndexOf(T item) => original.IndexOf(item);

        public void Insert(int index, T item)
        {
            original.Insert(index, item);
            OnAdd(item);
        }

        public void RemoveAt(int index)
        {
            original.RemoveAt(index);
            Change();
        }

        #endregion
    }
}
