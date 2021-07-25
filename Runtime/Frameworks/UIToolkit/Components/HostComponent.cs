using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class HostComponent : UIToolkitComponent<VisualElement>, IHostComponent
    {
        public float Width { get; private set; } = -1;
        public float Height { get; private set; } = -1;

        public HostComponent(VisualElement element, UIToolkitContext ctx) : base(element, ctx, "_root")
        {
            Width = Element.layout.width;
            Height = Element.layout.width;
            Context.MediaProvider.SetDimensions(Width, Height);

            element.RegisterCallback<GeometryChangedEvent>(OnResize);
        }

        void OnResize(GeometryChangedEvent ev)
        {
            var width = ev.newRect.width;
            var height = ev.newRect.height;

            if (width != Width || height != Height)
            {
                Width = width;
                Height = height;
                Context.MediaProvider.SetDimensions(width, height);
            }
        }
    }
}
