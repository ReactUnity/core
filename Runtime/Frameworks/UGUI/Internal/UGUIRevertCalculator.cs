using ReactUnity.Styling;
using ReactUnity.Styling.Converters;

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
            {
                var canvas = cmp.Canvas;
                if (canvas) return canvas.sortingOrder;
            }

            if (prop?.name == StyleProperties.sortingLayer.name)
            {
                var canvas = cmp.Canvas;
                if (canvas) return SortingLayerConverter.FromId(canvas.sortingLayerID);
            }

            return null;
        }
    }
}
