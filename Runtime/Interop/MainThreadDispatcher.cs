using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
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

        System.Threading.Thread mainThread;

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
            StopAll();
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
        private static HashSet<int> ToStop = new HashSet<int>();
        private static List<Action> CallOnLateUpdate = new List<Action>();

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

        static public bool IsMainThread()
        {
            return Instance?.mainThread?.Equals(System.Threading.Thread.CurrentThread) ?? false;
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


        private static IEnumerator OnUpdateCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }

        private static IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
            yield return new WaitForSeconds(time);
            if (!ToStop.Contains(handle)) callback();
        }

        private static IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
        {
            while (true)
            {
                yield return new WaitForSeconds(interval);
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
