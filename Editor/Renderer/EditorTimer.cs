using ReactUnity.Scheduling;
using UnityEditor;

namespace ReactUnity.Editor
{
    public class EditorTimer : ITimer
    {
        private static EditorTimer instance;
        public static EditorTimer Instance => instance ??= new EditorTimer();

        public float AnimationTime => (float) EditorApplication.timeSinceStartup;
        public float TimeScale { get; set; } = 1;

        private EditorTimer() { }
    }
}
