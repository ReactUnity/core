using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
using Unity.EditorCoroutines.Editor;
#endif

namespace ReactUnity.Scheduling
{
    public class EditorDispatcher : IDispatcher, IDisposable
    {
        private List<IEnumerator> ToStart = new List<IEnumerator>() { null };
        private HashSet<int> ToStop = new HashSet<int>();
        private List<Action> CallOnUpdate = new List<Action>();
        private List<Action> CallOnLateUpdate = new List<Action>();

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        private List<EditorCoroutine> Started = new List<EditorCoroutine>();
#else
        private List<object> Started = new List<object>();
#endif

        public IScheduler Scheduler { get; }

        public EditorDispatcher(ReactContext ctx)
        {
            Scheduler = new DefaultScheduler(this, ctx);
#if UNITY_EDITOR
            UnityEditor.EditorApplication.update += Update;

            UnityEditor.EditorApplication.playModeStateChanged += (state) => {
                UnityEditor.EditorApplication.update -= Update;
                UnityEditor.EditorApplication.update += Update;
            };
#endif
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnEveryUpdate(Action call)
        {
            CallOnUpdate.Add(call);
            return -1;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int OnEveryLateUpdate(Action call)
        {
            CallOnLateUpdate.Add(call);
            return -1;
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

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public int Immediate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
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
        public void StopDeferred(int cr) => ToStop.Add(cr);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private int GetNextHandle()
        {
            return Started.Count + ToStart.Count;
        }

        private void StartAndStopDeferreds()
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
                if (cr != null)
                {
                    Started.Add(StartCoroutine(cr));

                    // We are already in Update so move Coroutine forward if it is waiting for next Update
                    if (cr.Current == null) cr.MoveNext();
                }
                else Started.Add(null);
            }
            ToStart.Clear();
        }

        public void StopAll()
        {
            for (int cr = 0; cr < Started.Count; cr++)
            {
                var coroutine = Started[cr];
                if (coroutine != null) StopCoroutine(coroutine);
                Started[cr] = null;
            }
            ToStart.Clear();
            ToStop.Clear();
            CallOnUpdate.Clear();
            CallOnLateUpdate.Clear();
        }

        void Update()
        {
            StartAndStopDeferreds();

            var ucount = CallOnUpdate.Count;
            for (int i = 0; i < ucount; i++)
                CallOnUpdate[i].Invoke();

            var lcount = CallOnLateUpdate.Count;
            for (int i = 0; i < lcount; i++)
                CallOnLateUpdate[i].Invoke();
        }

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        EditorCoroutine StartCoroutine(IEnumerator cr) => EditorCoroutineUtility.StartCoroutine(cr, cr);

        static System.Reflection.FieldInfo mOwnerField = typeof(EditorCoroutine)
            .GetField("m_Owner", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
        static WeakReference DeadRef = new WeakReference(null);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        void StopCoroutine(EditorCoroutine cr)
        {
            EditorCoroutineUtility.StopCoroutine(cr);
            // This hack prevents EditorCoroutines to tick after it has already been stopped
            mOwnerField?.SetValue(cr, DeadRef);
        }
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        object StartCoroutine(IEnumerator cr)
        {
            return null;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        void StopCoroutine(object cr)
        {
        }
#endif


        private IEnumerator OnUpdateCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
            yield return new EditorWaitForSeconds(time);
#else
            yield return null;
#endif
            if (!ToStop.Contains(handle)) callback();
        }

        private IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
        {
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
            var br = new EditorWaitForSeconds(interval);
#endif

            while (true)
            {
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
                yield return br;
#else
                yield return null;
#endif
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
