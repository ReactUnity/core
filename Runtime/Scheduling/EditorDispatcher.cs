using System;
using System.Collections;
using System.Runtime.CompilerServices;
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
using Unity.EditorCoroutines.Editor;
#endif

namespace ReactUnity.Scheduling
{
    public class EditorDispatcher :
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        BaseDispatcher<EditorCoroutine>
#else
        BaseDispatcher<object>
#endif
    {
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

        public override void Update()
        {
            base.Update();

            var lcount = CallOnLateUpdate.Count;
            for (int i = 0; i < lcount; i++)
                CallOnLateUpdate[i].Invoke();
        }

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected override EditorCoroutine StartCoroutine(IEnumerator cr) => EditorCoroutineUtility.StartCoroutine(cr, cr);

        static System.Reflection.FieldInfo mOwnerField = typeof(EditorCoroutine)
            .GetField("m_Owner", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
        static WeakReference DeadRef = new WeakReference(null);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected override void StopCoroutine(EditorCoroutine cr)
        {
            EditorCoroutineUtility.StopCoroutine(cr);
            // This hack prevents EditorCoroutines to tick after it has already been stopped
            mOwnerField?.SetValue(cr, DeadRef);
        }
#else
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected override object StartCoroutine(IEnumerator cr) => null;
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected override void StopCoroutine(object cr) { }
#endif

        protected override IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
        {
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
            yield return new EditorWaitForSeconds(time);
#else
            yield return null;
#endif
            if (!ToStop.Contains(handle)) callback();
        }

        protected override IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
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

        protected override IEnumerator AnimationFrameCoroutine(Action callback, int handle)
        {
            yield return null;
            if (!ToStop.Contains(handle)) callback();
        }
    }
}
