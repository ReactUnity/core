using ReactUnity.UGUI.Behaviours;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class HostComponent : UGUIComponent, IHostComponent
    {
        public float Width => RectTransform.rect.width;
        public float Height => RectTransform.rect.height;

        protected string OriginalName { get; private set; }
        protected override string DefaultName => OriginalName;

        public HostComponent(RectTransform host, UGUIContext context) : base(host, context, "_root", true)
        {
            var responsive = GetOrAddComponent<ResponsiveElement>();
            responsive.Layout = Layout;
            responsive.Context = context;
            responsive.Restart();
            OriginalName = Name;
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Layout.Width = Width;
            Layout.Height = Height;
        }
    }
}
