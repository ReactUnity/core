namespace ReactUnity.Timers
{
    public class ControlledTimer : ITimer
    {
        public float AnimationTime { get; set; } = 0;
        public float TimeScale { get; set; } = 1;

        public void AdvanceTime(float advanceBy)
        {
            AnimationTime += TimeScale * advanceBy;
        }
    }
}
