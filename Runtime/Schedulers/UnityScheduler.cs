using Jint.Native;
using ReactUnity.Interop;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Schedulers
{
    public class UnityScheduler : IUnityScheduler
    {
        List<MainThreadDispatcher.CoroutineForwardRef> Timeouts = new List<MainThreadDispatcher.CoroutineForwardRef>();

        public int setTimeout(JsValue callback)
        {
            return setTimeout(callback, 0);
        }
        public int setTimeout(JsValue callback, int timeout)
        {
            if (!Application.isPlaying) return -1;
            var ind = Timeouts.Count;

            Timeouts.Add(MainThreadDispatcher.Timeout(() => callback.Invoke(), timeout / 1000));

            return ind;
        }

        public int setInterval(JsValue callback, int timeout)
        {
            if (!Application.isPlaying) return -1;

            var ind = Timeouts.Count;

            Timeouts.Add(MainThreadDispatcher.Interval(() => callback.Invoke(), timeout / 1000));

            return ind;
        }

        public void clearTimeout(int handle)
        {
            MainThreadDispatcher.StopDeferred(Timeouts[handle]);
        }

        public void clearInterval(int handle)
        {
            MainThreadDispatcher.StopDeferred(Timeouts[handle]);
        }


        public int requestAnimationFrame(JsValue callback)
        {
            if (!Application.isPlaying) return -1;
            var ind = Timeouts.Count;

            Timeouts.Add(MainThreadDispatcher.AnimationFrame(() => callback.Invoke()));

            return ind;
        }

        public void cancelAnimationFrame(int handle)
        {
            MainThreadDispatcher.StopDeferred(Timeouts[handle]);
        }

        public void clearAllTimeouts()
        {
            foreach (var to in Timeouts)
                MainThreadDispatcher.StopDeferred(to);

            Timeouts.Clear();
        }
    }
}
