using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBackgroundImage : Image
    {
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
        }

        public override Material materialForRendering
        {
            get
            {
                var baseMat = base.materialForRendering;
                if (Definition == null || Definition.DoesNotModifyMaterial) return baseMat;

                var szPoint = ImageUtils.CalculateImageSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);

                var result = Definition?.ModifyMaterial(Context, baseMat, szPoint);

                return result;
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
        }

        /// <summary>
        /// A blending layer draws with a shader that knows how, and every other layer keeps the
        /// material its image asked for -- so `background-blend-mode: normal` costs nothing.
        /// </summary>
        private void RefreshMaterial()
        {
            material = BlendMode == BackgroundBlendMode.Normal
                ? definition?.DefaultMaterial
                : ResourcesHelper.GetBackgroundBlendMaterial((int) BlendMode, BlendsWithStack);
            SetMaterialDirty();
        }

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
