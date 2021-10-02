using System.Runtime.CompilerServices;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class BackgroundImage : Image
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

        private Color Color
        {
            set
            {
                color = value;
                raycastTarget = color.a > 0 || PointerEvents == PointerEvents.All;
            }
        }



        protected override void OnEnable()
        {
            base.OnEnable();
            type = Type.Sliced;
            pixelsPerUnitMultiplier = 100;
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
                Definition?.ModifyMaterial(Context, result);
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
        }


        public void SetBackgroundColorAndImage(Color color, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.None)
                {
                    sprite = null;
                    Color = Color.clear;
                    image.GetSprite(Context, (sp) => {
                        if (image != Definition) return;
                        Color = blendMode == BackgroundBlendMode.Normal && sp != null ? Color.white : color;
                        sprite = sp;
                    });
                }
                else
                {
                    sprite = null;
                    Color = color;
                }
            }
            else
            {
                Color = blendMode == BackgroundBlendMode.Normal && sprite != null ? Color.white : color;
            }
        }

        public void SetPointerEvents(PointerEvents pointerEvents)
        {
            PointerEvents = pointerEvents;
            raycastTarget = color.a > 0 || PointerEvents == PointerEvents.All;
        }
    }
}
