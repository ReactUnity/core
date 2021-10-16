using System;
using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity
{
    public class MetaComponent : BaseReactComponent<ReactContext>
    {
        public override string Name { get; set; }
        public override float ClientWidth => 0;
        public override float ClientHeight => 0;

        public MetaComponent(ReactContext ctx, string tag, bool isContainer = false) : base(ctx, tag, isContainer)
        {
            Name = DefaultName;
        }

        #region BaseReactComponent Implementation

        public override void Update() { }

        public override object AddComponent(Type type) { return null; }

        public override object GetComponent(Type type) { return null; }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ApplyStylesSelf() { }

        protected override bool DeleteChild(IReactComponent child) => false;

        protected override bool InsertChild(IReactComponent child, int index) => false;

        public override bool UpdateOrder(int prev, int current) => false;

        #endregion
    }

    public abstract class SourceMetaComponent : MetaComponent, ITextComponent
    {
        public SourceMetaComponent(ReactContext ctx, string tag, bool isContainer = false) : base(ctx, tag, isContainer) { }

        private string content;
        public string Content
        {
            get => content;
            set
            {
                if (source != null && !string.IsNullOrWhiteSpace(value))
                    throw new InvalidOperationException("Content cannot be set when source is already set");
                if (content != value)
                {
                    content = value;
                    if (source == null) InnerContent = value;
                }
            }
        }

        private string innerContent;
        public string InnerContent
        {
            get => innerContent;
            private set
            {
                innerContent = value;
                RefreshValue();
            }
        }

        private object source;
        public object Source
        {
            get => source;
            set
            {
                if (source != value)
                {
                    source = value;
                    SetSource(value);
                }
            }
        }

        protected abstract void RefreshValue();

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    Source = value;
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        public void SetText(string text) => Content = text;

        private void SetSource(object value)
        {
            var reference = AllConverters.TextReferenceConverter.Convert(value) as TextReference;

            if (reference == null) InnerContent = Content;
            else reference?.Get(Context, text => {
                if (value != Source) return;
                InnerContent = text.text;
            });
        }
    }
}
