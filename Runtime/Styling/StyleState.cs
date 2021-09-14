using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using ReactUnity.Animations;
using ReactUnity.Types;
using Mathf = UnityEngine.Mathf;

namespace ReactUnity.Styling
{
    public class StyleState
    {
        private class AnimationState
        {
            public string AnimationName;
            public float Ratio = 0;
            public float LastUpdatedAt = 0;
            public float StartedAt = 0;
            public float Duration = 0;
            public float ElapsedTimeSinceRun = 0;
            public bool Ended = false;

            public KeyframeList Keyframes;

            public AnimationState(string name)
            {
                AnimationName = name;
            }

            public AnimationEvent CreateEvent()
            {
                return new AnimationEvent
                {
                    ElapsedTime = Duration * Ratio,
                    Keyframes = Keyframes,
                    AnimationName = AnimationName,
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

            public string PropertyName;

            public TransitionEvent CreateEvent()
            {
                return new TransitionEvent
                {
                    ElapsedTime = Duration * Ratio,
                    PropertyName = PropertyName,
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

        public NodeStyle Previous { get; private set; }
        public NodeStyle Current { get; private set; }
        public NodeStyle Active { get; private set; }

        public event Action<NodeStyle, bool> OnUpdate;
        public event Action<string, object> OnEvent;
        public StyleState Parent { get; private set; }

        private ReactContext Context;


        private Dictionary<string, TransitionState> propertyTransitionStates;
        private CssValueList<float> activeTransitions;
        private bool transitionRunning;


        private Dictionary<string, AnimationState> runningAnimations;
        private CssValueList<string> activeAnimations;
        private bool animationRunning;


        private AudioState[] audioStates;
        private CssValueList<AudioReference> activeAudioList;
        private bool audioRunning;
        private float audioStartTime;

        private bool shouldUpdate;
        private bool shouldUpdateWithLayout;


        public StyleState(ReactContext context)
        {
            Context = context;
        }

        public void SetCurrent(NodeStyle newStyle)
        {
            Previous = Active ?? Current;
            Current = newStyle;
            RecalculateActive();
        }

        private void RecalculateActive()
        {
            var transition = Current.transitionDuration;
            var animation = Current.animationName;

            var hasTransition = Current != Previous && (transition != null && transition.Any() && transition.Get(0) > 0);
            var hasAnimation = Current != Previous && (animation != null && animation.Any());

            if (!hasTransition) StopTransitions(true);
            if (!hasAnimation) StopAnimations(true);

            if (hasTransition || hasAnimation)
            {
                Active = new NodeStyle(Context, Current);
                Active.UpdateParent(Parent?.Active);

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
            shouldUpdate = false;
            shouldUpdateWithLayout = false;
        }

        #region Transitions

        private void StartTransitions(CssValueList<float> transition)
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

            var duration = Current.GetStyleValue(StyleProperties.transitionDuration);
            var delay = Current.GetStyleValue(StyleProperties.transitionDelay);
            var easing = Current.GetStyleValue(StyleProperties.transitionTimingFunction);
            var prop = Current.GetStyleValue(StyleProperties.transitionProperty);
            var playState = Current.GetStyleValue(StyleProperties.transitionPlayState);

            var maxLength = Mathf.Max(prop.Count, duration.Count, easing.Count, delay.Count, playState.Count);

            for (int i = 0; i < maxLength; i++)
            {
                IEnumerable<IStyleProperty> properties = prop.Get(i)?.Properties;
                if (properties == null) continue;

                foreach (var sp in properties)
                {
                    if (sp == null) continue;
                    finished = false;

                    // If there is not a previous state, no need to continue anymore
                    // But transitions may not be finished so return false
                    if (Previous == null) return false;

                    var prevValue = Previous.GetRawStyleValue(sp);
                    var curValue = Current.GetRawStyleValue(sp);

                    propertyTransitionStates.TryGetValue(sp.name, out var state);


                    float ratio = 0;

                    if (state != null)
                    {
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
                            state.Duration = Math.Min(duration.Get(i), state.Ratio * state.Duration);
                            state.Ratio = 0;

                            OnEvent?.Invoke("onTransitionRun", state.CreateEvent());
                        }
                        else
                        {
                            if (state.Ratio < 1) OnEvent?.Invoke("onTransitionCancel", state.CreateEvent());

                            // Start a new transition
                            state.StartedAt = currentTime;
                            state.Duration = duration.Get(i);
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
                        state.Duration = duration.Get(i);
                        state.PropertyName = sp.name;

                        OnEvent?.Invoke("onTransitionRun", state.CreateEvent());
                    }

                    float delta = playState.Get(i) == AnimationPlayState.Paused ? 0 : currentTime - state.LastUpdatedAt;
                    var delayDiff = Math.Max(0, currentTime - state.StartedAt - delay.Get(i));
                    var delayPassed = delayDiff > 0;
                    delta = Math.Min(delayDiff, delta);
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
                        activeValue = Interpolater.Interpolate(prevValue, curValue, ratio, easing.Get(i) ?? TimingFunctions.Default, sp.type);
                    }

                    updated = updated || (Active.GetRawStyleValue(sp) != activeValue);
                    hasLayout = hasLayout || sp.affectsLayout;
                    Active.SetStyleValue(sp, activeValue);
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

        private void StartAnimations(CssValueList<string> animation)
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

                if (activeAnimations == null || !activeAnimations.Any(x => x == ra.Key))
                {
                    if (!ra.Value.Ended) OnEvent?.Invoke("onAnimationCancel", ra.Value.CreateEvent());
                    runningAnimations.Remove(ra.Key);
                }
            }
        }


        private bool UpdateAnimations()
        {
            if (activeAnimations == null ||
                activeAnimations.Count == 0) return true;

            var delay = Current.animationDelay;
            var direction = Current.animationDirection;
            var duration = Current.animationDuration;
            var fillMode = Current.animationFillMode;
            var iterationCount = Current.animationIterationCount;
            var name = Current.animationName;
            var playState = Current.animationPlayState;
            var timingFunction = Current.animationTimingFunction;

            var maxLength = Mathf.Max(delay.Count, direction.Count, duration.Count, fillMode.Count,
                iterationCount.Count, name.Count, playState.Count, timingFunction.Count);

            var updated = false;
            var finished = true;
            var hasLayout = false;

            var currentTime = getTime();

            for (int ind = 0; ind < maxLength; ind++)
            {
                var nm = name.Get(ind);
                var dr = duration.Get(ind);
                var dir = direction.Get(ind);
                var fm = fillMode.Get(ind);
                var it = iterationCount.Get(ind, 1);

                if (!runningAnimations.TryGetValue(nm, out var state))
                {
                    var kfs = Context.Style.GetKeyframes(nm);
                    if (kfs == null) continue;
                    if (!kfs.Valid) continue;

                    runningAnimations[nm] = state = new AnimationState(nm);
                    state.Keyframes = kfs;
                    state.Duration = dr;
                    state.LastUpdatedAt = currentTime;
                    state.StartedAt = currentTime;

                    OnEvent?.Invoke("onAnimationRun", state.CreateEvent());
                }
                else
                {
                    state.Duration = dr;
                }

                float delta = playState.Get(ind) == AnimationPlayState.Paused ? 0 : currentTime - state.LastUpdatedAt;
                state.ElapsedTimeSinceRun += delta;

                var delayDiff = state.ElapsedTimeSinceRun - delay.Get(ind);
                var delayPassed = delayDiff > 0;
                var ratio = delayDiff / dr;
                var maxRatio = it >= 0 ? it : float.MaxValue;
                ratio = Math.Max(0, Math.Min(ratio, maxRatio));

                var ended = dr <= 0 || (it >= 0 && ratio >= it);

                var cycle = dr == 0 ? 0 : Mathf.FloorToInt(ratio);
                var cycleOffset = ratio - cycle;

                var even = cycle % 2 == 0;

                var reverse = dir == AnimationDirection.Reverse
                    || (dir == AnimationDirection.Alternate && !even)
                    || (dir == AnimationDirection.AlternateReverse && even);


                var step = !delayPassed ? 0 : (dr == 0 ? 1 : Mathf.Min(Mathf.Max(0, cycleOffset), 1));
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

                        if ((fm == AnimationFillMode.Forwards && ended)
                            || (fm == AnimationFillMode.Backwards && !delayPassed)
                            || fm == AnimationFillMode.Both)
                        {
                            var fillReverse = ended ? (dir == AnimationDirection.Reverse
                                    || (dir == AnimationDirection.Alternate && it % 2 == 0)
                                    || (dir == AnimationDirection.AlternateReverse && it % 2 != 0))
                                    : !(dir == AnimationDirection.Reverse || dir == AnimationDirection.AlternateReverse);

                            if (!(fillReverse ? keyframes.From : keyframes.To).Rules.TryGetValue(sp, out activeValue))
                                activeValue = Current.GetRawStyleValue(sp);
                        }
                        else activeValue = Current.GetRawStyleValue(sp);
                    }
                    else
                    {
                        Keyframe lowKf = null;
                        Keyframe highKf = null;

                        for (int i = 0; i < stepCount; i++)
                        {
                            var cur = steps[i];
                            if (step >= cur.Offset && cur.Rules.ContainsKey(sp))
                            {
                                lowKf = cur;
                            }
                        }

                        for (int i = 1; i <= stepCount; i++)
                        {
                            var cur = steps[i];
                            if (step <= cur.Offset && cur.Rules.ContainsKey(sp))
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

                        if (!lowKf.Rules.TryGetValue(sp, out lowValue)) lowValue = Current.GetRawStyleValue(sp);
                        if (!highKf.Rules.TryGetValue(sp, out highValue)) highValue = Current.GetRawStyleValue(sp);

                        if (lowValue != highValue)
                        {
                            activeValue = Interpolater.Interpolate(lowValue, highValue, t, timingFunction.Get(ind) ?? TimingFunctions.Default, sp.type);
                        }
                        else activeValue = highValue;
                    }

                    updated = updated || (Active.GetRawStyleValue(sp) != activeValue);
                    hasLayout = hasLayout || sp.affectsLayout;
                    Active.SetStyleValue(sp, activeValue);

                    if (sp == StyleProperties.audioClip)
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
            var audio = Active.audioClip;

            if (audio == null) StopAudio(true);
            else if (activeAudioList != audio) StartAudio(audio);
        }

        private void StartAudio(CssValueList<AudioReference> audio)
        {
            StopAudio(true);
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
            var finished = true;

            var currentTime = getTime();
            var passedTime = currentTime - audioStartTime;

            var clip = Current.audioClip;
            var delay = Current.audioDelay;
            var iterationCount = Current.audioIterationCount;

            var maxLength = Mathf.Max(delay.Count, iterationCount.Count, clip.Count);

            if (audioStates == null) audioStates = new AudioState[maxLength];

            for (int i = 0; i < maxLength; i++)
            {
                var it = iterationCount.Get(i, 1);
                if (it == 0) continue;

                var state = audioStates[i] = audioStates[i] ?? new AudioState();


                Action tryPlayClip = () => {
                    if (state.Loaded && state.ShouldStart)
                    {
                        state.ShouldStart = false;
                        Context.PlayAudio(state.Clip);
                    }
                };


                var offsetTime = passedTime - delay.Get(i);
                var delayPassed = offsetTime >= 0;

                if (!state.Loaded && !state.Loading)
                {
                    state.Loading = true;

                    clip.Get(i, AudioReference.None).Get(Context, (clip) => {
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
                    var canLoop = it < 0 || it > currentLoop;

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

                if (it < 0 || state.CurrentLoop < it)
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
            Active?.UpdateParent(active);
            OnUpdate?.Invoke(Active, false);
        }
    }
}
