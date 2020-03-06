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

        public HostComponent(RectTransform host, UnityUGUIContext context) : base(host, context)
        {
            Layout.Width = Width;
            Layout.Height = Height;

            var responsive = GameObject.GetComponent<ResponsiveElement>() ?? GameObject.AddComponent<ResponsiveElement>();
            responsive.Layout = Layout;
            responsive.Context = context;

            ResolveStyle();
        }

        public override void ApplyStyles()
        {
        }
    }
}
