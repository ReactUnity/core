using ReactUnity.Components;
using ReactUnity.StateHandlers;
using System.Collections.Generic;
using System.Linq;

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

        public UnityComponent Component;
        public HashSet<string> States = new HashSet<string>();
        public List<NodeStyle> ActiveStates = new List<NodeStyle>();

        public StateStyles(UnityComponent cmp)
        {
            Component = cmp;
        }

        public void SubscribeToState(string state)
        {
            if (state == "hover")
            {
                var handler = Component.GameObject.AddComponent<HoverStateHandler>();
                handler.OnStateStart += (e) => StartState(state);
                handler.OnStateEnd += (e) => EndState(state);
            }
        }

        public bool StartState(string state)
        {
            var res = States.Add(state);

            if (res)
            {
                ActiveStates = States.Where(x => Dic.ContainsKey(x)).Select(x => Dic[x]).ToList();
                Component.ResolveStyle();
            }
            return res;
        }

        public bool EndState(string state)
        {
            var res = States.Remove(state);

            if (res)
            {
                ActiveStates = States.Where(x => Dic.ContainsKey(x)).Select(x => Dic[x]).ToList();
                Component.ResolveStyle();
            }
            return res;
        }

        public object GetStyleValue(string name)
        {
            return ActiveStates.Find(x => x.HasValue(name))?.GetStyleValue(name);
        }

        public object GetStyleValue(StyleProperty prop)
        {
            return ActiveStates.Find(x => x.HasValue(prop.name))?.GetStyleValue(prop);
        }
    }
}
