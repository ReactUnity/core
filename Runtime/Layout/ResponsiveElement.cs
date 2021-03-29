using Facebook.Yoga;
using UnityEngine;

namespace ReactUnity.Layout
{
    public class ResponsiveElement : MonoBehaviour
    {
        private float PreviousWidth = -1;
        private float PreviousHeight = -1;
        private RectTransform rt;

        public YogaNode Layout;
        public UGUIContext Context;

        void OnEnable()
        {
            rt = GetComponent<RectTransform>();
            PreviousWidth = rt.rect.width;
            PreviousHeight = rt.rect.height;
        }


        void Update()
        {
            var width = rt.rect.width;
            var height = rt.rect.height;

            if (width != PreviousWidth || height != PreviousHeight)
            {
                Layout.Width = width;
                Layout.Height = height;
                Context.ScheduleLayout();
                PreviousWidth = width;
                PreviousHeight = height;
            }
        }
    }
}
