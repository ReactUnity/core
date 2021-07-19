using System;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ObjectComponent : BaseRenderTextureComponent
    {
        Camera currentCamera;
        GameObject targetObject;
        bool shouldRender;

        Callback onMount;
        Callback onUnmount;

        public ObjectComponent(UGUIContext context) : base(context, "object")
        {
        }

        void SetCamera(Camera camera)
        {
            if (currentCamera == camera) return;

            if (currentCamera)
            {
                onUnmount?.Call(currentCamera, this);
                currentCamera = null;
            }

            currentCamera = camera;

            if (currentCamera)
            {
                onMount?.Call(currentCamera, this);
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
            throw new Exception($"source property cannot be set on an object component");
        }
    }
}
