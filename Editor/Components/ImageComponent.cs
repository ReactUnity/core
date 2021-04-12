using ReactUnity.Editor.Renderer;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ImageComponent : EditorComponent<Image>
    {
        public ImageComponent(EditorContext context, string tag) : base(context, tag)
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "source") SetSource(value);
            else base.SetProperty(property, value);
        }

        protected void SetSource(object value)
        {
            var source = ParserMap.ImageReferenceConverter.Convert(value) as ImageReference;
            source.Get(Context, SetTexture);
        }

        protected void SetTexture(Texture2D texture)
        {
            Element.image = texture;
        }
    }
}
