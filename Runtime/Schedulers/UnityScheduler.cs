using Jint.Native;
using System.Collections.Generic;
using UniRx;
using UnityEngine;

namespace ReactUnity.Schedulers
{
    public class UnityScheduler : IUnityScheduler
    {
        List<System.IDisposable> Timeouts = new List<System.IDisposable>();

        public int setTimeout(JsValue callback)
        {
            return setTimeout(callback, 0);
        }
        public int setTimeout(JsValue callback, int timeout)
        {
            if (!Application.isPlaying) return -1;
            var ind = Timeouts.Count;

            Timeouts.Add(Observable.Timer(System.TimeSpan.FromMilliseconds(timeout)).SubscribeOn(Scheduler.MainThread).Subscribe(x =>
            {
                callback.Invoke();
            }));

            return ind;
        }

        public int setInterval(JsValue callback, int timeout)
        {
            if (!Application.isPlaying) return -1;

            var ind = Timeouts.Count;

            if (timeout == 0)
                Timeouts.Add(Observable.EveryUpdate()
                    .Subscribe(x => callback.Invoke()));
            else
                Timeouts.Add(Observable.Interval(System.TimeSpan.FromMilliseconds(timeout))
                    .Subscribe(x => callback.Invoke()));

            return ind;
        }

        public void clearTimeout(int handle)
        {
            Timeouts[handle].Dispose();
        }

        public void clearInterval(int handle)
        {
            Timeouts[handle].Dispose();
        }

        public void clearAllTimeouts()
        {
            foreach (var to in Timeouts)
            {
                to.Dispose();
            }

            Timeouts.Clear();
        }
    }
}
