namespace ReactUnity.Html
{
    public class HtmlComponent : SourceProxyComponent
    {
        public HtmlComponent(ReactContext ctx, string tag = "html", string text = null) : base(ctx.CreateDefaultComponent(tag, "") as IContainerComponent)
        {
            SetText(text);
        }

        private void Clean()
        {
            for (int i = Children.Count - 1; i >= 0; i--)
            {
                var child = Children[i];
                child.Remove();
            }
        }

        protected override void RefreshValue()
        {
            Clean();
            Context.Html.InsertHtml(InnerContent, this);
        }
    }
}
