using ReactUnity.Helpers;
using ReactUnity.Styling.Internal;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class MaskAndImage : MonoBehaviour
    {
        public Mask Mask;
        public RoundedBorderMaskImage Image;

        void OnEnable()
        {
            var go = gameObject;

            Image = go.GetComponent<RoundedBorderMaskImage>() ?? go.AddComponent<RoundedBorderMaskImage>();

            Mask = go.GetComponent<Mask>() ?? go.AddComponent<Mask>();
            Mask.showMaskGraphic = false;
        }

        internal void SetEnabled(bool enabled)
        {
            Image.enabled = enabled;
            Mask.enabled = enabled;
        }

        internal void SetBorderRadius(float tl, float tr, float bl, float br)
        {
            Image.BorderRadius = new Vector4(tl, tr, br, bl);
            Image.SetMaterialDirty();
            MaskUtilities.NotifyStencilStateChanged(Mask);
        }
    }
}
