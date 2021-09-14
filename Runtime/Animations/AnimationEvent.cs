namespace ReactUnity.Animations
{
    public class AnimationEvent
    {
        public KeyframeList Keyframes;
        public float ElapsedTime;
    }

    public class TransitionEvent
    {
        public string PropertyName;
        public float ElapsedTime;
    }
}
