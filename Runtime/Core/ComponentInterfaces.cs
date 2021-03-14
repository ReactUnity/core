using Facebook.Yoga;
using ReactUnity.Interop;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections.Generic;

namespace ReactUnity
{
    public interface IReactComponent
    {
        ReactContext Context { get; }

        void Destroy();
        IContainerComponent Parent { get; }

        bool IsPseudoElement { get; }
        YogaNode Layout { get; }
        NodeStyle Style { get; }
        string Name { get; }
        string Tag { get; }
        string ClassName { get; }

        HashSet<string> ClassList { get; }
        StateStyles StateStyles { get; }
        Dictionary<string, object> Data { get; }

        void ApplyLayoutStyles();
        void ScheduleLayout(Action callback = null);
        void ResolveStyle(bool recursive = false);

        void Accept(ReactComponentVisitor visitor);
        void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false);
        void SetProperty(string property, object value);
        void SetData(string property, object value);
        void SetEventListener(string eventType, Callback callback);

        public object GetComponent(Type type);
        public object AddComponent(Type type);

    }

    public interface IContainerComponent : IReactComponent
    {
        List<IReactComponent> Children { get; }

        IReactComponent BeforePseudo { get; }
        IReactComponent AfterPseudo { get; }

        public List<RuleTreeNode<StyleData>> BeforeRules { get; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; }

        void RegisterChild(IReactComponent child, int index = -1);
        void UnregisterChild(IReactComponent child);
    }

    public interface ITextComponent : IReactComponent
    {
        void SetText(string text);
    }

    public interface IHostComponent : IContainerComponent
    {
    }
}
