using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;

namespace ReactUnity
{
    public class NoopComponent : IContainerComponent, IHostComponent, ITextComponent
    {
        protected Dictionary<string, List<Callback>> BaseEventHandlers = new Dictionary<string, List<Callback>>();
        protected Dictionary<string, Action> EventHandlerRemovers = new Dictionary<string, Action>();

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
        public bool UpdatedThisFrame { get; set; }
        public YogaNode Layout { get; }
        public StyleState StyleState { get; }
        public NodeStyle ComputedStyle { get; }
        public InlineStyles Style { get; } = new InlineStyles();
        public StyleSheet InlineStylesheet { get; }
        public string Id { get; set; }
        public int RefId { get; set; } = -1;
        public string Name { get; set; }
        public string Tag { get; }
        public string TextContent { get; }
        public string ClassName { get; set; }
        public ClassList ClassList { get; }
        public StateStyles StateStyles { get; }
        public WatchableObjectRecord Data { get; } = new WatchableObjectRecord();
        public int ParentIndex { get; }
        public int CurrentOrder { get; }
        public float ScrollLeft { get; set; }
        public float ScrollTop { get; set; }
        public float ScrollWidth { get; }
        public float ScrollHeight { get; }
        public float ClientWidth { get; }
        public float ClientHeight { get; }
        public float Width { get; }
        public float Height { get; }
        public List<IReactComponent> Children { get; }
        public IReactComponent BeforePseudo { get; }
        public IReactComponent AfterPseudo { get; }
        public List<RuleTreeNode<StyleData>> BeforeRules { get; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; }
        public string Content { get; }
        public void ApplyLayoutStyles() { }
        public void ResolveStyle(bool recursive = false) { }
        public void Update() => UpdatedThisFrame = true;
        public void Accept(ReactComponentVisitor visitor, bool skipSelf = false) { }
        public void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false) => Parent = parent;
        public void SetProperty(string property, object value) { }
        public void SetCustomProperty(string property, object value) { }
        public void SetData(string property, object value) { }
        public void MarkForStyleResolving(bool recursive) { }
        public void MarkForStyleResolvingWithSiblings(bool recursive) { }
        public void Remove() { }
        public void Clear() { }
        public void Destroy(bool recursive = true) => Destroyed = true;
        public void RegisterChild(IReactComponent child, int index = -1) { }
        public void UnregisterChild(IReactComponent child) { }
        public object GetComponent(Type type) => null;
        public object AddComponent(Type type) => null;
        public bool Matches(string query) => false;
        public IReactComponent Closest(string query) => null;
        public IReactComponent QuerySelector(string query) => null;
        public List<IReactComponent> QuerySelectorAll(string query) => new List<IReactComponent>();
        public void SetText(string text) { }


        public void SetEventListener(string eventName, Callback fun)
        {
            if (EventHandlerRemovers.TryGetValue(eventName, out var remover))
            {
                remover?.Invoke();
                EventHandlerRemovers[eventName] = null;
            }

            if (fun != null)
            {
                var newRemover = AddEventListener(eventName, fun);
                EventHandlerRemovers[eventName] = newRemover;
            }
        }

        public Action AddEventListener(string eventName, Callback fun)
        {
            List<Callback> list;
            if (!BaseEventHandlers.TryGetValue(eventName, out list))
                BaseEventHandlers[eventName] = list = new List<Callback>();
            list.Add(fun);

            return () => list.Remove(fun);
        }

        public void FireEvent(string eventName, object arg)
        {
            if (BaseEventHandlers.TryGetValue(eventName, out var existingHandlers))
            {
                foreach (var handler in existingHandlers)
                    handler?.Call(arg, this);
            }
        }
    }
}
