using System;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.UGUI.Shapes;
using UnityEngine;
using UnityEngine.UI;
using Yoga;

namespace ReactUnity.UGUI.Internal
{
    public class BorderAndBackground : MonoBehaviour
    {
        private RectTransform root;
        private RectTransform borderRoot;
        private RectTransform outlineRoot;
        private RectTransform borderImageRoot;
        private RectTransform backgroundRoot;
        private RectTransform backdrop;
        private RectTransform shadowRoot;
        public RectTransform Root => EnsureRoot();
        public RectTransform BorderRoot => EnsureBorderRoot();
        public RectTransform BackgroundRoot => EnsureBackgroundRoot();
        public RectTransform Backdrop => EnsureBackdrop();
        public RectTransform ShadowRoot => EnsureShadowRoot();

        private UGUIComponent Component;
        private UGUIContext Context;
        private Action<RectTransform> SetContainer;

        private RawImage bgImage;
        public RawImage BgImage => bgImage ?? (bgImage = EnsureBackgroundRoot().GetComponent<RawImage>());

        private WebFilter backdropFilter;
        public WebFilter BackdropFilter => backdropFilter ?? (backdropFilter = EnsureBackdrop().GetComponent<WebFilter>());

        private WebBorder borderGraphic;
        public WebBorder BorderGraphic => borderGraphic ?? (borderGraphic = EnsureBorderRoot().GetComponent<WebBorder>());

        private WebBorder outlineGraphic;
        public WebBorder OutlineGraphic => outlineGraphic ?? (outlineGraphic = EnsureOutlineRoot().GetComponent<WebBorder>());

        private WebBorderImage borderImage;
        public WebBorderImage BorderImage => borderImage ?? (borderImage = EnsureBorderImage().GetComponent<WebBorderImage>());

        private WebRect rootGraphic;
        private Mask rootMask;
        private RectTransform maskRoot;

        public List<WebShadow> ShadowGraphics { get; private set; }
        public List<WebBackgroundImage> BackgroundGraphics { get; private set; }
        public List<WebBackgroundImage> MaskGraphics { get; private set; }
        public WebBackgroundImage LastMask => MaskGraphics == null || MaskGraphics.Count == 0 ? null : MaskGraphics[MaskGraphics.Count - 1];

        private WebOutlineSizes borderSize;
        public WebOutlineSizes BorderSize
        {
            get => borderSize;
            set
            {
                borderSize = value;

                var hasBorder = value.Top > 0 || value.Right > 0 || value.Bottom > 0 || value.Left > 0;

                var min = new Vector2(-value.Left, -value.Bottom);
                var max = new Vector2(value.Right, value.Top);

                if (root)
                {
                    root.offsetMin = -min;
                    root.offsetMax = -max;
                }

                if (backgroundRoot)
                {
                    backgroundRoot.offsetMin = min;
                    backgroundRoot.offsetMax = max;
                }

                if (shadowRoot)
                {
                    shadowRoot.offsetMin = min;
                    shadowRoot.offsetMax = max;
                }

                if (!borderRoot && !hasBorder) return;

                var br = BorderRoot;

                br.offsetMin = -min;
                br.offsetMax = -max;

                var bg = BorderGraphic;
                bg.enabled = hasBorder;

                bg.Border.Sizes = value;

                bg.RefreshInnerRounding();
                bg.SetVerticesDirty();
            }
        }

        private WebOutlineColors borderColors;
        public WebOutlineColors BorderColors
        {
            get => borderColors;
            set
            {
                borderColors = value;

                if (!borderGraphic) return;
                var bg = borderGraphic;

                bg.Border.Colors = value;
                bg.SetVerticesDirty();
            }
        }

        private WebOutlineStyles borderStyles;
        public WebOutlineStyles BorderStyles
        {
            get => borderStyles;
            set
            {
                borderStyles = value;

                if (!borderGraphic) return;
                var bg = borderGraphic;

                bg.Border.Styles = value;
                bg.SetVerticesDirty();
            }
        }

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


            cmp.Component = comp;
            cmp.Context = comp.Context;

            cmp.SetContainer = setContainer;

            return cmp;
        }

        private RectTransform EnsureRoot()
        {
            if (root) return root;

            var rootObj = Context.CreateNativeObject("[GraphicRoot]", typeof(RectTransform), typeof(WebRect));

            rootGraphic = rootObj.GetComponent<WebRect>();
            rootGraphic.raycastTarget = false;
            if (borderGraphic) borderGraphic.InsetBorder = rootGraphic;

            rootMask = rootObj.AddComponent<Mask>();
            rootMask.showMaskGraphic = false;
            root = rootObj.transform as RectTransform;
            FullStretch(root, transform as RectTransform, 0);

            BorderSize = BorderSize;

            return root;
        }

        private RectTransform EnsureShadowRoot()
        {
            if (shadowRoot) return shadowRoot;

            var sr = Context.CreateNativeObject("[Shadows]", typeof(RectTransform));
            shadowRoot = sr.transform as RectTransform;
            FullStretch(shadowRoot, Root, 0);

            BorderSize = BorderSize;

            return shadowRoot;
        }

