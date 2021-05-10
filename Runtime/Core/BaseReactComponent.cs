using Facebook.Yoga;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Interop;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity
{
    public abstract class BaseReactComponent : IReactComponent, IContainerComponent
    {
        #region Statics / Defaults
        private static readonly HashSet<string> EmptyClassList = new HashSet<string>();
        public static readonly NodeStyle TagDefaultStyle = new NodeStyle();
        public static readonly YogaNode TagDefaultLayout = new YogaNode();
        public virtual NodeStyle DefaultStyle => TagDefaultStyle;
        public virtual YogaNode DefaultLayout => TagDefaultLayout;
        #endregion

        public ReactContext Context { get; }
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
        public string ClassName { get; set; } = "";
        public HashSet<string> ClassList { get; private set; } = EmptyClassList;

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
        private bool markedStyleResolveRecursive;
        protected List<int> Deferreds = new List<int>();

        protected BaseReactComponent(ReactContext context, string tag = "", bool isContainer = true)
        {
            IsContainer = isContainer;
            Children = IsContainer ? new List<IReactComponent>() : null;
            Tag = tag;
            Context = context;
            Style.changed += StyleChanged;
            Data.changed += StyleChanged;

            Deferreds.Add(Context.Dispatcher.OnEveryUpdate(() =>
            {
                if (markedStyleResolve) ResolveStyle(markedStyleResolveRecursive);
                if (markedForStyleApply) ApplyStyles();
                OnUpdate();
            }));

            StateStyles = new StateStyles(this);
            StyleState = new StyleState(context);
            StyleState.OnUpdate += OnStylesUpdated;
            StyleState.SetCurrent(new NodeStyle(DefaultStyle));

            if (context.CalculatesLayout) Layout = new YogaNode(DefaultLayout);
        }

        protected virtual void OnUpdate()
        {
        }

        protected void StyleChanged(string key, object value, InlineData style)
        {
            MarkForStyleResolving(style.Identifier != "Style" || key == null || StyleProperties.IsInherited(key));
        }

        protected void MarkForStyleResolving(bool recursive)
        {
            markedStyleResolveRecursive = markedStyleResolveRecursive || recursive;
            markedStyleResolve = true;
        }

        protected void MarkForStyleApply()
        {
            markedForStyleApply = true;
        }

        public virtual void Destroy()
        {
            Parent.Children.Remove(this);
            Parent.Layout?.RemoveChild(Layout);
            Parent.ScheduleLayout();
            foreach (var item in Deferreds) Context.Dispatcher.StopDeferred(item);
        }

        #region Setters

        public virtual void SetParent(IContainerComponent parent, IReactComponent insertBefore = null, bool insertAfter = false)
        {
            if (Parent != null) parent.UnregisterChild(this);

            Parent = parent;

            if (Parent == null) return;

            insertBefore ??= (insertAfter ? null : parent.AfterPseudo);

            if (insertBefore == null)
            {
                parent.RegisterChild(this);
            }
            else
            {
                var ind = parent.Children.IndexOf(insertBefore);
                if (insertAfter) ind++;

                parent.RegisterChild(this, ind);
            }

            StyleState.SetParent(parent.StyleState);
            ResolveStyle(true);

            Parent.ScheduleLayout();

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
                case "className":
                    var oldClassName = ClassName;
                    var oldClassList = ClassList;
                    ClassName = value?.ToString();
                    ClassList = string.IsNullOrWhiteSpace(ClassName) ? EmptyClassList :
                        new HashSet<string>(ClassName.Split(new char[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries));
                    UpdateClasses(oldClassName, oldClassList);
                    ResolveStyle(true);
                    return;
                default:
                    throw new System.Exception($"Unknown property name specified, '{propertyName}'");
            }
        }

        public virtual void UpdateClasses(string oldClassName, HashSet<string> oldClassList)
        {
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

            if (calculatesLayout)
            {
                var oldStyle = ComputedStyle;

                if (oldStyle.CssLayouts != null)
                {
                    foreach (var item in oldStyle.CssLayouts) item.SetDefault(Layout, DefaultLayout);
                    layoutUpdated = oldStyle.CssLayouts.Count > 0;
                }
            }


            var resolvedStyle = new NodeStyle(DefaultStyle);
            resolvedStyle.CssStyles = cssStyles;


            var layouts = matchingRules.Where(x => x.Data?.Layouts != null).SelectMany(x => x.Data?.Layouts).Concat(inlineLayouts).ToList(); ;
            resolvedStyle.CssLayouts = layouts;

            if (calculatesLayout)
            {
                for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
                inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
                for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
            }
            else
            {
                resolvedStyle.CssStyles.Add(layouts.ToDictionary(x => x.prop.name, x => x.value));
            }

            StyleState.SetCurrent(resolvedStyle);
            ApplyStyles();
            resolvedStyle.MarkChangesSeen();

            if (calculatesLayout)
            {
                layoutUpdated = layoutUpdated || resolvedStyle.CssLayouts.Count > 0;

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

        public void ApplyLayoutStyles()
        {
            ApplyLayoutStylesSelf();

            if (IsContainer)
            {
                BeforePseudo?.ApplyLayoutStyles();
                foreach (var child in Children)
                    child.ApplyLayoutStyles();
                AfterPseudo?.ApplyLayoutStyles();
            }
        }


        protected abstract void ApplyLayoutStylesSelf();

        public virtual void ApplyStyles()
        {
            markedForStyleApply = false;
        }

        private void OnStylesUpdated(NodeStyle obj)
        {
            MarkForStyleApply();
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

        public virtual void Accept(ReactComponentVisitor visitor)
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
            var tc = Context.CreatePseudoComponent("_after");
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
            return GetComponent<CType>() ?? AddComponent<CType>();
        }

        #endregion
    }
}
