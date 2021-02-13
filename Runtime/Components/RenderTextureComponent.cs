using UnityEngine;

namespace ReactUnity.Components
{
    public class RenderTextureComponent : RawImageComponent
    {
        public RenderTexture RenderTexture;

        public RenderTextureComponent(UGUIContext context, string tag = "render") : base(context, tag)
        {
            RenderTexture = new RenderTexture(1, 1, 1);
            SetTexture(RenderTexture);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    throw new System.Exception($"Unknown property name specified, '{propertyName}'");
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