        private RectTransform EnsureBackdrop()
        {
            if (backdrop) return backdrop;

            var bg = Context.CreateNativeObject("[Backdrop]", typeof(RectTransform), typeof(WebFilter));

            backdrop = bg.transform as RectTransform;

            BackdropFilter.IsBackdrop = true;
            BackdropFilter.MaskRoot = transform;

            FullStretch(backdrop, Root, backgroundRoot ? backgroundRoot.GetSiblingIndex() : 1);

            return backdrop;
        }

        private RectTransform EnsureBackgroundRoot()
        {
            if (backgroundRoot) return backgroundRoot;

            var bg = Context.CreateNativeObject("[Background]", typeof(RectTransform), typeof(RawImage));
            var bgImage = bg.GetComponent<RawImage>();
            bgImage.color = Color.clear;

            backgroundRoot = bg.transform as RectTransform;
            FullStretch(backgroundRoot, Root, 2);

            BorderSize = BorderSize;

            return backgroundRoot;
        }

        private RectTransform EnsureBorderRoot()
        {
            if (borderRoot) return borderRoot;

            var border = Context.CreateNativeObject("[Border]", typeof(RectTransform), typeof(WebBorder));
            borderGraphic = border.GetComponent<WebBorder>();
            borderGraphic.InsetBorder = rootGraphic;

            borderRoot = border.transform as RectTransform;
            FullStretch(borderRoot, transform as RectTransform, root != null ? 1 : 0);

            // Refresh border properties
            BorderSize = BorderSize;
            BorderColors = BorderColors;
            BorderStyles = BorderStyles;

            return borderRoot;
        }

        private RectTransform EnsureBorderImage()
        {
            if (borderImageRoot) return borderImageRoot;

            var border = Context.CreateNativeObject("[BorderImage]", typeof(RectTransform), typeof(WebBorderImage));
            borderImage = border.GetComponent<WebBorderImage>();

            borderImageRoot = border.transform as RectTransform;

            var ind = (root != null ? 1 : 0) + (borderRoot != null ? 1 : 0);

            FullStretch(borderImageRoot, transform as RectTransform, ind);

            return borderImageRoot;
        }

        private RectTransform EnsureOutlineRoot()
        {
            if (outlineRoot) return outlineRoot;

            var outline = Context.CreateNativeObject("[Outline]", typeof(RectTransform), typeof(WebBorder));
            outlineGraphic = outline.GetComponent<WebBorder>();

            outlineRoot = outline.transform as RectTransform;

            var ind = (root != null ? 1 : 0) + (borderRoot != null ? 1 : 0) + (borderImageRoot != null ? 1 : 0);

            FullStretch(outlineRoot, transform as RectTransform, ind);

            return outlineRoot;
        }

        private void UpdateBgColor()
        {
            var hasBlend = blendMode == BackgroundBlendMode.Normal || blendMode == BackgroundBlendMode.Color;
            var hasColor = bgColor.a > 0;
            var hasTarget = hasColor || pointerEvents == PointerEvents.All;

            var enabled = hasColor || hasTarget;

            if (!enabled && !bgImage) return;

            var bg = BgImage;
            bg.color = hasBlend ? bgColor : Color.clear;
            bg.raycastTarget = hasTarget;
            bg.enabled = hasBlend || hasTarget;
        }

        public void UpdateStyle(NodeStyle style)
        {
            blendMode = style.backgroundBlendMode;
            bgColor = style.backgroundColor;
            pointerEvents = style.pointerEvents;
            UpdateBgColor();

            var bgFilter = style.backdropFilter;
            if(bgFilter != null) SetBackdropFilter(bgFilter);
            SetBackground(bgColor, style.backgroundImage, style.backgroundPositionX, style.backgroundPositionY, style.backgroundSize, style.backgroundRepeatX, style.backgroundRepeatY);
            SetBoxShadow(style.boxShadow);

            UpdateOutline(style);
            SetBorderColor(style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor);
            SetBorderRadius(style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius);

            BorderStyles = new WebOutlineStyles(style.borderTopStyle, style.borderRightStyle, style.borderBottomStyle, style.borderLeftStyle);

            SetMask(style.maskImage, style.maskPositionX, style.maskPositionY, style.maskSize, style.maskRepeatX, style.maskRepeatY);

            var borderImageSource = style.borderImageSource;

            if (borderImageSource != null && borderImageSource != ImageDefinition.NoImage)
            {
                var img = BorderImage;
                img.SetBorderImage(borderImageSource);
                img.Slice = style.borderImageSlice;
                img.Width = style.borderImageWidth;
                img.Repeat = style.borderImageRepeat;
                img.Outset = style.borderImageOutset;
                img.SetVerticesDirty();
                if (!img.gameObject.activeSelf) img.gameObject.SetActive(true);
            }
            else if (borderImage)
            {
                borderImage.SetBorderImage(ImageDefinition.NoImage);
                if (borderImage.gameObject.activeSelf) borderImage.gameObject.SetActive(false);
            }
        }

