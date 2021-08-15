using System;
using ReactUnity.StyleEngine;

namespace ReactUnity
{
    public class StyleComponent : BaseReactComponent<ReactContext>, ITextComponent
    {
        public StyleSheet Sheet;
        public string Content { get; private set; }
        public override string Name { get; set; }

        public StyleComponent(ReactContext ctx, string tag = "style", string text = null) : base(ctx, tag, false)
        {
            SetText(text);
            Name = DefaultName;
        }

        public void SetText(string text)
        {
            var newSheet = string.IsNullOrWhiteSpace(text) ? null : new StyleSheet(Context.Style, text, 0);
            UpdateSheet(newSheet);
        }

        private void UpdateSheet(StyleSheet sheet)
        {
            if (Sheet != null) Context.RemoveStyle(Sheet);
            Sheet = sheet;
            if (Sheet != null && Parent != null) Context.InsertStyle(Sheet);
        }

        #region BaseReactComponent Implementation

        public override void Update() { }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            base.SetParent(newParent, relativeTo, insertAfter);
            UpdateSheet(Sheet);
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
