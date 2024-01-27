using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Reactive;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity
{
    public abstract class BaseReactComponent<ContextType> : IReactComponent, IContainerComponent, IPoolableComponent, IClassChangeHandler where ContextType : ReactContext
    {
        public ContextType Context { get; }
        ReactContext IReactComponent.Context => Context;
        public IContainerComponent Parent { get; private set; }

        public ReactiveObjectRecord Data { get; private set; } = new ReactiveObjectRecord();
        public YogaNode Layout { get; }
        public NodeStyle ComputedStyle => StyleState.Active;
        public StyleState StyleState { get; private set; }
        public StateStyles StateStyles { get; private set; }

        [TypescriptRemap("../properties/style", "@reactunity/renderer", "InlineStyleRemap")]
        public InlineStyles Style { get; protected set; } = new InlineStyles();
        public StyleSheet InlineStylesheet { get; protected set; }
        public Dictionary<string, object> CustomProperties { get; protected set; }
        public IRevertCalculator RevertCalculator { get; protected set; }

        public int ParentIndex { get; protected set; } = -1;
        public int CurrentOrder { get; protected set; } = 0;
        public bool Entering { get; private set; }
        public bool Leaving { get; private set; }
        public bool UpdatedThisFrame { get; set; }
        public bool Destroyed { get; private set; }
        public string Tag { get; private set; } = "";
        public string TextContent => new TextContentVisitor().Get(this);
        public Stack<IPoolableComponent> PoolStack { get; set; }

        private bool isPseudoElement;
        public bool IsPseudoElement
        {
            get => isPseudoElement;
            set
            {
                isPseudoElement = value;
                RefreshName();
            }
        }

        protected virtual string DefaultName
        {
            get
            {
                if (IsPseudoElement)
                {
                    return Tag;
                }
                else if (!string.IsNullOrWhiteSpace(id))
                {
                    return $"<{Tag} #{id}>";
                }
                else if (ClassList.Count > 0)
                {
                    var classString = ClassList.ToString();
                    if (classString.Length > 36) return $"<{Tag} {classString.Substring(0, 33)}...>";
                    return $"<{Tag} {classString}>";
                }

                return $"<{Tag}>";
            }
        }

        public string ResolvedName => string.IsNullOrWhiteSpace(name) ? DefaultName : name;

        public string ClassName
        {
            get => ClassList.Name;
            set => ClassList.Name = value;
        }
        public ClassList ClassList { get; protected set; }

        private string id;
        public string Id
        {
            get => id;
            set
            {
                id = value?.ToString();
                MarkForStyleResolvingWithSiblings(true);
                RefreshName();
            }
        }

        private string name;
        public string Name
        {
            get => name;
            set
            {
                name = value;
                RefreshName();
            }
        }

        private int refId = -1;
        public int RefId
        {
            get => refId;
            set
            {
                if (refId >= 0 && value >= 0)
                    throw new InvalidOperationException("RefId cannot be assigned to. It is read-only.");
                refId = value;
            }
        }

        private int instanceId = -1;
        public int InstanceId
        {
            get => instanceId;
            set
            {
                if (instanceId >= 0 && value >= 0)
                    throw new InvalidOperationException("InstanceId cannot be assigned to. It is read-only.");
                instanceId = value;
            }
        }


        #region Container Properties
        public bool IsContainer { get; }
        public List<IReactComponent> Children { get; private set; }
        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }
        public IReactComponent BeforePseudo { get; protected set; }
        public IReactComponent AfterPseudo { get; protected set; }
        #endregion

        #region DOM-like Properties
        public virtual float ScrollLeft { get => 0; set { } }
        public virtual float ScrollTop { get => 0; set { } }
        public virtual float ScrollWidth => ClientWidth;
        public virtual float ScrollHeight => ClientHeight;
        public abstract float ClientWidth { get; }
        public abstract float ClientHeight { get; }
        #endregion


        private bool markedStyleResolve = true;
        private bool markedForStyleApply = true;
        private bool markedForLayoutApply = true;
        private bool markedStyleResolveRecursive = true;
        private float stateUpdateTime;
        protected Dictionary<string, List<Callback>> BaseEventHandlers = new Dictionary<string, List<Callback>>();
        protected Dictionary<string, Action> EventHandlerRemovers = new Dictionary<string, Action>();

        protected BaseReactComponent(ContextType context, string tag = "", bool isContainer = true)
        {
            IsContainer = isContainer;
            Children = IsContainer ? new List<IReactComponent>() : null;
            Tag = tag;
            Context = context;
            Style.changed += StyleChanged;
            Data.changed += DataChanged;
            ClassList = new ClassList(this);

            if (context.CalculatesLayout)
            {
                Layout = new YogaNode();
                Layout.Data = this;
            }

            Entering = true;
            StateStyles = new StateStyles(this);
            StateStyles.StartState("enter");
            stateUpdateTime = Context.Timer.AnimationTime;

            StyleState = new StyleState(context);
            StyleState.OnUpdate += OnStylesUpdated;
            StyleState.OnEvent += FireEvent;
        }

        public virtual void Update()
        {
            UpdatedThisFrame = true;
            if (Destroyed) return;
            if (markedStyleResolve) ResolveStyle(markedStyleResolveRecursive);
            ApplyEnterLeave();
            if (Destroyed) return;

            StyleState.Update();
            if (markedForStyleApply) ApplyStyles();
            if (markedForLayoutApply) ApplyLayoutStyles();
            ComputedStyle.MarkChangesSeen();
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected void DataChanged(string key, object value, ReactiveDictionary<string, object> style)
        {
            MarkForStyleResolvingWithSiblings(true);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected void StyleChanged(IStyleProperty key, object value, ReactiveDictionary<IStyleProperty, object> style)
        {
            MarkForStyleResolving(key == null || key.inherited);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public void MarkForStyleResolving(bool recursive)
        {
            markedStyleResolveRecursive = markedStyleResolveRecursive || recursive;
            markedStyleResolve = true;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected void MarkForStyleApply(bool hasLayout)
        {
            markedForStyleApply = true;
            markedForLayoutApply = markedForLayoutApply || hasLayout;
        }

        public void Remove()
        {
            if (Leaving) return;

            if (StateStyles.Subscribed.Contains("leave"))
            {
                StateStyles.EndState("enter");
                StateStyles.StartState("leave");
                Entering = false;
                Leaving = true;
                stateUpdateTime = Context.Timer.AnimationTime;
                MarkForStyleResolving(true);
            }
            else
            {
                Destroy(true);
            }
        }

        protected virtual void DestroySelf() { }

        public void Destroy(bool recursive = true)
        {
            if (Destroyed) return;
            Entering = false;
            Leaving = false;
            Destroyed = true;
            var pr = Parent;
            SetParent(null);
            pr?.ResolveStyle(true);

            if (recursive && IsContainer)
            {
                RemoveAfter();
                for (int i = Children.Count - 1; i >= 0; i--)
                {
                    Children[i].Destroy(true);
                }
                RemoveBefore();
                Children.Clear();
            }

            if (InlineStylesheet != null)
            {
                Context.RemoveStyle(InlineStylesheet);
                InlineStylesheet = null;
            }

            if (PoolStack != null)
            {
                Context.PoolComponent(this, PoolStack);
            }
            else
            {
                DestroySelf();
            }
        }

        public virtual bool Pool()
        {
            return true;
        }

        public virtual bool Revive()
        {
            Style.ClearWithoutNotify();
            Data.ClearWithoutNotify();
            ClassList.ClearWithoutNotify();
            name = null;
            Id = null;

            Entering = true;
            Leaving = false;
            Destroyed = false;
            markedStyleResolve = true;
            markedForStyleApply = true;
            markedForLayoutApply = true;
            markedStyleResolveRecursive = true;
            UpdatedThisFrame = false;


            foreach (var kv in EventHandlerRemovers)
                kv.Value?.Invoke();

            EventHandlerRemovers.Clear();
            BaseEventHandlers.Clear();

            StyleState.Clear();

            StateStyles.Clear();
            StateStyles.StartState("enter");
            stateUpdateTime = Context.Timer.AnimationTime;
            return true;
        }

        public void OnClassChange()
        {
            MarkForStyleResolvingWithSiblings(true);
            RefreshName();
        }

        #region Setters

        public virtual void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            if (Parent != null)
            {
                for (int i = ParentIndex + 1; i < Parent.Children.Count; i++)
                {
                    if (Parent.Children[i] is BaseReactComponent<ContextType> br) br.ParentIndex--;
                }

                Parent.UnregisterChild(this);
                Parent.MarkForStyleResolvingWithSiblings(true);
                ParentIndex = -1;
            }

            Parent = newParent;

            if (newParent?.Children != null)
            {
                relativeTo = relativeTo ?? (insertAfter ? null : newParent.AfterPseudo);

                if (relativeTo == null)
                {
                    ParentIndex = newParent.Children.Count;
                    newParent.RegisterChild(this);
                    UpdateOrder(int.MaxValue, CurrentOrder);
                }
                else
                {
                    var ind = relativeTo.ParentIndex;
                    if (insertAfter) ind++;
                    newParent.RegisterChild(this, ind);

                    ParentIndex = ind;
                    for (int i = ind + 1; i < newParent.Children.Count; i++)
                    {
                        if (newParent.Children[i] is BaseReactComponent<ContextType> br) br.ParentIndex++;
                    }
                    UpdateOrder(int.MaxValue, CurrentOrder);
                    UpdateOrder(int.MinValue, CurrentOrder);
                }
            }

            StyleState.SetParent(newParent?.StyleState);
            newParent?.MarkForStyleResolvingWithSiblings(true);
        }


        public void SetEventListener(string eventName, Callback fun)
        {
            if (EventHandlerRemovers.TryGetValue(eventName, out var remover))
            {
                remover?.Invoke();
                EventHandlerRemovers.Remove(eventName);
            }

            if (fun != null)
            {
                var newRemover = AddEventListener(eventName, fun);
                EventHandlerRemovers[eventName] = newRemover;
            }
        }

        public virtual Action AddEventListener(string eventName, Callback fun)
        {
            if (!BaseEventHandlers.TryGetValue(eventName, out var list))
                BaseEventHandlers[eventName] = list = new List<Callback>();
            list.Add(fun);

            return () => list.Remove(fun);
        }

        public virtual void FireEvent(string eventName, object arg)
        {
            if (BaseEventHandlers.TryGetValue(eventName, out var existingHandlers))
            {
                foreach (var handler in existingHandlers)
                    handler?.Call(arg, this);
            }
        }

        public virtual void SetData(string propertyName, object value)
        {
            Data[propertyName] = value;
        }

        public virtual void SetProperty(string propertyName, object value)
        {
            if (propertyName.FastStartsWith("custom-"))
            {
                var propName = propertyName.Substring(7);
                SetCustomProperty(propName, value);
                return;
            }

            switch (propertyName)
            {
                case "id":
                    Id = value?.ToString();
                    return;
                case "name":
                    Name = value?.ToString();
                    return;
                case "class":
                case "className":
                    ClassName = value?.ToString();
                    return;
                case "style":
                    if (InlineStylesheet != null)
                    {
                        Context.RemoveStyle(InlineStylesheet);
                        InlineStylesheet = null;
                    }

                    if (value is string styleString && !string.IsNullOrWhiteSpace(styleString))
                    {
                        styleString = $":scope {{\n{styleString}\n}}";
                        InlineStylesheet = new StyleSheet(Context.Style, styleString, 1, this);
                        Context.InsertStyle(InlineStylesheet);
                    }
                    return;
                default:
                    Context.HandleUnknownProperty(this, propertyName, value);
                    return;
            }
        }

        public virtual void SetCustomProperty(string propertyName, object value)
        {
            if (CustomProperties == null) CustomProperties = new Dictionary<string, object>();
            CustomProperties[propertyName] = value;
        }

        #endregion

        #region Style / Layout

        public virtual void ResolveStyle(bool recursive = false)
        {
            if (Destroyed) return;
            markedStyleResolve = false;
            markedStyleResolveRecursive = false;

            List<RuleTreeNode<StyleData>> matchingRules;
            if (Tag == "_before") matchingRules = Parent.BeforeRules;
            else if (Tag == "_after") matchingRules = Parent.AfterRules;
            else matchingRules = Context.Style.StyleTree.GetMatchingRules(this).ToList();

            var importantIndex = Math.Max(0, matchingRules.FindIndex(x => x.Specifity <= RuleHelpers.ImportantSpecifity));
            var cssStyles = new List<IDictionary<IStyleProperty, object>> { };

            for (int i = 0; i < importantIndex; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);
            cssStyles.Add(Style);
            for (int i = importantIndex; i < matchingRules.Count; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);

            var resolvedStyle = new NodeStyle(Context, null, cssStyles, RevertCalculator);
            resolvedStyle.UpdateParent(Parent?.ComputedStyle);

            StyleState.SetCurrent(resolvedStyle);
            MarkForStyleApply(true);

            if (IsContainer)
            {
                var inheritedChanges = ComputedStyle.HasInheritedChanges;

                if (inheritedChanges || recursive)
                {
                    BeforeRules = Context.Style.StyleTree.GetMatchingBefore(this).ToList();
                    if (BeforeRules.Count > 0 &&
                        BeforeRules.Any(x => x.Data.Rules.Any(y => y.ContainsKey(StyleProperties.content))))
                        AddBefore();
                    else RemoveBefore();
                    BeforePseudo?.ResolveStyle();

                    for (int i = 0; i < Children.Count; i++)
                    {
                        var child = Children[i];
                        child.ResolveStyle(true);
                        if (child.Destroyed) i--;
                    }

                    AfterRules = Context.Style.StyleTree.GetMatchingAfter(this).ToList();
                    if (AfterRules.Count > 0 &&
                        AfterRules.Any(x => x.Data.Rules.Any(y => y.ContainsKey(StyleProperties.content))))
                        AddAfter();
                    else RemoveAfter();
                    AfterPseudo?.ResolveStyle();
                }
            }
        }

        public void MarkForStyleResolvingWithSiblings(bool recursive)
        {
            if (Parent == null) return;

            if (Parent.Children == null)
            {
                MarkForStyleResolving(recursive);
                return;
            }

            var resolve = false;
            foreach (var child in Parent.Children)
            {
                resolve = resolve || child == this;
                if (resolve) child.MarkForStyleResolving(recursive);
            }
        }

        protected abstract void ApplyStylesSelf();
        protected abstract void ApplyLayoutStylesSelf();
        public abstract bool UpdateOrder(int prev, int current);

        public void ApplyStyles()
        {
            markedForStyleApply = false;
            ApplyEnterLeave();
            if (Destroyed) return;
            ApplyStylesSelf();
        }

        private void ApplyEnterLeave()
        {
            if (Destroyed || ComputedStyle == null) return;

            if (Leaving)
            {
                var stateDuration = ComputedStyle.stateDuration;

                if (Context.Timer.AnimationTime >= stateUpdateTime + stateDuration)
                {
                    Destroy(true);
                }
            }
            else if (Entering)
            {
                if (StateStyles.Subscribed.Contains("enter"))
                {
                    var stateDuration = ComputedStyle.stateDuration;

                    if (Context.Timer.AnimationTime >= stateUpdateTime + stateDuration)
                    {
                        StateStyles.EndState("enter");
                        Entering = false;
                        MarkForStyleResolvingWithSiblings(true);
                    }
                }
                else
                {
                    StateStyles.EndState("enter");
                    Entering = false;
                }
            }
        }

        public void ApplyLayoutStyles()
        {
            markedForLayoutApply = false;

            var currentOrder = ComputedStyle.order;
            if (CurrentOrder != currentOrder) UpdateOrder(CurrentOrder, currentOrder);
            CurrentOrder = currentOrder;

            ApplyLayoutStylesSelf();
        }

        private void OnStylesUpdated(NodeStyle obj, bool hasLayout)
        {
            MarkForStyleApply(hasLayout);
        }

        protected void RefreshName() => ApplyName(ResolvedName);

        protected abstract void ApplyName(string resolvedName);

        #endregion


        #region Component Tree Functions

        public bool Matches(string query)
        {
            var tree = new RuleTree<string>();
            tree.AddSelector(query);
            return tree.AnyMatches(this, Context.Host);
        }

        public IReactComponent Closest(string query)
        {
            var tree = new RuleTree<string>();
            tree.AddSelector(query);
            return tree.Closest(this, Context.Host);
        }

        public IReactComponent QuerySelector(string query)
        {
            var tree = new RuleTree<string>();
            tree.AddSelector(query);
            return tree.GetMatchingChild(this);
        }

        public List<IReactComponent> QuerySelectorAll(string query)
        {
            var tree = new RuleTree<string>();
            tree.AddSelector(query);
            return tree.GetMatchingChildren(this);
        }

        public void Accept(ReactComponentVisitor visitor, bool skipSelf = false)
        {
            if (!skipSelf)
            {
                if (!visitor.Visit(this)) return;
            }

            if (IsContainer)
            {
                BeforePseudo?.Accept(visitor);
                for (int i = 0; i < Children.Count; i++)
                {
                    var child = Children[i];
                    child.Accept(visitor);
                    if (child.Destroyed) i--;
                }
                AfterPseudo?.Accept(visitor);
            }
        }

        #endregion

        #region Pseudo Element Functions

        public void AddBefore()
        {
            if (!IsContainer || BeforePseudo != null || Destroyed) return;
            var tc = Context.CreatePseudoComponent("_before");
            BeforePseudo = tc;
            tc?.SetParent(this, Children.FirstOrDefault());
        }

        public void RemoveBefore()
        {
            BeforePseudo?.Remove();
            BeforePseudo = null;
        }

        public void AddAfter()
        {
            if (!IsContainer || AfterPseudo != null || Destroyed) return;
            var tc = Context.CreatePseudoComponent("_after");
            AfterPseudo = tc;
            tc?.SetParent(this, Children.LastOrDefault(), true);
        }

        public void RemoveAfter()
        {
            AfterPseudo?.Remove();
            AfterPseudo = null;
        }

        #endregion

        #region Container Functions

        public void RegisterChild(IReactComponent child, int index = -1)
        {
            if (index == Children.Count) index = -1;
            var accepted = IsContainer && InsertChild(child, index);
            if (accepted)
            {
                if (child.Layout?.Parent != null) child.Layout.Parent.RemoveChild(child.Layout);
                if (index >= 0)
                {
                    Children.Insert(index, child);
                    Layout?.Insert(index, child.Layout);
                }
                else
                {
                    Children.Add(child);
                    Layout?.AddChild(child.Layout);
                }
            }
        }

        public void UnregisterChild(IReactComponent child)
        {
            var accepted = IsContainer && DeleteChild(child);
            if (accepted)
            {
                Children.Remove(child);
                Layout?.RemoveChild(child.Layout);
            }
        }

        protected abstract bool InsertChild(IReactComponent child, int index);
        protected abstract bool DeleteChild(IReactComponent child);

        public void Clear()
        {
            for (int i = Children.Count - 1; i >= 0; i--) Children[i].Remove();
        }

        #endregion

        #region Add/Get Component Utilities

        public abstract object GetComponent(Type type);
        public abstract object AddComponent(Type type);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public CType GetComponent<CType>() where CType : Component
        {
            return GetComponent(typeof(CType)) as CType;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public CType AddComponent<CType>() where CType : Component
        {
            return AddComponent(typeof(CType)) as CType;
        }

        public CType GetOrAddComponent<CType>() where CType : Component
        {
            var existing = GetComponent<CType>();
            if (existing) return existing;
            return AddComponent<CType>();
        }

        #endregion
    }
}
