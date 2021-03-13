using ReactUnity.Components;
using ReactUnity.StateHandlers;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{

    public class StateStyles
    {
        public Dictionary<string, NodeStyle> Dic = new Dictionary<string, NodeStyle>();

        public NodeStyle this[string state]
        {
            get
            {
                if (Dic.ContainsKey(state)) return Dic[state];
                SubscribeToState(state);
                var style = new NodeStyle();
                Dic[state] = style;
                return style;
            }
            set => Dic[state] = value;
        }

        public IReactComponent Component;
        public HashSet<string> States = new HashSet<string>();
        public List<NodeStyle> ActiveStates = new List<NodeStyle>();

        public StateStyles(IReactComponent cmp)
        {
            Component = cmp;
        }

        public void SubscribeToState(string state)
        {
            if (Component.Context.StateHandlers.TryGetValue(state, out var handlerClass))
            {
                var existingHandler = Component.GetComponent(handlerClass);
                if (existingHandler != null) return;

                var handler = Component.AddComponent(handlerClass) as IStateHandler;
                if (handler != null)
                {
                    handler.OnStateStart += (e) => StartState(state);
                    handler.OnStateEnd += (e) => EndState(state);
                }
                else Debug.LogError($"The class {handlerClass.Name} does not implement IStateHandler");
            }
        }

        public bool StartState(string state)
        {
            var res = States.Add(state);

            if (res)
            {
                ActiveStates = States.Where(x => Dic.ContainsKey(x)).Select(x => Dic[x]).ToList();
                // TODO: handle sibling selectors (+ and ~)
                Component.Parent.ResolveStyle(true);
            }
            return res;
        }

        public bool EndState(string state)
        {
            var res = States.Remove(state);

            if (res)
            {
                ActiveStates = States.Where(x => Dic.ContainsKey(x)).Select(x => Dic[x]).ToList();
                // TODO: handle sibling selectors (+ and ~)
                Component.Parent.ResolveStyle(true);
            }
            return res;
        }

        public object GetStyleValue(IStyleProperty prop)
        {
            return ActiveStates.Find(x => x.HasValue(prop.name))?.GetStyleValue(prop);
        }

        public bool GetState(string state)
        {
            if (!Dic.ContainsKey(state)) SubscribeToState(state);
            return States.Contains(state);
        }
    }
}
