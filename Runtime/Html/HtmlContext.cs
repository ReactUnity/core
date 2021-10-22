namespace ReactUnity.Html
{
    public class HtmlContext
    {
        public readonly ReactContext Context;
        public readonly HtmlParser Parser;

        public HtmlContext(ReactContext context)
        {
            Context = context;
            Parser = new HtmlParser(this);
        }

        public void InsertHtml(string html, IContainerComponent root = null, bool clearContent = false)
        {
            var parent = root ?? Context.Host;
            if (clearContent) root?.Clear();
            Parser.Parse(html, parent);
        }
    }
}
