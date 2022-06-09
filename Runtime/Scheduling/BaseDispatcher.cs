using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

namespace ReactUnity.Scheduling
{
    public abstract class BaseDispatcher<CoroutineType> : IDispatcher, IDisposable where CoroutineType : class
    {
        protected static object ImmediateReturnType = new object();

        protected List<IEnumerator> ToStart = new List<IEnumerator>() { null };
        protected List<CoroutineType> Started = new List<CoroutineType>();
        protected HashSet<int> ToStop = new HashSet<int>();
        protected List<Action> CallOnLateUpdate = new List<Action>();
        public IScheduler Scheduler { get; protected set; }


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
            return StartDeferred(OnUpdateCoroutine(callback, handle, false), handle);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnceLateUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle, false), handle);
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
            return StartDeferred(OnUpdateCoroutine(callback, handle, true), handle);
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

        protected void StartAndStopDeferreds(bool isUpdate)
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

            var newStarts = new List<CoroutineType>();

            while (ToStart.Count > 0)
            {
                var continues = new List<IEnumerator>();

                for (int i = 0; i < ToStart.Count; i++)
                {
                    var cr = ToStart[i];
                    if (cr != null)
                    {
                        newStarts.Add(StartCoroutine(cr));

                        // We are already in Update so move Coroutine forward if it is waiting for next Update
                        if (isUpdate)
                        {
                            if (cr.Current == null) continues.Add(cr);
                            else if (cr.Current == ImmediateReturnType) cr.MoveNext();
                        }
                    }
                    else newStarts.Add(null);
                }

                ToStart.Clear();

                foreach (var cnt in continues) cnt.MoveNext();
            }

            Started.AddRange(newStarts);
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

        private IEnumerator OnUpdateCoroutine(Action callback, int handle, bool immediate)
        {
            yield return immediate ? ImmediateReturnType : null;
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

        protected abstract IEnumerator TimeoutCoroutine(Action callback, float time, int handle);

        protected abstract IEnumerator IntervalCoroutine(Action callback, float interval, int handle);

        protected abstract IEnumerator AnimationFrameCoroutine(Action callback, int handle);


        public virtual void Dispose()
        {
            StopAll();
        }

        protected abstract CoroutineType StartCoroutine(IEnumerator enumerator);
        protected abstract void StopCoroutine(CoroutineType coroutine);


        public virtual void Update()
        {
            StartAndStopDeferreds(true);
        }

        public virtual void LateUpdate()
        {
            StartAndStopDeferreds(true);

            var count = CallOnLateUpdate.Count;
            for (int i = 0; i < count; i++)
                CallOnLateUpdate[i]?.Invoke();
        }
    }
}
