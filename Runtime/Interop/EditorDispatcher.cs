using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
using Unity.EditorCoroutines.Editor;
#endif

namespace ReactUnity
{
    public class EditorDispatcher : IDispatcher, IDisposable
    {
        private List<IEnumerator> ToStart = new List<IEnumerator>();
        private HashSet<int> ToStop = new HashSet<int>();
        private List<Action> CallOnLateUpdate = new List<Action>();

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        private List<EditorCoroutine> Started = new List<EditorCoroutine>();
#else
        private  List<object> Started = new List<object>();
#endif

        public EditorDispatcher()
        {
#if UNITY_EDITOR
            UnityEditor.EditorApplication.update += Update;

            UnityEditor.EditorApplication.playModeStateChanged += (state) =>
            {
                UnityEditor.EditorApplication.update -= Update;
                UnityEditor.EditorApplication.update += Update;
            };
#endif
        }

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
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
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
                if (cr != null) Started.Add(StartCoroutine(cr));
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
            CallOnLateUpdate.Clear();
        }

        void Update()
        {
            StartAndStopDeferreds();

            var count = CallOnLateUpdate.Count;
            for (int i = 0; i < count; i++)
                CallOnLateUpdate[i].Invoke();
        }

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        EditorCoroutine StartCoroutine(IEnumerator cr)
        {
            return EditorCoroutineUtility.StartCoroutine(cr, cr);
        }


        void StopCoroutine(EditorCoroutine cr)
        {
            EditorCoroutineUtility.StopCoroutine(cr);
        }
#else
         object StartCoroutine(IEnumerator cr)
        {
            return null;
        }


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
            while (true)
            {
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
                yield return new EditorWaitForSeconds(interval);
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
