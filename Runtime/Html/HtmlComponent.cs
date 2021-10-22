namespace ReactUnity.Html
{
    public class HtmlComponent : SourceProxyComponent
    {
        public HtmlComponent(ReactContext ctx, string tag = "html", string text = null) : base(ctx.CreateDefaultComponent(tag, "") as IContainerComponent)
        {
            SetText(text);
        }

        protected override void RefreshValue()
        {
            Clear();
            Context.Html.InsertHtml(InnerContent, this);
        }
    }
}
