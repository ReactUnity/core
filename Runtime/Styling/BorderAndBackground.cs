using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling.Internal;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class BorderAndBackground : MonoBehaviour
    {
        public RectTransform Root { get; private set; }
        public RectTransform Border { get; private set; }
        public RectTransform Background { get; private set; }
        public RectTransform Shadow { get; private set; }

        public RoundedBorderMaskImage RootGraphic;
        public Mask RootMask;

        public BasicBorderImage BorderGraphic;

        void OnEnable()
        {
            var root = new GameObject("[MaskRoot]", typeof(RectTransform), typeof(RoundedBorderMaskImage));
            var border = new GameObject("[BorderImage]", typeof(RectTransform), typeof(BasicBorderImage));
            var bg = new GameObject("[BackgroundImage]", typeof(RectTransform), typeof(Image));


            RootGraphic = root.GetComponent<RoundedBorderMaskImage>();

            RootMask = root.AddComponent<Mask>();
            RootMask.showMaskGraphic = false;

            BorderGraphic = border.GetComponent<BasicBorderImage>();

            var bgImage = bg.GetComponent<Image>();
            bgImage.type = Image.Type.Sliced;
            bgImage.pixelsPerUnitMultiplier = 1;

            var sd = new GameObject("[Shadow]", typeof(RectTransform), typeof(IgnoreMaskImage));
            var sdImage = sd.GetComponent<Image>();
            sdImage.type = Image.Type.Sliced;
            sdImage.sprite = ResourcesHelper.BoxShadowSprite;

            Root = root.transform as RectTransform;
            Shadow = sd.transform as RectTransform;
            Border = border.transform as RectTransform;
            Background = bg.transform as RectTransform;

            FullStretch(Shadow, Root);
            FullStretch(Background, Root);
            FullStretch(Border, Root);
            FullStretch(Root, transform as RectTransform);
            Root.SetAsFirstSibling();
        }

        public void SetBorderSize(YogaNode layout)
        {
            var bidiLeft = layout.LayoutDirection == YogaDirection.LTR ? layout.BorderStartWidth : layout.BorderEndWidth;
            var bidiRight = layout.LayoutDirection == YogaDirection.RTL ? layout.BorderStartWidth : layout.BorderEndWidth;

            var borderLeft = GetFirstDefinedSize(bidiLeft, layout.BorderLeftWidth, layout.BorderWidth);
            var borderRight = GetFirstDefinedSize(bidiRight, layout.BorderRightWidth, layout.BorderWidth);
            var borderTop = GetFirstDefinedSize(layout.BorderTopWidth, layout.BorderWidth);
            var borderBottom = GetFirstDefinedSize(layout.BorderBottomWidth, layout.BorderWidth);


            var min = new Vector2(-borderLeft, -borderBottom);
            var max = new Vector2(borderRight, borderTop);

            Root.offsetMin = -min;
            Root.offsetMax = -max;

            Border.offsetMin = min;
            Border.offsetMax = max;

            Background.offsetMin = min;
            Background.offsetMax = max;

            Shadow.offsetMin = min;
            Shadow.offsetMax = max;

            var borderImage = Border.GetComponent<Image>();
            borderImage.enabled = borderLeft > 0 || borderRight > 0 || borderBottom > 0 || borderTop > 0;
        }

        public void SetBorderImage(Sprite sprite)
        {
            Root.GetComponent<Image>().sprite = sprite;
            Border.GetComponent<Image>().sprite = sprite;
        }

        public void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            var v = new Vector4(tl, tr, br, bl);

            RootGraphic.BorderRadius = v;
            RootGraphic.SetMaterialDirty();
            MaskUtilities.NotifyStencilStateChanged(RootMask);

            BorderGraphic.BorderRadius = v;
            BorderGraphic.SetMaterialDirty();
        }

        public void SetBorderColor(Color top, Color right, Color bottom, Color left)
        {
            Border.GetComponent<Image>().color = top;
        }

        public void SetBackgroundColorAndImage(Color? color, Sprite sprite)
        {
            var bg = Background.GetComponent<Image>();
            bg.color = color.HasValue ? color.Value : (sprite ? Color.white : Color.clear);
            bg.sprite = sprite;
        }

        public void SetBoxShadow(BoxShadow shadow)
        {
            Shadow.gameObject.SetActive(shadow != null);

            if (shadow == null) return;

            Shadow.sizeDelta = shadow.spread * 2;
            Shadow.anchoredPosition = new Vector2(shadow.offset.x, -shadow.offset.y);

            var sd = Shadow.GetComponent<Image>();
            var ppu = shadow.blur <= 0 ? 4000 : (4000 / shadow.blur);
            sd.pixelsPerUnitMultiplier = ppu;
            sd.color = shadow.color;
            sd.SetVerticesDirty();
        }

        void FullStretch(RectTransform child, RectTransform parent)
        {
            child.transform.SetParent(parent, false);
            child.anchorMin = new Vector2(0, 0);
            child.anchorMax = new Vector2(1, 1);
            child.anchoredPosition = Vector2.zero;
            child.pivot = new Vector2(0.5f, 0.5f);
            child.sizeDelta = Vector2.zero;
        }

        private float GetFirstDefinedSize(params float[] fallbacks)
        {
            for (int i = 0; i < fallbacks.Length; i++)
            {
                var f = fallbacks[i];

                if (!float.IsNaN(f)) return f;
            }

            return 0;
        }
    }
}
