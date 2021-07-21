using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class HostComponent : UIToolkitComponent<VisualElement>, IHostComponent
    {
        private float CurrentWidth = -1;
        private float CurrentHeight = -1;

        public HostComponent(VisualElement element, UIToolkitContext ctx) : base(element, ctx, "_root")
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
            }
        }
    }
}
