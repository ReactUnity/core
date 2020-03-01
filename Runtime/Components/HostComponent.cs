using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Components
{

    public class HostComponent : ContainerComponent
    {
        public float Width => RectTransform.rect.width;
        public float Height => RectTransform.rect.height;

        public HostComponent(RectTransform host) : base(host)
        {
            Node.Width = Width;
            Node.Height = Height;

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;

            ResolveStyle();
        }
    }
}
