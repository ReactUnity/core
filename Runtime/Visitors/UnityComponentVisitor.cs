using ReactUnity.Components;

namespace ReactUnity.Visitors
{
    public abstract class UnityComponentVisitor
    {
        public abstract void Visit(UnityComponent component);
    }
}
