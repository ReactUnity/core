namespace ReactUnity.Visitors
{
    internal class TextContentVisitor : ReactComponentVisitor
    {
        string Text = "";

        public override void Visit(IReactComponent component)
        {
            switch (component)
            {
                case ITextComponent t:
                    Text += t.Content;
                    break;
                default:
                    break;
            }
        }

        public string Get(IReactComponent component)
        {
            Text = "";
            component.Accept(this);
            return Text;
        }
    }
}
