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

        public void SetBorderSize(float size)
        {
            size = size * 2;
            Root.sizeDelta = new Vector2(-size, -size);
            Border.sizeDelta = new Vector2(size, size);
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
    }
}
