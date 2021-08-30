using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class StateStyles
    {
        public HashSet<string> Subscribed { get; } = new HashSet<string>();
        private readonly HashSet<string> States = new HashSet<string>();
        private readonly IReactComponent Component;

        public StateStyles(IReactComponent cmp)
        {
            Component = cmp;
        }

        public IStateHandler SubscribeToState(string state)
        {
            if (Component.Context.StateHandlers.TryGetValue(state, out var handlerClass))
            {
                var existingHandler = Component.GetComponent(handlerClass);
                if (existingHandler != null) return existingHandler as IStateHandler;

                var handler = Component.AddComponent(handlerClass) as IStateHandler;
                if (handler != null)
                {
                    handler.OnStateStart += () => StartState(state);
                    handler.OnStateEnd += () => EndState(state);
                }
                else Debug.LogError($"The class {handlerClass.Name} does not implement IStateHandler");
                return handler;
            }
            return null;
        }

        public bool StartState(string state)
        {
            var res = States.Add(state) && Subscribed.Contains(state);

            if (res)
            {
                Component.MarkStyleUpdateWithSiblings(true);
            }
            return res;
        }

        public bool EndState(string state)
        {
            var res = States.Remove(state) && Subscribed.Contains(state);

            if (res)
            {
                Component.MarkStyleUpdateWithSiblings(true);
            }
            return res;
        }

        public bool GetStateOrSubscribe(string state)
        {
            if (Subscribed.Add(state)) SubscribeToState(state);
            return States.Contains(state);
        }
    }
}
