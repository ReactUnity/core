using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class MaskAndImage
    {
        public Mask Mask;
        public Image Image;
        private ReactContext Context;

        public MaskAndImage(RectTransform parent, ReactContext context)
        {
            var go = parent.gameObject;
            Context = context;

            Image = go.GetComponent<Image>() ?? go.AddComponent<Image>();
            Image.type = Image.Type.Sliced;
            Image.pixelsPerUnitMultiplier = 100;

            Mask = go.GetComponent<Mask>() ?? go.AddComponent<Mask>();
            Mask.showMaskGraphic = false;
        }

        internal void SetEnabled(bool enabled)
        {
            Image.enabled = enabled;
            Mask.enabled = enabled;
        }

        internal void SetBorderRadius(int tl, int tr, int bl, int br)
        {
            Context.Dispatcher.OnceUpdate(() =>
            {
                if (Image) Image.sprite = BorderGraphic.CreateBorderSprite(tl, tr, bl, br);
            });
        }
    }
}
