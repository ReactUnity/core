using UnityEngine;

namespace ReactUnity.UGUI
{
    public class PortalComponent : UGUIComponent, IShadowComponent
    {
        RectTransform DefaultTarget => (Context.Host as UGUIComponent)?.Container;
        public IReactComponent ShadowParent { get; private set; }

        RectTransform currentTarget;

        public PortalComponent(UGUIContext context, string tag = "portal") : base(context, tag)
        {
            ShadowParent = Context.Host;
            currentTarget = DefaultTarget;
        }

        void SetTarget(RectTransform target, IReactComponent shadowParent)
        {
            RectTransform newTarget;

            if (target)
            {
                newTarget = target;
                ShadowParent = shadowParent;
            }
            else
            {
                newTarget = DefaultTarget;
                ShadowParent = Context.Host;
            }
            if (currentTarget == newTarget) return;

            if (currentTarget)
            {
                FireEvent("onUnmount", currentTarget);
                currentTarget = null;
            }

            currentTarget = newTarget;

            if (currentTarget)
            {
                FireEvent("onMount", currentTarget);
            }

            Attach();
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            base.SetParent(newParent, relativeTo, insertAfter);
            Attach();
        }

        void Attach()
        {
            if (Parent == null) return;

            if (Container.parent != currentTarget)
            {
                Container.SetParent(currentTarget ? currentTarget : null, false);

                Layout.Parent?.RemoveChild(Layout);
                (ShadowParent ?? Context.Host).Layout.AddChild(Layout);

                ResolveStyle(true);
            }
        }

        RectTransform FindTarget(object value)
        {
            if (value == null) return null;
            if (value is Transform t && t) return t.transform as RectTransform;
            if (value is GameObject g && g) return g.transform as RectTransform;
            if (value is Component c && c) return c.transform as RectTransform;
            if (value is UGUIComponent u) return u.Container;
            return null;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "target":
                    SetTarget(FindTarget(value), value as IReactComponent);
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
