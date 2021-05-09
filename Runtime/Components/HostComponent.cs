using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Components
{

    public class HostComponent : ReactComponent, IHostComponent
    {
        public float Width => RectTransform.rect.width;
        public float Height => RectTransform.rect.height;

        public static NodeStyle HostDefaultStyle { get; } = new NodeStyle()
        {
            fontSize = YogaValue.Point(24),
        };
        public override NodeStyle DefaultStyle => HostDefaultStyle;

        public HostComponent(RectTransform host, UGUIContext context) : base(host, context, "_root", true)
        {
            Layout.Width = Width;
            Layout.Height = Height;

            var responsive = GetOrAddComponent<ResponsiveElement>();
            responsive.Layout = Layout;
            responsive.Context = context;
        }

        public override void ApplyStyles()
        {
        }
    }
}
