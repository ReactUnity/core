using System;

namespace ReactUnity.Helpers
{
    public interface IWatchable<T>
    {
        T Value { get; }
        void Change();
        public Action AddListener(object cb);
    }


    public class Watchable<T> : IWatchable<T>
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

        public Watchable() { }

        public Watchable(T value)
        {
            current = value;
        }

        public void Change()
        {
            changed?.Invoke(current);
        }

        public Action AddListener(object cb)
        {
            var callback = new Callback(cb);
            var listener = new Action<T>((val) => callback.Call(val));
            changed += listener;
            return () => changed -= listener;
        }
    }
}
