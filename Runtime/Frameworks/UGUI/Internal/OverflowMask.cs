using ReactUnity.Types;
using ReactUnity.UGUI.Shapes;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    public class MaskAndImage : MonoBehaviour
    {
        private ReactContext Context;
        public Mask Mask;
        public Graphic Graphic;
        public WebRect Image;
        private bool Enabled;

        public static MaskAndImage Create(GameObject go, ReactContext ctx)
        {
            var cmp = go.AddComponent<MaskAndImage>();
            cmp.Context = ctx;
            cmp.Graphic = go.GetComponent<Graphic>();

            if (cmp.Graphic) cmp.Image = cmp.Graphic as WebRect;
            else cmp.Graphic = cmp.Image = go.AddComponent<WebRect>();

            if (cmp.Image) cmp.Image.raycastTarget = false;
            return cmp;
        }

        internal void SetEnabled(bool enabled)
        {
            Enabled = enabled;
            MaskChanged();
        }

        internal void SetBorderRadius(YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            if (!Image) return;
            Image.Rounding = new WebRoundingProperties
            {
                Type = WebRoundingProperties.RoundedType.Individual,
                TLRadius = tl,
                TRRadius = tr,
                BRRadius = br,
                BLRadius = bl,
            };
            MaskChanged();
            Image.SetMaterialDirty();
            if (Mask && Mask.enabled) MaskUtilities.NotifyStencilStateChanged(Mask);
        }

        void MaskChanged()
        {
            Graphic.enabled = Enabled;

            if (Enabled)
            {
                if (!Mask)
                {
                    Mask = gameObject.GetComponent<Mask>() ?? gameObject.AddComponent<Mask>();
                    Mask.showMaskGraphic = false;
                    Mask.enabled = false;
                }
                Mask.enabled = true;
            }
            else
            {
                if (Mask) Mask.enabled = false;
            }
        }
    }
}
