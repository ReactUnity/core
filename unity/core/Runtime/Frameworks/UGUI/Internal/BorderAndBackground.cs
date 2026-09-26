using System.Collections.Generic;
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
        private RectTransform insetShadowRoot;
        public RectTransform Root => EnsureRoot();
        public RectTransform BorderRoot => EnsureBorderRoot();
        public RectTransform BackgroundRoot => EnsureBackgroundRoot();
        public RectTransform Backdrop => EnsureBackdrop();
        public RectTransform ShadowRoot => EnsureShadowRoot();
        public RectTransform InsetShadowRoot => EnsureInsetShadowRoot();

        private UGUIComponent Component;
        private UGUIContext Context;

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
        private WebRect insetShadowGraphic;

        public List<WebShadow> ShadowGraphics { get; private set; }
        public List<WebBackgroundImage> BackgroundGraphics { get; private set; }

        private WebOutlineSizes borderSize;
        public WebOutlineSizes BorderSize
        {
            get => borderSize;
            set
            {
                borderSize = value;

                var hasBorder = value.Top > 0 || value.Right > 0 || value.Bottom > 0 || value.Left > 0;

                // The padding box: offsetMin pulls a rect in from the bottom left, offsetMax from
                // the top right. `[GraphicRoot]`, and so everything the mask on it cuts, is the
                // border box instead -- which is what `background-clip: border-box` means and what
                // CSS makes the default, so the common case needs nothing else.
                var min = new Vector2(value.Left, value.Bottom);
                var max = new Vector2(-value.Right, -value.Top);

                if (insetShadowRoot)
                {
                    insetShadowRoot.offsetMin = min;
                    insetShadowRoot.offsetMax = max;
                }

                if (!borderRoot && !hasBorder) return;

                var br = BorderRoot;

                br.offsetMin = min;
                br.offsetMax = max;

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

        private bool pixelated;
        private ICssValueList<BackgroundBox> clips = CssValueList<BackgroundBox>.Empty;
        private BackgroundClip clip;
        private Material fillMaterial;
        private BackgroundBox fillClip = BackgroundBox.BorderBox;
        private readonly YogaValue2[] borderRadius = new YogaValue2[4] { YogaValue2.Zero, YogaValue2.Zero, YogaValue2.Zero, YogaValue2.Zero };
        private BackgroundClipBox paddingClipBox;
        private BackgroundClipBox contentClipBox;
        private int clipBoxFrame = -1;
        private ICssValueList<BackgroundBlendMode> blendModes = CssValueList<BackgroundBlendMode>.Empty;
        public ICssValueList<BackgroundBlendMode> BlendModes
        {
            set => blendModes = value ?? CssValueList<BackgroundBlendMode>.Empty;
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


        public static BorderAndBackground Create(GameObject go, UGUIComponent comp)
        {
            var cmp = go.GetComponent<BorderAndBackground>();
            if (!cmp) cmp = go.AddComponent<BorderAndBackground>();


            cmp.Component = comp;
            cmp.Context = comp.Context;


            return cmp;
        }

        private RectTransform EnsureRoot()
        {
            if (root) return root;

            var rootObj = Context.CreateNativeObject("[GraphicRoot]", typeof(RectTransform), typeof(WebRect));

            rootGraphic = rootObj.GetComponent<WebRect>();
            rootGraphic.raycastTarget = false;
            rootGraphic.Rounding = new WebRoundingProperties(borderRadius);

            rootMask = rootObj.AddComponent<Mask>();
            rootMask.showMaskGraphic = false;
            root = rootObj.transform as RectTransform;
            FullStretch(root, transform as RectTransform, 0);

            return root;
        }

        private RectTransform EnsureShadowRoot()
        {
            if (shadowRoot) return shadowRoot;

            var sr = Context.CreateNativeObject("[Shadows]", typeof(RectTransform));
            shadowRoot = sr.transform as RectTransform;
            FullStretch(shadowRoot, Root, 0);
            KeepInsetShadowsLast();

            return shadowRoot;
        }

        /// <summary>
        /// The padding box, masked, for the one thing CSS casts from that edge rather than the
        /// border's -- an inset <c>box-shadow</c>, which the mask on <c>[GraphicRoot]</c> used to
        /// cut back when that mask was the padding box itself.
        /// </summary>
        private RectTransform EnsureInsetShadowRoot()
        {
            if (insetShadowRoot) return insetShadowRoot;

            var obj = Context.CreateNativeObject("[InsetShadows]", typeof(RectTransform), typeof(WebRect));

            insetShadowGraphic = obj.GetComponent<WebRect>();
            insetShadowGraphic.raycastTarget = false;
            if (borderGraphic) borderGraphic.InsetBorder = insetShadowGraphic;

            var mask = obj.AddComponent<Mask>();
            mask.showMaskGraphic = false;

            insetShadowRoot = obj.transform as RectTransform;
            // Above the background, as CSS paints an inset shadow, and above nothing else here.
            FullStretch(insetShadowRoot, Root);

            BorderSize = BorderSize;

            return insetShadowRoot;
        }

        /// <summary>The sibling indices below are written for a stack that has no inset shadows in
        /// it, so the one node that has to stay on top is put back after each of them.</summary>
        private void KeepInsetShadowsLast()
        {
            if (insetShadowRoot) insetShadowRoot.SetAsLastSibling();
        }

        private RectTransform EnsureBackdrop()
        {
            if (backdrop) return backdrop;

            var bg = Context.CreateNativeObject("[Backdrop]", typeof(RectTransform), typeof(WebFilter));

            backdrop = bg.transform as RectTransform;

            BackdropFilter.IsBackdrop = true;
            BackdropFilter.MaskRoot = transform;
            if (BackdropSurface.Required) BackdropFilter.Surface = Context.BackdropSurface;

            FullStretch(backdrop, Root, backgroundRoot ? backgroundRoot.GetSiblingIndex() : 1);
            KeepInsetShadowsLast();

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
            KeepInsetShadowsLast();

            return backgroundRoot;
        }

        private RectTransform EnsureBorderRoot()
        {
            if (borderRoot) return borderRoot;

            var border = Context.CreateNativeObject("[Border]", typeof(RectTransform), typeof(WebBorder));
            borderGraphic = border.GetComponent<WebBorder>();
            borderGraphic.InsetBorder = insetShadowGraphic;

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
            borderImage.Context = Context;

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
            var hasColor = bgColor.a > 0;
            var hasTarget = hasColor || pointerEvents == PointerEvents.All;

            if (!hasTarget && !bgImage) return;

            // Always painted now. It used to be cleared whenever a blend mode was set, because the
            // colour was being fed to the image as a tint instead -- but it is the bottom of the
            // stack, and a layer blending against it needs it underneath as well as in the blend.
            var bg = BgImage;
            bg.color = bgColor;
            bg.raycastTarget = hasTarget;
            bg.enabled = hasTarget;
        }

        public void UpdateStyle(NodeStyle style)
        {
            blendModes = style.backgroundBlendMode;
            clips = style.backgroundClip ?? CssValueList<BackgroundBox>.Empty;
            pixelated = style.imageRendering == ImageRendering.Pixelated || style.imageRendering == ImageRendering.CrispEdges;
            bgColor = style.backgroundColor;
            pointerEvents = style.pointerEvents;
            UpdateBgColor();

            var bgFilter = style.backdropFilter;
            if (bgFilter != null) SetBackdropFilter(bgFilter);
            // Removed rather than left reading: the style can drop it, and a pooled element is reused.
            else if (backdrop) RemoveGraphic(ref backdrop, ref backdropFilter);
            SetBackground(bgColor, style.backgroundImage, style.backgroundPositionX, style.backgroundPositionY, style.backgroundSize, style.backgroundRepeatX, style.backgroundRepeatY);
            UpdateClips();
            SetBoxShadow(style.boxShadow);

            UpdateOutline(style);
            SetBorderColor(style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor);
            SetBorderRadius(style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius);

            BorderStyles = new WebOutlineStyles(style.borderTopStyle, style.borderRightStyle, style.borderBottomStyle, style.borderLeftStyle);

            var borderImageSource = style.borderImageSource;

            if (borderImageSource != null && borderImageSource != ImageDefinition.NoImage)
            {
                var img = BorderImage;
                img.SetBorderImage(borderImageSource);
                img.Slice = style.borderImageSlice;
                img.Width = style.borderImageWidth;
                img.Repeat = style.borderImageRepeat;
                img.Outset = style.borderImageOutset;
                // No blanket dirty: each setter above rebuilds the mesh when its own value moves,
                // and this block runs on every frame the element is visited.
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
            RefreshShadowRounding();
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
            else if (outlineRoot) RemoveGraphic(ref outlineRoot, ref outlineGraphic);
        }

        private static void RemoveGraphic<T>(ref RectTransform root, ref T graphic) where T : Graphic
        {
            DestroyImmediate(root.gameObject);
            root = null;
            graphic = null;
        }

        private void SetBorderRadius(YogaValue2 tl, YogaValue2 tr, YogaValue2 br, YogaValue2 bl)
        {
            borderRadius[0] = tl;
            borderRadius[1] = tr;
            borderRadius[2] = br;
            borderRadius[3] = bl;
            var v = borderRadius;

            if (!borderGraphic)
            {
                var hasRounding = !tl.IsZero() || !tr.IsZero() || !br.IsZero() || !bl.IsZero();
                if (hasRounding) EnsureBorderRoot();
            }

            if (borderGraphic)
                borderGraphic.Rounding = new WebRoundingProperties(v);

            if (outlineGraphic)
                outlineGraphic.Rounding = new WebRoundingProperties(v);

            // The mask is the border box, so it takes the radii as written. The padding edge's are
            // the border's own inner rounding, which it pushes to `[InsetShadows]` for itself.
            if (rootGraphic)
                rootGraphic.Rounding = new WebRoundingProperties(v);

            RefreshShadowRounding();
        }

        /// <summary>An outer shadow is cast by the border box and an inset one by the padding box,
        /// so the two take different corners off the same <c>border-radius</c>.</summary>
        private void RefreshShadowRounding()
        {
            if (ShadowGraphics == null) return;

            var inner = borderGraphic ? borderGraphic.InnerRounding : null;

            for (int i = 0; i < ShadowGraphics.Count; i++)
            {
                var g = ShadowGraphics[i];
                var radii = g.Shadow != null && g.Shadow.Inset && inner != null
                    ? new YogaValue2[4] { inner.TLRadius, inner.TRRadius, inner.BRRadius, inner.BLRadius }
                    : borderRadius;

                g.Rounding = new WebRoundingProperties(radii)
                {
                    UniformResolution = new WebRoundingResolutionProperties(10),
                };
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
                // CSS puts the first image on top and the background colour at the bottom, so the
                // last layer is the one whose backdrop is the colour itself. Everything above it
                // blends with the layers below instead, which only the render target holds.
                sd.Pixelated = pixelated;
                sd.SetBackgroundColorAndImage(color, images?.Get(i), blendModes.Get(i), i < len - 1);
                sd.BackgroundRepeatX = repeatXs.Get(i);
                sd.BackgroundRepeatY = repeatYs.Get(i);
                sd.BackgroundPosition = new YogaValue2(positionsX.Get(i), positionsY.Get(i));
                sd.BackgroundSize = sizes.Get(i);
            }
        }

        /// <summary>
        /// Gives each background layer the box or the coverage its <c>background-clip</c> asks for,
        /// building one <see cref="BackgroundClip"/> for the element the first time anything does.
        /// </summary>
        /// <remarks>
        /// CSS gives every layer its own clip and hands the background colour the last layer's, so a
        /// gradient can be cut to the text while a colour under it still fills the box.
        /// <c>border-box</c> is free -- it is the mask on <c>[GraphicRoot]</c>, which is also what
        /// gives the background its corners -- and the other three cost a material of their own.
        /// </remarks>
        private void UpdateClips()
        {
            var layers = BackgroundGraphics?.Count ?? 0;
            var fill = clips.Get(layers > 0 ? layers - 1 : 0);

            var wanted = fill != BackgroundBox.BorderBox;
            var text = fill == BackgroundBox.Text;

            for (int i = 0; i < layers; i++)
            {
                var box = clips.Get(i);
                wanted |= box != BackgroundBox.BorderBox;
                text |= box == BackgroundBox.Text;
            }

            if (wanted && !clip) clip = BackgroundClip.Create(Component, EnsureBackgroundRoot(), this);
            if (clip) clip.NeedsCoverage = text;

            for (int i = 0; i < layers; i++)
            {
                // The layers are built back to front, so the last one is the first CSS declared.
                BackgroundGraphics[layers - 1 - i].SetClip(clip, clips.Get(i));
            }

            SetFillClip(fill);

            if (!wanted && clip)
            {
                Destroy(clip);
                clip = null;
            }
        }

        private void SetFillClip(BackgroundBox box)
        {
            if (fillClip == box) return;
            fillClip = box;

            if (box != BackgroundBox.BorderBox)
            {
                // Its own material rather than a shared one: the clip is this element's, and a
                // RawImage has no place to keep a copy the way a background layer does.
                if (!fillMaterial) fillMaterial = new Material(Helpers.ResourcesHelper.ClippedImageShader);
                BgImage.material = fillMaterial;
            }
            else
            {
                if (bgImage) bgImage.material = null;
                BackgroundClip.Bind(fillMaterial, null, BackgroundBox.BorderBox);
            }
        }

        /// <summary>
        /// Hands the clip to everything drawing through it, every frame. Both matrices move with the
        /// element, and UGUI substitutes a stencil copy of a material under a mask which is not the
        /// object the value was written to -- so neither can be set once and left.
        /// </summary>
        internal void PushClips(BackgroundClip source)
        {
            if (fillClip != BackgroundBox.BorderBox && bgImage)
            {
                BackgroundClip.Bind(fillMaterial, source, fillClip);
                var drawn = bgImage.materialForRendering;
                if (drawn && drawn != fillMaterial) BackgroundClip.Bind(drawn, source, fillClip);
            }

            if (BackgroundGraphics == null) return;

            for (int i = 0; i < BackgroundGraphics.Count; i++)
            {
                var sd = BackgroundGraphics[i];
                if (!sd || sd.Clip != source) continue;
                BackgroundClip.Bind(sd.materialForRendering, source, sd.ClipBox);
            }
        }

        /// <summary>The box a layer clipped to <paramref name="box"/> stops at, in the element's own
        /// space. False for anything the mask already gives, which is every unbordered element.</summary>
        internal bool TryGetClipBox(BackgroundBox box, out BackgroundClipBox value)
        {
            RefreshClipBoxes();

            value = box == BackgroundBox.PaddingBox ? paddingClipBox
                : box == BackgroundBox.ContentBox ? contentClipBox
                : default;

            return value.Clips;
        }

        /// <summary>
        /// The padding and content boxes, their radii reduced the same way the border's own inner
        /// ring reduces them so the two line up. Read off the Yoga node rather than the style: a
        /// percentage padding has already been resolved against the parent by the time layout is
        /// done, and a border width can have been rounded to fit.
        /// </summary>
        private void RefreshClipBoxes()
        {
            if (clipBoxFrame == Time.frameCount) return;
            clipBoxFrame = Time.frameCount;

            var full = (transform as RectTransform).rect.size;
            var layout = Component?.Layout;

            // Top, right, bottom, left, as every box offset in these shapes is packed.
            var border = borderSize.Vector;
            var padding = layout == null ? Vector4.zero : new Vector4(
                Norm(layout.LayoutPaddingTop), Norm(layout.LayoutPaddingRight),
                Norm(layout.LayoutPaddingBottom), Norm(layout.LayoutPaddingLeft));

            var paddingSize = Inset(full, border);
            var contentSize = Inset(paddingSize, padding);

            var paddingRounding = new WebRoundingProperties(borderRadius).OffsetBorder(paddingSize, border);
            var contentRounding = paddingRounding.OffsetBorder(contentSize, padding);

            // Each OffsetBorder resolves against the box it came from, so the adjusted radii are
            // only the ones the caller wants after both of them have run.
            paddingRounding.UpdateAdjusted(paddingSize, paddingSize);
            contentRounding.UpdateAdjusted(contentSize, contentSize);

            paddingClipBox = MakeClipBox(border, paddingSize, paddingRounding);
            contentClipBox = MakeClipBox(border + padding, contentSize, contentRounding);
        }

        static Vector2 Inset(Vector2 size, Vector4 by) => new Vector2(
            Mathf.Max(0, size.x - by.y - by.w),
            Mathf.Max(0, size.y - by.x - by.z));

        static BackgroundClipBox MakeClipBox(Vector4 inset, Vector2 size, WebRoundingProperties rounding)
        {
            return new BackgroundClipBox
            {
                // Nothing to do when the box is the border box: the mask has already cut it, to the
                // pixel, and an SDF edge over the top of that would only soften it.
                Clips = inset.x > 0 || inset.y > 0 || inset.z > 0 || inset.w > 0,
                // CSS's `top` is the box's upper edge, where y grows the other way here.
                Center = new Vector2((inset.w - inset.y) / 2, (inset.z - inset.x) / 2),
                HalfSize = size / 2,
                RadiusX = new Vector4(rounding.AdjustedTLRadius.x, rounding.AdjustedTRRadius.x, rounding.AdjustedBRRadius.x, rounding.AdjustedBLRadius.x),
                RadiusY = new Vector4(rounding.AdjustedTLRadius.y, rounding.AdjustedTRRadius.y, rounding.AdjustedBRRadius.y, rounding.AdjustedBLRadius.y),
            };
        }

        /// <summary>Yoga reports an undefined edge as NaN, which would take the whole box with it.</summary>
        static float Norm(float value) => float.IsNaN(value) ? 0f : value;

        private void OnDestroy()
        {
            if (fillMaterial) Destroy(fillMaterial);
            fillMaterial = null;
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
                    if (rt.parent != InsetShadowRoot) FullStretch(rt, InsetShadowRoot);
                }
                else
                {
                    if (rt.parent != ShadowRoot) FullStretch(rt, ShadowRoot);
                }

                g.color = shadow.color;
            }

            RefreshShadowRounding();
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
            // Only a layer blending with the layers below it ever uses this, and it decides that
            // for itself -- here it is only told where to go when it does.
            if (BackdropSurface.Required) img.Surface = Context.BackdropSurface;
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
