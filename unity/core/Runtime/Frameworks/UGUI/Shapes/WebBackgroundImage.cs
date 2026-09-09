using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBackgroundImage : Image, Internal.IBackdropReader
    {
        static readonly int BackdropTexId = Shader.PropertyToID("_ReactUnityBackdrop");
        static readonly int BackdropBoundId = Shader.PropertyToID("_ReactUnityBackdropBound");

        private RectTransform rt;

        public Vector2 Size => new Vector2(rt.rect.width, rt.rect.height);

        private ImageDefinition definition;
        public ImageDefinition Definition
        {
            get => definition;
            set
            {
                definition = value;
                RefreshMaterial();
            }
        }


        public ReactContext Context;

        private bool pixelated;

        /// <summary>
        /// <c>image-rendering: pixelated</c> for this layer. A blending layer and a gradient both
        /// bring a material of their own, so they keep it -- and a gradient is generated at the
        /// size it is drawn at anyway, with nothing to snap to.
        /// </summary>
        public bool Pixelated
        {
            get => pixelated;
            set
            {
                if (pixelated == value) return;
                pixelated = value;
                RefreshMaterial();
            }
        }

        [SerializeField]
        private BackgroundBlendMode BlendMode;

        // Set on every layer but the bottom one: its backdrop is the layers below rather than the
        // flat background colour, which only the shader that reads the render target can see.
        [SerializeField]
        private bool BlendsWithStack;

        [SerializeField]
        private BackgroundSize backgroundSize = BackgroundSize.Auto;
        public BackgroundSize BackgroundSize
        {
            get => backgroundSize;
            set
            {
                // Applying a style re-assigns this whether or not it moved, and every frame while
                // an animation runs -- so without the guard a rebuild is queued for nothing.
                if (backgroundSize == value) return;
                backgroundSize = value;
                RefreshSize();
            }
        }

        [SerializeField]
        public YogaValue2 BackgroundPosition = YogaValue2.Zero;
        [SerializeField]
        public BackgroundRepeat BackgroundRepeatX;
        [SerializeField]
        public BackgroundRepeat BackgroundRepeatY;

        private Color TintColor;

        private ImageDefinition.ResolvedImage resolved = ImageDefinition.ResolvedImage.Default;
        private ImageDefinition.ResolvedImage Resolved
        {
            get => resolved;
            set
            {
                if (resolved != value)
                {
                    resolved = value;
                    sprite = value?.Sprite;
                    type = sprite == null || sprite.border == Vector4.zero ? Type.Simple : Type.Sliced;
                    UpdateBlendMode();
                }
            }
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            rt = GetComponent<RectTransform>();
            raycastTarget = false;
            SyncRegistration();
        }

        protected override void OnDisable()
        {
            base.OnDisable();
            SyncRegistration();
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            if (surface && registered) surface.Unregister(this);
            registered = false;
            if (instanceMaterial) DestroyImmediate(instanceMaterial);
            instanceMaterial = null;
            instanceBase = null;
        }

        public override Material materialForRendering
        {
            get
            {
                var baseMat = base.materialForRendering;

                if (Definition != null && !Definition.DoesNotModifyMaterial)
                {
                    var szPoint = ImageUtils.CalculateImageSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
                    baseMat = Definition.ModifyMaterial(Context, baseMat, szPoint);
                }

                if (!registered) return baseMat;

                // Everything above shares its materials -- the blend materials by mode, the gradient
                // ones by gradient -- and a backdrop cannot be shared, so a reader gets a copy. A new
                // base material also means a mask above us changed, and ours has to be rebuilt on it.
                if (!instanceMaterial || instanceBase != baseMat)
                {
                    if (instanceMaterial) DestroyImmediate(instanceMaterial);
                    instanceMaterial = new Material(baseMat);
                    instanceBase = baseMat;
                    ApplyBackdrop(instanceMaterial);
                }

                return instanceMaterial;
            }
        }

        protected override void OnRectTransformDimensionsChange()
        {
            base.OnRectTransformDimensionsChange();
            RefreshSize();
        }

        private void RefreshSize()
        {
            SetMaterialDirty();
            SetVerticesDirty();

            if (Definition != null && Definition.SizeUpdatesGraphic) UpdateImage();
        }


        public void SetBackgroundColorAndImage(Color tint, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal, bool blendsWithStack = false)
        {
            var modeChanged = BlendMode != blendMode || BlendsWithStack != blendsWithStack;
            BlendMode = blendMode;
            BlendsWithStack = blendsWithStack;
            TintColor = tint;
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.NoImage)
                {
                    sprite = null;
                    color = Color.clear;
                    UpdateImage();
                }
                else
                {
                    sprite = null;
                    color = tint;
                }
            }
            else
            {
                if (modeChanged) RefreshMaterial();
                UpdateBlendMode();
            }
        }

        private void UpdateImage()
        {
            var image = Definition;

            if (image != null)
            {
                var sz = backgroundSize.Value.GetPointValue(Size, Size, false);

                image.ResolveImage(Context, sz, (sp) => {
                    if (image != Definition) return;
                    Resolved = sp;
                });
            }
        }

        private bool Blends => BlendMode != BackgroundBlendMode.Normal && sprite != null;

        private void UpdateBlendMode()
        {
            // A blending layer's vertex colour is not a tint: it carries the backdrop the shader
            // blends against, which for the bottom layer is the background colour. A layer that
            // reads the stack finds its backdrop there instead and wants nothing from here.
            color = !Blends ? (sprite != null ? Color.white : TintColor)
                : BlendsWithStack ? Color.white
                : TintColor;

            // UGUI drops a mesh whose vertex colour is fully transparent, which is exactly what a
            // layer blending against no background colour carries -- and it is data here, not
            // opacity, so the layer still has to draw.
            if (canvasRenderer) canvasRenderer.cullTransparentMesh = !Blends;

            SyncRegistration();
        }

        /// <summary>
        /// A blending layer draws with a shader that knows how, and every other layer keeps the
        /// material its image asked for -- so `background-blend-mode: normal` costs nothing.
        /// </summary>
        private void RefreshMaterial()
        {
            var own = definition?.DefaultMaterial;

            material = BlendMode != BackgroundBlendMode.Normal
                ? ResourcesHelper.GetBackgroundBlendMaterial((int) BlendMode, BlendsWithStack)
                : pixelated && own == null ? ResourcesHelper.PixelatedImageMaterial
                : own;
            SetMaterialDirty();
        }

        #region Backdrop

        private Internal.BackdropSurface surface;
        private Texture backdrop;
        private bool registered;

        // One material per layer, because the blend materials are shared by mode and the backdrop
        // is not: two elements stacking the same blend get different layers below them. Built only
        // for a layer that actually reads one, so every other layer keeps the shared material.
        private Material instanceMaterial;
        private Material instanceBase;

        /// <summary>Where this layer's backdrop is rendered when the pipeline cannot grab one.
        /// Null on built-in, whose GrabPass copies the capture this layer is drawn into.</summary>
        public Internal.BackdropSurface Surface
        {
            get => surface;
            set
            {
                if (surface == value) return;
                if (surface && registered) surface.Unregister(this);
                registered = false;
                surface = value;
                SyncRegistration();
            }
        }

        public CanvasRenderer BackdropRenderer => canvasRenderer;

        public void SetBackdrop(Texture value)
        {
            backdrop = value;
            // Pushed straight onto the live material: materialForRendering is only consulted when
            // UGUI rebuilds the graphic, which is not every frame, and this changes every frame.
            if (instanceMaterial) ApplyBackdrop(instanceMaterial);
        }

        void ApplyBackdrop(Material mat)
        {
            mat.SetTexture(BackdropTexId, backdrop);
            mat.SetFloat(BackdropBoundId, backdrop ? 1 : 0);
        }

        /// <summary>Only a layer blending against the layers below it has a backdrop to render --
        /// every other one is handed its backdrop as a colour, or does not blend at all.</summary>
        void SyncRegistration()
        {
            var wanted = surface && Blends && BlendsWithStack && isActiveAndEnabled;
            if (wanted == registered) return;

            registered = wanted;

            if (wanted) surface.Register(this);
            else
            {
                surface.Unregister(this);
                // Nothing reads it now, and the shared material it was copied from is what this
                // layer goes back to drawing with.
                if (instanceMaterial) DestroyImmediate(instanceMaterial);
                instanceMaterial = null;
                instanceBase = null;
            }
        }

        #endregion

#if UNITY_EDITOR
        protected override void OnValidate()
        {
            base.OnValidate();
            RefreshSize();
        }
#endif

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var size = RectTransformUtility.PixelAdjustRect(rectTransform, canvas).size;
            var offset = -size * rectTransform.pivot;

            var szPoint = ImageUtils.CalculateImageSize(size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
            var psPoint = BackgroundPosition.GetPointValue(size - szPoint, 0, true);

            ImageUtils.CreateTiledImageMesh(vh, szPoint, psPoint, size, offset, BackgroundRepeatX, BackgroundRepeatY, color, new Rect(0, 0, 1, 1));
        }
    }
}
