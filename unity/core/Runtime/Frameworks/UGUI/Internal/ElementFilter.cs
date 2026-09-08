using System;
using System.Collections.Generic;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Renders an element's subtree into a RenderTexture and composites the result back in its
    /// original slot with the CSS `filter` chain applied.
    /// </summary>
    /// <remarks>
    /// The subtree is reparented under an offscreen canvas, which is the only way UGUI can render
    /// one subtree in isolation -- a camera cullingMask cannot, because a ScreenSpaceOverlay canvas
    /// has no camera. Losing the ancestor stencil that way is what CSS wants: an ancestor's
    /// `overflow` clips the filtered result, and the composite (a MaskableGraphic left in place) is
    /// clipped normally. Pointer events are routed back in by <see cref="FilterRaycaster"/>.
    /// </remarks>
    public class ElementFilter : MonoBehaviour
    {
        static readonly int MainTexId = Shader.PropertyToID("_MainTex");
        static readonly int BlurId = Shader.PropertyToID("_Blur");
        static readonly int BrightnessId = Shader.PropertyToID("_Brightness");
        static readonly int ContrastId = Shader.PropertyToID("_Contrast");
        static readonly int GrayscaleId = Shader.PropertyToID("_Grayscale");
        static readonly int HueRotateId = Shader.PropertyToID("_HueRotate");
        static readonly int InvertId = Shader.PropertyToID("_Invert");
        static readonly int OpacityId = Shader.PropertyToID("_Opacity");
        static readonly int SaturateId = Shader.PropertyToID("_Saturate");
        static readonly int GrainId = Shader.PropertyToID("_Grain");
        static readonly int PixelateId = Shader.PropertyToID("_Pixelate");
        static readonly int SepiaId = Shader.PropertyToID("_Sepia");
        static readonly int GrainPhaseId = Shader.PropertyToID("_GrainPhase");
        static readonly int PosterizeId = Shader.PropertyToID("_Posterize");
        static readonly int ScanlineIntensityId = Shader.PropertyToID("_ScanlineIntensity");
        static readonly int ScanlinePeriodId = Shader.PropertyToID("_ScanlinePeriod");
        static readonly int ScanlinePhaseId = Shader.PropertyToID("_ScanlinePhase");
        static readonly int TintId = Shader.PropertyToID("_Tint");
        static readonly int AberrationId = Shader.PropertyToID("_Aberration");
        static readonly int ShadowTexId = Shader.PropertyToID("_ShadowTex");
        static readonly int ShadowColorId = Shader.PropertyToID("_ShadowColor");
        static readonly int ShadowOffsetId = Shader.PropertyToID("_ShadowOffset");
        static readonly int BlendModeId = Shader.PropertyToID("_BlendMode");

        // The exact support of the iterated kernel, so no blur can ever be clipped and none is
        // over-allocated for: one pass reaches 4 taps at quarter spacing, so +/- its own radius,
        // and n passes of r/sqrt(n) reach sqrt(n)*r -- at most 2r, since n is capped at 4.
        const float BleedPerBlurUnit = 2f;
        const int MaxDimension = 4096;

        // Where the offscreen surfaces are parked, and how far apart. Every camera has the same
        // culling mask, so two surfaces sharing a spot would each capture the other's subtree --
        // the gap has to be wider than a camera's far plane. Slots are reused as filters go away,
        // which keeps the coordinates small enough to stay exact.
        const float SlotBase = 100000f;
        const float SlotStride = 5000f;
        static readonly Stack<int> freeSlots = new Stack<int>();
        static int nextSlot;
        private int slot = -1;

        private UGUIComponent component;
        private RectTransform self;

        private Transform originalParent;
        private int originalIndex;

        private Canvas offscreenCanvas;
        private Camera offscreenCamera;
        private RenderTexture target;
        private RenderTexture scratch;
        private RenderTexture shadow;

        private RawImage composite;
        private Material compositeMaterial;
        private bool compositeBlends;
        private Material blurMaterial;

        private FilterDefinition definition;
        public FilterDefinition Definition
        {
            get => definition;
            set => definition = value;
        }

        private BackgroundBlendMode blendMode;
        public BackgroundBlendMode BlendMode
        {
            get => blendMode;
            set
            {
                if (blendMode == value) return;
                blendMode = value;
                EnsureCompositeMaterial();
                uniformsDirty = true;
            }
        }

        private bool isolated;
        public bool Isolated
        {
            get => isolated;
            set
            {
                if (isolated == value) return;
                isolated = value;
                ApplyIsolation();
            }
        }

        private readonly List<Graphic> graphics = new List<Graphic>();
        private readonly List<Graphic> registered = new List<Graphic>();
        private UnityEngine.Events.UnityAction markDirty;
        private FilterDefinition lastRendered;
        private Rect lastRect;
        private bool dirty = true;
        private bool uniformsDirty = true;
        private Vector4 shadowOffsetUv;
        private float texelsPerUnitY = 1f;
        private float uvPerUnitX;

        /// <summary>How many offscreen renders this filter has done. For tests.</summary>
        public int RenderCount { get; private set; }

        public static ElementFilter Create(UGUIComponent cmp, FilterDefinition definition, BackgroundBlendMode blendMode, bool isolated)
        {
            var filter = cmp.GameObject.AddComponent<ElementFilter>();
            filter.component = cmp;
            filter.definition = definition;
            filter.blendMode = blendMode;
            filter.isolated = isolated;
            filter.Attach();
            return filter;
        }

        void Attach()
        {
            markDirty = Invalidate;
            self = transform as RectTransform;
            originalParent = self.parent;
            originalIndex = self.GetSiblingIndex();

            var ctx = component.Context;

            // The composite takes the element's place in the original hierarchy, so it inherits the
            // ancestor stencil and gets clipped by any `overflow: hidden` above it.
            var compGo = ctx.CreateNativeObject("[Filter]", typeof(RectTransform), typeof(RawImage));
            composite = compGo.GetComponent<RawImage>();
            composite.raycastTarget = false;
            var compRect = compGo.transform as RectTransform;
            compRect.SetParent(originalParent, false);
            compRect.SetSiblingIndex(originalIndex);

            EnsureCompositeMaterial();
            blurMaterial = new Material(Resources.Load<Shader>("ReactUnity/shaders/FilterBlur"));

            var canvasGo = ctx.CreateNativeObject("[FilterSurface]", typeof(RectTransform), typeof(Canvas));
            offscreenCanvas = canvasGo.GetComponent<Canvas>();
            offscreenCanvas.renderMode = RenderMode.WorldSpace;

            var camGo = ctx.CreateNativeObject("[FilterCamera]", typeof(Camera));
            offscreenCamera = camGo.GetComponent<Camera>();
            offscreenCamera.orthographic = true;
            offscreenCamera.clearFlags = CameraClearFlags.SolidColor;
            offscreenCamera.backgroundColor = Color.clear;
            offscreenCamera.cullingMask = 1 << canvasGo.layer;
            offscreenCamera.enabled = false;
            camGo.transform.SetParent(canvasGo.transform, false);

            // Collected under one object rather than left loose at the root, which is where a
            // canvas that has to stay `WorldSpace` can go -- see UGUIContext.FilterRoot.
            canvasGo.transform.SetParent(ctx.FilterRoot, false);

            // Park the surface far from the scene, and in a slot of its own.
            slot = freeSlots.Count > 0 ? freeSlots.Pop() : nextSlot++;
            canvasGo.transform.position = new Vector3(0, 0, SlotBase + slot * SlotStride);

            // Events reach the subtree through the composite: the pointer lands on the composite's
            // rect, which is remapped into the offscreen camera's screen space and cast there.
            offscreenCanvas.worldCamera = offscreenCamera;
            var raycaster = canvasGo.AddComponent<FilterRaycaster>();
            raycaster.EventViewport = compRect;
            raycaster.HostCanvas = ctx.RootCanvas;
            raycaster.Composite = composite;

            // The top of the subtree is where the event system's walk up the hierarchy stops, so
            // anything nothing inside handled carries on from the composite instead.
            canvasGo.AddComponent<FilterEventBubble>().Composite = composite;

            self.SetParent(canvasGo.transform, false);

            ApplyIsolation();
        }

        /// <summary>
        /// Carries the other half of <c>isolation: isolate</c> -- not inheriting parent CanvasGroups
        /// -- onto the composite. The element's own group went offscreen with the subtree, where
        /// there are no parent groups left to ignore, so without this an ancestor's opacity would
        /// quietly start applying to an element the moment it isolated.
        /// </summary>
        void ApplyIsolation()
        {
            if (!composite) return;

            var group = composite.GetComponent<CanvasGroup>();
            if (!group)
            {
                if (!isolated) return;
                group = composite.gameObject.AddComponent<CanvasGroup>();
            }
            group.ignoreParentGroups = isolated;
        }

        /// <summary>
        /// Puts the subtree back where it was and removes the filter. Use this rather than
        /// destroying the component -- OnDestroy also runs while the whole GameObject is going
        /// away, and reparenting a dying object is an error.
        /// </summary>
        public void Detach()
        {
            if (self && originalParent)
            {
                self.SetParent(originalParent, false);
                self.SetSiblingIndex(originalIndex);
            }
            originalParent = null;
            if (composite) composite.enabled = false;
            Destroy(this);
        }

        void OnDestroy()
        {
            graphics.Clear();
            Reregister();

            if (slot >= 0)
            {
                freeSlots.Push(slot);
                slot = -1;
            }

            if (composite) Destroy(composite.gameObject);
            if (offscreenCanvas) Destroy(offscreenCanvas.gameObject);
            if (compositeMaterial) Destroy(compositeMaterial);
            if (blurMaterial) Destroy(blurMaterial);
            Release(ref target);
            Release(ref scratch);
            Release(ref shadow);
        }

        static void Release(ref RenderTexture rt)
        {
            if (!rt) return;
            rt.Release();
            Destroy(rt);
            rt = null;
        }

        float ScaleFactor
        {
            get
            {
                var root = component?.Context?.RootCanvas;
                return root ? Mathf.Max(root.scaleFactor, 0.01f) : 1f;
            }
        }

        /// <summary>
        /// Points the composite at the shader its blend mode needs. Reading the backdrop costs a
        /// grab per object, so only an element that actually blends is given the shader that pays
        /// for one -- a plain `filter` keeps the cheap composite.
        /// </summary>
        void EnsureCompositeMaterial()
        {
            var blends = blendMode != BackgroundBlendMode.Normal;
            if (compositeMaterial && compositeBlends == blends) return;

            if (compositeMaterial) Destroy(compositeMaterial);
            compositeBlends = blends;
            compositeMaterial = new Material(Resources.Load<Shader>(blends ? "ReactUnity/shaders/FilterBlend" : "ReactUnity/shaders/Filter"));
            if (composite) composite.material = compositeMaterial;
            uniformsDirty = true;
        }

        /// <summary>
        /// Renders on the next frame even if nothing looks like it changed.
        /// </summary>
        public void Invalidate() => dirty = true;

        /// <summary>
        /// True when anything that could alter the captured pixels has moved since the last render.
        /// Missing a change here shows a stale frame, so this errs towards re-rendering: a graphic
        /// rebuild, any descendant transform moving, the element resizing, or a new filter value.
        /// </summary>
        bool PollDirty()
        {
            if (!Equals(lastRendered, definition))
            {
                // A colour op is a uniform the composite reads at draw time, so animating one only
                // has to push the uniforms again -- re-capturing the subtree would change nothing.
                if (lastRendered == null || CaptureDiffers(lastRendered, definition)) dirty = true;
                lastRendered = definition;
                uniformsDirty = true;
            }

            if (self.rect != lastRect)
            {
                lastRect = self.rect;
                dirty = true;
            }

            // Also the element itself: a `rotate` or `scale` on an element with no background of
            // its own touches no graphic in the list below.
            if (self.hasChanged)
            {
                self.hasChanged = false;
                dirty = true;
            }

            // A rebuild raises the callbacks below, but moving a child only sets its transform --
            // the canvas re-batches without any graphic going dirty.
            graphics.Clear();
            self.GetComponentsInChildren(true, graphics);

            if (graphics.Count != registered.Count) Reregister();
            else
            {
                for (int i = 0; i < graphics.Count; i++)
                {
                    if (graphics[i] == registered[i]) continue;
                    Reregister();
                    break;
                }
            }

            for (int i = 0; i < graphics.Count; i++)
            {
                var t = graphics[i].transform;
                if (!t.hasChanged) continue;
                t.hasChanged = false;
                dirty = true;
            }

            return dirty;
        }

        void Reregister()
        {
            for (int i = 0; i < registered.Count; i++)
            {
                if (!registered[i]) continue;
                registered[i].UnregisterDirtyVerticesCallback(markDirty);
                registered[i].UnregisterDirtyMaterialCallback(markDirty);
            }

            registered.Clear();
            registered.AddRange(graphics);
            dirty = true;

            for (int i = 0; i < registered.Count; i++)
            {
                registered[i].RegisterDirtyVerticesCallback(markDirty);
                registered[i].RegisterDirtyMaterialCallback(markDirty);
            }
        }

        /// <summary>Whether the offscreen capture would come out different, as opposed to only the
        /// uniforms the composite is drawn with. Everything here feeds the filter region or a blur.</summary>
        static bool CaptureDiffers(FilterDefinition a, FilterDefinition b)
        {
            return a.Blur != b.Blur || a.DropShadowBlur != b.DropShadowBlur ||
                   a.DropShadowOffset != b.DropShadowOffset || (a.DropShadowColor.a > 0) != (b.DropShadowColor.a > 0) ||
                   AberrationBleed(a) != AberrationBleed(b);
        }

        /// <summary>The margin an aberration needs, whole pixels -- so animating one through a
        /// couple of pixels re-captures a couple of times rather than on every frame.</summary>
        static float AberrationBleed(FilterDefinition d) => Mathf.Ceil(Mathf.Abs(d.ChromaticAberration));

        void LateUpdate()
        {
            if (definition == null || !composite) return;

            var recapture = PollDirty();
            if (recapture)
            {
                dirty = false;
                RenderCount++;
                Render();
            }

            // UGUI substitutes a stencil copy of the material under an ancestor mask, and that copy
            // is not what the values below were written to -- so they are pushed again to whatever
            // is actually being drawn, every time UGUI rebuilds it.
            if (recapture || uniformsDirty)
            {
                uniformsDirty = false;
                SetUniforms(compositeMaterial);
                var drawn = composite.materialForRendering;
                if (drawn && drawn != compositeMaterial) SetUniforms(drawn);
            }
        }

        void Render()
        {
            var rect = self.rect;
            var scale = ScaleFactor;
            var hasShadow = definition.DropShadowColor.a > 0;

            // The filter region, as CSS has one: how far past each edge of the element the capture
            // has to reach. A blur grows it evenly, a drop-shadow only on the side it falls.
            var blurBleed = Mathf.Ceil(definition.Blur * BleedPerBlurUnit);
            var shadowBleed = hasShadow ? Mathf.Ceil(definition.DropShadowBlur * BleedPerBlurUnit) : 0f;
            var offset = hasShadow ? definition.DropShadowOffset : Vector2.zero;

            // Chromatic aberration reads one offset either side, and needs transparent margin to
            // read there -- against the sampler's clamp the outer edge would have no fringe at all.
            var sideBleed = Mathf.Max(blurBleed, AberrationBleed(definition));

            // The rect's y grows upwards where the shadow's offset grows down.
            var mLeft = Mathf.Ceil(Mathf.Max(sideBleed, shadowBleed - offset.x));
            var mRight = Mathf.Ceil(Mathf.Max(sideBleed, shadowBleed + offset.x));
            var mBottom = Mathf.Ceil(Mathf.Max(blurBleed, shadowBleed + offset.y));
            var mTop = Mathf.Ceil(Mathf.Max(blurBleed, shadowBleed - offset.y));

            // An odd difference would put the frame's centre on a half pixel, and half a pixel of
            // offset moves 2.75% of text pixels -- which reads as shimmer on anything animating.
            if (Mathf.Abs(mRight - mLeft) % 2f != 0f) mRight += 1f;
            if (Mathf.Abs(mTop - mBottom) % 2f != 0f) mTop += 1f;

            var width = rect.width + mLeft + mRight;
            var height = rect.height + mBottom + mTop;
            if (width <= 0 || height <= 0) return;

            // The element's own rotate and scale are kept out of the capture and put on the
            // composite instead, so the chain runs in the element's local space: a rotation does not
            // tilt `pixelate` blocks, and a blur widens with the element as CSS says it should.
            var sx = Mathf.Abs(self.localScale.x);
            var sy = Mathf.Abs(self.localScale.y);
            if (sx < 0.0001f || sy < 0.0001f) return;

            // Whole device pixels: a fractional RT shifts glyph edges sub-pixel (measured: a half
            // pixel moves 2.75% of pixels), while an aligned one is bit-identical to drawing in place.
            var pxWidth = Mathf.Clamp(Mathf.CeilToInt(width * sx * scale), 1, MaxDimension);
            var pxHeight = Mathf.Clamp(Mathf.CeilToInt(height * sy * scale), 1, MaxDimension);

            EnsureTarget(pxWidth, pxHeight, hasShadow);

            // Aim in world space: the camera hangs off the surface canvas, not off the element, so
            // the element's own anchoredPosition would otherwise be left out and the capture would
            // be taken from somewhere inside the element instead of around it. Taking the element's
            // rotation frames it square-on, which is what leaves the capture transform-free.
            var worldCentre = self.TransformPoint(rect.center + new Vector2((mRight - mLeft) * 0.5f, (mTop - mBottom) * 0.5f));
            offscreenCamera.transform.SetPositionAndRotation(worldCentre - self.forward * 100f, self.rotation);
            // Both of these are already in RT terms, so they follow the element's scale through
            // pxWidth/pxHeight and keep the frame exactly as square as the texture is.
            offscreenCamera.orthographicSize = pxHeight / scale / 2f;
            offscreenCamera.aspect = (float) pxWidth / pxHeight;
            offscreenCamera.nearClipPlane = 0.01f;
            offscreenCamera.farClipPlane = 1000f;

            offscreenCamera.targetTexture = target;
            offscreenCamera.Render();

            if (definition.Blur > 0) Blur(target, target, definition.Blur, width, height);

            if (hasShadow)
            {
                // Cast from the element after its own blur, so a blurred element throws a blurred
                // shadow -- the order `blur() drop-shadow()` gives on the web. Only alpha is read
                // back out, so the colour the silhouette carries does not matter.
                if (definition.DropShadowBlur > 0) Blur(target, shadow, definition.DropShadowBlur, width, height);
                else Graphics.Blit(target, shadow);
            }

            ApplyToComposite(target, new Vector4(mLeft, mRight, mBottom, mTop), width, height);
        }

        /// <summary>
        /// Separable Gaussian of `radius` local units, from one texture into another through the
        /// scratch buffer. Blurring in place is fine -- the horizontal half always lands elsewhere.
        /// </summary>
        void Blur(RenderTexture from, RenderTexture to, float radius, float width, float height)
        {
            // Nine taps whose spacing grows with the radius sample too sparsely for a wide blur and
            // band. Convolving the same kernel n times widens it by sqrt(n) instead, which keeps
            // the taps close together however large the radius gets.
            var passes = Mathf.Clamp(Mathf.CeilToInt(radius / 6f), 1, 4);
            var each = radius / Mathf.Sqrt(passes);

            // Texels per local unit, read off the target that was actually allocated -- so this
            // carries the element's own scale, and a clamped dimension narrows the blur with it.
            var hRadius = each * to.width / width;
            var vRadius = each * to.height / height;

            var src = from;
            for (int i = 0; i < passes; i++)
            {
                blurMaterial.SetFloat(BlurId, hRadius);
                Graphics.Blit(src, scratch, blurMaterial, 0);
                blurMaterial.SetFloat(BlurId, vRadius);
                Graphics.Blit(scratch, to, blurMaterial, 1);
                src = to;
            }
        }

        void EnsureTarget(int w, int h, bool needShadow)
        {
            if (!target || target.width != w || target.height != h)
            {
                Release(ref target);
                Release(ref scratch);
                target = Allocate(w, h, 24);
                scratch = Allocate(w, h, 0);
            }

            if (!needShadow) Release(ref shadow);
            else if (!shadow || shadow.width != w || shadow.height != h)
            {
                Release(ref shadow);
                shadow = Allocate(w, h, 0);
            }
        }

        static RenderTexture Allocate(int w, int h, int depth)
        {
            var rt = new RenderTexture(w, h, depth, RenderTextureFormat.ARGB32);
            rt.filterMode = FilterMode.Bilinear;
            rt.wrapMode = TextureWrapMode.Clamp;
            rt.Create();
            return rt;
        }

        void ApplyToComposite(RenderTexture source, Vector4 margins, float width, float height)
        {
            var rect = self.rect;
            var compRect = composite.transform as RectTransform;
            float mLeft = margins.x, mRight = margins.y, mBottom = margins.z, mTop = margins.w;

            // Match the element's slot, grown by the filter region so nothing is cut off at the edge.
            compRect.anchorMin = self.anchorMin;
            compRect.anchorMax = self.anchorMax;
            compRect.sizeDelta = self.sizeDelta + new Vector2(mLeft + mRight, mBottom + mTop);

            // Keep the pivot on the same point despite the wider rect: it is the origin the rotation
            // and scale below turn about, and `transform-origin` has already moved it off centre.
            var grown = rect.size + new Vector2(mLeft + mRight, mBottom + mTop);
            compRect.pivot = new Vector2(
                grown.x > 0 ? (self.pivot.x * rect.width + mLeft) / grown.x : 0.5f,
                grown.y > 0 ? (self.pivot.y * rect.height + mBottom) / grown.y : 0.5f);
            compRect.anchoredPosition = self.anchoredPosition;

            // The capture left these out, so they apply to the filtered image here.
            compRect.localRotation = self.localRotation;
            compRect.localScale = self.localScale;

            composite.texture = source;

            // The shader subtracts this from its uv, and the rect's y grows the other way.
            shadowOffsetUv = new Vector4(definition.DropShadowOffset.x / width, -definition.DropShadowOffset.y / height, 0, 0);

            // Kept rather than the values themselves, so a scanline period or an aberration that
            // moves without changing the capture still converts against the frame it is drawn in.
            texelsPerUnitY = height > 0 ? source.height / height : 1f;
            uvPerUnitX = width > 0 ? 1f / width : 0f;
        }

        /// <summary>Writes the whole filter chain onto one material. Called for the composite's own
        /// material and again for the stencil copy UGUI draws in its place under a mask.</summary>
        void SetUniforms(Material m)
        {
            m.SetTexture(MainTexId, target);
            m.SetInt(BlendModeId, (int) blendMode);
            m.SetFloat(BrightnessId, definition.Brightness);
            m.SetFloat(ContrastId, definition.Contrast);
            m.SetFloat(GrayscaleId, definition.Grayscale);
            m.SetFloat(HueRotateId, definition.HueRotate);
            m.SetFloat(InvertId, definition.Invert);
            m.SetFloat(OpacityId, definition.Opacity);
            m.SetFloat(SaturateId, definition.Saturate);
            m.SetFloat(GrainId, definition.Grain);
            m.SetFloat(PixelateId, definition.Pixelate);
            m.SetFloat(SepiaId, definition.Sepia);
            m.SetFloat(GrainPhaseId, definition.GrainPhase);
            m.SetFloat(PosterizeId, definition.Posterize);
            m.SetFloat(ScanlineIntensityId, definition.ScanlineIntensity);
            m.SetFloat(ScanlinePeriodId, definition.ScanlinePeriod * texelsPerUnitY);
            m.SetFloat(ScanlinePhaseId, definition.ScanlinePhase * texelsPerUnitY);
            m.SetColor(TintId, definition.Tint);
            m.SetFloat(AberrationId, definition.ChromaticAberration * uvPerUnitX);

            if (definition.DropShadowColor.a > 0 && shadow)
            {
                m.SetTexture(ShadowTexId, shadow);
                m.SetColor(ShadowColorId, definition.DropShadowColor);
                m.SetVector(ShadowOffsetId, shadowOffsetUv);
            }
            else m.SetColor(ShadowColorId, Color.clear);
        }
    }
}
