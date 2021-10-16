using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;

namespace ReactUnity
{
    public class NoopComponent : IContainerComponent
    {
        public NoopComponent(ReactContext ctx, string tag)
        {
            Context = ctx;
            Tag = tag;
        }

        public ReactContext Context { get; }
        public IContainerComponent Parent { get; protected set; }
        public bool IsPseudoElement { get; }
        public bool Destroyed { get; private set; }
        public bool Entering { get; }
        public bool Leaving { get; }
        public YogaNode Layout { get; }
        public StyleState StyleState { get; }
        public NodeStyle ComputedStyle { get; }
        public InlineStyles Style { get; }
        public StyleSheet InlineStylesheet { get; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Tag { get; }
        public string TextContent { get; }
        public string ClassName { get; set; }
        public ClassList ClassList { get; }
        public StateStyles StateStyles { get; }
        public WatchableObjectRecord Data { get; }
        public int ParentIndex { get; }
        public int CurrentOrder { get; }
        public float ScrollLeft { get; set; }
        public float ScrollTop { get; set; }
        public float ScrollWidth { get; }
        public float ScrollHeight { get; }
        public float ClientWidth { get; }
        public float ClientHeight { get; }
        public List<IReactComponent> Children { get; }
        public IReactComponent BeforePseudo { get; }
        public IReactComponent AfterPseudo { get; }
        public List<RuleTreeNode<StyleData>> BeforeRules { get; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; }
        public void ApplyLayoutStyles() { }
        public void ResolveStyle(bool recursive = false) { }
        public void Update() { }
        public void Accept(ReactComponentVisitor visitor) { }
        public void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false) => Parent = parent;
        public void SetProperty(string property, object value) { }
        public void SetData(string property, object value) { }
        public void SetEventListener(string eventType, Callback callback) { }
        public void FireEvent(string eventName, object arg) { }
        public void MarkForStyleResolving(bool recursive) { }
        public void MarkStyleUpdateWithSiblings(bool recursive) { }
        public void Remove() { }
        public void Destroy(bool recursive = true) => Destroyed = true;
        public void RegisterChild(IReactComponent child, int index = -1) { }
        public void UnregisterChild(IReactComponent child) { }
        public Action AddEventListener(string eventType, Callback callback) => () => { };
        public object GetComponent(Type type) => null;
        public object AddComponent(Type type) => null;
        public bool Matches(string query) => false;
        public IReactComponent Closest(string query) => null;
        public IReactComponent QuerySelector(string query) => null;
        public List<IReactComponent> QuerySelectorAll(string query) => new List<IReactComponent>();
    }
}
