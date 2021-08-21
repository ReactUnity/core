namespace ReactUnity.Helpers
{
    public class ClassList : WatchableSet<string>
    {
        private readonly IReactComponent Component;

        public ClassList(IReactComponent component)
        {
            Component = component;
        }

        internal override void OnAdd(string item)
        {
            Component.MarkForStyleResolving(true);
        }

        internal override void OnRemove(string item)
        {
            Component.MarkForStyleResolving(true);
        }

        internal override void OnBeforeChange()
        {
        }

        internal override void OnAfterChange()
        {
            Component.MarkForStyleResolving(true);
        }
    }
}
