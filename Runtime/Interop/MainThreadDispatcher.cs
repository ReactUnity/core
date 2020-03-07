using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Interop
{
    public class MainThreadDispatcher : MonoBehaviour
    {
        public class CoroutineForwardRef : IDisposable
        {
            internal IEnumerator Enumerator;
            internal Coroutine Coroutine;

            internal CoroutineForwardRef(IEnumerator ie)
            {
                Enumerator = ie;
            }

            public void Dispose()
            {
                StopDeferred(this);
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


        private static List<CoroutineForwardRef> ToStart = new List<CoroutineForwardRef>();
        private static List<CoroutineForwardRef> ToStop = new List<CoroutineForwardRef>();
        private static List<Action> CallOnLateUpdate = new List<Action>();

        static public void AddCallOnLateUpdate(Action call)
        {
            CallOnLateUpdate.Add(call);
        }

        static public CoroutineForwardRef OnUpdate(Action callback)
        {
            return StartDeferred(OnUpdateCoroutine(callback));
        }

        static public CoroutineForwardRef Timeout(Action callback, float timeSeconds)
        {
            return StartDeferred(TimeoutCoroutine(callback, timeSeconds));
        }

        static public CoroutineForwardRef AnimationFrame(Action callback)
        {
            return StartDeferred(AnimationFrameCoroutine(callback));
        }

        static public CoroutineForwardRef Interval(Action callback, float intervalSeconds)
        {
            return StartDeferred(IntervalCoroutine(callback, intervalSeconds));
        }

        static public CoroutineForwardRef StartDeferred(IEnumerator cr)
        {
            var handle = new CoroutineForwardRef(cr);
            ToStart.Add(handle);
            return handle;
        }

        static public void StopDeferred(CoroutineForwardRef cr)
        {
            cr.Enumerator = null;
            if (cr.Coroutine != null) ToStop.Add(cr);
        }

        void StartAndStopDeferreds()
        {
            for (int i = 0; i < ToStart.Count; i++)
            {
                var cr = ToStart[i];
                if (cr.Enumerator != null) cr.Coroutine = StartCoroutine(cr.Enumerator);
            }
            ToStart.Clear();

            for (int i = 0; i < ToStop.Count; i++)
            {
                var cr = ToStop[i];
                if (cr.Coroutine != null) StopCoroutine(cr.Coroutine);
                cr.Coroutine = null;
            }
            ToStop.Clear();
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
