namespace ReactUnity.Styling.Animations
{
    public class AnimationEvent
    {
        public string AnimationName;
        public KeyframeList Keyframes;
        public float ElapsedTime;
    }

    public class TransitionEvent
    {
        public string PropertyName;
        public float ElapsedTime;
    }
}
