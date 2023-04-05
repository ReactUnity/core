using Facebook.Yoga;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class PortalComponent : UGUIComponent, IShadowComponent
    {
        RectTransform DefaultTarget => (Context.Host as UGUIComponent)?.Container;
        public IReactComponent ShadowParent { get; private set; }

        Transform currentTarget;
        Camera currentCamera;

        public bool Detached { get; private set; }
        public YogaNode ReplacedLayout { get; } = new YogaNode();

        public PortalComponent(UGUIContext context, string tag = "portal") : base(context, tag)
        {
            ShadowParent = Context.Host;
            currentTarget = DefaultTarget;
            ReplacedLayout.Display = YogaDisplay.None;
            ReplacedLayout.Data = this;
            InitializeCanvas();
            SetCamera(null);
        }

        void SetTarget(Transform target, IReactComponent shadowParent)
        {
            Transform newTarget;

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
            if (Parent != null)
            {
                Parent.Layout?.RemoveChild(ReplacedLayout);
            }

            base.SetParent(newParent, relativeTo, insertAfter);

            if (Parent != null)
            {
                var oldParent = Parent.Layout;
                if (oldParent != null)
                {
                    var layoutIndex = oldParent.IndexOf(Layout);

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
                if (Container && Container.parent)
                {
                    Container.SetParent(null);
                    Layout.Parent?.RemoveChild(Layout);
                    ReplacedLayout.Parent?.RemoveChild(ReplacedLayout);
                    Context.DetachedRoots.Remove(this);
                }
                return;
            }

            if (Container && Container.parent != currentTarget)
            {
                Container.SetParent(currentTarget ? currentTarget : null, false);

                Layout.Parent?.RemoveChild(Layout);
                if (ShadowParent != null)
                {
                    ShadowParent.Layout.AddChild(Layout);
                    Detached = false;
                    Context.DetachedRoots.Remove(this);
                    SetCamera(currentCamera);
                }
                else
                {
                    Detached = true;
                    Context.DetachedRoots.Add(this);
                    SetCamera(currentCamera);
                }

                if (currentTarget)
                    UnityHelpers.SetLayersRecursively(GameObject.transform, currentTarget.gameObject.layer);

                ResolveStyle(true);
            }
        }

        (Transform, IReactComponent) FindTarget(object value)
        {
            if (value == null) return (null, null);
            if (value is Transform t && t) return (t, t.GetComponentInParent<ReactElement>()?.Component);
            if (value is GameObject g && g) return (g.transform, g.GetComponentInParent<ReactElement>()?.Component);
            if (value is Component c && c) return (c.transform, c.GetComponentInParent<ReactElement>()?.Component);
            if (value is UGUIComponent u) return (u.Container, u);
            return (null, null);
        }

        void SetCamera(Camera camera)
        {
            currentCamera = camera;

            var canvas = Canvas;
            if (Detached && canvas.renderMode != RenderMode.ScreenSpaceOverlay && canvas.isActiveAndEnabled)
                canvas.worldCamera = currentCamera ?? Context.RootCanvas?.worldCamera;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "eventCamera":
                    SetCamera(UnityHelpers.ConvertToComponent<Camera>(value));
                    break;
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
            if (GameObject) GameObject.DestroyImmediate(GameObject);
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
            RectTransform.SetParent(null, false);
            SetCamera(currentCamera);
            return true;
        }
    }
}
