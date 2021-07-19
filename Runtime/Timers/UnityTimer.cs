using UnityEngine;

namespace ReactUnity.Timers
{
    public class UnityTimer : ITimer
    {
        private static UnityTimer instance;
        public static UnityTimer Instance => instance ??= new UnityTimer();

        public float AnimationTime => Time.time;
        public float TimeScale => Time.timeScale;

        private UnityTimer() { }
    }
}
