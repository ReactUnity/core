using Facebook.Yoga;
using UnityEngine;

namespace ReactUnity.Layout
{
    public class ResponsiveElement : MonoBehaviour
    {
        private float PreviousWidth = -1;
        private float PreviousHeight = -1;
        private RectTransform rt;

        public YogaNode Node;
        public UnityUGUIContext Context;

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
            PreviousWidth = rt.rect.width;
            PreviousHeight = rt.rect.height;
        }

        // Update is called once per frame
        void Update()
        {
            var width = rt.rect.width;
            var height = rt.rect.height;

            if (width != PreviousWidth || height != PreviousHeight)
            {
                Node.Width = width;
                Node.Height = height;
                Context.scheduleLayout();
                PreviousWidth = width;
                PreviousHeight = height;
            }
        }
    }
}
