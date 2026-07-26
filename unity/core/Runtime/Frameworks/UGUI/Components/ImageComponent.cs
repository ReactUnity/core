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
            if (!AllConverters.SpriteSourceConverter.TryGetConstantValue<SpriteReference>(value, out var source))
                source = SpriteReference.None;
            source?.Get(Context, SetSprite);
        }

        protected void SetTexture(Texture2D texture)
        {
            var sprite = SpriteReference.FromTexture(texture);

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
