using ReactUnity.Interop;
using System;
using UnityEngine;

namespace ReactUnity.Components
{
    public class RenderComponent : BaseRenderTextureComponent
    {
        Camera currentCamera;

        Callback onMount;
        Callback onUnmount;

        public RenderComponent(UGUIContext context) : base(context, "render")
        {
        }

        void SetCamera(Camera camera)
        {
            if (currentCamera == camera) return;

            if (currentCamera)
            {
                currentCamera.targetTexture = null;
                onUnmount?.Call(currentCamera, this);
                currentCamera = null;
            }

            currentCamera = camera;

            if (currentCamera)
            {
                currentCamera.targetTexture = RenderTexture;
                onMount?.Call(currentCamera, this);
            }
        }

        Camera FindCamera(object value)
        {
            if (value is Camera c) return c;
            if (value is GameObject g) return g.GetComponent<Camera>();
            return null;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "camera":
                    SetCamera(FindCamera(value));
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

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onMount":
                    onMount = callback;
                    return;
                case "onUnmount":
                    onUnmount = callback;
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }

        protected override void SetSource(object value)
        {
            throw new System.Exception($"source property cannot be set on a render component");
        }
    }
}
