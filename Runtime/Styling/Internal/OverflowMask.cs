using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class MaskAndImage : MonoBehaviour
    {
        private ReactContext Context;
        public Mask Mask;
        public Graphic Graphic;
        public RoundedBorderMaskImage Image;
        private bool Enabled;

        public static MaskAndImage Create(GameObject go, ReactContext ctx)
        {
            var cmp = go.AddComponent<MaskAndImage>();
            cmp.Context = ctx;
            cmp.Graphic = go.GetComponent<Graphic>();

            if (cmp.Graphic) cmp.Image = cmp.Graphic as RoundedBorderMaskImage;
            else cmp.Graphic = cmp.Image = go.AddComponent<RoundedBorderMaskImage>();

            if (cmp.Image) cmp.Image.raycastTarget = false;
            return cmp;
        }

        internal void SetEnabled(bool enabled)
        {
            Enabled = enabled;
            MaskChanged();
        }

        internal void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            if (!Image) return;
            Image.BorderRadius = new Vector4(tl, tr, br, bl);
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
