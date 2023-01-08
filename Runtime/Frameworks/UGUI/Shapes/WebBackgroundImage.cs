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
                material = definition?.DefaultMaterial;
                SetMaterialDirty();
            }
        }


        public ReactContext Context;

        [SerializeField]
        private BackgroundBlendMode BlendMode;

        [SerializeField]
        private BackgroundSize backgroundSize = BackgroundSize.Auto;
        public BackgroundSize BackgroundSize
        {
            get => backgroundSize;
            set
            {
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


        public void SetBackgroundColorAndImage(Color tint, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            BlendMode = blendMode;
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

        private void UpdateBlendMode()
        {
            color = BlendMode == BackgroundBlendMode.Normal && sprite != null ? Color.white : TintColor;
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
