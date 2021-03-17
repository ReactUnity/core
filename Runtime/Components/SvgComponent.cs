using ReactUnity.Styling;
using ReactUnity.Types;
using System;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class SvgComponent : BaseImageComponent
    {
#if REACT_VECTOR_GRAPHICS
        public Unity.VectorGraphics.SVGImage Image { get; private set; }
#else
        public Image Image { get; private set; }
#endif

        public override MaskableGraphic Graphic => Image;

        public SvgComponent(UGUIContext context, string tag = "svg") : base(context, tag)
        {
#if REACT_VECTOR_GRAPHICS
            Image = ImageContainer.AddComponent<Unity.VectorGraphics.SVGImage>();
            Measurer.Sprite = Image.sprite;
#else
            Debug.LogWarning("Unity.VectorGraphics module is required to use SVG components");
#endif
        }

        protected override void SetSource(object value)
        {
            var source = ParserMap.ImageReferenceConverter.Convert(value) as ImageReference;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture2D texture)
        {
            var sprite = texture == null ? null : Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);

            Image.sprite = sprite;
            Measurer.Sprite = sprite;
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
