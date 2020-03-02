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
            Node.Width = Width;
            Node.Height = Height;

            Flex.enabled = false;
            var stable = GameObject.AddComponent<ResponsiveElement>();
            stable.Node = Node;
            stable.Context = context;

            ResolveStyle();
        }
    }
}
