using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Interop;
using UnityEngine;
using UnityEngine.UI;
using ReactUnity.Visitors;
using ReactUnity.StyleEngine;

namespace ReactUnity.Components
{

    public class ContainerComponent : UnityComponent, IContainerComponent
    {
        public RectTransform Container { get; protected set; }
        public List<IReactComponent> Children { get; private set; } = new List<IReactComponent>();

        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }
        public IReactComponent BeforePseudo { get; protected set; }
        public IReactComponent AfterPseudo { get; protected set; }

        protected ContainerComponent(RectTransform existing, UGUIContext context) : base(existing, context)
        {
            Container = existing;
        }

        public ContainerComponent(UGUIContext context, string tag) : base(context, tag)
        {
            Container = RectTransform;
        }

        public override void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = Style.HasInheritedChanges;
            base.ResolveStyle(recursive);

            if (inheritedChanges || recursive)
            {
                BeforeRules = Context.StyleTree.GetMatchingBefore(this).ToList();
                if (BeforeRules.Count > 0) AddBefore();
                else RemoveBefore();
                BeforePseudo?.ResolveStyle();

                foreach (var child in Children)
                    child.ResolveStyle(true);

                AfterRules = Context.StyleTree.GetMatchingAfter(this).ToList();
                if (AfterRules.Count > 0) AddAfter();
                else RemoveAfter();
                AfterPseudo?.ResolveStyle();
            }
        }

        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();

            BeforePseudo?.ApplyLayoutStyles();
            foreach (var child in Children)
                child.ApplyLayoutStyles();
            AfterPseudo?.ApplyLayoutStyles();
        }

        public override void Accept(ReactComponentVisitor visitor)
        {
            base.Accept(visitor);

            BeforePseudo?.Accept(visitor);
            foreach (var child in Children)
                child.Accept(visitor);
            AfterPseudo?.Accept(visitor);
        }

        public void AddBefore()
        {
            if (BeforePseudo != null) return;
            var tc = new TextComponent("", Context, "_before"); ;
            BeforePseudo = tc;
            tc.IsPseudoElement = true;
            tc.GameObject.name = "[Before]";
            tc.SetParent(this, Children.FirstOrDefault());
        }

        public void RemoveBefore()
        {
            BeforePseudo?.Destroy();
            BeforePseudo = null;
        }

        public void AddAfter()
        {
            if (AfterPseudo != null) return;
            var tc = new TextComponent("", Context, "_after");
            AfterPseudo = tc;
            tc.IsPseudoElement = true;
            tc.GameObject.name = "[After]";
            tc.SetParent(this, Children.LastOrDefault(), true);
        }

        public void RemoveAfter()
        {
            AfterPseudo?.Destroy();
            AfterPseudo = null;
        }

        public void RegisterChild(IReactComponent child)
        {
            if (child is UnityComponent u)
                u.RectTransform.SetParent(Container, false);
        }
    }
}
