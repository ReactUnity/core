using UnityEngine;

namespace ReactUnity.UGUI
{

    public class ContainerComponent : ReactComponent, IContainerComponent
    {
        protected ContainerComponent(RectTransform existing, UGUIContext context, string tag = "") : base(existing, context, tag)
        {
        }

        public ContainerComponent(UGUIContext context, string tag) : base(context, tag)
        {
        }
    }
}