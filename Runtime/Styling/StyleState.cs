using Facebook.Yoga;
using ReactUnity.Animations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using Mathf = UnityEngine.Mathf;

namespace ReactUnity.Styling
{
    public class StyleState
    {
        private class AnimationState
        {
            public float Ratio = 0;
            public float LastUpdatedAt = 0;
            public float StartedAt = 0;
            public float ElapsedTimeSinceRun = 0;
            public bool Ended = false;

            public Animation Animation;
            public KeyframeList Keyframes;

            public AnimationEvent CreateEvent()
            {
                return new AnimationEvent
                {
                    ElapsedTime = Animation.Duration * Ratio,
                    Animation = Animation,
                    Keyframes = Keyframes,
                };
            }
        }

        private class TransitionState
        {
            public object FromValue;
            public object ToValue;
            public float Ratio = 0;
            public float LastUpdatedAt = 0;
            public float StartedAt = 0;
            public float Duration = 0;

            public Transition Transition;
            public string PropertyName;

            public TransitionEvent CreateEvent()
            {
                return new TransitionEvent
                {
                    ElapsedTime = Duration * Ratio,
                    PropertyName = PropertyName,
                    Transition = Transition,
                };
            }
        }

        private class AudioState
        {
            public bool Loaded;
            public bool Loading;
            public UnityEngine.AudioClip Clip;
            public bool ShouldStart;
            public int CurrentLoop = 0;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private float getTime() => Context.Timer.AnimationTime * 1000;

        private static NodeStyle DefaultStyle = new NodeStyle();
        public NodeStyle Previous { get; private set; }
        public NodeStyle Current { get; private set; }
        public NodeStyle Active { get; private set; }

        public event Action<NodeStyle, bool> OnUpdate;
        public event Action<string, object> OnEvent;
        public StyleState Parent { get; private set; }

        private ReactContext Context;
        private YogaNode Layout;
        private YogaNode DefaultLayout;


        private Dictionary<string, TransitionState> propertyTransitionStates;
        private TransitionList activeTransitions;
        private bool transitionRunning;


        private Dictionary<string, AnimationState> runningAnimations;
        private AnimationList activeAnimations;
        private bool animationRunning;


        private AudioState[] audioStates;
        private AudioList activeAudioList;
        private bool audioRunning;
        private float audioStartTime;

        private bool shouldUpdate;
        private bool shouldUpdateWithLayout;


        public StyleState(ReactContext context, YogaNode layout, YogaNode defaultLayout)
        {
            Context = context;
            Layout = layout;
            DefaultLayout = defaultLayout;
            SetCurrent(DefaultStyle);
        }

        public void SetCurrent(NodeStyle newStyle)
        {
            if (Current == DefaultStyle) Previous = newStyle;
            else Previous = Active ?? Current ?? newStyle;

            Current = newStyle;
            RecalculateActive();
        }

        private void RecalculateActive()
        {
            var transition = Current.transition;
            var animation = Current.animation;

            var hasTransition = Current != Previous && (transition != null && transition.Any);
            var hasAnimation = Current != Previous && (animation != null && animation.Any);

            if (!hasTransition) StopTransitions(true);
            if (!hasAnimation) StopAnimations(true);

            if (hasTransition || hasAnimation)
            {
                Active = new NodeStyle(null, Current);
                Active.Parent = Parent?.Active;

                var switchTransitions = hasTransition && activeTransitions != transition;
                var switchAnimations = hasAnimation && activeAnimations != animation;

                if (switchTransitions) StartTransitions(transition);
                else UpdateTransitions();

                if (switchAnimations) StartAnimations(animation);
                else UpdateAnimations();
            }
            else
            {
                Active = Current;
                Previous = null;
                ParentUpdated(Parent?.Active, false);
            }

            RecalculateAudio();
        }

        public void Update()
        {
            if (transitionRunning) UpdateTransitions();
            if (animationRunning) UpdateAnimations();
            if (audioRunning) UpdateAudio();
            if (shouldUpdate) OnUpdate?.Invoke(Active, shouldUpdateWithLayout);
            if (shouldUpdateWithLayout) Context.ScheduleLayout();
            shouldUpdate = false;
            shouldUpdateWithLayout = false;
        }

        #region Transitions

        private void StartTransitions(TransitionList transition)
        {
            StopTransitions(true);
            propertyTransitionStates = new Dictionary<string, TransitionState>();
            activeTransitions = transition;
            var finished = UpdateTransitions();
            if (!finished) transitionRunning = true;
        }

        private void StopTransitions(bool reset)
        {
            transitionRunning = false;

            if (reset)
            {
                activeTransitions = null;
                propertyTransitionStates = null;
            }
        }

