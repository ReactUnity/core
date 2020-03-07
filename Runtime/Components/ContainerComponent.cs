using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Interop;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{

    public class ContainerComponent : UnityComponent
    {
        public RectTransform Container { get; protected set; }
        public List<UnityComponent> Children { get; private set; } = new List<UnityComponent>();

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

            foreach (var child in Children)
            {
                child.ApplyLayoutStyles();
            }
        }
    }
}
