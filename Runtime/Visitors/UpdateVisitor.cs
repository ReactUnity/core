namespace ReactUnity.Visitors
{
    internal class UpdateVisitor : ReactComponentVisitor
    {
        public override void Visit(IReactComponent component)
        {
            component.Update();
        }

        public void Update(IReactComponent component)
        {
            component.Accept(this);
        }
    }
}
