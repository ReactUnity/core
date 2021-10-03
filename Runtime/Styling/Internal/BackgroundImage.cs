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
        private PointerEvents PointerEvents;
        private BackgroundBlendMode BlendMode;

        private Color Color
        {
            set
            {
                color = value;
                raycastTarget = color.a > 0 || PointerEvents == PointerEvents.All;
            }
        }

        public YogaValue2 backgroundSize = YogaValue2.Full;
        public YogaValue2 BackgroundSize
        {
            get => backgroundSize;
            set
            {
                backgroundSize = value;
                var sz = StylingUtils.GetRatioValue(value, Size, 1, false);
                uvRect = new Rect(uvRect.position, sz);
            }
        }

        public YogaValue2 backgroundPosition = YogaValue2.Zero;
        public YogaValue2 BackgroundPosition
        {
            get => backgroundPosition;
            set
            {
                backgroundPosition = value;
                var ps = StylingUtils.GetRatioValue(value, Size, 0, false);
                uvRect = new Rect(ps, uvRect.size);
            }
        }


        protected override void OnEnable()
        {
            base.OnEnable();
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
                result.SetVector(ShaderHelpers.SizeProp, Size);
                Definition?.ModifyMaterial(Context, result, Size);
                return result;
            }
        }

        protected override void OnRectTransformDimensionsChange()
        {
            base.OnRectTransformDimensionsChange();
            RefreshSize();
        }

#if UNITY_EDITOR
        protected override void OnValidate()
        {
            base.OnValidate();
            RefreshSize();
        }
#endif

        private void RefreshSize()
        {
            var rect = ((RectTransform) transform).rect;
            Size = new Vector4(rect.width, rect.height, 0, 0);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);


            var image = Definition;

            if (image != null && image.SizeUpdatesGraphic)
            {
                image.GetTexture(Context, Size, (sp) => {
                    if (image != Definition) return;
                    Color = BlendMode == BackgroundBlendMode.Normal && sp != null ? Color.white : color;
                    texture = sp;
                });
            }

            var ps = StylingUtils.GetRatioValue(backgroundPosition, Size, 0, false);
            var sz = StylingUtils.GetRatioValue(backgroundSize, Size, 1, false);
            uvRect = new Rect(ps, sz);
        }


        public void SetBackgroundColorAndImage(Color color, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            BlendMode = blendMode;
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.None)
                {
                    texture = null;
                    Color = Color.clear;
                    image.GetTexture(Context, Size, (sp) => {
                        if (image != Definition) return;
                        Color = blendMode == BackgroundBlendMode.Normal && sp != null ? Color.white : color;
                        texture = sp;
                    });
                }
                else
                {
                    texture = null;
                    Color = color;
                }
            }
            else
            {
                Color = blendMode == BackgroundBlendMode.Normal && texture != null ? Color.white : color;
            }
        }

        public void SetPointerEvents(PointerEvents pointerEvents)
        {
            PointerEvents = pointerEvents;
            raycastTarget = color.a > 0 || PointerEvents == PointerEvents.All;
        }
    }
}
