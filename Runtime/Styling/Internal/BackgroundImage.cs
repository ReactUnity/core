using System.Runtime.CompilerServices;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class BackgroundImage : RawImage
    {
        public static readonly int SizeProp = Shader.PropertyToID("_size");
        public static readonly int PosProp = Shader.PropertyToID("_pos");

        public Vector4 Size;

        public ImageDefinition definition;
        public ImageDefinition Definition
        {
            get => definition;
            set
            {
                definition = value;
                SetMaterialDirty();
            }
        }


        public ReactContext Context;
        private BackgroundBlendMode BlendMode;

        public YogaValue2 backgroundSize = YogaValue2.Full;
        public YogaValue2 BackgroundSize
        {
            get => backgroundSize;
            set
            {
                backgroundSize = value;
                RefreshSize();
                SetMaterialDirty();
            }
        }

        public YogaValue2 backgroundPosition = YogaValue2.Zero;
        public YogaValue2 BackgroundPosition
        {
            get => backgroundPosition;
            set
            {
                backgroundPosition = value;
                SetMaterialDirty();
            }
        }

        private Color TintColor;


        protected override void OnEnable()
        {
            base.OnEnable();
            raycastTarget = false;
            material = GetDefaultMaterial();
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public virtual Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.BackgroundImageMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material result = base.materialForRendering;

                var sz = StylingUtils.GetRatioValue(backgroundSize, Size, 1, false);
                var ps = StylingUtils.GetRatioValue(backgroundPosition, Size, 0, false);
                result.SetVector(SizeProp, sz);
                result.SetVector(PosProp, ps);

                var pointSz = StylingUtils.GetPointValue(backgroundSize, Size, Size, false);
                Definition?.ModifyMaterial(Context, result, pointSz);
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
            var rect = ((RectTransform) transform).rect;
            Size = new Vector4(rect.width, rect.height, 0, 0);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);

            if (Definition != null && Definition.SizeUpdatesGraphic) UpdateImage();
        }


        public void SetBackgroundColorAndImage(Color tint, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            BlendMode = blendMode;
            TintColor = tint;
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.None)
                {
                    texture = null;
                    color = Color.clear;
                    UpdateImage();
                }
                else
                {
                    texture = null;
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
                var sz = StylingUtils.GetPointValue(backgroundSize, Size, Size, false);

                image.GetTexture(Context, sz, (sp) => {
                    if (image != Definition) return;
                    texture = sp;
                    UpdateBlendMode();
                });
            }
        }

        private void UpdateBlendMode()
        {
            color = BlendMode == BackgroundBlendMode.Normal && texture != null ? Color.white : TintColor;
        }
    }
}
