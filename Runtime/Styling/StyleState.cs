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

        private float startTime;

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
            StopTransitions();
            RecalculateActive();
        }



        private void RecalculateActive()
        {
            var transition = Current.transition;

            if (Current != Previous && transition != null && transition.Any)
            {
                Active = new NodeStyle(null, Current);
                Active.Parent = Parent?.Active;
                StartTransitions();
            }
            else
            {
                Active = Current;
                ParentUpdated(Parent?.Active);
            }
        }

        private void StartTransitions()
        {
            StopTransitions();
            activeTransitions = Current.transition;
            startTime = Time.realtimeSinceStartup;
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
        }

        private bool UpdateTransitions(bool initial)
        {
            var finished = true;

            var currentTime = Time.realtimeSinceStartup;
            var passedTime = (currentTime - startTime) * 1000;

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
