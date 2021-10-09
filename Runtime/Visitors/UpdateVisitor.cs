using System.Runtime.CompilerServices;

namespace ReactUnity.Visitors
{
    internal class UpdateVisitor : ReactComponentVisitor
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override void Visit(IReactComponent component) => component.Update();
    }
}
