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
        IContainerComponent Parent { get; }

        bool IsPseudoElement { get; }
        bool Destroyed { get; }
        bool Entering { get; }
        bool Leaving { get; }
        YogaNode Layout { get; }
        StyleState StyleState { get; }
        NodeStyle ComputedStyle { get; }
        InlineStyles Style { get; }
        string Id { get; set; }
        string Name { get; set; }
        string Tag { get; }
        string TextContent { get; }
        string ClassName { get; set; }
        ClassList ClassList { get; }
        StateStyles StateStyles { get; }
        WatchableObjectRecord Data { get; }

        void ApplyLayoutStyles();
        void ResolveStyle(bool recursive = false);
        void Update();
        void Accept(ReactComponentVisitor visitor);
        void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false);
        void SetProperty(string property, object value);
        void SetData(string property, object value);
        void SetEventListener(string eventType, Callback callback);
        Action AddEventListener(string eventType, Callback callback);
        void FireEvent(string eventName, object arg);

        object GetComponent(Type type);
        object AddComponent(Type type);

        void MarkForStyleResolving(bool recursive);
        void MarkStyleUpdateWithSiblings(bool recursive);

        bool Matches(string query);
        IReactComponent Closest(string query);
        IReactComponent QuerySelector(string query);
        List<IReactComponent> QuerySelectorAll(string query);

        void Remove();
        void Destroy(bool recursive = true);

        float ScrollLeft { get; set; }
        float ScrollTop { get; set; }
        float ScrollWidth { get; }
        float ScrollHeight { get; }
        float ClientWidth { get; }
        float ClientHeight { get; }
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

    public interface IActivatableComponent : IReactComponent
    {
        bool Disabled { get; }
        void Activate();
    }

    public interface IToggleComponent : IActivatableComponent
    {
        bool Checked { get; }
        bool Indeterminate { get; }
    }

    public interface IInputComponent : IActivatableComponent
    {
        string Value { get; }
        bool ReadOnly { get; }
        bool PlaceholderShown { get; }
    }
}
