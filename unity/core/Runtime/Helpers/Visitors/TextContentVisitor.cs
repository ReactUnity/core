namespace ReactUnity.Helpers.Visitors
{
    internal class TextContentVisitor : ReactComponentVisitor
    {
        string Text = "";

        public override bool Visit(IReactComponent component)
        {
            switch (component)
            {
                case ITextComponent t:
                    Text += t.Content;
                    break;
                default:
                    break;
            }
            return true;
        }

        public string Get(IReactComponent component)
        {
            Text = "";
            component.Accept(this);
            return Text;
        }
    }
}
