using System;
using ReactUnity.Styling.Rules;
using ReactUnity.UGUI.EventHandlers;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    public class LabelComponent : UGUIComponent
    {
        LabelClickHandler clickHandler;

        private object forQuery;

        public LabelComponent(UGUIContext context, string tag = "label") : base(context, tag)
        {
            clickHandler = AddComponent<LabelClickHandler>();
            clickHandler.OnEvent += OnClick;
        }


        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "for":
                    forQuery = value;
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void OnClick(BaseEventData ev)
        {
            var activated = Activate();
            if (activated) ev?.Use();
        }

        public bool Activate()
        {
            IReactComponent target;
            if (forQuery != null)
            {
                if (forQuery is IReactComponent cmp) target = cmp;
                else
                {
                    var tree = new RuleTree<string>(Context.StyleParser);
                    tree.AddSelector(Convert.ToString(forQuery));
                    target = tree.GetMatchingChild(Context.Host, this);
                }
            }
            else
            {
                target = QuerySelector(":activatable");
                if (target == null) target = Closest(":activatable");
            }

            if (target is IActivatableComponent ac)
            {
                ac.Activate();
                return true;
            }
            return false;
        }
    }
}
