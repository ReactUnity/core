using System;

namespace ReactUnity.Reactive
{
    public interface IReactive<T>
    {
        T Value { get; }
        void Change();
        Action AddListener(object cb);
        Action AddListener(Action<T> listener);
    }
}
