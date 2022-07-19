using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;

namespace ReactUnity
{
    public abstract class ProxyComponent : IReactComponent, IContainerComponent, ITextComponent
    {
        public IContainerComponent Proxy { get; }

        public ReactContext Context => Proxy.Context;

        public IContainerComponent Parent => Proxy.Parent;

        public bool IsPseudoElement => Proxy.IsPseudoElement;

        public bool Destroyed => Proxy.Destroyed;

        public bool Entering => Proxy.Entering;
        public bool Leaving => Proxy.Leaving;
        public bool UpdatedThisFrame
        {
            get => Proxy.UpdatedThisFrame;
            set => Proxy.UpdatedThisFrame = value;
        }
        public YogaNode Layout => Proxy.Layout;

        public StyleState StyleState => Proxy.StyleState;

        public NodeStyle ComputedStyle => Proxy.ComputedStyle;

        public InlineStyles Style => Proxy.Style;

        public StyleSheet InlineStylesheet => Proxy.InlineStylesheet;

        public string Id
        {
            get => Proxy.Id;
            set => Proxy.Id = value;
        }

        public string Name
        {
            get => Proxy.Name;
            set => Proxy.Name = value;
        }

        public string Tag => Proxy.Tag;

        public string TextContent => Proxy.TextContent;

        public int RefId
        {
            get => Proxy.RefId;
            set => Proxy.RefId = value;
        }

        public string ClassName
        {
            get => Proxy.ClassName;
            set => Proxy.ClassName = value;
        }
        public virtual string Content
        {
            get => (Proxy as ITextComponent)?.Content;
            set => (Proxy as ITextComponent)?.SetText(value);
        }

        public ClassList ClassList => Proxy.ClassList;

        public StateStyles StateStyles => Proxy.StateStyles;

        public WatchableObjectRecord Data => Proxy.Data;

        public int ParentIndex => Proxy.ParentIndex;

        public int CurrentOrder => Proxy.CurrentOrder;

        public float ScrollLeft
        {
            get => Proxy.ScrollLeft;
            set => Proxy.ScrollLeft = value;
        }

        public float ScrollTop
        {
            get => Proxy.ScrollTop;
            set => Proxy.ScrollTop = value;
        }

        public float ScrollWidth => Proxy.ScrollWidth;

        public float ScrollHeight => Proxy.ScrollHeight;

        public float ClientWidth => Proxy.ClientWidth;

        public float ClientHeight => Proxy.ClientHeight;

        public List<IReactComponent> Children => Proxy.Children;

        public IReactComponent BeforePseudo => Proxy.BeforePseudo;

        public IReactComponent AfterPseudo => Proxy.AfterPseudo;

        public List<RuleTreeNode<StyleData>> BeforeRules => Proxy.BeforeRules;

        public List<RuleTreeNode<StyleData>> AfterRules => Proxy.AfterRules;

        public ProxyComponent(IContainerComponent cmp)
        {
            Proxy = cmp;
        }

        public void ApplyLayoutStyles() => Proxy.ApplyLayoutStyles();

        public void ResolveStyle(bool recursive = false) => Proxy.ResolveStyle();

        public void Update() => Proxy.Update();

        public void Accept(ReactComponentVisitor visitor, bool skipSelf = false) => Proxy.Accept(visitor, skipSelf);

        public virtual void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false) =>
            Proxy.SetParent(parent, relativeTo, insertAfter);

        public virtual void SetProperty(string property, object value) => Proxy.SetProperty(property, value);

        public void SetData(string property, object value) => Proxy.SetData(property, value);

        public void SetEventListener(string eventType, Callback callback) => Proxy.SetEventListener(eventType, callback);

        public virtual Action AddEventListener(string eventType, Callback callback) => Proxy.AddEventListener(eventType, callback);

        public void FireEvent(string eventName, object arg) => Proxy.FireEvent(eventName, arg);

        public object GetComponent(Type type) => Proxy.GetComponent(type);

        public object AddComponent(Type type) => Proxy.AddComponent(type);

        public void MarkForStyleResolving(bool recursive) => Proxy.MarkForStyleResolving(recursive);

        public void MarkForStyleResolvingWithSiblings(bool recursive) => Proxy.MarkForStyleResolvingWithSiblings(recursive);

        public bool Matches(string query) => Proxy.Matches(query);

        public IReactComponent Closest(string query) => Proxy.Closest(query);

        public IReactComponent QuerySelector(string query) => Proxy.QuerySelector(query);

        public List<IReactComponent> QuerySelectorAll(string query) => Proxy.QuerySelectorAll(query);

        public void Remove() => Destroy(true);

        public void Destroy(bool recursive = true)
        {
            Proxy.Destroy(recursive);
            SetParent(null);
        }

        public void RegisterChild(IReactComponent child, int index = -1) => Proxy.RegisterChild(child, index);

        public void UnregisterChild(IReactComponent child) => Proxy.UnregisterChild(child);

        public void SetText(string text) => Content = text;

        public void Clear()
        {
            for (int i = Children.Count - 1; i >= 0; i--) Children[i].Remove();
        }
    }
}
