using System;
using ReactUnity.Helpers;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class SvgImageComponent : BaseImageComponent
    {
#if REACT_VECTOR_GRAPHICS
        public Unity.VectorGraphics.SVGImage Image { get; private set; }
#else
        public UnityEngine.UI.Image Image { get; private set; }
#endif

        public SvgImageComponent(UGUIContext context, string tag = "svgimage") : base(context, tag)
        {
#if REACT_VECTOR_GRAPHICS
            Image = Replaced.CreateGraphic<Unity.VectorGraphics.SVGImage>();
#else
            Image = Replaced.CreateGraphic<UnityEngine.UI.Image>();
            WarningHelpers.WarnOnce("SVG_VECTOR_GRAPHICS", "Unity.VectorGraphics module is required to use SVG components");
#endif
            Replaced.Measurer.Sprite = Image.sprite;
        }

        protected override void SetSource(object value)
        {
            if (!AllConverters.ImageSourceConverter.TryGetConstantValue<ImageReference>(value, out var source))
                source = ImageReference.None;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture2D texture)
        {
            var sprite = texture == null ? null : Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);

            SetSprite(sprite);
        }

        protected void SetSprite(Sprite sprite)
        {
            Image.sprite = sprite;
            Replaced.Measurer.Sprite = sprite;
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "preserveAspect")
            {
                Image.preserveAspect = Convert.ToBoolean(value);
            }
            else
            {
                base.SetProperty(propertyName, value);
            }
        }
    }
}
