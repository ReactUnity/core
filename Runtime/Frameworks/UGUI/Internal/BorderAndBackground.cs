using System;
using System.Collections.Generic;
using System.Linq;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.UGUI.Shapes;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    public class BorderAndBackground : MonoBehaviour
    {
        public RectTransform Root { get; private set; }
        public RectTransform Border { get; private set; }
        public RectTransform BackgroundRoot { get; private set; }
        public RectTransform ShadowRoot { get; private set; }

        private UGUIComponent Component;
        private UGUIContext Context;
        private Action<RectTransform> SetContainer;
        internal RawImage BgImage;

        public WebRect RootGraphic;
        public Mask RootMask;

        public WebBorder BorderGraphic;

        public List<WebShadow> ShadowGraphics;
        public List<BackgroundImage> BackgroundGraphics;
        public List<BackgroundImage> MaskGraphics;
        public BackgroundImage LastMask => MaskGraphics == null || MaskGraphics.Count == 0 ? null : MaskGraphics[MaskGraphics.Count - 1];

        public RectTransform MaskRoot;

        private BackgroundBlendMode blendMode;
        public BackgroundBlendMode BlendMode
        {
            set
            {
                blendMode = value;
                UpdateBgColor();
            }
        }

        private Color bgColor;
        public Color BgColor
        {
            get => bgColor;
            set
            {
                bgColor = value;
                UpdateBgColor();
            }
        }

        private PointerEvents pointerEvents;
        public PointerEvents PointerEvents
        {
            set
            {
                pointerEvents = value;
                UpdateBgColor();
            }
        }


        public static BorderAndBackground Create(GameObject go, UGUIComponent comp, Action<RectTransform> setContainer)
        {
            var cmp = go.GetComponent<BorderAndBackground>();
            if (!cmp) cmp = go.AddComponent<BorderAndBackground>();

            var context = comp.Context;
            var root = context.CreateNativeObject("[GraphicRoot]", typeof(RectTransform), typeof(WebRect));
            var border = context.CreateNativeObject("[BorderImage]", typeof(RectTransform), typeof(WebBorder));
            var bg = context.CreateNativeObject("[BackgroundImage]", typeof(RectTransform), typeof(RawImage));


            cmp.RootGraphic = root.GetComponent<WebRect>();
            cmp.RootGraphic.raycastTarget = false;

            cmp.Component = comp;
            cmp.Context = context;
            cmp.RootMask = root.AddComponent<Mask>();
            cmp.RootMask.showMaskGraphic = false;
            cmp.SetContainer = setContainer;

            cmp.BorderGraphic = border.GetComponent<WebBorder>();
            cmp.BorderGraphic.InsetBorder = cmp.RootGraphic;

            var bgImage = bg.GetComponent<RawImage>();
            cmp.BgImage = bgImage;
            bgImage.color = Color.clear;

            var sr = context.CreateNativeObject("[Shadows]", typeof(RectTransform));

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

        private void UpdateBgColor()
        {
            var bg = BgImage;
            var hasColor = blendMode == BackgroundBlendMode.Normal || blendMode == BackgroundBlendMode.Color;
            var hasTarget = bgColor.a > 0 || pointerEvents == PointerEvents.All;
            bg.color = hasColor ? bgColor : Color.clear;
            bg.raycastTarget = hasTarget;
            bg.enabled = hasColor || hasTarget;
        }

        public void UpdateStyle(NodeStyle style)
        {
            blendMode = style.backgroundBlendMode;
            bgColor = style.backgroundColor;
            pointerEvents = style.pointerEvents;
            UpdateBgColor();

            SetBackground(bgColor, style.backgroundImage, style.backgroundPositionX, style.backgroundPositionY, style.backgroundSize, style.backgroundRepeatX, style.backgroundRepeatY);
            SetBoxShadow(style.boxShadow);
            SetBorderColor(style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor);
            SetBorderRadius(style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius);

            SetMask(style.maskImage, style.maskPositionX, style.maskPositionY, style.maskSize, style.maskRepeatX, style.maskRepeatY);
        }

        public void UpdateLayout(YogaNode layout)
        {
            SetBorderSize(layout);
        }

        private void SetBorderSize(YogaNode layout)
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

            if (BorderGraphic.Border == null) BorderGraphic.Border = new WebOutlineProperties();
            BorderGraphic.Border.TopWidth = borderTop;
            BorderGraphic.Border.RightWidth = borderRight;
            BorderGraphic.Border.BottomWidth = borderBottom;
            BorderGraphic.Border.LeftWidth = borderLeft;
            BorderGraphic.SetVerticesDirty();
            BorderGraphic.RefreshInsetBorder();

            RootGraphic.SetVerticesDirty();
        }

        private void SetBorderRadius(YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            var v = new YogaValue2[4] { tl, tr, br, bl };

            BorderGraphic.Rounding = new WebRoundingProperties(v);

            if (ShadowGraphics != null)
            {
                for (int i = 0; i < ShadowGraphics.Count; i++)
                {
                    var g = ShadowGraphics[i];

                    g.Rounding = new WebRoundingProperties(v)
                    {
                        UniformResolution = new WebRoundingResolutionProperties(10),
                    };
                }
            }
        }

        private void SetBorderColor(Color top, Color right, Color bottom, Color left)
        {
            if (BorderGraphic.Border == null) BorderGraphic.Border = new WebOutlineProperties();
            BorderGraphic.Border.TopColor = top;
            BorderGraphic.Border.RightColor = right;
            BorderGraphic.Border.BottomColor = bottom;
            BorderGraphic.Border.LeftColor = left;
            BorderGraphic.SetVerticesDirty();
        }

        private void SetBackground(
            Color color,
            ICssValueList<ImageDefinition> images,
            ICssValueList<YogaValue> positionsX,
            ICssValueList<YogaValue> positionsY,
            ICssValueList<BackgroundSize> sizes,
            ICssValueList<BackgroundRepeat> repeatXs,
            ICssValueList<BackgroundRepeat> repeatYs
        )
        {
            var validCount = images?.Count ?? 0;

            if (BackgroundGraphics == null)
            {
                if (validCount > 0) BackgroundGraphics = new List<BackgroundImage>();
                else return;
            }

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


            var len = BackgroundGraphics.Count;
            for (int i = 0; i < len; i++)
            {
                var sd = BackgroundGraphics[len - 1 - i];
                sd.SetBackgroundColorAndImage(color, images?.Get(i), blendMode);
                sd.BackgroundRepeatX = repeatXs.Get(i);
                sd.BackgroundRepeatY = repeatYs.Get(i);
                sd.BackgroundPosition = new YogaValue2(positionsX.Get(i), positionsY.Get(i));
                sd.BackgroundSize = sizes.Get(i);
                sd.SetMaterialDirty();
            }
        }

        private void SetBoxShadow(ICssValueList<BoxShadow> shadows)
        {
            var validCount = shadows.Count;

            if (ShadowGraphics == null)
            {
                if (validCount > 0) ShadowGraphics = new List<WebShadow>();
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

            var len = ShadowGraphics.Count;
            for (int i = 0; i < len; i++)
            {
                var shadow = shadows.Get(i);
                var g = ShadowGraphics[len - 1 - i];
                var rt = g.rectTransform;

                g.Shadow = new WebShadowProperties
                {
                    Blur = shadow.blur.x,
                    Spread = shadow.spread.x,
                    Inset = shadow.inset,
                    Offset = new Vector2(shadow.offset.x, -shadow.offset.y),
                };

                if (shadow.inset)
                {
                    if (rt.parent != BackgroundRoot) FullStretch(rt, BackgroundRoot);
                    //rt.sizeDelta = Vector2.zero;
                    //rt.anchoredPosition = Vector2.zero;
                }
                else
                {
                    if (rt.parent != ShadowRoot) FullStretch(rt, ShadowRoot);

                    //rt.sizeDelta = ((shadow.inset ? -1 : 1) * shadow.spread + shadow.blur) * 2;
                    //rt.anchoredPosition = new Vector2(shadow.offset.x, -shadow.offset.y);
                }

                g.color = shadow.color;
            }
        }

        private void SetMask(
            ICssValueList<ImageDefinition> images,
            ICssValueList<YogaValue> positionsX,
            ICssValueList<YogaValue> positionsY,
            ICssValueList<BackgroundSize> sizes,
            ICssValueList<BackgroundRepeat> repeatXs,
            ICssValueList<BackgroundRepeat> repeatYs
        )
        {
            var validCount = images.Count;

            if (MaskGraphics == null)
            {
                if (validCount > 0) MaskGraphics = new List<BackgroundImage>();
                else return;
            }

            var diff = MaskGraphics.Count - validCount;

            if (diff > 0)
            {
                for (int i = diff - 1; i >= 0; i--)
                {
                    DestroyLastMask();
                }
            }
            else if (diff < 0)
            {

                for (int i = -diff - 1; i >= 0; i--)
                {
                    CreateMask();
                }
            }

            var len = MaskGraphics.Count;
            for (int i = 0; i < len; i++)
            {
                var sd = MaskGraphics[len - 1 - i];
                sd.SetBackgroundColorAndImage(Color.white, images.Get(i));
                sd.BackgroundRepeatX = repeatXs.Get(i);
                sd.BackgroundRepeatY = repeatYs.Get(i);
                sd.BackgroundPosition = new YogaValue2(positionsX.Get(i), positionsY.Get(i));
                sd.BackgroundSize = sizes.Get(i);
                sd.SetMaterialDirty();
            }
        }

        private void CreateMask()
        {
            if (MaskGraphics.Count == 0)
            {
                if (MaskRoot == null)
                {
                    var mr = Context.CreateNativeObject("[MaskRoot]", typeof(RectTransform), typeof(BackgroundImage), typeof(Mask));
                    MaskRoot = mr.transform as RectTransform;
                    var children = Component.RectTransform.OfType<RectTransform>().ToList();
                    FullStretch(MaskRoot, Component.RectTransform);
                    foreach (var item in children) item.SetParent(MaskRoot);

                    if (Component.RectTransform == Component.Container) SetContainer(MaskRoot);
                }

                var mask = MaskRoot.GetComponent<Mask>();
                mask.showMaskGraphic = false;
                var img = MaskRoot.GetComponent<BackgroundImage>();
                img.color = Color.clear;
                img.Context = Context;
                mask.enabled = img.enabled = true;
                MaskGraphics.Add(img);
            }
            else
            {
                var sd = Context.CreateNativeObject("[Mask]", typeof(RectTransform), typeof(BackgroundImage), typeof(Mask));
                var mask = sd.GetComponent<Mask>();
                mask.showMaskGraphic = false;
                var img = sd.GetComponent<BackgroundImage>();
                img.color = Color.clear;
                img.Context = Context;

                var last = MaskGraphics[MaskGraphics.Count - 1];

                FullStretch(sd.transform as RectTransform, last.rectTransform.parent as RectTransform);
                FullStretch(last.rectTransform, sd.transform as RectTransform);
                MaskGraphics.Add(img);
            }
        }

        private void DestroyLastMask()
        {
            var i = MaskGraphics.Count - 1;
            var sd = MaskGraphics[i];
            MaskGraphics.RemoveAt(i);

            if (i == 0)
            {
                var mask = MaskRoot.GetComponent<Mask>();
                var img = MaskRoot.GetComponent<BackgroundImage>();
                mask.enabled = img.enabled = false;
            }
            else
            {
                var child = MaskGraphics[i - 1];
                child.rectTransform.SetParent(sd.transform.parent);
                DestroyImmediate(sd.gameObject);
            }
        }

        private void CreateShadow()
        {
            var sd = Context.CreateNativeObject("[Shadow]", typeof(RectTransform), typeof(WebShadow));
            var img = sd.GetComponent<WebShadow>();
            img.MaskRoot = transform;
            img.raycastTarget = false;
            ShadowGraphics.Add(img);
            FullStretch(sd.transform as RectTransform, ShadowRoot);
        }

        private void CreateBackgroundImage()
        {
            var sd = Context.CreateNativeObject("[Background]", typeof(RectTransform), typeof(BackgroundImage));
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
    }
}
