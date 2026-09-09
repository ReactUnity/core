using System;
using System.Collections.Generic;
using Yoga;
using ReactUnity.Types;
using ReactUnity.UGUI.Shapes;
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
    public class ElementFilter : MonoBehaviour, IBackdropReader
    {
        static readonly int MainTexId = Shader.PropertyToID("_MainTex");
        static readonly int BackdropTexId = Shader.PropertyToID("_ReactUnityBackdrop");
        static readonly int BackdropBoundId = Shader.PropertyToID("_ReactUnityBackdropBound");
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
        static readonly int MaskTexId = Shader.PropertyToID("_MaskTex");
        static readonly int MaskEnabledId = Shader.PropertyToID("_MaskEnabled");
        static readonly int MaskLuminanceId = Shader.PropertyToID("_MaskLuminance");
        static readonly int ClipKindId = Shader.PropertyToID("_ClipKind");
        static readonly int ClipRegionId = Shader.PropertyToID("_ClipRegion");
        static readonly int ClipBoxId = Shader.PropertyToID("_ClipBox");
        static readonly int ClipRadiiXId = Shader.PropertyToID("_ClipRadiiX");
        static readonly int ClipRadiiYId = Shader.PropertyToID("_ClipRadiiY");
        static readonly int ClipCircleId = Shader.PropertyToID("_ClipCircle");
        static readonly int ClipPolyId = Shader.PropertyToID("_ClipPoly");
        static readonly int ClipPolyCountId = Shader.PropertyToID("_ClipPolyCount");
        static readonly int ClipEvenOddId = Shader.PropertyToID("_ClipEvenOdd");
        static readonly int ClipMaskTexId = Shader.PropertyToID("_ClipMaskTex");

        // Two ring points per float4, matching RU_CLIP_POLY_SLOTS in ClipShapes.cginc. The array is
        // always sent full: a uniform array's length is fixed by the first SetVectorArray call.
        const int ClipPolySlots = 9;

        // What the shader switches on, which is the shape's resolved form rather than the CSS
        // function it was written as -- RU_CLIP_* in ClipShapes.cginc.
        const int ClipKindNone = 0;
        const int ClipKindBox = 1;
        const int ClipKindEllipse = 2;
        const int ClipKindRing = 3;
        const int ClipKindMask = 4;

        // A rasterized clip is a coverage field the composite samples, so its resolution only has
        // to carry the softness of one edge. Past this the mask is stretched, which costs a shape
        // the size of a screen a little sharpness rather than four megabytes of upload.
        const int MaxMaskDimension = 1024;

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

        // The mask's own surface, in a slot of its own so the two cameras cannot see each other's
        // subtree. Built only once something asks for a mask.
        private Canvas maskCanvas;
        private Camera maskCamera;
        private RectTransform maskRegion;
        private RectTransform maskBox;
        private RenderTexture maskTarget;
        private int maskSlot = -1;
        private readonly List<WebBackgroundImage> maskLayers = new List<WebBackgroundImage>();
        private bool maskLuminance;

        private RawImage composite;
        private Material compositeMaterial;
        private bool compositeBlends;
        private Material blurMaterial;
        private ClipPathRaycastFilter clipFilter;

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

        private ClipPath clipShape = ClipPath.None;
        public ClipPath ClipShape
        {
            get => clipShape;
            set
            {
                var next = value ?? ClipPath.None;
                if (Equals(clipShape, next)) return;
                clipShape = next;
                uniformsDirty = true;
                if (clipFilter) clipFilter.Shape = next;
            }
        }

        /// <summary>Whether anything here needs the offscreen pass to keep running.</summary>
        public bool HasMask => maskLayers.Count > 0;

        private readonly List<Graphic> graphics = new List<Graphic>();
        private readonly List<Graphic> maskGraphics = new List<Graphic>();
        private readonly List<Graphic> registered = new List<Graphic>();
        private UnityEngine.Events.UnityAction markDirty;
        private FilterDefinition lastRendered;
        private Rect lastRect;
        private bool dirty = true;
        private bool uniformsDirty = true;
        private Vector4 shadowOffsetUv;
        private float texelsPerUnitY = 1f;
        private float uvPerUnitX;
        private Vector4 clipRegion;
        private readonly Vector4[] clipPolyBuffer = new Vector4[ClipPolySlots];

        // The shape as the shader will read it, worked out once per uniform push -- SetUniforms runs
        // twice whenever UGUI substitutes a stencil copy of the material, and resolving a path
        // twice for that would flatten its curves twice.
        private Rect referenceBox;
        private ClipPath.Resolved resolvedClip;
        private int clipKind;

        // A rasterized clip, and what it was rasterized for: the contour array is kept by the
        // ClipPath that produced it, so its identity is enough to say nothing has moved.
        private Texture2D clipMask;
        private object clipMaskKey;
        private Vector4 clipMaskRegion;

        /// <summary>How many offscreen renders this filter has done. For tests.</summary>
        public int RenderCount { get; private set; }

        public static ElementFilter Create(UGUIComponent cmp, FilterDefinition definition, BackgroundBlendMode blendMode, bool isolated, ClipPath clipShape)
        {
            var filter = cmp.GameObject.AddComponent<ElementFilter>();
            filter.component = cmp;
            filter.definition = definition;
            filter.blendMode = blendMode;
            filter.isolated = isolated;
            filter.clipShape = clipShape ?? ClipPath.None;
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

            // A `clip-path` changes the element's shape, so it has to keep pointers out of what it
            // cut away as well as pixels. Hung off the composite, where Graphic.Raycast starts.
            clipFilter = compGo.AddComponent<ClipPathRaycastFilter>();
            clipFilter.Shape = clipShape;

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

        #region Mask

        /// <summary>
        /// The <c>mask-image</c> layers, taking the same values <c>background-image</c> does. They are
        /// drawn to a texture of their own that the composite multiplies into its alpha.
        /// </summary>
        /// <remarks>
        /// This is what a mask costs to have soft edges. A UGUI <see cref="UnityEngine.UI.Mask"/> is
        /// a stencil, and a stencil bit is either set or not -- so under one, the fade every
        /// `linear-gradient` mask is written for came out as a hard edge at the alpha clip
        /// threshold, or as nothing at all.
        /// </remarks>
        public void SetMask(
            ICssValueList<ImageDefinition> images,
            ICssValueList<YogaValue> positionsX,
            ICssValueList<YogaValue> positionsY,
            ICssValueList<BackgroundSize> sizes,
            ICssValueList<BackgroundRepeat> repeatXs,
            ICssValueList<BackgroundRepeat> repeatYs,
            MaskMode mode
        )
        {
            var count = images?.Count ?? 0;
            var luminance = mode == MaskMode.Luminance;

            if (luminance != maskLuminance)
            {
                maskLuminance = luminance;
                uniformsDirty = true;
            }

            if (count == 0)
            {
                if (maskLayers.Count > 0) ClearMask();
                return;
            }

            EnsureMaskSurface();

            while (maskLayers.Count > count) DestroyLastMaskLayer();
            while (maskLayers.Count < count) CreateMaskLayer();

            var rendering = component.ComputedStyle.imageRendering;
            var pixelated = rendering == ImageRendering.Pixelated || rendering == ImageRendering.CrispEdges;

            var len = maskLayers.Count;
            for (int i = 0; i < len; i++)
            {
                // CSS declares the topmost layer first, and the last child drawn is the one on top.
                var layer = maskLayers[len - 1 - i];
                layer.Pixelated = pixelated;
                layer.SetBackgroundColorAndImage(Color.white, images.Get(i));
                layer.BackgroundRepeatX = repeatXs.Get(i);
                layer.BackgroundRepeatY = repeatYs.Get(i);
                layer.BackgroundPosition = new YogaValue2(positionsX.Get(i), positionsY.Get(i));
                layer.BackgroundSize = sizes.Get(i);
            }
        }

        void EnsureMaskSurface()
        {
            if (maskCanvas) return;

            var ctx = component.Context;

            var canvasGo = ctx.CreateNativeObject("[FilterMaskSurface]", typeof(RectTransform), typeof(Canvas));
            maskCanvas = canvasGo.GetComponent<Canvas>();
            maskCanvas.renderMode = RenderMode.WorldSpace;

            var camGo = ctx.CreateNativeObject("[FilterMaskCamera]", typeof(Camera));
            maskCamera = camGo.GetComponent<Camera>();
            maskCamera.orthographic = true;
            maskCamera.clearFlags = CameraClearFlags.SolidColor;
            // Transparent black, so whatever no layer covers is what the mask hides -- which is the
            // mask painting area falling outside the border box, exactly as on the web.
            maskCamera.backgroundColor = Color.clear;
            maskCamera.cullingMask = 1 << canvasGo.layer;
            maskCamera.enabled = false;
            maskCamera.nearClipPlane = 0.01f;
            maskCamera.farClipPlane = 1000f;
            camGo.transform.SetParent(canvasGo.transform, false);
            camGo.transform.localPosition = new Vector3(0, 0, -100);
            maskCanvas.worldCamera = maskCamera;

            canvasGo.transform.SetParent(ctx.FilterRoot, false);

            // Its own slot: every camera here shares a culling mask, so two surfaces at one spot
            // would each capture the other.
            maskSlot = freeSlots.Count > 0 ? freeSlots.Pop() : nextSlot++;
            canvasGo.transform.position = new Vector3(0, 0, SlotBase + maskSlot * SlotStride);

            // The region is the whole capture, the box only the element -- so the mask's uv lines up
            // with the composite's while the layers themselves never see the filter region.
            maskRegion = Centred(ctx, "[MaskRegion]", canvasGo.transform);
            maskBox = Centred(ctx, "[MaskBox]", maskRegion);
        }

        static RectTransform Centred(UGUIContext ctx, string name, Transform parent)
        {
            var rt = ctx.CreateNativeObject(name, typeof(RectTransform)).transform as RectTransform;
            rt.SetParent(parent, false);
            rt.anchorMin = rt.anchorMax = rt.pivot = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = Vector2.zero;
            return rt;
        }

        void CreateMaskLayer()
        {
            var go = component.Context.CreateNativeObject("[MaskLayer]", typeof(RectTransform), typeof(WebBackgroundImage));
            var layer = go.GetComponent<WebBackgroundImage>();
            layer.Context = component.Context;
            layer.color = Color.clear;
            layer.raycastTarget = false;

            var rt = go.transform as RectTransform;
            rt.SetParent(maskBox, false);
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.sizeDelta = Vector2.zero;
            rt.anchoredPosition = Vector2.zero;

            maskLayers.Add(layer);
            dirty = true;
        }

        void DestroyLastMaskLayer()
        {
            var i = maskLayers.Count - 1;
            var layer = maskLayers[i];
            maskLayers.RemoveAt(i);
            if (layer) DestroyImmediate(layer.gameObject);
            dirty = true;
        }

        void ClearMask()
        {
            while (maskLayers.Count > 0) DestroyLastMaskLayer();

            if (maskCanvas) Destroy(maskCanvas.gameObject);
            maskCanvas = null;
            maskCamera = null;
            maskRegion = null;
            maskBox = null;
            Release(ref maskTarget);

            if (maskSlot >= 0)
            {
                freeSlots.Push(maskSlot);
                maskSlot = -1;
            }

            uniformsDirty = true;
        }

        /// <summary>Draws the layers over the same region the capture covers, at the same resolution.</summary>
        void RenderMask(int pxWidth, int pxHeight, float width, float height, Vector4 margins)
        {
            if (!maskCanvas || maskLayers.Count == 0) return;

            if (!maskTarget || maskTarget.width != pxWidth || maskTarget.height != pxHeight)
            {
                Release(ref maskTarget);
                maskTarget = Allocate(pxWidth, pxHeight, 24);
            }

            maskRegion.sizeDelta = new Vector2(width, height);
            maskBox.sizeDelta = self.rect.size;
            // The box sits off the region's centre by however lopsided the filter region is.
            maskBox.anchoredPosition = new Vector2((margins.x - margins.y) * 0.5f, (margins.z - margins.w) * 0.5f);

            maskCamera.orthographicSize = height / 2f;
            maskCamera.aspect = (float) pxWidth / pxHeight;
            maskCamera.targetTexture = maskTarget;
            maskCamera.Render();
        }

        #endregion

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

            if (maskSlot >= 0)
            {
                freeSlots.Push(maskSlot);
                maskSlot = -1;
            }

            maskLayers.Clear();

            if (composite)
            {
                if (compositeBlends && BackdropSurface.Required) component.Context.BackdropSurface.Unregister(this);
                Destroy(composite.gameObject);
            }
            if (offscreenCanvas) Destroy(offscreenCanvas.gameObject);
            if (maskCanvas) Destroy(maskCanvas.gameObject);
            if (compositeMaterial) Destroy(compositeMaterial);
            if (blurMaterial) Destroy(blurMaterial);
            Release(ref target);
            Release(ref scratch);
            Release(ref shadow);
            Release(ref maskTarget);
            ReleaseClipMask();
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

            // A pipeline with no GrabPass has to render the backdrop instead, and only the elements
            // that read one are kept out of it.
            if (composite && BackdropSurface.Required)
            {
                var surface = component.Context.BackdropSurface;
                if (blends) surface.Register(this);
                else surface.Unregister(this);
            }
        }

        public CanvasRenderer BackdropRenderer => composite ? composite.canvasRenderer : null;

        public void SetBackdrop(Texture backdrop)
        {
            // Only the blend shader has the property; a mode flipped back to `normal` unregisters,
            // but not before this frame's surface has already been handed out.
            if (!compositeMaterial || !compositeBlends) return;

            compositeMaterial.SetTexture(BackdropTexId, backdrop);
            compositeMaterial.SetFloat(BackdropBoundId, backdrop ? 1 : 0);

            // The stencil copy UGUI substitutes under a mask is a different material object, and it
            // is the one actually drawn -- the same split SetUniforms has to work around.
            var drawn = composite ? composite.materialForRendering : null;
            if (drawn && drawn != compositeMaterial)
            {
                drawn.SetTexture(BackdropTexId, backdrop);
                drawn.SetFloat(BackdropBoundId, backdrop ? 1 : 0);
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

            // A `clip-path` measured against the padding or content box follows the element's own
            // border and padding, neither of which changes the rect above -- so the box is polled
            // rather than waiting for something else to notice.
            var box = ReferenceBox();
            if (box != referenceBox)
            {
                referenceBox = box;
                uniformsDirty = true;
                if (clipFilter) clipFilter.ClipBox = box;
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

            // The mask layers hang off their own surface rather than the subtree, so they have to be
            // appended by hand -- through a second list, since the List overload clears what it is
            // given. From here on they are watched exactly like everything else.
            if (maskBox)
            {
                maskBox.GetComponentsInChildren(true, maskGraphics);
                graphics.AddRange(maskGraphics);
            }

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
                PrepareClip();
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

            var margins = new Vector4(mLeft, mRight, mBottom, mTop);
            RenderMask(pxWidth, pxHeight, width, height, margins);
            ApplyToComposite(target, margins, width, height);
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

            // How the shader gets from the capture's uv back to the element's own box, which is the
            // space `clip-path` was resolved in.
            clipRegion = new Vector4(width, height, mLeft, mBottom);

            // And how the raycast filter gets there, which is the same trip in points.
            clipFilter.BoxSize = rect.size;
            clipFilter.BoxOffset = new Vector2(mLeft, mBottom);
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

            var hasMask = maskTarget && maskLayers.Count > 0;
            m.SetFloat(MaskEnabledId, hasMask ? 1f : 0f);
            m.SetInt(MaskLuminanceId, maskLuminance ? 1 : 0);
            if (hasMask) m.SetTexture(MaskTexId, maskTarget);

            SetClipUniforms(m);
        }

        /// <summary>
        /// The shape a <c>clip-path</c> resolved to, and how the shader is to read it. Two shapes
        /// arrive as geometry the fragment shader evaluates itself -- a rounded box and an ellipse
        /// are a couple of uniforms each -- and a third as a ring of points it walks.
        /// </summary>
        /// <remarks>
        /// A flattened curve is none of those: the ring is a fixed-size uniform array walked with a
        /// constant-bound loop, which is what keeps the walk inside a fragment shader's register
        /// budget, and one <c>path()</c> segment can be sixty points on its own. Anything past that
        /// budget is rasterized to a coverage mask here and sampled as a texture, so the shader's
        /// cost stops growing with the shape's complexity at exactly the point the uniforms run out.
        /// </remarks>
        void PrepareClip()
        {
            var shape = clipShape ?? ClipPath.None;

            clipKind = ClipKindNone;
            if (shape.Kind == ClipPathKind.None)
            {
                ReleaseClipMask();
                return;
            }

            resolvedClip = shape.Resolve(referenceBox);

            switch (resolvedClip.Form)
            {
                case ClipShapeForm.RoundedBox:
                    clipKind = ClipKindBox;
                    break;

                case ClipShapeForm.Ellipse:
                    clipKind = ClipKindEllipse;
                    break;

                case ClipShapeForm.Contours:
                {
                    var ring = resolvedClip.Ring;
                    if (ring != null && ring.Length - 1 <= ClipPath.MaxUniformPoints) clipKind = ClipKindRing;
                    else if (EnsureClipMask()) clipKind = ClipKindMask;
                    break;
                }
            }

            // A shape that resolved to no geometry -- too few points to enclose anything -- leaves
            // the element alone. Clipping it away entirely is not what a malformed value should do.
            if (clipKind != ClipKindMask) ReleaseClipMask();
        }

        /// <summary>
        /// Rasterizes the contours into a coverage texture over the same region the capture covers,
        /// so the composite samples it with the uv it already has. Only redone when the shape or
        /// that region moves -- flattening and rasterizing are frame-time work, not per-frame work.
        /// </summary>
        bool EnsureClipMask()
        {
            // Nothing to line the mask up with until the first capture has been taken.
            if (!target) return false;

            var width = Mathf.Clamp(target.width, 1, MaxMaskDimension);
            var height = Mathf.Clamp(target.height, 1, MaxMaskDimension);

            if (clipMask && clipMask.width == width && clipMask.height == height &&
                ReferenceEquals(clipMaskKey, resolvedClip.Contours) && clipMaskRegion == clipRegion) return true;

            if (clipRegion.x <= 0 || clipRegion.y <= 0) return false;

            var scale = new Vector2(width / clipRegion.x, height / clipRegion.y);
            var offset = new Vector2(clipRegion.z, clipRegion.w);
            var coverage = ClipPathGeometry.Rasterize(resolvedClip.Contours, resolvedClip.EvenOdd, width, height, scale, offset);

            if (!clipMask || clipMask.width != width || clipMask.height != height)
            {
                ReleaseClipMask();
                // Linear, and one channel: this is coverage rather than colour, so a gamma ramp
                // applied on the way in would bend the antialiased edge.
                clipMask = new Texture2D(width, height, TextureFormat.R8, false, true)
                {
                    filterMode = FilterMode.Bilinear,
                    wrapMode = TextureWrapMode.Clamp,
                };
            }

            clipMask.LoadRawTextureData(coverage);
            clipMask.Apply(false);

            clipMaskKey = resolvedClip.Contours;
            clipMaskRegion = clipRegion;
            return true;
        }

        void ReleaseClipMask()
        {
            if (clipMask) Destroy(clipMask);
            clipMask = null;
            clipMaskKey = null;
        }

        /// <summary>
        /// The prepared shape, in the border box's own points. Kind 0 is written whenever there is
        /// nothing to clip, which the shader takes as its identity -- an element that only isolated
        /// or only blends has to come back out of the capture as the pixels that went in.
        /// </summary>
        void SetClipUniforms(Material m)
        {
            m.SetInt(ClipKindId, clipKind);
            if (clipKind == ClipKindNone) return;

            m.SetVector(ClipRegionId, clipRegion);

            switch (clipKind)
            {
                case ClipKindBox:
                    m.SetVector(ClipBoxId, new Vector4(resolvedClip.Box.xMin, resolvedClip.Box.yMin, resolvedClip.Box.xMax, resolvedClip.Box.yMax));
                    m.SetVector(ClipRadiiXId, resolvedClip.RadiiX);
                    m.SetVector(ClipRadiiYId, resolvedClip.RadiiY);
                    break;

                case ClipKindEllipse:
                    m.SetVector(ClipCircleId, new Vector4(resolvedClip.Center.x, resolvedClip.Center.y, resolvedClip.Radius.x, resolvedClip.Radius.y));
                    break;

                case ClipKindMask:
                    m.SetTexture(ClipMaskTexId, clipMask);
                    break;

                default:
                {
                    var ring = resolvedClip.Ring;
                    for (int i = 0; i < clipPolyBuffer.Length; i++)
                    {
                        var a = 2 * i < ring.Length ? ring[2 * i] : Vector2.zero;
                        var b = 2 * i + 1 < ring.Length ? ring[2 * i + 1] : Vector2.zero;
                        clipPolyBuffer[i] = new Vector4(a.x, a.y, b.x, b.y);
                    }

                    m.SetVectorArray(ClipPolyId, clipPolyBuffer);
                    m.SetInt(ClipPolyCountId, ring.Length);
                    m.SetInt(ClipEvenOddId, resolvedClip.EvenOdd ? 1 : 0);
                    break;
                }
            }
        }

        /// <summary>
        /// The box the shape is measured against, in the border box's own coordinates -- so the
        /// border box is the rect at the origin, a padding or content box sits inside it, and a
        /// margin box reaches past it.
        /// </summary>
        /// <remarks>
        /// Read off the Yoga node rather than the element's own style, which is where the used
        /// values are: a percentage padding has already been resolved against the parent by the
        /// time layout is done, and a border width can have been rounded to fit.
        /// </remarks>
        Rect ReferenceBox()
        {
            var rect = self.rect;
            var box = new Rect(0, 0, rect.width, rect.height);

            var shape = clipShape;
            if (shape == null || shape.Box == ClipGeometryBox.BorderBox) return box;

            var layout = component?.Layout;
            if (layout == null) return box;

            float left, right, top, bottom;

            if (shape.Box == ClipGeometryBox.MarginBox)
            {
                // Outwards: the margin box is the only one of the four bigger than the element.
                left = -Norm(layout.LayoutMarginLeft);
                right = -Norm(layout.LayoutMarginRight);
                top = -Norm(layout.LayoutMarginTop);
                bottom = -Norm(layout.LayoutMarginBottom);
            }
            else
            {
                left = Norm(layout.LayoutBorderLeft);
                right = Norm(layout.LayoutBorderRight);
                top = Norm(layout.LayoutBorderTop);
                bottom = Norm(layout.LayoutBorderBottom);

                if (shape.Box == ClipGeometryBox.ContentBox)
                {
                    left += Norm(layout.LayoutPaddingLeft);
                    right += Norm(layout.LayoutPaddingRight);
                    top += Norm(layout.LayoutPaddingTop);
                    bottom += Norm(layout.LayoutPaddingBottom);
                }
            }

            // CSS's `top` is the box's upper edge, where y grows the other way here.
            var minX = box.xMin + left;
            var maxX = box.xMax - right;
            var minY = box.yMin + bottom;
            var maxY = box.yMax - top;

            return Rect.MinMaxRect(minX, minY, Mathf.Max(minX, maxX), Mathf.Max(minY, maxY));
        }

        /// <summary>Yoga reports an undefined edge as NaN, which would take the whole box with it.</summary>
        static float Norm(float value) => float.IsNaN(value) ? 0f : value;
    }
}
