using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ImageComponent : UIToolkitComponent<Image>, IGraphicComponent
    {
        public ImageComponent(UIToolkitContext context, string tag) : base(context, tag)
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "source") SetSource(value);
            else base.SetProperty(property, value);
        }

        protected void SetSource(object value)
        {
            if (!AllConverters.SpriteSourceConverter.TryGetConstantValue<SpriteReference>(value, out var source))
                source = SpriteReference.None;
            source.Get(Context, SetSprite);
        }

        protected void SetTexture(Texture2D texture)
        {
            Element.image = texture;
        }

        protected void SetSprite(Sprite sprite)
        {
#if UNITY_2021_1_OR_NEWER
            Element.sprite = sprite;
#else
            Element.image = sprite.texture;
#endif
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            Element.tintColor = ComputedStyle.HasValue(StyleProperties.color)
                ? ComputedStyle.color
                : Color.white;
        }
    }
}
