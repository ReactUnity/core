using UnityEngine;

namespace ReactUnity.UGUI
{
    public class BaseRenderTextureComponent : RawImageComponent
    {
        public RenderTexture RenderTexture { get; }

        public BaseRenderTextureComponent(UGUIContext context, string tag) : base(context, tag)
        {
            RenderTexture = new RenderTexture(1, 1, 1);
            SetTexture(RenderTexture);
        }
    }
}
