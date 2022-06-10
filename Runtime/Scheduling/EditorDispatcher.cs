using System;
using System.Collections;
using System.Runtime.CompilerServices;
#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
using Unity.EditorCoroutines.Editor;
#endif
#if UNITY_EDITOR
using System.Reflection;
using UnityEditor;
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

#if UNITY_EDITOR
        static EventInfo TickEvent;
        static MethodInfo AddTickMethod;
        static MethodInfo RemoveTickMethod;

        Delegate TickDelegate;

        static EditorDispatcher()
        {
            TickEvent = typeof(EditorApplication).GetEvent("tick", BindingFlags.NonPublic | BindingFlags.Static);
            AddTickMethod = TickEvent?.GetAddMethod(true);
            RemoveTickMethod = TickEvent?.GetRemoveMethod(true);
        }

        void AddTick(Delegate tick)
        {
            AddTickMethod?.Invoke(null, new object[] { tick });
        }

        void RemoveTick(Delegate tick)
        {
            RemoveTickMethod?.Invoke(null, new object[] { tick });
        }

        public override void Dispose()
        {
            base.Dispose();

            RemoveTick(TickDelegate);
            EditorApplication.update -= LateUpdate;
            EditorApplication.playModeStateChanged -= PlayStateChange;
        }

        private void PlayStateChange(PlayModeStateChange obj)
        {
            RemoveTick(TickDelegate);
            AddTick(TickDelegate);
            EditorApplication.update -= LateUpdate;
            EditorApplication.update += LateUpdate;
        }
#endif


        public EditorDispatcher(ReactContext ctx)
        {
            Scheduler = new DefaultScheduler(this, ctx);
#if UNITY_EDITOR
            TickDelegate = TickEvent == null ? null : Delegate.CreateDelegate(TickEvent.EventHandlerType, this, this.GetType().GetMethod(nameof(Update)));

            AddTick(TickDelegate);
            EditorApplication.update += LateUpdate;
            EditorApplication.playModeStateChanged += PlayStateChange;
#endif
        }

#if UNITY_EDITOR && REACT_EDITOR_COROUTINES
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected override EditorCoroutine StartCoroutine(IEnumerator cr)
        {
            // Unlike runtime coroutines, editor coroutine does not move next by default
            cr?.MoveNext();
            return EditorCoroutineUtility.StartCoroutine(cr, cr);
        }

        static FieldInfo mOwnerField = typeof(EditorCoroutine)
            .GetField("m_Owner", BindingFlags.NonPublic | BindingFlags.Instance);
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
