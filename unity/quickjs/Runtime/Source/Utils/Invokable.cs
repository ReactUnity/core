using System;

namespace QuickJS.Utils
{
    public interface Invokable : IDisposable
    {
        void Invoke();
    }
}