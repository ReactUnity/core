using Facebook.Yoga;
using ReactUnity.Interop;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Visitors;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;
using Label = UnityEngine.UIElements.Label;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorReactComponent : IReactComponent, IHostComponent, IContainerComponent
    {
        private static readonly HashSet<string> EmptyClassList = new HashSet<string>();

        public static readonly YogaNode DefaultLayout = new YogaNode();

        ReactContext IHostComponent.Context => Context;
        public EditorContext Context { get; }
        public IContainerComponent Parent { get; private set; }
        public VisualElement Element { get; protected set; }

        public YogaNode Layout { get; private set; }
        public NodeStyle Style { get; private set; }
        public ExpandoObject Inline { get; protected set; } = new ExpandoObject();

        public bool IsPseudoElement { get; private set; }
        public string Name => Element.name;
        public string Tag { get; private set; }
        public string ClassName { get; private set; }
        public HashSet<string> ClassList { get; private set; }

        public StateStyles StateStyles { get; private set; }
        public Dictionary<string, object> Data { get; private set; } = new Dictionary<string, object>();

        public List<IReactComponent> Children { get; } = new List<IReactComponent>();
        public IReactComponent BeforePseudo { get; private set; }
        public IReactComponent AfterPseudo { get; private set; }

        public List<RuleTreeNode<StyleData>> BeforeRules { get; protected set; }
        public List<RuleTreeNode<StyleData>> AfterRules { get; protected set; }


        public EditorReactComponent(VisualElement element, EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = element;

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public EditorReactComponent(EditorContext context, string tag)
        {
            Tag = tag;
            Context = context;
            Element = new Box();

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(StateStyles);
            Layout = new YogaNode();
        }

        public void Accept(ReactComponentVisitor visitor)
        {
            visitor.Visit(this);
        }

        public void ApplyLayoutStyles()
        {
            throw new NotImplementedException();
        }

        public virtual void ApplyStyles()
        {
            Element.style.backgroundColor = Style.backgroundColor;
            Element.style.color = Style.color;
            Element.style.width = Layout.LayoutWidth;
            Element.style.height = Layout.LayoutHeight;
        }

        public void Destroy()
        {
            Element.RemoveFromHierarchy();
        }

        public void ResolveStyle(bool recursive = false)
        {
            var inheritedChanges = Style.HasInheritedChanges;


            var inlineStyles = RuleHelpers.GetRuleDic(Inline);
            var inlineLayouts = RuleHelpers.GetLayoutDic(Inline) ?? new List<LayoutValue>();

            List<RuleTreeNode<StyleData>> matchingRules;
            if (Tag == "_before") matchingRules = Parent.BeforeRules;
            else if (Tag == "_after") matchingRules = Parent.AfterRules;
            else matchingRules = Context.StyleTree.GetMatchingRules(this).ToList();

            var importantIndex = Math.Max(0, matchingRules.FindIndex(x => x.Specifity <= RuleHelpers.ImportantSpecifity));
            var cssStyles = new List<Dictionary<string, object>> { };

            for (int i = 0; i < importantIndex; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);
            cssStyles.Add(inlineStyles);
            for (int i = importantIndex; i < matchingRules.Count; i++) cssStyles.AddRange(matchingRules[i].Data?.Rules);

            Style.CssStyles = cssStyles;


            if (Style.CssLayouts != null)
                foreach (var item in Style.CssLayouts) item.SetDefault(Layout, DefaultLayout);
            Style.CssLayouts = matchingRules.Where(x => x.Data?.Layouts != null).SelectMany(x => x.Data?.Layouts).Concat(inlineLayouts).ToList();

            for (int i = matchingRules.Count - 1; i >= importantIndex; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));
            inlineLayouts.ForEach(x => x.Set(Layout, DefaultLayout));
            for (int i = importantIndex - 1; i >= 0; i--) matchingRules[i].Data?.Layouts?.ForEach(x => x.Set(Layout, DefaultLayout));

            ApplyStyles();
            Style.MarkChangesSeen();


            if (inheritedChanges || recursive)
            {
                BeforeRules = Context.StyleTree.GetMatchingBefore(this).ToList();
                //if (BeforeRules.Count > 0) AddBefore();
                //else RemoveBefore();
                BeforePseudo?.ResolveStyle();

                foreach (var child in Children)
                    child.ResolveStyle(true);

                AfterRules = Context.StyleTree.GetMatchingAfter(this).ToList();
                //if (AfterRules.Count > 0) AddAfter();
                //else RemoveAfter();
                AfterPseudo?.ResolveStyle();
            }
        }

        public void ScheduleLayout(Action callback = null)
        {
            Context.scheduleLayout(callback);
        }



        #region Setters

        public void SetParent(IContainerComponent parent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            Parent = parent;

            relativeTo = relativeTo ?? (insertAfter ? null : parent.AfterPseudo);

            if (relativeTo == null)
            {
                parent.RegisterChild(this);
                parent.Children.Add(this);
                parent.Layout.AddChild(Layout);
            }
            else
            {
                var ind = parent.Children.IndexOf(relativeTo);
                if (insertAfter) ind++;

                parent.RegisterChild(this, ind);
                parent.Children.Insert(ind, this);
                parent.Layout.Insert(ind, Layout);
            }

            Style.Parent = parent.Style;
            ResolveStyle(true);

            Parent.ScheduleLayout();
        }

        public void SetData(string property, object value)
        {
            Data[property] = value;
            ResolveStyle(true);
        }

        public void SetEventListener(string eventType, Callback callback)
        {
            throw new NotImplementedException();
        }

        public void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "name":
                    Element.name = value?.ToString();
                    return;
                case "className":
                    ClassName = value?.ToString();
                    ClassList = string.IsNullOrWhiteSpace(ClassName) ? EmptyClassList :
                        new HashSet<string>(ClassName.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries));
                    return;
                default:
                    throw new Exception($"Unknown property name specified, '{property}'");
            }
        }

        #endregion

        public object GetComponent(Type type)
        {
            throw new NotImplementedException();
        }

        public object AddComponent(Type type)
        {
            throw new NotImplementedException();
        }

        public void RegisterChild(IReactComponent child, int index = -1)
        {
            if (child is EditorReactComponent u)
            {
                if(index >= 0) Element.Insert(index, u.Element);
                else Element.Add(u.Element);
            }
        }
    }
}