        public void UpdateLayout(YogaNode layout)
        {
            SetBorderSize(layout);
        }

        private void SetBorderSize(YogaNode layout)
        {
            var bidiLeft = layout.LayoutDirection == YogaDirection.LTR ? layout.BorderStartWidth : layout.BorderEndWidth;
            var bidiRight = layout.LayoutDirection == YogaDirection.RTL ? layout.BorderStartWidth : layout.BorderEndWidth;

            var top = GetFirstDefinedSize(layout.BorderTopWidth, layout.BorderWidth);
            var right = GetFirstDefinedSize(bidiRight, layout.BorderRightWidth, layout.BorderWidth);
            var bottom = GetFirstDefinedSize(layout.BorderBottomWidth, layout.BorderWidth);
            var left = GetFirstDefinedSize(bidiLeft, layout.BorderLeftWidth, layout.BorderWidth);

            BorderSize = new WebOutlineSizes()
            {
                Top = top,
                Right = right,
                Bottom = bottom,
                Left = left,
            };
        }

        private void UpdateOutline(NodeStyle style)
        {
            var outlineWidth = style.outlineWidth;
            var outlineStyle = style.outlineStyle;

            if (outlineWidth > 0 && outlineStyle != BorderStyle.None)
            {
                var outlineColor = style.outlineColor;
                var img = OutlineGraphic;
                var offset = style.outlineOffset + outlineWidth;
                outlineRoot.offsetMin = new Vector2(-offset, -offset);
                outlineRoot.offsetMax = new Vector2(offset, offset);
                img.SetVerticesDirty();

                img.Border = new WebOutlineProperties
                {
                    Styles = new WebOutlineStyles(outlineStyle, outlineStyle, outlineStyle, outlineStyle),
                    Sizes = new WebOutlineSizes()
                    {
                        Top = -outlineWidth,
                        Right = -outlineWidth,
                        Bottom = -outlineWidth,
                        Left = -outlineWidth,
                    },
                    Colors = new WebOutlineColors(outlineColor, outlineColor, outlineColor, outlineColor),
                };
            }
        }

        private void SetBorderRadius(YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            var v = new YogaValue2[4] { tl, tr, br, bl };

            if (!borderGraphic)
            {
                var hasRounding = !tl.IsZero() || !tr.IsZero() || !br.IsZero() || !bl.IsZero();
                if (hasRounding) EnsureBorderRoot();
            }

            if (borderGraphic)
                borderGraphic.Rounding = new WebRoundingProperties(v);

            if (outlineGraphic)
                outlineGraphic.Rounding = new WebRoundingProperties(v);

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
            BorderColors = new WebOutlineColors()
            {
                Top = top,
                Right = right,
                Bottom = bottom,
                Left = left,
            };
        }

        private void SetBackdropFilter(FilterDefinition filter)
        {
            BackdropFilter.Definition = filter;
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
                if (validCount > 0) BackgroundGraphics = new List<WebBackgroundImage>();
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
                }
                else
                {
                    if (rt.parent != ShadowRoot) FullStretch(rt, ShadowRoot);
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
                if (validCount > 0) MaskGraphics = new List<WebBackgroundImage>();
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
            }
        }

        private void CreateMask()
        {
            if (MaskGraphics.Count == 0)
            {
                if (maskRoot == null)
                {
                    var mr = Context.CreateNativeObject("[MaskRoot]", typeof(RectTransform), typeof(WebBackgroundImage), typeof(Mask));
                    maskRoot = mr.transform as RectTransform;
                    var children = Component.RectTransform.OfType<RectTransform>().ToList();
                    FullStretch(maskRoot, Component.RectTransform);
                    foreach (var item in children) item.SetParent(maskRoot);

                    if (Component.RectTransform == Component.Container) SetContainer(maskRoot);
                }

                var mask = maskRoot.GetComponent<Mask>();
                mask.showMaskGraphic = false;
                var img = maskRoot.GetComponent<WebBackgroundImage>();
                img.color = Color.clear;
                img.Context = Context;
                mask.enabled = img.enabled = true;

                MaskGraphics.Add(img);
            }
            else
            {
                var sd = Context.CreateNativeObject("[Mask]", typeof(RectTransform), typeof(WebBackgroundImage), typeof(Mask));
                var mask = sd.GetComponent<Mask>();
                mask.showMaskGraphic = false;
                var img = sd.GetComponent<WebBackgroundImage>();
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
                var mask = maskRoot.GetComponent<Mask>();
                var img = maskRoot.GetComponent<WebBackgroundImage>();
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
            var sd = Context.CreateNativeObject("[BackgroundImage]", typeof(RectTransform), typeof(WebBackgroundImage));
            var img = sd.GetComponent<WebBackgroundImage>();
            img.color = Color.clear;
            img.Context = Context;
            BackgroundGraphics.Add(img);
            FullStretch(sd.transform as RectTransform, BackgroundRoot);
        }

        static void FullStretch(RectTransform child, RectTransform parent, int index = -1)
        {
            child.transform.SetParent(parent, false);
            if (index >= 0) child.transform.SetSiblingIndex(index);

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
