namespace ReactUnity.Helpers.Visitors
{
    public abstract class ReactComponentVisitor
    {
        /// <returns>If the visitor should continue</returns>
        public abstract bool Visit(IReactComponent component);
    }
}
