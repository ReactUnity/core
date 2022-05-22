using System.Runtime.CompilerServices;

namespace ReactUnity.Helpers.Visitors
{
    internal class UpdateVisitor : ReactComponentVisitor
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool Visit(IReactComponent component)
        {
            component.Update();
            return true;
        }
    }
}
