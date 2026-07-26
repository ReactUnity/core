using Yoga;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.Measurers
{
    /// <summary>Watches the size of a RectTransform and alerts the layout node when it changes.</summary>
    [DefaultExecutionOrder(-8)]
    public class IntrinsicMeasurer : UIBehaviour
    {
        public YogaNode Layout;
        private RectTransform rt;


        protected override void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        protected override void Start()
        {
            if (Layout == null) enabled = false;
        }

        protected override void OnRectTransformDimensionsChange()
        {
            Layout?.MarkDirty();
        }

        public YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            if (!rt) return new YogaSize { width = 0, height = 0 };

            return new YogaSize
            {
                width = rt.rect.width,
                height = rt.rect.height,
            };
        }

        public static YogaSize NoopMeasure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            return new YogaSize { width = 0, height = 0 };
        }
    }

}
