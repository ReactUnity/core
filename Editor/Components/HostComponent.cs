using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class HostComponent : EditorComponent<VisualElement>, IHostComponent
    {
        private float CurrentWidth = -1;
        private float CurrentHeight = -1;

        public HostComponent(VisualElement element, EditorContext ctx) : base(element, ctx, "_root")
        {
            element.RegisterCallback<GeometryChangedEvent>(OnResize);
        }

        void OnResize(GeometryChangedEvent ev)
        {
            var width = ev.newRect.width;
            var height = ev.newRect.height;

            if (width != CurrentWidth || height != CurrentHeight)
            {
                CurrentWidth = width;
                CurrentHeight = height;
                Context.MediaProvider.SetDimensions(width, height);
                Context.ScheduleLayout();
            }
        }
    }
}
