using System;
using System.Collections;

namespace ReactUnity
{
    internal class DisposableHandle : IDisposable
    {
        IDispatcher Dispatcher;
        int Handle;

        public DisposableHandle(IDispatcher dispatcher, int handle)
        {
            Dispatcher = dispatcher;
            Handle = handle;
        }

        public void Dispose()
        {
            Dispatcher.StopDeferred(Handle);
        }
    }

    public interface IDispatcher : IDisposable
    {
        void AddCallOnLateUpdate(Action call);

        int OnUpdate(Action callback);

        int Timeout(Action callback, float timeSeconds);

        int AnimationFrame(Action callback);

        int Interval(Action callback, float intervalSeconds);

        int Immediate(Action callback);

        int StartDeferred(IEnumerator cr);

        int StartDeferred(IEnumerator cr, int handle);

        void StopDeferred(int cr);
    }
}