        private bool UpdateTransitions()
        {
            if (activeTransitions == null) return true;

            var updated = false;
            var finished = true;
            var hasLayout = false;

            var currentTime = getTime();

            for (int i = 0; i < activeTransitions.Items.Length; i++)
            {
                var tran = activeTransitions.Items[i];
                if (!tran.Valid) continue;

                IEnumerable<IStyleProperty> properties;

                if (tran.All) properties = CssProperties.TransitionableProperties;
                else properties = new List<IStyleProperty>() { CssProperties.GetProperty(tran.Property) };

                foreach (var sp in properties)
                {
                    if (sp == null) continue;
                    finished = false;

                    var prevValue = Previous.GetStyleValue(sp);
                    var curValue = Current.GetStyleValue(sp);

                    propertyTransitionStates.TryGetValue(sp.name, out var state);


                    float ratio = 0;

                    if (state != null)
                    {
                        state.Transition = tran;
                        if (state.FromValue == prevValue && state.ToValue == curValue)
                        {
                            // Continue existing transition
                            ratio = state.Ratio;

                            if (ratio >= 1)
                            {
                                // Transition was already finished
                                state.LastUpdatedAt = currentTime;
                                continue;
                            }
                        }
                        else if (state.FromValue == curValue)
                        {
                            if (state.Ratio < 1) OnEvent?.Invoke("onTransitionCancel", state.CreateEvent());

                            // Start running transition in reverse direction
                            state.StartedAt = currentTime;
                            state.Duration = Math.Min(tran.Duration, state.Ratio * state.Duration);
                            state.Ratio = 0;

                            OnEvent?.Invoke("onTransitionRun", state.CreateEvent());
                        }
                        else
                        {
                            if (state.Ratio < 1) OnEvent?.Invoke("onTransitionCancel", state.CreateEvent());

                            // Start a new transition
                            state.StartedAt = currentTime;
                            state.Duration = tran.Duration;
                            state.Ratio = 0;

                            OnEvent?.Invoke("onTransitionRun", state.CreateEvent());
                        }
                    }
                    else
                    {
                        // Start a new transition
                        propertyTransitionStates[sp.name] = state = new TransitionState();
                        state.StartedAt = currentTime;
                        state.LastUpdatedAt = currentTime;
                        state.Duration = tran.Duration;
                        state.PropertyName = sp.name;
                        state.Transition = tran;

                        OnEvent?.Invoke("onTransitionRun", state.CreateEvent());
                    }


                    float delta = currentTime - state.LastUpdatedAt;
                    var delayPassed = (currentTime - state.StartedAt) >= tran.Delay;
                    var tDelta = !delayPassed ? 0 : (state.Duration == 0 ? 1 : delta / state.Duration);
                    ratio = Mathf.Min(Mathf.Max(0, ratio + tDelta), 1);

                    var previousRatio = state.Ratio;

                    state.FromValue = prevValue;
                    state.ToValue = curValue;
                    state.Ratio = ratio;
                    state.LastUpdatedAt = currentTime;

                    if (ratio > 0 && previousRatio == 0) OnEvent?.Invoke("onTransitionStart", state.CreateEvent());
                    if (ratio == 1 && previousRatio < 1) OnEvent?.Invoke("onTransitionEnd", state.CreateEvent());

                    object activeValue = curValue;

                    if (prevValue != curValue && ratio < 1)
                    {
                        activeValue = prevValue;

                        if (delayPassed && ratio > 0)
                        {
                            activeValue = Interpolater.Interpolate(prevValue, curValue, ratio, tran.TimingFunction, sp.type);
                        }
                    }

                    updated = updated || (Active.GetStyleValue(sp) != activeValue);
                    Active.SetStyleValue(sp, activeValue);

                    if (sp is ILayoutProperty lp)
                    {
                        if (Layout != null) lp.Set(Layout, activeValue, DefaultLayout);
                        hasLayout = true;
                    }
                }
            }

            if (finished) StopTransitions(false);

            if (updated)
            {
                shouldUpdate = true;
                shouldUpdateWithLayout = hasLayout;
            }

            return finished;
        }

        #endregion


        #region Animations

        private void StartAnimations(AnimationList animation)
        {
            StopAnimations(false);
            activeAnimations = animation;
            CancelMissingAnimations();
            if (runningAnimations == null) runningAnimations = new Dictionary<string, AnimationState>();
            var finished = UpdateAnimations();
            if (!finished) animationRunning = true;
        }

        private void StopAnimations(bool reset)
        {
            animationRunning = false;
            if (reset)
            {
                activeAnimations = null;
                CancelMissingAnimations();
            }
        }

        private void CancelMissingAnimations()
        {
            if (runningAnimations == null) return;

            var anims = runningAnimations.ToList();

            for (int i = anims.Count - 1; i >= 0; i--)
            {
                var ra = anims[i];

                if (activeAnimations == null || !activeAnimations.Items.Any(x => x.Name == ra.Key))
                {
                    if (!ra.Value.Ended) OnEvent?.Invoke("onAnimationCancel", ra.Value.CreateEvent());
                    runningAnimations.Remove(ra.Key);
                }
            }
        }


