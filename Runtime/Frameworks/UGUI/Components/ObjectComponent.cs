using System;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ObjectComponent : BaseRenderTextureComponent
    {
        Camera currentCamera;
        GameObject targetObject;
        bool shouldRender;

        public ObjectComponent(UGUIContext context) : base(context, "object")
        {
        }

        void SetCamera(Camera camera)
        {
            if (currentCamera == camera) return;

            if (currentCamera)
            {
                FireEvent("onUnmount", currentCamera);
                currentCamera = null;
            }

            currentCamera = camera;

            if (currentCamera)
            {
                FireEvent("onMount", currentCamera);
            }
        }

        void SetTarget(GameObject obj)
        {
            targetObject = obj;
            shouldRender = targetObject != null;
        }

        public override void Update()
        {
            base.Update();
            if (shouldRender) RenderObject();
        }

        void RenderObject()
        {
            if (!currentCamera || !targetObject) return;

            var pt = currentCamera.targetTexture;
            var en = currentCamera.enabled;

            var renderers = targetObject.GetComponentsInChildren<Renderer>();
            var len = renderers.Length;
            var states = new bool[len];
            for (int i = 0; i < len; i++)
            {
                var renderer = renderers[i];
                states[i] = renderer.enabled;
                renderer.enabled = true;
            }

            currentCamera.targetTexture = RenderTexture;
            currentCamera.enabled = true;
            currentCamera.Render();

            for (int i = 0; i < len; i++)
                renderers[i].enabled = states[i];

            currentCamera.targetTexture = pt;
            currentCamera.enabled = en;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "camera":
                    SetCamera(UnityHelpers.ConvertToComponent<Camera>(value));
                    break;
                case "target":
                    SetTarget(value as GameObject);
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
            throw new Exception($"source property cannot be set on an object component");
        }
    }
}
