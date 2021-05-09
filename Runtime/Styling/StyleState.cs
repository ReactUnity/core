using ReactUnity.Animations;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class StyleState
    {
        private static NodeStyle DefaultStyle = new NodeStyle();
        public NodeStyle Previous { get; private set; }
        public NodeStyle Current { get; private set; }
        public NodeStyle Active { get; private set; }

        public event Action<NodeStyle> OnUpdate;

        private ReactContext Context;

        private TransitionList activeTransitions;
        private DisposableHandle transitionDisposable;
        private float transitionStartTime;

        private AnimationList activeAnimations;
        private DisposableHandle animationDisposable;
        private float animationStartTime;


        public StyleState Parent { get; private set; }


        public StyleState(ReactContext context)
        {
            Context = context;
            SetCurrent(DefaultStyle);
        }

        public void SetCurrent(NodeStyle newStyle)
        {
            if (Current == DefaultStyle) Previous = newStyle;
            else Previous = Current ?? newStyle;

            Current = newStyle;
            RecalculateActive();
        }



        private void RecalculateActive()
        {
            var transition = Current.transition;
            var animation = Current.animation;

            var hasTransition = Current != Previous && (transition != null && transition.Any);
            var hasAnimation = Current != Previous && (animation != null && animation.Any);

            if (!hasTransition) StopTransitions();
            if (!hasAnimation) StopAnimations();

            if (hasTransition || hasAnimation)
            {
                Active = new NodeStyle(null, Current);
                Active.Parent = Parent?.Active;
                if (hasTransition && activeTransitions != transition) StartTransitions(transition);
                if (hasAnimation && activeAnimations != animation) StartAnimations(animation);
            }
            else
            {
                Active = Current;
                ParentUpdated(Parent?.Active);
            }
        }

        #region Transitions
        private void StartTransitions(TransitionList transition)
        {
            StopTransitions();
            activeTransitions = transition;
            transitionStartTime = Time.realtimeSinceStartup;
            var finished = UpdateTransitions(true);
            if (!finished) transitionDisposable = new DisposableHandle(Context.Dispatcher, Context.Dispatcher.OnEveryUpdate(() => UpdateTransitions(false)));
        }

        private void StopTransitions()
        {
            if (transitionDisposable != null)
            {
                transitionDisposable.Dispose();
                transitionDisposable = null;
            }
            activeTransitions = null;
        }

        private bool UpdateTransitions(bool initial)
        {
            var finished = true;

            var currentTime = Time.realtimeSinceStartup;
            var passedTime = (currentTime - transitionStartTime) * 1000;

            foreach (var item in activeTransitions.Transitions)
            {
                var tran = item.Value;
                if (!tran.Valid) continue;

                IEnumerable<IStyleProperty> properties;

                if (item.Value.All) properties = StyleProperties.AllProperties.Where(x => x.transitionable);
                else properties = new List<IStyleProperty>() { StyleProperties.GetStyleProperty(tran.Property) };


                var delayPassed = passedTime >= tran.Delay;

                var offsetTime = passedTime - tran.Delay;

                var t = !delayPassed ? 0 : (tran.Duration == 0 ? 1 : Mathf.Min(Mathf.Max(0, offsetTime / tran.Duration), 1));

                foreach (var sp in properties)
                {
                    if (sp == null) continue;

                    var prevValue = Previous.GetStyleValue(sp);
                    var curValue = Current.GetStyleValue(sp);

                    object activeValue = curValue;

                    if (prevValue != curValue && t < 1)
                    {
                        finished = false;

                        activeValue = prevValue;

                        if (delayPassed)
                        {
                            activeValue = Interpolater.Interpolate(prevValue, curValue, t, tran.TimingFunction, sp.type);
                        }
                    }

                    Active.SetStyleValue(sp, activeValue);
                }
            }

            if (finished) StopTransitions();

            OnUpdate?.Invoke(Active);

            return finished;
        }
        #endregion


        #region Animations
        private void StartAnimations(AnimationList animation)
        {
            StopAnimations();
            activeAnimations = animation;
            animationStartTime = Time.realtimeSinceStartup;
            var finished = UpdateAnimations(true);
            if (!finished) animationDisposable = new DisposableHandle(Context.Dispatcher, Context.Dispatcher.OnEveryUpdate(() => UpdateAnimations(false)));
        }

        private void StopAnimations()
        {
            if (animationDisposable != null)
            {
                animationDisposable.Dispose();
                animationDisposable = null;
            }
            activeAnimations = null;
        }


        private bool UpdateAnimations(bool initial)
        {
            var finished = true;

            var currentTime = Time.realtimeSinceStartup;
            var passedTime = (currentTime - animationStartTime) * 1000;

            foreach (var item in activeAnimations.Animations)
            {
                var anim = item.Value;
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
                        for (int i = 0; i < stepCount;)
                        {
                            var cur = steps[i];
                            Keyframe next = null;

                            for (int j = i + 1; j <= stepCount; j++)
                            {
                                var cand = steps[j];

                                if (cand.Rules.ContainsKey(sp.name) || cand.Offset == 1)
                                {
                                    next = cand;
                                    i = j;
                                }
                            }

                            if (next == null) break;

                            if (step >= cur.Offset && step <= next.Offset)
                            {
                                lowKf = cur;
                                highKf = next;
                                break;
                            }
                        }

                        if (highKf == null || lowKf == null) continue;

                        var stepLength = highKf.Offset - lowKf.Offset;

                        var t = Mathf.Min(Mathf.Max(0, (step - lowKf.Offset) / stepLength), 1);


                        object lowValue, highValue;

                        if (!lowKf.Rules.TryGetValue(sp.name, out lowValue)) lowValue = Current.GetStyleValue(sp);
                        if (!highKf.Rules.TryGetValue(sp.name, out highValue)) highValue = Current.GetStyleValue(sp);


                        if (lowValue != highValue)
                        {
                            finished = false;
                            activeValue = Interpolater.Interpolate(lowValue, highValue, t, anim.TimingFunction, sp.type);
                        }
                        else activeValue = highValue;
                    }

                    Active.SetStyleValue(sp, activeValue);
                }
            }

            if (finished) StopAnimations();

            OnUpdate?.Invoke(Active);

            return finished;
        }
        #endregion


        internal void SetParent(StyleState styleState)
        {
            if (Parent != null) Parent.OnUpdate -= ParentUpdated;
            Parent = styleState;
            if (Parent != null) Parent.OnUpdate += ParentUpdated;

            ParentUpdated(Parent?.Active);
        }


        void ParentUpdated(NodeStyle active)
        {
            Active.Parent = active;
            OnUpdate?.Invoke(Active);
        }
    }
}