        private bool UpdateAnimations()
        {
            if (activeAnimations?.Items == null) return true;

            var updated = false;
            var finished = true;
            var hasLayout = false;

            var currentTime = getTime();

            for (int animIndex = 0; animIndex < activeAnimations.Items.Length; animIndex++)
            {
                var anim = activeAnimations.Items[animIndex];
                if (!anim.Valid) continue;

                if (!runningAnimations.TryGetValue(anim.Name, out var state))
                {
                    if (!Context.Keyframes.TryGetValue(anim.Name, out var kfs)) continue;
                    if (!kfs.Valid) continue;

                    runningAnimations[anim.Name] = state = new AnimationState();
                    state.Keyframes = kfs;
                    state.Animation = anim;
                    state.LastUpdatedAt = currentTime;
                    state.StartedAt = currentTime;

                    OnEvent?.Invoke("onAnimationRun", state.CreateEvent());
                }
                else
                {
                    state.Animation = anim;
                }

                float delta = anim.PlayState == AnimationPlayState.Paused ? 0 : currentTime - state.LastUpdatedAt;
                state.ElapsedTimeSinceRun += delta;

                var delayDiff = state.ElapsedTimeSinceRun - anim.Delay;
                var delayPassed = delayDiff > 0;
                var ratio = delayDiff / anim.Duration;
                var maxRatio = anim.IterationCount >= 0 ? anim.IterationCount : float.MaxValue;
                ratio = Math.Max(0, Math.Min(ratio, maxRatio));

                var startOffset = ratio * anim.Duration;

                var ended = anim.Duration <= 0 || (anim.IterationCount >= 0 && ratio >= anim.IterationCount);

                var cycle = anim.Duration == 0 ? 0 : Mathf.FloorToInt(ratio);
                var cycleOffset = ratio - cycle;

                var even = cycle % 2 == 0;

                var reverse = anim.Direction == AnimationDirection.Reverse
                    || (anim.Direction == AnimationDirection.Alternate && !even)
                    || (anim.Direction == AnimationDirection.AlternateReverse && even);


                var step = !delayPassed ? 0 : (anim.Duration == 0 ? 1 : Mathf.Min(Mathf.Max(0, cycleOffset), 1));
                if (reverse) step = 1 - step;


                var keyframes = state.Keyframes;
                var steps = keyframes.Steps;
                var properties = keyframes.Properties;

                var stepCount = steps.Count - 1;

                var previousRatio = state.Ratio;
                var previousEnded = state.Ended;
                state.Ratio = ratio;
                state.LastUpdatedAt = currentTime;
                state.Ended = ended;

                if ((ratio > 0 && previousRatio == 0) || (previousEnded && !ended)) OnEvent?.Invoke("onAnimationStart", state.CreateEvent());
                if (ratio != previousRatio && ended) OnEvent?.Invoke("onAnimationEnd", state.CreateEvent());
                if (Mathf.FloorToInt(ratio) != Mathf.FloorToInt(previousRatio) && !ended) OnEvent?.Invoke("onAnimationIteration", state.CreateEvent());

                foreach (var sp in properties)
                {
                    if (sp == null) continue;

                    object activeValue;

                    if (ended || !delayPassed)
                    {
                        if (!delayPassed) finished = false;

                        if ((anim.FillMode == AnimationFillMode.Forwards && ended)
                            || (anim.FillMode == AnimationFillMode.Backwards && !delayPassed)
                            || anim.FillMode == AnimationFillMode.Both)
                        {
                            var fillReverse = ended ? (anim.Direction == AnimationDirection.Reverse
                                    || (anim.Direction == AnimationDirection.Alternate && anim.IterationCount % 2 == 0)
                                    || (anim.Direction == AnimationDirection.AlternateReverse && anim.IterationCount % 2 != 0))
                                    : !(anim.Direction == AnimationDirection.Reverse || anim.Direction == AnimationDirection.AlternateReverse);

                            if (!(fillReverse ? keyframes.From : keyframes.To).Rules.TryGetValue(sp.name, out activeValue))
                                activeValue = Current.GetStyleValue(sp);
                        }
                        else activeValue = Current.GetStyleValue(sp);
                    }
                    else
                    {
                        Keyframe lowKf = null;
                        Keyframe highKf = null;

                        for (int i = 0; i < stepCount; i++)
                        {
                            var cur = steps[i];
                            if (step >= cur.Offset && cur.Rules.ContainsKey(sp.name))
                            {
                                lowKf = cur;
                            }
                        }

                        for (int i = 1; i <= stepCount; i++)
                        {
                            var cur = steps[i];
                            if (step <= cur.Offset && cur.Rules.ContainsKey(sp.name))
                            {
                                highKf = cur;
                                break;
                            }
                        }

                        if (highKf == null && lowKf == null) continue;

                        finished = false;

                        lowKf = lowKf ?? steps[0];
                        highKf = highKf ?? steps[stepCount];

                        var stepLength = highKf.Offset - lowKf.Offset;

                        var t = Mathf.Min(Mathf.Max(0, (step - lowKf.Offset) / stepLength), 1);


                        object lowValue, highValue;

                        if (!lowKf.Rules.TryGetValue(sp.name, out lowValue)) lowValue = Current.GetStyleValue(sp);
                        if (!highKf.Rules.TryGetValue(sp.name, out highValue)) highValue = Current.GetStyleValue(sp);

                        if (lowValue != highValue)
                        {
                            activeValue = Interpolater.Interpolate(lowValue, highValue, t, anim.TimingFunction, sp.type);
                        }
                        else activeValue = highValue;
                    }

                    updated = updated || (Active.GetStyleValue(sp) != activeValue);
                    Active.SetStyleValue(sp, activeValue);

                    if (sp is ILayoutProperty lp)
                    {
                        if (Layout != null) lp.Set(Layout, activeValue, DefaultLayout);
                        hasLayout = true;
                    }

                    if (sp.name == StyleProperties.audio.name)
                    {
                        RecalculateAudio();
                    }
                }
            }

            if (finished) StopAnimations(false);

            if (updated)
            {
                shouldUpdate = true;
                shouldUpdateWithLayout = hasLayout;
            }

            return finished;
        }

