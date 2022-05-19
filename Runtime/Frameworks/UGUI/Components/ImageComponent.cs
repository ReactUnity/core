using System;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class ImageComponent : BaseImageComponent
    {
        public Image Image { get; private set; }

        public ImageComponent(UGUIContext context, string tag = "image") : base(context, tag)
        {
            Image = Replaced.CreateGraphic<Image>();
            Image.preserveAspect = true;
            Replaced.Measurer.Sprite = Image.sprite;
        }

        protected override void SetSource(object value)
        {
            if (!AllConverters.ImageSourceConverter.TryGetConstantValue<ImageReference>(value, out var source))
                source = ImageReference.None;
            source?.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture2D texture)
        {
            var sprite = texture == null ? null : Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);

            SetSprite(sprite);
        }

        protected void SetSprite(Sprite sprite)
        {
            if (Image) Image.sprite = sprite;
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
