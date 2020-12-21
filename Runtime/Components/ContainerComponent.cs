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

    public class ContainerComponent : UnityComponent
    {
        public RectTransform Container { get; protected set; }
        public List<UnityComponent> Children { get; private set; } = new List<UnityComponent>();

        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }
        public UnityComponent BeforePseudo { get; protected set; }
        public UnityComponent AfterPseudo { get; protected set; }

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

        public override void Accept(UnityComponentVisitor visitor)
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
            BeforePseudo = new TextComponent("", Context, "_before");
            BeforePseudo.IsPseudoElement = true;
            BeforePseudo.GameObject.name = "[Before]";
            BeforePseudo.SetParent(this, Children.FirstOrDefault());
        }

        public void RemoveBefore()
        {
            BeforePseudo?.Destroy();
            BeforePseudo = null;
        }

        public void AddAfter()
        {
            if (AfterPseudo != null) return;
            AfterPseudo = new TextComponent("", Context, "_after");
            AfterPseudo.IsPseudoElement = true;
            AfterPseudo.GameObject.name = "[After]";
            AfterPseudo.SetParent(this, Children.LastOrDefault(), true);
        }

        public void RemoveAfter()
        {
            AfterPseudo?.Destroy();
            AfterPseudo = null;
        }
    }
}
