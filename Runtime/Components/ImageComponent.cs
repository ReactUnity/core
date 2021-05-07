using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class ImageComponent : BaseImageComponent
    {
        public Image Image { get; private set; }

        public override MaskableGraphic Graphic => Image;

        public ImageComponent(UGUIContext context, string tag = "image") : base(context, tag)
        {
            Image = ImageContainer.AddComponent<Image>();
            Measurer.Sprite = Image.sprite;
        }

        protected override void SetSource(object value)
        {
            var source = ConverterMap.ImageReferenceConverter.Convert(value) as ImageReference;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture2D texture)
        {
            var sprite = texture == null ? null : Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);

            Image.sprite = sprite;
            Measurer.Sprite = sprite;
        }
    }
}
