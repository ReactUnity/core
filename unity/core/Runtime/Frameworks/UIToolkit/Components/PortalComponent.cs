using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class PortalComponent : UIToolkitComponent<VisualElement>, IShadowComponent
    {
        VisualElement DefaultTarget => (Context.Host as UIToolkitComponent<VisualElement>).TargetElement;
        public IReactComponent ShadowParent { get; private set; }

        VisualElement currentTarget;

        public bool Detached { get; private set; }
        public VisualElement ReplacedLayout { get; } = new VisualElement();

        public PortalComponent(UIToolkitContext context, string tag = "portal") : base(context, tag)
        {
            ShadowParent = Context.Host;
            currentTarget = DefaultTarget;
            ReplacedLayout.style.display = DisplayStyle.None;
            ReplacedLayout.userData = this;
        }

        void SetTarget(VisualElement target, IReactComponent shadowParent)
        {
            VisualElement newTarget;

            if (target != null)
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

            if (currentTarget != null)
            {
                FireEvent("onUnmount", currentTarget);
                currentTarget = null;
            }

            currentTarget = newTarget;

            if (currentTarget != null)
            {
                FireEvent("onMount", currentTarget);
            }

            Attach();
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            if (Parent is UIToolkitComponent<VisualElement> pp)
            {
                pp.Element?.Remove(ReplacedLayout);
            }

            base.SetParent(newParent, relativeTo, insertAfter);

            if (Parent is UIToolkitComponent<VisualElement> p)
            {
                var oldParent = p.Element;
                if (oldParent != null)
                {
                    var layoutIndex = oldParent.IndexOf(Element);

                    if (layoutIndex >= 0)
                    {
                        oldParent.RemoveAt(layoutIndex);
                        oldParent.Insert(layoutIndex, ReplacedLayout);
                    }
                }
            }

            Attach();
        }

        void Attach()
        {
            if (Parent == null || Destroyed)
            {
                if (Element?.parent != null)
                {
                    Element.RemoveFromHierarchy();

                    ReplacedLayout.RemoveFromHierarchy();
                    Context.DetachedRoots.Remove(this);
                }
                return;
            }

            if (Element != null && Element.parent != currentTarget)
            {
                if (currentTarget != null) currentTarget.Add(Element);
                else Element.RemoveFromHierarchy();

                if (ShadowParent is UIToolkitComponent<VisualElement> sp)
                {
                    sp.Element.Add(Element);
                    Detached = false;
                    Context.DetachedRoots.Remove(this);
                }
                else
                {
                    Detached = true;
                    Context.DetachedRoots.Add(this);
                }

                ResolveStyle(true);
            }
        }

        (VisualElement, IReactComponent) FindTarget(object value)
        {
            if (value == null) return (null, null);
            if (value is VisualElement t) return (t, null);
            if (value is UIToolkitComponent<VisualElement> u) return (u.Element, u);
            return (null, null);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "target":
                    var tg = FindTarget(value);
                    SetTarget(tg.Item1, tg.Item2?.Context == Context ? tg.Item2 : null);
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        protected override void DestroySelf()
        {
            SetTarget(null, null);
            base.DestroySelf();
        }

        public override bool Pool()
        {
            SetTarget(null, null);
            if (!base.Pool()) return false;
            return true;
        }

        public override bool Revive()
        {
            if (!base.Revive()) return false;
            Element.RemoveFromHierarchy();
            return true;
        }
    }
}
