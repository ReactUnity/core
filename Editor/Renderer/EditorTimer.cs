using ReactUnity.Scheduling;
using UnityEditor;

namespace ReactUnity.Editor
{
    public class EditorTimer : ITimer
    {
        private static EditorTimer instance;
        public static EditorTimer Instance => instance = instance ?? new EditorTimer();

        public float AnimationTime => (float) EditorApplication.timeSinceStartup;
        public float TimeScale { get; set; } = 1;
        public float DeltaTime => deltaTime;

        private static float lastTimeSinceStartup = 0;
        private static float deltaTime = 0;

        public static void EditorUpdate()
        {
            var time = (float) EditorApplication.timeSinceStartup;
            deltaTime = time - lastTimeSinceStartup;
            lastTimeSinceStartup = time;
        }

        static EditorTimer()
        {
            EditorApplication.update += EditorUpdate;
        }

        private EditorTimer() { }

        public object Yield(float advanceBy)
        {
#if REACT_EDITOR_COROUTINES
            return new Unity.EditorCoroutines.Editor.EditorWaitForSeconds(advanceBy);
#else
            return null;
#endif
        }
    }
}
