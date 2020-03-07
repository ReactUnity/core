using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Interop
{
    public class MainThreadDispatcher : MonoBehaviour
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

        #region Singleton stuff
        private static MainThreadDispatcher Instance { get; set; }

        void OnEnable()
        {
            if (Instance && Instance != this) DestroyImmediate(Instance);
            Instance = this;
        }

        private void OnDestroy()
        {
            if (Instance == this) Instance = null;
        }

        public static void Initialize()
        {
            if (Instance) return;
            var go = new GameObject("React Unity Main Thread Dispatcher");
            var dispatcher = go.AddComponent<MainThreadDispatcher>();
            DontDestroyOnLoad(go);
            Instance = dispatcher;
        }
        #endregion


        private static List<IEnumerator> ToStart = new List<IEnumerator>();
        private static List<Coroutine> Started = new List<Coroutine>();
        private static List<int> ToStop = new List<int>();
        private static List<Action> CallOnLateUpdate = new List<Action>();

        static public void AddCallOnLateUpdate(Action call)
        {
            CallOnLateUpdate.Add(call);
        }

        static public int OnUpdate(Action callback)
        {
            return StartDeferred(OnUpdateCoroutine(callback));
        }

        static public int Timeout(Action callback, float timeSeconds)
        {
            return StartDeferred(TimeoutCoroutine(callback, timeSeconds));
        }

        static public int AnimationFrame(Action callback)
        {
            return StartDeferred(AnimationFrameCoroutine(callback));
        }

        static public int Interval(Action callback, float intervalSeconds)
        {
            return StartDeferred(IntervalCoroutine(callback, intervalSeconds));
        }

        static public int StartDeferred(IEnumerator cr)
        {
            var handle = Started.Count + ToStart.Count;
            ToStart.Add(cr);
            return handle;
        }

        static public void StopDeferred(int cr)
        {
            ToStop.Add(cr);
        }

        void StartAndStopDeferreds()
        {
            for (int i = 0; i < ToStop.Count; i++)
            {
                var cr = ToStop[i];
                var toStartIndex = cr - Started.Count;

                if (toStartIndex >= 0) ToStart[toStartIndex] = null;
                else
                {
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


        private static IEnumerator OnUpdateCoroutine(Action callback)
        {
            yield return null;
            callback();
        }

        private static IEnumerator TimeoutCoroutine(Action callback, float time)
        {
            yield return new WaitForSeconds(time);
            callback();
        }

        private static IEnumerator IntervalCoroutine(Action callback, float interval)
        {
            while (true)
            {
                yield return new WaitForSeconds(interval);
                callback();
            }
        }

        private static IEnumerator AnimationFrameCoroutine(Action callback)
        {
            yield return null;
            callback();
        }

    }
}
