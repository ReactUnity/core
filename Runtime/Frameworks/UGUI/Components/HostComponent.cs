using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class HostComponent : UGUIComponent, IHostComponent
    {
        public float Width => RectTransform.rect.width;
        public float Height => RectTransform.rect.height;

        public static NodeStyle HostDefaultStyle { get; } = new NodeStyle(null)
        {
            fontSize = 24,
        };
        public override NodeStyle DefaultStyle => HostDefaultStyle;

        public HostComponent(RectTransform host, UGUIContext context) : base(host, context, "_root", true)
        {
            var responsive = GetOrAddComponent<ResponsiveElement>();
            responsive.Layout = Layout;
            responsive.Context = context;
            responsive.Restart();
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Layout.Width = Width;
            Layout.Height = Height;
        }

        protected override void ApplyStylesSelf()
        {
        }
    }
}
