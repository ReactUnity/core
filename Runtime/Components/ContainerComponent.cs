using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Interop;
using UnityEngine;
using UnityEngine.UI;
using ReactUnity.Visitors;

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

        public ContainerComponent(UnityUGUIContext context, string tag) : base(context, tag)
        {
            Container = RectTransform;
        }

        public override void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = Style.HasInheritedChanges;
            base.ResolveStyle(recursive);

            if (inheritedChanges || recursive)
            {
                foreach (var child in Children)
                {
                    child.ResolveStyle(true);
                }
            }
        }

        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();

            foreach (var child in Children)
            {
                child.ApplyLayoutStyles();
            }
        }

        public override void Accept(UnityComponentVisitor visitor)
        {
            base.Accept(visitor);

            foreach (var child in Children)
            {
                child.Accept(visitor);
            }
        }
    }
}
