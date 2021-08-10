using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class MaskAndImage : MonoBehaviour
    {
        private ReactContext Context;
        public Mask Mask;
        public RoundedBorderMaskImage Image;
        public ImageReference MaskImage;

        public static MaskAndImage Create(GameObject go, ReactContext ctx)
        {
            var cmp = go.AddComponent<MaskAndImage>();
            cmp.Context = ctx;
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

        internal void SetMaskImage(ImageReference img)
        {
            if (MaskImage == img) return;
            MaskImage = img;
            if (img == null) Image.sprite = null;
            else img.Get(Context, res => {
                var sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
                Image.sprite = sprite;
            });
        }

        internal void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            Image.BorderRadius = new Vector4(tl, tr, br, bl);
            Image.SetMaterialDirty();
            MaskUtilities.NotifyStencilStateChanged(Mask);
        }
    }
}
