using Facebook.Yoga;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity
{
    public abstract class BaseReactComponent<ContextType> : IReactComponent, IContainerComponent where ContextType : ReactContext
    {
        #region Statics / Defaults
        public static readonly NodeStyle TagDefaultStyle = new NodeStyle();
        public static readonly YogaNode TagDefaultLayout = new YogaNode();
        public virtual NodeStyle DefaultStyle => TagDefaultStyle;
        public virtual YogaNode DefaultLayout => TagDefaultLayout;
        #endregion

        public ContextType Context { get; }
        ReactContext IReactComponent.Context => Context;
        public IContainerComponent Parent { get; private set; }

        public InlineData Data { get; private set; } = new InlineData("Data");
        public YogaNode Layout { get; private set; }
        public NodeStyle ComputedStyle => StyleState.Active;
        public StyleState StyleState { get; private set; }
        public StateStyles StateStyles { get; private set; }

        [TypescriptRemap("../properties/style", "InlineStyleRemap")]
        public InlineData Style { get; protected set; } = new InlineData("Style");

        public bool IsPseudoElement { get; set; } = false;
        public string Tag { get; private set; } = "";

        public string ClassName
        {
            get => string.Join(" ", ClassList);
            set
            {
                ClassList.OnBeforeChange();
                ClassList.ClearWithoutNotify();

                if (!string.IsNullOrWhiteSpace(value))
                {
                    var classes = value.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < classes.Length; i++)
                        ClassList.AddWithoutNotify(classes[i]);
                }
                ClassList.OnAfterChange();
            }
        }
        public ClassList ClassList { get; protected set; }

        private string id;
        public string Id
        {
            get => id;
            set
            {
                id = value?.ToString();
                ResolveStyle(true);
            }
        }
        public abstract string Name { get; }

        #region Container Properties
        public bool IsContainer { get; }
        public List<IReactComponent> Children { get; private set; }
        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }
        public IReactComponent BeforePseudo { get; protected set; }
        public IReactComponent AfterPseudo { get; protected set; }


        #endregion


        private bool markedStyleResolve;
        private bool markedForStyleApply;
        private bool markedForLayoutApply;
        private bool markedStyleResolveRecursive;
        private List<LayoutValue> ModifiedLayoutProperties;

        protected BaseReactComponent(ContextType context, string tag = "", bool isContainer = true)
        {
            IsContainer = isContainer;
            Children = IsContainer ? new List<IReactComponent>() : null;
            Tag = tag;
            Context = context;
            Style.changed += StyleChanged;
            Data.changed += StyleChanged;
            ClassList = new ClassList(this);

            if (context.CalculatesLayout) Layout = new YogaNode(DefaultLayout);

            StateStyles = new StateStyles(this);
            StyleState = new StyleState(context, Layout, DefaultLayout);
            StyleState.OnUpdate += OnStylesUpdated;
            StyleState.SetCurrent(new NodeStyle(DefaultStyle));
        }

        public virtual void Update()
        {
            if (markedStyleResolve) ResolveStyle(markedStyleResolveRecursive);
            StyleState.Update();
            if (markedForStyleApply) ApplyStyles();
            if (markedForLayoutApply) ApplyLayoutStyles();
        }

        protected void StyleChanged(string key, object value, WatchableRecord<object> style)
        {
            MarkForStyleResolving((style as InlineData)?.Identifier != "Style" || key == null || StyleProperties.IsInherited(key));
        }

        protected void MarkForStyleResolving(bool recursive)
        {
            markedStyleResolveRecursive = markedStyleResolveRecursive || recursive;
            markedStyleResolve = true;
        }

        protected void MarkForStyleApply(bool hasLayout)
        {
            markedForStyleApply = true;
            markedForLayoutApply = markedForLayoutApply || hasLayout;
        }

        public virtual void DestroySelf()
        {
        }

        public void Destroy()
        {
            SetParent(null);
            DestroySelf();

            if (IsContainer)
            {
                RemoveAfter();
                for (int i = Children.Count - 1; i >= 0; i--)
                {
                    Children[i].Destroy();
                }
                RemoveBefore();
                Children.Clear();
            }
        }

        #region Setters

        public virtual void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            if (Parent != null) Parent.UnregisterChild(this);

            Parent = newParent;

            if (Parent == null) return;

            relativeTo ??= (insertAfter ? null : newParent.AfterPseudo);

            if (relativeTo == null)
            {
                newParent.RegisterChild(this);
            }
            else
            {
                var ind = newParent.Children.IndexOf(relativeTo);
                if (insertAfter) ind++;

                newParent.RegisterChild(this, ind);
            }

            StyleState.SetParent(newParent.StyleState);
            ResolveStyle(true);
        }

        public abstract void SetEventListener(string eventName, Callback fun);

        public virtual void SetData(string propertyName, object value)
        {
            Data[propertyName] = value;
        }

        public virtual void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "id":
                    Id = value?.ToString();
                    return;
                case "className":
                    ClassName = value?.ToString();
                    return;
                default:
#if UNITY_EDITOR
                    Debug.LogWarning($"Unknown property name specified, '{propertyName}'");
