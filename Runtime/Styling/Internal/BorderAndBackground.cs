using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class BorderAndBackground : MonoBehaviour
    {
        public RectTransform Root { get; private set; }
        public RectTransform Border { get; private set; }
        public RectTransform BackgroundRoot { get; private set; }
        public RectTransform ShadowRoot { get; private set; }

        private ReactContext Context;
        internal RawImage BgImage;

        public RoundedBorderMaskImage RootGraphic;
        public Mask RootMask;

        public BasicBorderImage BorderGraphic;

        public List<BoxShadowImage> ShadowGraphics;
        public List<BackgroundImage> BackgroundGraphics;

        private Color BgColor
        {
            set
            {
                BgImage.color = value;
                BgImage.raycastTarget = BgImage.color.a > 0 || PointerEvents == PointerEvents.All;
            }
        }

        private PointerEvents PointerEvents;

        public static BorderAndBackground Create(GameObject go, ReactContext ctx)
        {
            var cmp = go.GetComponent<BorderAndBackground>();
            if (!cmp) cmp = go.AddComponent<BorderAndBackground>();

            var root = new GameObject("[MaskRoot]", typeof(RectTransform), typeof(RoundedBorderMaskImage));
            var border = new GameObject("[BorderImage]", typeof(RectTransform), typeof(BasicBorderImage));
            var bg = new GameObject("[BackgroundImage]", typeof(RectTransform), typeof(BackgroundImage));


            cmp.RootGraphic = root.GetComponent<RoundedBorderMaskImage>();
            cmp.RootGraphic.raycastTarget = false;

            cmp.Context = ctx;
            cmp.RootMask = root.AddComponent<Mask>();
            cmp.RootMask.showMaskGraphic = false;

            cmp.BorderGraphic = border.GetComponent<BasicBorderImage>();

            var bgImage = bg.GetComponent<RawImage>();
            cmp.BgImage = bgImage;
            bgImage.color = Color.clear;

            var sr = new GameObject("[Shadows]", typeof(RectTransform));

            cmp.Root = root.transform as RectTransform;
            cmp.ShadowRoot = sr.transform as RectTransform;
            cmp.Border = border.transform as RectTransform;
            cmp.BackgroundRoot = bg.transform as RectTransform;

            FullStretch(cmp.ShadowRoot, cmp.Root);
            FullStretch(cmp.BackgroundRoot, cmp.Root);
            FullStretch(cmp.Border, cmp.Root);
            FullStretch(cmp.Root, cmp.transform as RectTransform);
            cmp.Root.SetAsFirstSibling();

            return cmp;
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

            BackgroundRoot.offsetMin = min;
            BackgroundRoot.offsetMax = max;

            ShadowRoot.offsetMin = min;
            ShadowRoot.offsetMax = max;

            BorderGraphic.enabled = borderLeft > 0 || borderRight > 0 || borderBottom > 0 || borderTop > 0;
            BorderGraphic.BorderSize = new Vector4(borderTop, borderRight, borderBottom, borderLeft);
            BorderGraphic.SetMaterialDirty();
        }

        public void SetBorderRadius(float tl, float tr, float br, float bl)
        {
            var v = new Vector4(tl, tr, br, bl);

            RootGraphic.BorderRadius = v;
            RootGraphic.SetMaterialDirty();
            MaskUtilities.NotifyStencilStateChanged(RootMask);

            BorderGraphic.BorderRadius = v;
            BorderGraphic.SetMaterialDirty();

            if (ShadowGraphics != null)
            {
                for (int i = 0; i < ShadowGraphics.Count; i++)
                {
                    var g = ShadowGraphics[i];

                    g.BorderRadius = v;
                    g.SetMaterialDirty();
                }
            }
        }

        public void SetBorderColor(Color top, Color right, Color bottom, Color left)
        {
            BorderGraphic.TopColor = top;
            BorderGraphic.RightColor = right;
            BorderGraphic.BottomColor = bottom;
            BorderGraphic.LeftColor = left;
            BorderGraphic.SetMaterialDirty();
        }

        public void SetBackgroundColorAndImage(Color color, CssValueList<ImageDefinition> images, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            if (BackgroundGraphics == null) BackgroundGraphics = new List<BackgroundImage>();

            BgColor = color;
            BgImage.enabled = blendMode == BackgroundBlendMode.Normal || blendMode == BackgroundBlendMode.Color;

            var validCount = images.Count;
            var diff = BackgroundGraphics.Count - validCount;

            if (diff > 0)
            {
                for (int i = diff - 1; i >= 0; i--)
                {
                    var sd = BackgroundGraphics[validCount + i];

                    BackgroundGraphics.RemoveAt(validCount + i);
                    DestroyImmediate(sd.gameObject);
                }
            }
            else if (diff < 0)
            {
                for (int i = -diff - 1; i >= 0; i--)
                {
                    CreateBackgroundImage();
                }
            }


            for (int i = 0; i < images.Count; i++)
            {
                var img = images[i];
                var sd = BackgroundGraphics[i];
                sd.SetBackgroundColorAndImage(color, img, blendMode);
            }
        }

        public void SetBoxShadow(BoxShadowList shadows)
        {
            var validCount = 0;

            if (shadows != null)
            {
                for (int i = 0; i < shadows.Items.Length; i++)
                {
                    var shadow = shadows.Items[i];
                    if (shadow.Valid) validCount++;
                }
            }

            if (ShadowGraphics == null)
            {
                if (validCount > 0) ShadowGraphics = new List<BoxShadowImage>();
                else return;
            }


            var diff = ShadowGraphics.Count - validCount;

            if (diff > 0)
            {
                for (int i = diff - 1; i >= 0; i--)
                {
                    var sd = ShadowGraphics[validCount + i];

                    ShadowGraphics.RemoveAt(validCount + i);
                    DestroyImmediate(sd.gameObject);
                }
            }
            else if (diff < 0)
            {
                for (int i = -diff - 1; i >= 0; i--)
                {
                    CreateShadow();
                }
            }

            if (validCount == 0) return;

            var gIndex = 0;
            var len = shadows.Items.Length;
            for (int i = 0; i < len; i++)
            {
                var shadow = shadows.Items[len - 1 - i];
                if (!shadow.Valid) continue;

                BoxShadowImage g = ShadowGraphics[gIndex];
                gIndex++;

                var rt = g.rectTransform;

                g.Shadow = shadow;

                if (shadow.inset)
                {
                    if (rt.parent != BackgroundRoot) FullStretch(rt, BackgroundRoot);
                    rt.sizeDelta = Vector2.zero;
                    rt.anchoredPosition = Vector2.zero;
                }
                else
                {
                    if (rt.parent != ShadowRoot) FullStretch(rt, ShadowRoot);

                    rt.sizeDelta = ((shadow.inset ? -1 : 1) * shadow.spread + shadow.blur) * 2;
                    rt.anchoredPosition = new Vector2(shadow.offset.x, -shadow.offset.y);
                }

                g.color = shadow.color;
                g.SetMaterialDirty();
            }
        }

        private void CreateShadow()
        {
            var sd = new GameObject("[Shadow]", typeof(RectTransform), typeof(BoxShadowImage));
            var img = sd.GetComponent<BoxShadowImage>();
            img.MaskRoot = transform;
            img.raycastTarget = false;
            ShadowGraphics.Add(img);
            FullStretch(sd.transform as RectTransform, ShadowRoot);
        }

        private void CreateBackgroundImage()
        {
            var sd = new GameObject("[Background]", typeof(RectTransform), typeof(BackgroundImage));
            var img = sd.GetComponent<BackgroundImage>();
            img.color = Color.clear;
            img.Context = Context;
            BackgroundGraphics.Add(img);
            FullStretch(sd.transform as RectTransform, BackgroundRoot);
        }

        static void FullStretch(RectTransform child, RectTransform parent)
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

        public void SetPointerEvents(PointerEvents pointerEvents)
        {
            PointerEvents = pointerEvents;
            var bg = BgImage;
            bg.raycastTarget = bg.color.a > 0 || PointerEvents == PointerEvents.All;
        }
    }
}
