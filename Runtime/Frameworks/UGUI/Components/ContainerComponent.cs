using UnityEngine;

namespace ReactUnity.UGUI
{

    public class ContainerComponent : UGUIComponent, IContainerComponent
    {
        protected ContainerComponent(RectTransform existing, UGUIContext context, string tag = "") : base(existing, context, tag)
        {
        }

        public ContainerComponent(UGUIContext context, string tag) : base(context, tag)
        {
        }
    }
}
