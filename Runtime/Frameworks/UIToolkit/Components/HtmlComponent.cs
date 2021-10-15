using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class HtmlComponent : UIToolkitComponent<VisualElement>
    {
        private string content;
        public string Content
        {
            get => content;
            set
            {
                if (content != value)
                {
                    content = value;
                    Clean();
                    Create(content);
                }
            }
        }

        public HtmlComponent(UIToolkitContext ctx, string tag = "html") : base(ctx, tag, true)
        {
        }

        private void Clean()
        {
            for (int i = Children.Count - 1; i >= 0; i--)
            {
                var child = Children[i];
                child.Remove();
            }
        }

        private void Create(string content)
        {
            Context.Html.InsertHtml(content, this);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "content":
                    Content = value?.ToString();
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