        #endregion

        #region Audio

        private void RecalculateAudio()
        {
            var audio = Active.audio;

            if (audio == null) StopAudio(true);
            else if (activeAudioList != audio) StartAudio(audio);
        }

        private void StartAudio(AudioList audio)
        {
            StopAudio(true);
            audioStates = new AudioState[audio.Items.Length];
            activeAudioList = audio;
            audioStartTime = getTime();
            var finished = UpdateAudio();
            if (!finished) audioRunning = true;
        }

        private void StopAudio(bool reset)
        {
            audioRunning = false;
            if (reset)
            {
                audioStates = null;
                activeAudioList = null;
            }
        }


        private bool UpdateAudio()
        {
            if (activeAudioList?.Items == null) return true;

            var finished = true;

            var currentTime = getTime();
            var passedTime = currentTime - audioStartTime;

            var parts = activeAudioList.Items;

            for (int i = 0; i < parts.Length; i++)
            {
                var part = parts[i];

                if (!part.Valid || part.IterationCount == 0) continue;

                var state = audioStates[i] ??= new AudioState();


                Action tryPlayClip = () =>
                {
                    if (state.Loaded && state.ShouldStart)
                    {
                        state.ShouldStart = false;
                        Context.PlayAudio(state.Clip);
                    }
                };


                var offsetTime = passedTime - part.Delay;
                var delayPassed = offsetTime >= 0;

                if (!state.Loaded && !state.Loading)
                {
                    state.Loading = true;

                    part.AudioClip.Get(Context, (clip) =>
                    {
                        state.Clip = clip;
                        state.Loaded = true;
                        state.Loading = false;

                        tryPlayClip();
                    });
                }

                if (state.Loaded)
                {
                    if (state.Clip == null) continue;

                    if (!delayPassed)
                    {
                        finished = false;
                        continue;
                    }

                    var clipLength = state.Clip.length * 1000;
                    var currentLoop = Mathf.FloorToInt(offsetTime / clipLength);
                    var canLoop = part.IterationCount < 0 || part.IterationCount > currentLoop;

                    if (!canLoop) continue;

                    var shouldLoop = state.CurrentLoop <= currentLoop;

                    if (shouldLoop)
                    {
                        state.ShouldStart = true;
                        state.CurrentLoop = currentLoop + 1;
                    }
                }
                else
                {
                    if (delayPassed && state.CurrentLoop == 0)
                    {
                        state.ShouldStart = true;
                        state.CurrentLoop = 1;
                    }
                }

                if (part.IterationCount < 0 || state.CurrentLoop < part.IterationCount)
                {
                    finished = false;
                }

                tryPlayClip();
            }

            if (finished) StopAudio(false);

            return finished;
        }

        #endregion


        internal void SetParent(StyleState styleState)
        {
            if (Parent != null) Parent.OnUpdate -= ParentUpdated;
            Parent = styleState;
            if (Parent != null) Parent.OnUpdate += ParentUpdated;

            ParentUpdated(Parent?.Active, false);
        }

        void ParentUpdated(NodeStyle active, bool hasLayout)
        {
            Active.Parent = active;
            OnUpdate?.Invoke(Active, false);
        }
    }
}
