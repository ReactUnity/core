using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;
using UniRx;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{

    public class ContainerComponent : UnityComponent
    {
        public RectTransform Container { get; private set; }
        public List<UnityComponent> Children { get; private set; } = new List<UnityComponent>();

        public CanvasGroup CanvasGroup => GameObject.GetComponents<CanvasGroup>().FirstOrDefault();
        public Canvas Canvas => GameObject.GetComponents<Canvas>().FirstOrDefault();

        protected ContainerComponent(RectTransform existing, UnityUGUIContext context) : base(existing, context)
        {
            Container = existing;
        }

        public ContainerComponent(UnityUGUIContext context) : base(context)
        {
            Container = RectTransform;
        }

        public override void ResolveStyle()
        {
            base.ResolveStyle();

            foreach (var child in Children)
            {
                child.ResolveStyle();
            }
        }

        public virtual void SetInteractable(bool v)
        {
            var group = CanvasGroup;
            if (!group) group = GameObject.AddComponent<CanvasGroup>();

            group.interactable = v;
            group.blocksRaycasts = v;
        }


        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();
            SetBorderSize(Layout.BorderWidth);
        }


        public override void ApplyStyles()
        {
            base.ApplyStyles();
            SetBackgroundColor(Style.resolved.backgroundColor);
            SetZOrder(Style.resolved.zOrder);
            SetOpacity(Style.resolved.opacity);
            SetBorderRadius(Style.resolved.borderRadius);
            SetBorderColor(Style.resolved.borderColor);
        }

        public virtual void SetOpacity(float v)
        {
            var group = CanvasGroup;
            if (!group && v == 1) return;

            if(!group) group = GameObject.AddComponent<CanvasGroup>();
            group.alpha = v;
        }

        protected virtual void SetBackgroundColor(Color? color)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBackgroundColor(color ?? Color.clear);
        }

        protected virtual void SetBorderRadius(int radius)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();

            Observable.EveryLateUpdate().First().TakeUntilDestroy(GameObject).Subscribe((x) =>
            {
                var sprite = BorderGraphic.CreateBorderSprite(radius);
                image.SetBorderImage(sprite);
            });
        }

        protected virtual void SetBorderColor(Color? color)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderColor(color ?? Color.clear);
        }

        protected virtual void SetBorderSize(float size)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderSize(size);
        }

        protected bool HasBorderOrBackground()
        {
            if (MainGraphic != null) return true;

            var borderSize = Layout.BorderWidth;
            if (borderSize > 0 && !float.IsNaN(borderSize)) return true;

            var resolved = Style.resolved;
            if (resolved.borderRadius > 0 && resolved.borderColor.HasValue) return true;
            if (resolved.backgroundColor.HasValue) return true;

            return false;
        }

        protected virtual void SetZOrder(int z)
        {
            Canvas canvas = Canvas;
            if (!canvas && z == 0) return;
            if (!canvas)
            {
                canvas = GameObject.AddComponent<Canvas>();
                GameObject.AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = true;
            canvas.sortingOrder = z;
        }
    }
}
