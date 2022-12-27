using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
    public class UGUIRevertCalculator : IRevertCalculator
    {
        UGUIComponent cmp;

        public UGUIRevertCalculator(UGUIComponent cmp)
        {
            this.cmp = cmp;
        }

        public object GetRevertValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            if (prop?.name == StyleProperties.zIndex.name)
                return cmp.Canvas?.sortingOrder;

            if (prop?.name == StyleProperties.sortingLayer.name)
            {
                if (cmp.Canvas) return SortingLayerConverter.FromIndex(SortingLayer.GetLayerValueFromID(cmp.Canvas.sortingLayerID));
            }

            return null;
        }
    }
}
