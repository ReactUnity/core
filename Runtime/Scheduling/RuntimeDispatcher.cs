using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

namespace ReactUnity.Scheduling
{
    [DefaultExecutionOrder(-50)]
    public class RuntimeDispatcher : MonoBehaviour, IDispatcher, IDisposable
    {
        System.Threading.Thread mainThread;

        public static RuntimeDispatcher Create(ReactContext ctx)
        {
            var go = new GameObject("React Unity Runtime Dispatcher");
            var dispatcher = go.AddComponent<RuntimeDispatcher>();
            dispatcher.Scheduler = new DefaultScheduler(dispatcher, ctx);
            DontDestroyOnLoad(go);

#if REACT_UNITY_DEVELOPER
            dispatcher.CurrentLifecycle = go.AddComponent<CurrentLifecycle>();
#endif

            return dispatcher;
        }

        private List<IEnumerator> ToStart = new List<IEnumerator>() { null };
        private List<Coroutine> Started = new List<Coroutine>();
        private HashSet<int> ToStop = new HashSet<int>();
        private List<Action> CallOnLateUpdate = new List<Action>();
        public IScheduler Scheduler { get; private set; }
#if REACT_UNITY_DEVELOPER
        public CurrentLifecycle CurrentLifecycle { get; private set; }
#endif

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnEveryLateUpdate(Action callback)
        {
            CallOnLateUpdate.Add(callback);
            return -1;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnEveryUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnEveryUpdateCoroutine(callback, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnceUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnceLateUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int Timeout(Action callback, float timeSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(TimeoutCoroutine(callback, timeSeconds, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int AnimationFrame(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(AnimationFrameCoroutine(callback, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int Interval(Action callback, float intervalSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(IntervalCoroutine(callback, intervalSeconds, handle), handle);
        }

        public int Immediate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public bool IsMainThread()
        {
            return mainThread?.Equals(System.Threading.Thread.CurrentThread) ?? false;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int StartDeferred(IEnumerator cr)
        {
            var handle = GetNextHandle();
            ToStart.Add(cr);
            return handle;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int StartDeferred(IEnumerator cr, int handle)
        {
            ToStart.Add(cr);
            return handle;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public void StopDeferred(int cr)
        {
            if (cr >= 0) ToStop.Add(cr);
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
                    if (coroutine != null && this) StopCoroutine(coroutine);
                    Started[cr] = null;
                }
            }
            ToStop.Clear();


            for (int i = 0; i < ToStart.Count; i++)
            {
                var cr = ToStart[i];
                if (cr != null && this)
                {
                    Started.Add(StartCoroutine(cr));

                    // We are already in Update so move Coroutine forward if it is waiting for next Update
                    if (cr.Current == null) cr.MoveNext();
                }
                else Started.Add(null);
            }
            ToStart.Clear();
        }

        void StopAll()
        {
            for (int cr = 0; cr < Started.Count; cr++)
            {
                var coroutine = Started[cr];
                if (coroutine != null && this) StopCoroutine(coroutine);
                Started[cr] = null;
            }
            ToStart.Clear();
            ToStop.Clear();
            CallOnLateUpdate.Clear();
        }

        private void OnEnable()
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
                CallOnLateUpdate[i]?.Invoke();
        }


        private IEnumerator OnUpdateCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator OnEveryUpdateCoroutine(Action callback, int handle)
        {
            while (true)
            {
                yield return null;
                if (!ToStop.Contains(handle)) callback();
                else break;
            }
        }

        private IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
            yield return new WaitForSeconds(time);
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
        {
            var br = new WaitForSeconds(interval);

            while (true)
            {
                yield return br;
                if (!ToStop.Contains(handle)) callback();
                else break;
            }
        }

        private IEnumerator AnimationFrameCoroutine(Action callback, int handle)
        {
            yield return new WaitForEndOfFrame();
            if (!ToStop.Contains(handle)) callback();
        }

        public void Dispose()
        {
            StopAll();
            if (this && gameObject) DestroyImmediate(gameObject);
        }
    }
}
