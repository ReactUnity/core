namespace ReactUnity.Scheduling
{
    public class ControlledTimer : ITimer
    {
        public float AnimationTime { get; set; } = 0;
        public float TimeScale { get; set; } = 1;

        public void AdvanceTime(float advanceBy)
        {
            AnimationTime += TimeScale * advanceBy;
        }

        public object Yield(float advanceBy)
        {
            AdvanceTime(advanceBy);
            return null;
        }
    }
}
