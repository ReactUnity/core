using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorHostComponent : EditorReactComponent<VisualElement>, IHostComponent
    {
        ReactContext IHostComponent.Context => Context;

        public EditorHostComponent(VisualElement element, EditorContext ctx) : base(element, ctx, "_root") { }
    }
}
