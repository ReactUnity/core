using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class MaskAndImage : MonoBehaviour
    {
        private ReactContext Context;
        public Mask Mask;
        public RectMask2D RectMask;
        public RoundedBorderMaskImage Image;
        public ImageReference MaskImage;

        public static MaskAndImage Create(GameObject go, ReactContext ctx)
        {
            var cmp = go.AddComponent<MaskAndImage>();
            cmp.Context = ctx;
            cmp.Image = go.GetComponent<RoundedBorderMaskImage>() ?? go.AddComponent<RoundedBorderMaskImage>();
            cmp.Mask = go.GetComponent<Mask>() ?? go.AddComponent<Mask>();
            cmp.Mask.showMaskGraphic = false;
            cmp.Mask.enabled = false;
            cmp.RectMask = go.GetComponent<RectMask2D>() ?? go.AddComponent<RectMask2D>();
            return cmp;
        }

        internal void SetEnabled(bool enabled)
        {
            Image.enabled = enabled;
            Mask.enabled = Image.sprite != null;
            RectMask.enabled = Image.sprite == null;
        }

        internal void SetMaskImage(ImageReference img)
        {
            if (MaskImage == img) return;
            MaskImage = img;
            if (img == null)
            {
                Image.sprite = null;
                Mask.enabled = Image.sprite != null;
                RectMask.enabled = Image.sprite == null;
            }
            else img.Get(Context, res => {
                var sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
                Image.sprite = sprite;
                Mask.enabled = Image.sprite != null;
                RectMask.enabled = Image.sprite == null;
            });
        }

        internal void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            Image.BorderRadius = new Vector4(tl, tr, br, bl);
            Image.SetMaterialDirty();
            if (Mask.enabled) MaskUtilities.NotifyStencilStateChanged(Mask);
        }
    }
}