#endif
                    return;
            }
        }

        #endregion

        #region Style / Layout

        public void ScheduleLayout()
        {
            Context.ScheduleLayout();
        }

        public virtual void ResolveStyle(bool recursive = false)
        {
            markedStyleResolve = false;
            markedStyleResolveRecursive = false;

            var inlineStyles = RuleHelpers.GetRuleDic(Style);
            var inlineLayouts = RuleHelpers.GetLayoutDic(Style) ?? new List<LayoutValue>();
            if (inlineLayouts != null) foreach (var l in inlineLayouts) inlineStyles[l.prop.name] = l.value;

            List<RuleTreeNode<StyleData>> matchingRules;
            if (Tag == "_before") matchingRules = Parent.BeforeRules;
            else if (Tag == "_after") matchingRules = Parent.AfterRules;
            else matchingRules = Context.StyleTree.GetMatchingRules(this).ToList();

            var importantIndex = Math.Max(0, matchingRules.FindIndex(x => x.Specifity <= RuleHelpers.ImportantSpecifity));
            var cssStyles = new List<Dictionary<string, object>> { };

            for (int i = 0; i < importantIndex; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);
            cssStyles.Add(inlineStyles);
            for (int i = importantIndex; i < matchingRules.Count; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);



            var layoutUpdated = false;
            var calculatesLayout = Context.CalculatesLayout;

            if (Layout != null && ModifiedLayoutProperties != null)
            {
                foreach (var item in ModifiedLayoutProperties) item.SetDefault(Layout, DefaultLayout);
                layoutUpdated = ModifiedLayoutProperties.Count > 0;
            }


            var resolvedStyle = new NodeStyle(DefaultStyle);
            resolvedStyle.CssStyles = cssStyles;


            if (calculatesLayout)
            {
                var layouts = matchingRules.Where(x => x.Data?.Layouts != null).SelectMany(x => x.Data?.Layouts).Concat(inlineLayouts).ToList();
                ModifiedLayoutProperties = layouts;

                if (layouts.Count > 0)
                {
                    layoutUpdated = true;

                    for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
                    inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
                    for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
                }
            }

            StyleState.SetCurrent(resolvedStyle);
            ApplyStyles();
            resolvedStyle.MarkChangesSeen();

            if (calculatesLayout)
            {
                if (layoutUpdated)
                {
                    ApplyLayoutStyles();
                    ScheduleLayout();
                }
            }
            else ApplyLayoutStyles();

            if (IsContainer)
            {
                var inheritedChanges = ComputedStyle.HasInheritedChanges;

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
        }

        protected abstract void ApplyStylesSelf();
        protected abstract void ApplyLayoutStylesSelf();

        public void ApplyStyles()
        {
            markedForStyleApply = false;
            ApplyStylesSelf();
        }

        public void ApplyLayoutStyles()
        {
            markedForLayoutApply = false;
            ApplyLayoutStylesSelf();
        }

        public abstract void Relayout();

        private void OnStylesUpdated(NodeStyle obj, bool hasLayout)
        {
            MarkForStyleApply(hasLayout);
        }

        #endregion


        #region Component Tree Functions

        public IReactComponent QuerySelector(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChild(this);
        }

        public List<IReactComponent> QuerySelectorAll(string query)
        {
            var tree = new RuleTree<string>(Context.Parser);
            tree.AddSelector(query);
            return tree.GetMatchingChildren(this);
        }

        public void Accept(ReactComponentVisitor visitor)
        {
            visitor.Visit(this);

            if (IsContainer)
            {
                BeforePseudo?.Accept(visitor);
                foreach (var child in Children)
                    child.Accept(visitor);
                AfterPseudo?.Accept(visitor);
            }
        }

        #endregion

        #region Pseudo Element Functions

        public void AddBefore()
        {
            if (!IsContainer || BeforePseudo != null) return;
            var tc = Context.CreatePseudoComponent("_before");
            BeforePseudo = tc;
            tc.SetParent(this, Children.FirstOrDefault());
        }

        public void RemoveBefore()
        {
            BeforePseudo?.Destroy();
            BeforePseudo = null;
        }

        public void AddAfter()
        {
            if (!IsContainer || AfterPseudo != null) return;
            var tc = Context.CreatePseudoComponent("_after");
            AfterPseudo = tc;
            tc.SetParent(this, Children.LastOrDefault(), true);
        }

        public void RemoveAfter()
        {
            AfterPseudo?.Destroy();
            AfterPseudo = null;
        }

        #endregion

        #region Container Functions

        public void RegisterChild(IReactComponent child, int index = -1)
        {
            var accepted = IsContainer && InsertChild(child, index);
            if (accepted)
            {
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
                ScheduleLayout();
            }
        }

        public void UnregisterChild(IReactComponent child)
        {
            var accepted = IsContainer && DeleteChild(child);
            if (accepted)
            {
                Children.Remove(child);
                Layout?.RemoveChild(child.Layout);
                ScheduleLayout();
            }
        }

        protected abstract bool InsertChild(IReactComponent child, int index);
        protected abstract bool DeleteChild(IReactComponent child);

        #endregion

        #region Add/Get Component Utilities

        public abstract object GetComponent(Type type);
        public abstract object AddComponent(Type type);

        public CType GetComponent<CType>() where CType : Component
        {
            return GetComponent(typeof(CType)) as CType;
        }

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
