namespace ReactUnity
{
    public enum EventPriority
    {
        Unknown = 0,
        Discrete = 0b0000000000000000000000000000001,
        Continuous = 0b0000000000000000000000000000100,
        Default = 0b0000000000000000000000000010000,
        Idle = 0b0100000000000000000000000000000,
    }
}
