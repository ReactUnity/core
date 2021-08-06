using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;

namespace ReactUnity
{
    public interface IReactComponent
    {
        ReactContext Context { get; }

        void DestroySelf();
        void Destroy();
        IContainerComponent Parent { get; }

        bool IsPseudoElement { get; }
        YogaNode Layout { get; }
        StyleState StyleState { get; }
        NodeStyle ComputedStyle { get; }
        InlineStyles Style { get; }
        string Id { get; set; }
        string Name { get; }
        string Tag { get; }
        string TextContent { get; }
        string ClassName { get; set; }
        ClassList ClassList { get; }
        StateStyles StateStyles { get; }
        InlineData Data { get; }

        void ApplyLayoutStyles();
        void ResolveStyle(bool recursive = false);
        void Relayout();

        void Update();
        void Accept(ReactComponentVisitor visitor);
        void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false);
        void SetProperty(string property, object value);
        void SetData(string property, object value);
        void SetEventListener(string eventType, Callback callback);
        void FireEvent(string eventName, object arg);

        object GetComponent(Type type);
        object AddComponent(Type type);

        IReactComponent QuerySelector(string query);
        List<IReactComponent> QuerySelectorAll(string query);
    }

    [TypescriptListInterfaces]
    public interface IContainerComponent : IReactComponent
    {
        List<IReactComponent> Children { get; }

        IReactComponent BeforePseudo { get; }
        IReactComponent AfterPseudo { get; }

        List<RuleTreeNode<StyleData>> BeforeRules { get; }
        List<RuleTreeNode<StyleData>> AfterRules { get; }

        void RegisterChild(IReactComponent child, int index = -1);
        void UnregisterChild(IReactComponent child);
    }

    [TypescriptListInterfaces]
    public interface ITextComponent : IReactComponent
    {
        string Content { get; }
        void SetText(string text);
    }

    [TypescriptListInterfaces]
    public interface IHostComponent : IContainerComponent
    {
        float Width { get; }
        float Height { get; }
    }

    public interface IShadowComponent : IReactComponent
    {
        IReactComponent ShadowParent { get; }
    }
}
