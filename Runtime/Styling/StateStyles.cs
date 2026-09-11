using System.Collections.Generic;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class StateStyles
    {
        public HashSet<string> Subscribed { get; } = new HashSet<string>();
        private readonly HashSet<string> States = new HashSet<string>();
        private readonly IReactComponent Component;

        /// <summary>
        /// Set once a <c>:has()</c> has been evaluated on the element, after which a change below it
        /// or after it re-resolves it and everything that follows it. It stays set for the element's
        /// life: the rule that evaluated it may belong to some other element, which a resolve of this
        /// one would not run again, so clearing it here could miss a dependency.
        /// </summary>
        public bool HasAnchor { get; set; }

        /// <summary>Set once a @container rule or a container unit has read this element as its container.</summary>
        public QueryContainerState QueryContainer { get; set; }

        public StateStyles(IReactComponent cmp)
        {
            Component = cmp;
        }

        public IStateHandler SubscribeToState(string state, bool declared = false)
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

            if (!declared) WarnUnknownState(state);
            return null;
        }

        private static readonly HashSet<string> Warned = new HashSet<string>();

        // A pseudo-class this engine does not have parses as a custom state and then never matches,
        // which is indistinguishable from a rule that is simply wrong. Once per name is enough.
        private static void WarnUnknownState(string state)
        {
            if (state == "enter" || state == "leave" || !Warned.Add(state)) return;
            Debug.LogWarning($"':{state}' is not a pseudo-class ReactUnity knows. It matches only while a state named '{state}' is started on the element.");
        }

        public bool StartState(string state)
        {
            var res = States.Add(state) && Subscribed.Contains(state);

            if (res)
            {
                Component.MarkForStyleResolvingWithSiblings(true);
            }
            return res;
        }

        public bool EndState(string state)
        {
            var res = States.Remove(state) && Subscribed.Contains(state);

            if (res)
            {
                Component.MarkForStyleResolvingWithSiblings(true);
            }
            return res;
        }

        public bool GetState(string state) => States.Contains(state);

        /// <summary>
        /// Whether the state is on, subscribing to it on first use. <paramref name="declared"/> is a
        /// name written as <c>:state(name)</c>, which is a custom state on purpose and not warned about.
        /// </summary>
        public bool GetStateOrSubscribe(string state, bool declared = false)
        {
            if (Subscribed.Add(state)) SubscribeToState(state, declared);
            return States.Contains(state);
        }

        public void Clear()
        {
            Subscribed.Clear();
            States.Clear();
            HasAnchor = false;
            QueryContainer = null;
        }
    }
}
