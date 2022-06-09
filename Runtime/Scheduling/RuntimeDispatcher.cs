using System;
using System.Collections;
using UnityEngine;

namespace ReactUnity.Scheduling
{
    [DefaultExecutionOrder(-50)]
    public class RuntimeDispatcherBehavior : MonoBehaviour
    {
        RuntimeDispatcher Dispatcher;

        public static RuntimeDispatcher Create(ReactContext ctx)
        {
            var go = new GameObject("React Unity Runtime Dispatcher");
            var behavior = go.AddComponent<RuntimeDispatcherBehavior>();
            var dispatcher = new RuntimeDispatcher(ctx, behavior);
            DontDestroyOnLoad(go);

#if REACT_UNITY_DEVELOPER
            dispatcher.CurrentLifecycle = go.AddComponent<CurrentLifecycle>();
#endif

            return dispatcher;
        }

        private void Update()
        {
            Dispatcher.Update();
        }

        private void LateUpdate()
        {
            Dispatcher.LateUpdate();
        }

        public class RuntimeDispatcher : BaseDispatcher<Coroutine>
        {
            public RuntimeDispatcherBehavior Behavior;
#if REACT_UNITY_DEVELOPER
            public CurrentLifecycle CurrentLifecycle { get; private set; }
#endif

            public RuntimeDispatcher(ReactContext ctx, RuntimeDispatcherBehavior behavior)
            {
                Behavior = behavior;
                Behavior.Dispatcher = this;
                Scheduler = new DefaultScheduler(this, ctx);
            }

            protected override IEnumerator TimeoutCoroutine(Action callback, float time, int handle)
            {
                yield return new WaitForSeconds(time);
                if (!ToStop.Contains(handle)) callback();
            }

            protected override IEnumerator IntervalCoroutine(Action callback, float interval, int handle)
            {
                var br = new WaitForSeconds(interval);

                while (true)
                {
                    yield return br;
                    if (!ToStop.Contains(handle)) callback();
                    else break;
                }
            }

            protected override IEnumerator AnimationFrameCoroutine(Action callback, int handle)
            {
                yield return Application.isBatchMode ? null : new WaitForEndOfFrame();
                if (!ToStop.Contains(handle)) callback();
            }

            public override void Dispose()
            {
                base.Dispose();
                if (Behavior && Behavior.gameObject) DestroyImmediate(Behavior.gameObject);
            }

            protected override Coroutine StartCoroutine(IEnumerator enumerator)
            {
                if (Behavior) return Behavior.StartCoroutine(enumerator);
                else return null;
            }

            protected override void StopCoroutine(Coroutine coroutine)
            {
                if (Behavior) Behavior.StopCoroutine(coroutine);
            }
        }
    }
}
