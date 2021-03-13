using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class HostComponent : EditorComponent<VisualElement>, IHostComponent
    {
        ReactContext IHostComponent.Context => Context;

        public HostComponent(VisualElement element, EditorContext ctx) : base(element, ctx, "_root") { }
    }
}
