namespace ReactUnity.Animations
{
    public class AnimationEvent
    {
        public Animation Animation;
        public KeyframeList Keyframes;
        public float ElapsedTime;
    }

    public class TransitionEvent
    {
        public Transition Transition;
        public string PropertyName;
        public float ElapsedTime;
    }
}
