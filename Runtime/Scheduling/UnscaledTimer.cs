using UnityEngine;

namespace ReactUnity.Scheduling
{
    public class UnscaledTimer : ITimer
    {
        private static UnscaledTimer instance;
        public static UnscaledTimer Instance => instance = instance ?? new UnscaledTimer();

        public float AnimationTime => Time.unscaledTime;
        public float TimeScale => 1;

        private UnscaledTimer() { }

        public object Yield(float advanceBy)
        {
            return new WaitForSecondsRealtime(advanceBy);
        }
    }
}
