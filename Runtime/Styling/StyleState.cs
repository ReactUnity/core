using Facebook.Yoga;
using ReactUnity.Animations;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class StyleState
    {
        private class TransitionState
        {
            public object FromValue;
            public object ToValue;
            public float Ratio = 0;
            public float LastUpdatedAt = 0;
            public float StartedAt = 0;
            public float Duration = 0;
        }

        private class AudioState
        {
            public bool Loaded;
            public bool Loading;
            public AudioClip Clip;
            public bool ShouldStart;
            public int CurrentLoop = 0;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private static float getTime() => Time.realtimeSinceStartup * 1000;

        private static NodeStyle DefaultStyle = new NodeStyle();
        public NodeStyle Previous { get; private set; }
        public NodeStyle Current { get; private set; }
        public NodeStyle Active { get; private set; }

        public event Action<NodeStyle, bool> OnUpdate;
        public StyleState Parent { get; private set; }

        private ReactContext Context;
        private YogaNode Layout;
        private YogaNode DefaultLayout;


        private Dictionary<string, TransitionState> propertyTransitionStates;
        private TransitionList activeTransitions;
        private bool transitionRunning;


        private AnimationList activeAnimations;
        private bool animationRunning;
        private float animationStartTime;


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


                    float t = 0;
                    float lastUpdated = currentTime;

                    if (state != null)
                    {
                        lastUpdated = state.LastUpdatedAt;
                        if (state.FromValue == prevValue && state.ToValue == curValue)
                        {
                            t = state.Ratio;

                            if (t >= 1)
                            {
                                state.LastUpdatedAt = currentTime;
                                continue;
                            }
                        }
                        else if (state.FromValue == curValue)
                        {
                            state.Duration = Math.Min(tran.Duration, state.Ratio * state.Duration);
                            state.StartedAt = currentTime;
                        }
                        else
                        {
                            state.StartedAt = currentTime;
                            state.Duration = tran.Duration;
                        }
                    }
                    else
                    {
                        propertyTransitionStates[sp.name] = state = new TransitionState();
                        state.StartedAt = currentTime;
                        state.Duration = tran.Duration;
                    }


                    float delta = currentTime - lastUpdated;
                    var delayPassed = (currentTime - state.StartedAt) >= tran.Delay;
                    var tDelta = !delayPassed ? 0 : (state.Duration == 0 ? 1 : delta / state.Duration);
                    t = Mathf.Min(Mathf.Max(0, t + tDelta), 1);

                    state.FromValue = prevValue;
                    state.ToValue = curValue;
                    state.Ratio = t;
                    state.LastUpdatedAt = currentTime;

                    object activeValue = curValue;

                    if (prevValue != curValue && t < 1)
                    {
                        activeValue = prevValue;

                        if (delayPassed && t > 0)
                        {
                            activeValue = Interpolater.Interpolate(prevValue, curValue, t, tran.TimingFunction, sp.type);
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
            StopAnimations(true);
            activeAnimations = animation;
            animationStartTime = getTime();
            var finished = UpdateAnimations();
            if (!finished) animationRunning = true;
        }

        private void StopAnimations(bool reset)
        {
            animationRunning = false;
            if (reset)
            {
                activeAnimations = null;
            }
        }


        private bool UpdateAnimations()
        {
            if (activeAnimations?.Items == null) return true;

            var updated = false;
            var finished = true;
            var hasLayout = false;

            var currentTime = getTime();
            var passedTime = currentTime - animationStartTime;

            for (int animIndex = 0; animIndex < activeAnimations.Items.Length; animIndex++)
            {
                var anim = activeAnimations.Items[animIndex];
                if (!anim.Valid) continue;

                if (!Context.Keyframes.TryGetValue(anim.Name, out var keyframes)) continue;
                if (!keyframes.Valid) continue;

                var steps = keyframes.Steps;
                var properties = keyframes.Properties;

                var started = passedTime >= anim.Delay;

                var startOffset = passedTime - anim.Delay;

                var ended = anim.Duration <= 0 || (anim.IterationCount >= 0 && startOffset >= (anim.IterationCount * anim.Duration));

                var cycle = anim.Duration == 0 ? 0 : Mathf.FloorToInt(startOffset / anim.Duration);
                var cycleStart = anim.Duration * cycle;
                var cycleOffset = startOffset - cycleStart;

                var even = cycle % 2 == 0;

                var reverse = anim.Direction == AnimationDirection.Reverse
                    || (anim.Direction == AnimationDirection.Alternate && !even)
                    || (anim.Direction == AnimationDirection.AlternateReverse && even);


                var step = !started ? 0 : (anim.Duration == 0 ? 1 : Mathf.Min(Mathf.Max(0, cycleOffset / anim.Duration), 1));
                if (reverse) step = 1 - step;

                var stepCount = steps.Count - 1;

                foreach (var sp in properties)
                {
                    if (sp == null) continue;

                    object activeValue;

                    if (ended || !started)
                    {
                        if (!started) finished = false;

                        if ((anim.FillMode == AnimationFillMode.Forwards && ended)
                            || (anim.FillMode == AnimationFillMode.Backwards && !started)
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
