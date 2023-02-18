using System;
using ReactUnity.Helpers;

namespace ReactUnity.Reactive
{
    public class ReactiveValue<T> : IReactive<T>
    {
        private event Action<T> changed;

        private T current;

        public T Value
        {
            get => current;
            set
            {
                current = value;
                Change();
            }
        }

        public ReactiveValue() { }

        public ReactiveValue(T value)
        {
            current = value;
        }

        public void Change()
        {
            changed?.Invoke(current);
        }

        public Action AddListener(object cb)
        {
            var callback = Callback.From(cb);
            var listener = new Action<T>((val) => callback.Call(val));
            return AddListener(listener);
        }

        public Action AddListener(Action<T> listener)
        {
            changed += listener;
            return () => changed -= listener;
        }
    }
}
