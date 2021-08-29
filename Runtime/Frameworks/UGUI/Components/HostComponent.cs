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

        protected string OriginalName { get; private set; }
        protected override string DefaultName => OriginalName;

        public ResponsiveElement ResponsiveElement { get; private set; }

        public HostComponent(RectTransform host, UGUIContext context) : base(host, context, "_root", true)
        {
            var responsive = GetOrAddComponent<ResponsiveElement>();
            responsive.Layout = Layout;
            responsive.Context = context;
            responsive.Restart();
            ResponsiveElement = responsive;
            OriginalName = GameObject.name;
        }

        public override void DestroySelf()
        {
            Destroyed = true;
            GameObject.Destroy(ResponsiveElement);
            if (BorderAndBackground) GameObject.Destroy(BorderAndBackground);
            if (MaskAndImage) GameObject.Destroy(MaskAndImage);
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Layout.Width = Width;
            Layout.Height = Height;
        }

        protected override void ResolveTransform()
        {
            var style = ComputedStyle;

            if (style.HasValue(StyleProperties.transformOrigin))
            {
                var scaleBefore = RectTransform.localScale;
                var rotBefore = RectTransform.localRotation;
                // Reset rotation and scale before setting pivot
                RectTransform.localScale = Vector3.one;
                RectTransform.localRotation = Quaternion.identity;

                var origin = style.transformOrigin;
                var rect = RectTransform.sizeDelta;
                var pivotX = origin.X.Unit == YogaUnit.Percent ? (origin.X.Value / 100) : origin.X.Unit == YogaUnit.Point ? (origin.X.Value / rect.x) : 0.5f;
                var pivotY = origin.Y.Unit == YogaUnit.Percent ? (origin.Y.Value / 100) : origin.Y.Unit == YogaUnit.Point ? (origin.Y.Value / rect.y) : 0.5f;
                var pivot = new Vector2(pivotX, pivotY);
                Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
                deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
                deltaPosition.Scale(scaleBefore);                       // apply scaling
                deltaPosition = rotBefore * deltaPosition; // apply rotation

                RectTransform.pivot = pivot;                            // change the pivot
                RectTransform.localPosition -= deltaPosition;           // reverse the position change
                RectTransform.localScale = scaleBefore;
                RectTransform.localRotation = rotBefore;
            }

            // Restore rotation and scale
            if (style.HasValue(StyleProperties.scale))
            {
                var scale = style.scale;
                RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            }

            if (style.HasValue(StyleProperties.rotate))
            {
                RectTransform.localRotation = Quaternion.Euler(style.rotate);
            }

            // TODO: handle translate
            // TODO: revert values back if does not exist in style
        }
    }
}
