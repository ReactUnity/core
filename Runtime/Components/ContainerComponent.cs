using ReactUnity.Styling;
using ReactUnity.Types;
using System;
using System.Collections;
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

        protected ContainerComponent(RectTransform existing) : base(existing)
        {
            Container = existing;
        }

        public ContainerComponent() : base()
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

        public virtual void SetOpacity(float v)
        {
            var group = CanvasGroup ?? GameObject.AddComponent<CanvasGroup>();

            group.alpha = v;
        }



        public override void ApplyStyles()
        {
            base.ApplyStyles();
            SetBackgroundColor(Style.resolved.backgroundColor);
            SetZOrder(Style.resolved.zOrder);
            SetBorderRadius(Style.resolved.borderRadius);
        }

        protected virtual void SetBackgroundColor(Color? color)
        {
            if (MainGraphic || color.HasValue)
            {
                var image = GetBackgroundGraphic();

                image.color = color ?? Color.clear;
            }
        }

        protected virtual void SetBorderRadius(int radius)
        {
            if (radius > 0)
            {
                var image = MainGraphic as Image;

                if (!image)
                {
                    if (MainGraphic) GameObject.DestroyImmediate(MainGraphic);
                    MainGraphic = image = GameObject.AddComponent<Image>();
                }

                Observable.EveryLateUpdate().First().TakeUntilDestroy(GameObject).Subscribe((x) =>
                {
                    var sprite = BorderGraphic.CreateBorderSprite(radius);
                    image.sprite = sprite;
                    image.type = Image.Type.Sliced;
                    image.pixelsPerUnitMultiplier = 100;
                    image.color = Style.resolved.backgroundColor ?? Color.clear;
                });
            }
        }

        protected virtual void SetZOrder(int? z)
        {
            Canvas canvas = Canvas;
            if (!canvas && !z.HasValue) return;
            if (!canvas)
            {
                canvas = GameObject.AddComponent<Canvas>();
                GameObject.AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = true;
            canvas.sortingOrder = z ?? 0;
        }
    }
}
