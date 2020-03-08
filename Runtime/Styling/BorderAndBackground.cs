using Facebook.Yoga;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class BorderAndBackground
    {
        public RectTransform Root;
        public RectTransform Border;
        public RectTransform Background;

        public BorderAndBackground(RectTransform parent)
        {
            var root = new GameObject("[MaskRoot]", typeof(RectTransform), typeof(Image), typeof(Mask));
            var border = new GameObject("[BorderImage]", typeof(RectTransform), typeof(InvertedMaskImage));
            var bg = new GameObject("[BackgroundImage]", typeof(RectTransform), typeof(Image));

            root.GetComponent<Mask>().showMaskGraphic = false;

            var maskImage = root.GetComponent<Image>();
            maskImage.type = Image.Type.Sliced;
            maskImage.pixelsPerUnitMultiplier = 100;

            var borderImage = border.GetComponent<Image>();
            borderImage.type = Image.Type.Sliced;
            borderImage.pixelsPerUnitMultiplier = 100;

            Root = root.transform as RectTransform;
            Border = border.transform as RectTransform;
            Background = bg.transform as RectTransform;

            FullStretch(Border, Root);
            FullStretch(Background, Root);
            FullStretch(Root, parent);
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

            Root.offsetMin = new Vector2(borderLeft, borderBottom);
            Root.offsetMax = new Vector2(-borderRight, -borderTop);

            Border.offsetMin = new Vector2(-borderLeft, -borderBottom);
            Border.offsetMax = new Vector2(borderRight, borderTop);


            var borderImage = Border.GetComponent<Image>();
            borderImage.enabled = borderLeft > 0 || borderRight > 0 || borderBottom > 0 || borderTop > 0;
        }

        public void SetBorderImage(Sprite sprite)
        {
            Root.GetComponent<Image>().sprite = sprite;
            Border.GetComponent<Image>().sprite = sprite;
        }

        public void SetBorderColor(Color color)
        {
            Border.GetComponent<Image>().color = color;
        }

        public void SetBackgroundImage(Sprite sprite)
        {
            Background.GetComponent<Image>().sprite = sprite;
        }

        public void SetBackgroundColor(Color color)
        {
            Background.GetComponent<Image>().color = color;
        }

        void FullStretch(RectTransform child, RectTransform parent)
        {
            child.transform.SetParent(parent);
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
