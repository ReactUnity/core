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
            if (!Application.isPlaying) return -1;
            return MainThreadDispatcher.Timeout(() => callback.Invoke(), timeout / 1000f);
        }

        public int setInterval(JsValue callback, int timeout)
        {
            if (!Application.isPlaying) return -1;
            return MainThreadDispatcher.Interval(() => callback.Invoke(), timeout / 1000f);
        }

        public void clearTimeout(int handle)
        {
            MainThreadDispatcher.StopDeferred(handle);
        }

        public void clearInterval(int handle)
        {
            MainThreadDispatcher.StopDeferred(handle);
        }


        public int requestAnimationFrame(JsValue callback)
        {
            if (!Application.isPlaying) return -1;
            return MainThreadDispatcher.AnimationFrame(() => callback.Invoke());
        }

        public void cancelAnimationFrame(int handle)
        {
            MainThreadDispatcher.StopDeferred(handle);
        }

        public void clearAllTimeouts()
        {
        }
    }
}
