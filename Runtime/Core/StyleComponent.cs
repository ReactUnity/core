using System;
using ReactUnity.StyleEngine;

namespace ReactUnity
{
    public class StyleComponent : BaseReactComponent<ReactContext>, ITextComponent
    {
        private object scope;
        public object Scope
        {
            get => scope;
            set
            {
                scope = value;
                UpdateSheet();
            }
        }

        private int importance = 0;
        public int Importance
        {
            get => importance;
            set
            {
                importance = value;
                UpdateSheet();
            }
        }

        public StyleSheet Sheet { get; private set; }
        public string Content { get; private set; }
        public override string Name { get; set; }

        public StyleComponent(ReactContext ctx, string tag = "style", string text = null) : base(ctx, tag, false)
        {
            SetText(text);
            Name = DefaultName;
        }

        public void SetText(string text)
        {
            Content = text;
            UpdateSheet();
        }

        private void UpdateSheet()
        {
            if (Sheet != null) Context.RemoveStyle(Sheet);
            Sheet = null;

            if (Parent != null && scope != null && !string.IsNullOrWhiteSpace(Content))
            {
                var scopeEl = GetScopeElement();

                if (scopeEl != null)
                {
                    Sheet = new StyleSheet(Context.Style, Content, Importance, scopeEl);
                    Context.InsertStyle(Sheet);
                }
            }
        }

        public IReactComponent GetScopeElement()
        {
            IReactComponent res;
            if (scope is string s)
            {
                if (s == "root" || s == ":root") res = Context.Host;
                else if (s == "parent" || s == ":parent") res = Parent;
                else res = Context.Host.QuerySelector(s);
            }
            else if (scope is IReactComponent c) res = c;
            else res = null;

            return res;
        }

        public void Refresh()
        {
            UpdateSheet();
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "scope") Scope = value;
            else if (propertyName == "importance") Importance = Convert.ToInt32(Converters.AllConverters.IntConverter.Convert(value ?? "0"));
            else base.SetProperty(propertyName, value);
        }

        #region BaseReactComponent Implementation

        public override void Update() { }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            base.SetParent(newParent, relativeTo, insertAfter);
            UpdateSheet();
        }

        public override object AddComponent(Type type) { return null; }

        public override object GetComponent(Type type) { return null; }

        public override void Relayout() { }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ApplyStylesSelf() { }

        protected override bool DeleteChild(IReactComponent child) => false;

        protected override bool InsertChild(IReactComponent child, int index) => false;

        #endregion
    }
}
