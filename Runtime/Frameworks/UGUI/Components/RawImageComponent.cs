using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class RawImageComponent : BaseImageComponent
    {
        public RawImage Image { get; private set; }

        public RawImageComponent(UGUIContext context, string tag = "rawimage") : base(context, tag)
        {
            Image = Replaced.CreateGraphic<RawImage>();
            Replaced.Measurer.Texture = Image.texture;
        }

        protected override void SetSource(object value)
        {
            if (!AllConverters.ImageSourceConverter.TryGetConstantValue<ImageReference>(value, out var source))
                source = ImageReference.None;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture texture)
        {
            Image.texture = texture;
            Replaced.Measurer.Texture = texture;
        }
    }
}
