using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using ReactUnity.Visitors;
using ReactUnity.StyleEngine;

namespace ReactUnity.Components
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
