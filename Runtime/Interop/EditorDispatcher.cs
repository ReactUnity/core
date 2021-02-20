using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
using Unity.EditorCoroutines.Editor;
#endif

namespace ReactUnity.Interop
{
    public static class EditorDispatcher
    {
        public class CoroutineHandle : IDisposable
        {
            public int Handle { get; }
            public CoroutineHandle(int handle)
            {
                Handle = handle;
            }

            public void Dispose()
            {
                StopDeferred(Handle);
            }
        }

        private static List<IEnumerator> ToStart = new List<IEnumerator>();
        private static HashSet<int> ToStop = new HashSet<int>();
        private static List<Action> CallOnLateUpdate = new List<Action>();

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        private static List<EditorCoroutine> Started = new List<EditorCoroutine>();
#else
        private static List<object> Started = new List<object>();
#endif

        static EditorDispatcher()
        {
            var handle = GetNextHandle();
            StartCoroutine(OnEveryUpdateCoroutine(Update, handle));
        }

        static public void AddCallOnLateUpdate(Action call)
        {
            CallOnLateUpdate.Add(call);
        }

        static public int OnUpdate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        static public int Timeout(Action callback, float timeSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(TimeoutCoroutine(callback, timeSeconds, handle), handle);
        }

        static public int AnimationFrame(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(AnimationFrameCoroutine(callback, handle), handle);
        }

        static public int Interval(Action callback, float intervalSeconds)
        {
            var handle = GetNextHandle();
            return StartDeferred(IntervalCoroutine(callback, intervalSeconds, handle), handle);
        }

        static public int Immediate(Action callback)
        {
            var handle = GetNextHandle();
            return StartDeferred(OnUpdateCoroutine(callback, handle), handle);
        }

        static public int StartDeferred(IEnumerator cr)
        {
            var handle = GetNextHandle();
            ToStart.Add(cr);
            return handle;
        }

        static public int StartDeferred(IEnumerator cr, int handle)
        {
            ToStart.Add(cr);
            return handle;
        }

        static public void StopDeferred(int cr)
        {
            ToStop.Add(cr);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        static private int GetNextHandle()
        {
            return Started.Count + ToStart.Count;
        }

        static private void StartAndStopDeferreds()
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

        static public void StopAll()
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

        static void Update()
        {
            StartAndStopDeferreds();

            var count = CallOnLateUpdate.Count;
            for (int i = 0; i < count; i++)
                CallOnLateUpdate[i].Invoke();
        }

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        static EditorCoroutine StartCoroutine(IEnumerator cr)
        {
            return EditorCoroutineUtility.StartCoroutineOwnerless(cr);
        }


        static void StopCoroutine(EditorCoroutine cr)
        {
            EditorCoroutineUtility.StopCoroutine(cr);
        }
#else
        static object StartCoroutine(IEnumerator cr)
        {
            return null;
        }


        static void StopCoroutine(object cr)
        {
        }
#endif


        private static IEnumerator OnUpdateCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        private static IEnumerator OnEveryUpdateCoroutine(Action callback, int handle)
        {
            while (true)
            {
                yield return null;
                if (!ToStop.Contains(handle)) callback();
            }
        }

        private static IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
            yield return new EditorWaitForSeconds(time);
            if (!ToStop.Contains(handle)) callback();
        }

        private static IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
        {
            while (true)
            {
                yield return new EditorWaitForSeconds(interval);
                if (!ToStop.Contains(handle)) callback();
            }
        }

        private static IEnumerator AnimationFrameCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

    }
}
