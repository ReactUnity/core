using System;
using ReactUnity.Styling;

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

        private bool active = true;
        public bool Active
        {
            get => active;
            set
            {
                if (active != value)
                {
                    if (sheet != null && active) Context.RemoveStyle(sheet);
                    active = value;
                    if (sheet != null && active) Context.InsertStyle(sheet);
                }
            }
        }

        private StyleSheet sheet;
        public StyleSheet Sheet
        {
            get => sheet;
            private set
            {
                if (sheet != null && active) Context.RemoveStyle(sheet);
                sheet = value;
                if (sheet != null && active) Context.InsertStyle(sheet);
            }
        }

        public string Content { get; private set; }
        public override string Name { get; set; }

        public override float ClientWidth => 0;
        public override float ClientHeight => 0;

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
            Sheet = null;

            if (Parent != null && scope != null && !string.IsNullOrWhiteSpace(Content))
            {
                var scopeEl = GetScopeElement();

                if (scopeEl != null)
                {
                    Sheet = new StyleSheet(Context.Style, Content, Importance, scopeEl);
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

            switch (propertyName)
            {
                case "scope":
                    Scope = value;
                    break;
                case "active":
                    Active = Convert.ToBoolean(value);
                    break;
                case "importance":
                    Importance = Convert.ToInt32(Converters.AllConverters.IntConverter.Convert(value ?? "0"));
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
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

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ApplyStylesSelf() { }

        protected override bool DeleteChild(IReactComponent child) => false;

        protected override bool InsertChild(IReactComponent child, int index) => false;

        public override bool UpdateOrder(int prev, int current) => false;

        #endregion
    }
}
