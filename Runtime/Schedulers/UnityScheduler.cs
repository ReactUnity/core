using Jint.Native;
using ReactUnity.Interop;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Schedulers
{
    public class UnityScheduler : IUnityScheduler
    {
        public int setTimeout(JsValue callback)
        {
            return setTimeout(callback, 0);
        }
        public int setTimeout(JsValue callback, int timeout)
        {
            return MainThreadDispatcher.Timeout(() => callback.Invoke(), timeout / 1000f);
        }

        public int setInterval(JsValue callback, int timeout)
        {
            return MainThreadDispatcher.Interval(() => callback.Invoke(), timeout / 1000f);
        }

        public void clearTimeout(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public void clearInterval(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }


        public int requestAnimationFrame(JsValue callback)
        {
            return MainThreadDispatcher.AnimationFrame(() => callback.Invoke());
        }

        public void cancelAnimationFrame(int? handle)
        {
            if (handle.HasValue) MainThreadDispatcher.StopDeferred(handle.Value);
        }

        public void clearAllTimeouts()
        {
        }
    }
}
