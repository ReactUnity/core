using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.UIToolkit
{
    public class EditorHostComponent : ReactUnity.UIToolkit.HostComponent
    {
        private EditorContext ctx { get; }

        public EditorHostComponent(VisualElement element, EditorContext ctx) : base(element, ctx)
        {
            this.ctx = ctx;
        }

        public override void ResolveStyle(bool recursive = false)
        {
            base.ResolveStyle(recursive);
            DialogElement.ResolveStyle(ctx, ctx.Window, Element.style);
        }
    }
}
