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
    /// clipped normally. Hit testing does not survive the reparent yet.
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

        // A blur of radius r reaches about 3r; the kernel here spans 4 taps at quarter spacing.
        const float BleedPerBlurUnit = 3f;
        const int MaxDimension = 4096;

        private UGUIComponent component;
        private RectTransform self;

        private Transform originalParent;
        private int originalIndex;

        private Canvas offscreenCanvas;
        private Camera offscreenCamera;
        private RenderTexture target;
        private RenderTexture scratch;

        private RawImage composite;
        private Material compositeMaterial;
        private Material blurMaterial;

        private FilterDefinition definition;
        public FilterDefinition Definition
        {
            get => definition;
            set => definition = value;
        }

        private readonly List<Graphic> graphics = new List<Graphic>();
        private readonly List<Graphic> registered = new List<Graphic>();
        private UnityEngine.Events.UnityAction markDirty;
        private FilterDefinition lastRendered;
        private Rect lastRect;
        private bool dirty = true;

        /// <summary>How many offscreen renders this filter has done. For tests.</summary>
        public int RenderCount { get; private set; }

        public static ElementFilter Create(UGUIComponent cmp, FilterDefinition definition)
        {
            var filter = cmp.GameObject.AddComponent<ElementFilter>();
            filter.component = cmp;
            filter.definition = definition;
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

            compositeMaterial = new Material(Resources.Load<Shader>("ReactUnity/shaders/Filter"));
            blurMaterial = new Material(Resources.Load<Shader>("ReactUnity/shaders/FilterBlur"));
            composite.material = compositeMaterial;

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

            // Park the surface far from anything else so no other camera can pick it up.
            canvasGo.transform.position = new Vector3(0, 0, 100000);

            self.SetParent(canvasGo.transform, false);
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

            if (composite) Destroy(composite.gameObject);
            if (offscreenCanvas) Destroy(offscreenCanvas.gameObject);
            if (compositeMaterial) Destroy(compositeMaterial);
            if (blurMaterial) Destroy(blurMaterial);
            Release(ref target);
            Release(ref scratch);
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
                lastRendered = definition;
                dirty = true;
            }

            if (self.rect != lastRect)
            {
                lastRect = self.rect;
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

        void LateUpdate()
        {
            if (definition == null || !composite) return;
            if (!PollDirty()) return;
            dirty = false;
            RenderCount++;

            var rect = self.rect;
            var scale = ScaleFactor;

            // Bleed lets blur reach past the element's box, as the CSS filter region does.
            var bleed = Mathf.Ceil(definition.Blur * BleedPerBlurUnit);
            var width = rect.width + bleed * 2f;
            var height = rect.height + bleed * 2f;
            if (width <= 0 || height <= 0) return;

            // Whole device pixels: a fractional RT shifts glyph edges sub-pixel (measured: a half
            // pixel moves 2.75% of pixels), while an aligned one is bit-identical to drawing in place.
            var pxWidth = Mathf.Clamp(Mathf.CeilToInt(width * scale), 1, MaxDimension);
            var pxHeight = Mathf.Clamp(Mathf.CeilToInt(height * scale), 1, MaxDimension);

            EnsureTarget(pxWidth, pxHeight);

            // Aim in world space: the camera hangs off the surface canvas, not off the element, so
            // the element's own anchoredPosition would otherwise be left out and the capture would
            // be taken from somewhere inside the element instead of around it.
            var worldCentre = self.TransformPoint(rect.center);
            offscreenCamera.transform.SetPositionAndRotation(worldCentre - self.forward * 100f, self.rotation);
            offscreenCamera.orthographicSize = pxHeight / scale / 2f;
            offscreenCamera.aspect = (float) pxWidth / pxHeight;
            offscreenCamera.nearClipPlane = 0.01f;
            offscreenCamera.farClipPlane = 1000f;

            offscreenCamera.targetTexture = target;
            offscreenCamera.Render();

            if (definition.Blur > 0)
            {
                // Nine taps whose spacing grows with the radius sample too sparsely for a wide
                // blur and band. Convolving the same kernel n times widens it by sqrt(n) instead,
                // which keeps the taps close together however large the radius gets.
                var passes = Mathf.Clamp(Mathf.CeilToInt(definition.Blur / 6f), 1, 4);
                blurMaterial.SetFloat(BlurId, definition.Blur / Mathf.Sqrt(passes) * scale);

                for (int i = 0; i < passes; i++)
                {
                    Graphics.Blit(target, scratch, blurMaterial, 0);
                    Graphics.Blit(scratch, target, blurMaterial, 1);
                }
            }

            ApplyToComposite(target, bleed);
        }

        void EnsureTarget(int w, int h)
        {
            if (target && target.width == w && target.height == h) return;

            Release(ref target);
            Release(ref scratch);

            target = new RenderTexture(w, h, 24, RenderTextureFormat.ARGB32);
            target.filterMode = FilterMode.Bilinear;
            target.wrapMode = TextureWrapMode.Clamp;
            target.Create();

            scratch = new RenderTexture(w, h, 0, RenderTextureFormat.ARGB32);
            scratch.filterMode = FilterMode.Bilinear;
            scratch.wrapMode = TextureWrapMode.Clamp;
            scratch.Create();
        }

        void ApplyToComposite(RenderTexture source, float bleed)
        {
            var rect = self.rect;
            var compRect = composite.transform as RectTransform;

            // Match the element's slot, grown by the bleed so blur is not cut off at the edge.
            compRect.anchorMin = self.anchorMin;
            compRect.anchorMax = self.anchorMax;
            compRect.pivot = self.pivot;
            compRect.anchoredPosition = self.anchoredPosition;
            compRect.sizeDelta = self.sizeDelta + new Vector2(bleed * 2f, bleed * 2f);

            composite.texture = source;
            compositeMaterial.SetTexture(MainTexId, source);
            compositeMaterial.SetFloat(BrightnessId, definition.Brightness);
            compositeMaterial.SetFloat(ContrastId, definition.Contrast);
            compositeMaterial.SetFloat(GrayscaleId, definition.Grayscale);
            compositeMaterial.SetFloat(HueRotateId, definition.HueRotate);
            compositeMaterial.SetFloat(InvertId, definition.Invert);
            compositeMaterial.SetFloat(OpacityId, definition.Opacity);
            compositeMaterial.SetFloat(SaturateId, definition.Saturate);
            compositeMaterial.SetFloat(GrainId, definition.Grain);
            compositeMaterial.SetFloat(PixelateId, definition.Pixelate);
            compositeMaterial.SetFloat(SepiaId, definition.Sepia);
        }
    }
}
