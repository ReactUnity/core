using System.Runtime.CompilerServices;

namespace ReactUnity.Helpers.Visitors
{
    internal class UpdateVisitor : ReactComponentVisitor
    {
        public static readonly UpdateVisitor Instance = new UpdateVisitor();

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool Visit(IReactComponent component)
        {
            component.Update();
            return true;
        }
    }

    internal class LateUpdateVisitor : ReactComponentVisitor
    {
        public static readonly LateUpdateVisitor Instance = new LateUpdateVisitor();

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool Visit(IReactComponent component)
        {
            if (!component.UpdatedThisFrame) component.Update();
            component.UpdatedThisFrame = false;
            return true;
        }
    }
}
