using ReactUnity.Layout;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Components
{

    public class HostComponent : ContainerComponent
    {
        public float Width => RectTransform.rect.width;
        public float Height => RectTransform.rect.height;

        public HostComponent(RectTransform host, UnityUGUIContext context) : base(host)
        {
            Layout.Width = Width;
            Layout.Height = Height;

            var stable = GameObject.AddComponent<ResponsiveElement>();
            stable.Node = Layout;
            stable.Context = context;

            ResolveStyle();
        }
    }
}
