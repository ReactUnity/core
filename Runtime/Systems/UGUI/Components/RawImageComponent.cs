using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class RawImageComponent : BaseImageComponent
    {
        public RawImage Image { get; private set; }

        public override MaskableGraphic Graphic => Image;

        public RawImageComponent(UGUIContext context, string tag = "rawimage") : base(context, tag)
        {
            Image = ImageContainer.AddComponent<RawImage>();
            Measurer.Texture = Image.texture;
        }

        protected override void SetSource(object value)
        {
            var source = Converters.ImageReferenceConverter.Convert(value) as ImageReference;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture texture)
        {
            Image.texture = texture;
            Measurer.Texture = texture;
        }
    }
}
