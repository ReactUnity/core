using ReactUnity.Styling.Internal;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class MaskAndImage : MonoBehaviour
    {
        public Mask Mask;
        public RoundedBorderMaskImage Image;

        public static MaskAndImage Create(GameObject go)
        {
            var cmp = go.AddComponent<MaskAndImage>();
            cmp.Image = go.GetComponent<RoundedBorderMaskImage>() ?? go.AddComponent<RoundedBorderMaskImage>();
            cmp.Mask = go.GetComponent<Mask>() ?? go.AddComponent<Mask>();
            cmp.Mask.showMaskGraphic = false;
            return cmp;
        }

        internal void SetEnabled(bool enabled)
        {
            Image.enabled = enabled;
            Mask.enabled = enabled;
        }

        internal void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            Image.BorderRadius = new Vector4(tl, tr, br, bl);
            Image.SetMaterialDirty();
            MaskUtilities.NotifyStencilStateChanged(Mask);
        }
    }
}
