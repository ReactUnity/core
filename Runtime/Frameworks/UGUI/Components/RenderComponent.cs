using System;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class RenderComponent : BaseRenderTextureComponent
    {
        Camera currentCamera;

        public RenderComponent(UGUIContext context) : base(context, "render")
        {
        }

        void SetCamera(Camera camera)
        {
            if (currentCamera == camera) return;

            if (currentCamera)
            {
                currentCamera.targetTexture = null;
                FireEvent("onUnmount", currentCamera);
                currentCamera = null;
            }

            currentCamera = camera;

            if (currentCamera)
            {
                currentCamera.targetTexture = RenderTexture;
                FireEvent("onMount", currentCamera);
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "camera":
                    SetCamera(UnityHelpers.ConvertToComponent<Camera>(value));
                    break;
                case "width":
                    RenderTexture.width = Convert.ToInt32(value);
                    break;
                case "height":
                    RenderTexture.height = Convert.ToInt32(value);
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        protected override void SetSource(object value)
        {
            throw new Exception($"source property cannot be set on a render component");
        }
    }
}
