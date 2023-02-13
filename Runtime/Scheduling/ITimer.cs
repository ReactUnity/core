namespace ReactUnity.Scheduling
{
    public interface ITimer
    {
        float AnimationTime { get; }
        float TimeScale { get; }
        object Yield(float advanceBy);
    }
}
