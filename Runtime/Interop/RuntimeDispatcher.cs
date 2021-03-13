using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

namespace ReactUnity
{
    public class RuntimeDispatcher : MonoBehaviour, IDispatcher, IDisposable
    {
        System.Threading.Thread mainThread;

        public static RuntimeDispatcher Create()
        {
            var go = new GameObject("React Unity Runtime Dispatcher");
            var dispatcher = go.AddComponent<RuntimeDispatcher>();
            DontDestroyOnLoad(go);
            return dispatcher;
        }


        private List<IEnumerator> ToStart = new List<IEnumerator>();
        private List<Coroutine> Started = new List<Coroutine>();
        private HashSet<int> ToStop = new HashSet<int>();
        private List<Action> CallOnLateUpdate = new List<Action>();

        public void AddCallOnLateUpdate(Action call)
        {
            CallOnLateUpdate.Add(call);
        }

        public int OnUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        public int Timeout(Action callback, float timeSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(TimeoutCoroutine(callback, timeSeconds, handle), handle);
        }

        public int AnimationFrame(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(AnimationFrameCoroutine(callback, handle), handle);
        }

        public int Interval(Action callback, float intervalSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(IntervalCoroutine(callback, intervalSeconds, handle), handle);
        }

        public int Immediate(Action callback)
        {
            if (IsMainThread())
            {
                callback();
                return -1;
            }
            else
            {
                var handle = GetNextHandle();
                return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
            }
        }

        public bool IsMainThread()
        {
            return mainThread?.Equals(System.Threading.Thread.CurrentThread) ?? false;
        }

        public int StartDeferred(IEnumerator cr)
        {
            var handle = GetNextHandle();
            ToStart.Add(cr);
            return handle;
        }

        public int StartDeferred(IEnumerator cr, int handle)
        {
            ToStart.Add(cr);
            return handle;
        }

        public void StopDeferred(int cr)
        {
            ToStop.Add(cr);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private int GetNextHandle()
        {
            return Started.Count + ToStart.Count;
        }

        void StartAndStopDeferreds()
        {
            foreach (var cr in ToStop)
            {
                var toStartIndex = cr - Started.Count;

                // Stop coroutine before starting
                if (toStartIndex >= 0) ToStart[toStartIndex] = null;
                else if (cr >= 0 && cr < Started.Count)
                {
                    // Coroutine was already started, so stop it
                    var coroutine = Started[cr];
                    if (coroutine != null) StopCoroutine(coroutine);
                    Started[cr] = null;
                }
            }
            ToStop.Clear();


            for (int i = 0; i < ToStart.Count; i++)
            {
                var cr = ToStart[i];
                if (cr != null) Started.Add(StartCoroutine(cr));
            }
            ToStart.Clear();
        }

        void StopAll()
        {
            for (int cr = 0; cr < Started.Count; cr++)
            {
                var coroutine = Started[cr];
                if (coroutine != null) StopCoroutine(coroutine);
                Started[cr] = null;
            }
            ToStart.Clear();
            ToStop.Clear();
            CallOnLateUpdate.Clear();
        }

        public void Awake()
        {
            mainThread = System.Threading.Thread.CurrentThread;
        }

        void Update()
        {
            StartAndStopDeferreds();
        }

        void LateUpdate()
        {
            StartAndStopDeferreds();

            var count = CallOnLateUpdate.Count;
            for (int i = 0; i < count; i++)
                CallOnLateUpdate[i].Invoke();
        }


        private IEnumerator OnUpdateCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
            yield return new WaitForSeconds(time);
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
        {
            while (true)
            {
                yield return new WaitForSeconds(interval);
                if (!ToStop.Contains(handle)) callback();
                else break;
            }
        }

        private IEnumerator AnimationFrameCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        public void Dispose()
        {
            StopAll();
        }
    }
}
