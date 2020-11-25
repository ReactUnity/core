using ReactUnity.Interop;

namespace ReactUnity.Schedulers
{
    public class UnityScheduler : IUnityScheduler
    {
        public int setTimeout(Callback callback)
        {
            return setTimeout(callback, 0);
        }
        public int setTimeout(Callback callback, int timeout)
        {
            return MainThreadDispatcher.Timeout(() => callback.Call(), timeout / 1000f);
        }

        public int setInterval(Callback callback, int timeout)
        {
            return MainThreadDispatcher.Interval(() => callback.Call(), timeout / 1000f);
        }

        public void clearTimeout(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public void clearInterval(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public int setImmediate(Callback callback)
        {
            return MainThreadDispatcher.Immediate(() => callback.Call());
        }


        public int requestAnimationFrame(Callback callback)
        {
            return MainThreadDispatcher.AnimationFrame(() => callback.Call());
        }

        public void cancelAnimationFrame(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public void clearImmediate(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public void clearAllTimeouts()
        {
        }
    }
}
