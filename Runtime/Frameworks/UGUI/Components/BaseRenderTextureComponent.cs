using System;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class BaseRenderTextureComponent : RawImageComponent
    {
        private RenderTexture renderTexture { get; set; }
        public RenderTexture RenderTexture
        {
            get => renderTexture;
            protected set
            {
                if (renderTexture != value)
                {
                    if (renderTexture) renderTexture.Release();
                    renderTexture = value;
                    SetTexture(value);
                }
            }
        }

        public int Width
        {
            get => renderTexture?.width ?? 1;
            set
            {
                if (renderTexture && renderTexture.width != value)
                {
                    if (renderTexture.IsCreated())
                        RenderTexture = new RenderTexture(value, renderTexture.height, 1);
                    else renderTexture.width = value;
                }
            }
        }

        public int Height
        {
            get => renderTexture?.height ?? 1;
            set
            {
                if (renderTexture && renderTexture.height != value)
                {
                    if (renderTexture.IsCreated())
                        RenderTexture = new RenderTexture(renderTexture.width, value, 1);
                    else renderTexture.height = value;
                }
            }
        }

        public BaseRenderTextureComponent(UGUIContext context, string tag) : base(context, tag)
        {
            RenderTexture = new RenderTexture(1, 1, 1);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "width":
                    Width = Convert.ToInt32(value);
                    break;
                case "height":
                    Height = Convert.ToInt32(value);
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        public void SetDimensions(int width, int height)
        {
            if (renderTexture && (renderTexture.height != height || renderTexture.width != width))
            {
                if (renderTexture.IsCreated())
                    RenderTexture = new RenderTexture(width, height, 1);
                else
                {
                    renderTexture.width = width;
                    renderTexture.height = height;
                }
            }
        }
    }
}
