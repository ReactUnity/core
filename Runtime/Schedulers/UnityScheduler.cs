using ReactUnity.Dispatchers;
using ReactUnity.Helpers;

namespace ReactUnity.Schedulers
{
    public class UnityScheduler : IUnityScheduler
    {
        IDispatcher Dispatcher;

        public UnityScheduler(IDispatcher dispatcher)
        {
            Dispatcher = dispatcher;
        }

        public int setTimeout(Callback callback, int timeout)
        {
            return Dispatcher.Timeout(() => callback.Call(), timeout / 1000f);
        }

        public int setInterval(Callback callback, int timeout)
        {
            return Dispatcher.Interval(() => callback.Call(), timeout / 1000f);
        }

        public void clearTimeout(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public void clearInterval(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public int setImmediate(Callback callback)
        {
            return Dispatcher.Immediate(() => callback.Call());
        }


        public int requestAnimationFrame(Callback callback)
        {
            return Dispatcher.AnimationFrame(() => callback.Call());
        }

        public void cancelAnimationFrame(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public void clearImmediate(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public void clearAllTimeouts()
        {
        }
    }
}
