using Facebook.Yoga;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    public class ResponsiveElement : MonoBehaviour
    {
        private float CurrentWidth = -1;
        private float CurrentHeight = -1;
        private RectTransform rt;

        public YogaNode Layout;
        public UGUIContext Context;

        public void Restart()
        {
            OnEnable();
        }

        void OnEnable()
        {
            rt = GetComponent<RectTransform>();
            if (Context != null)
            {
                CurrentWidth = rt.rect.width;
                CurrentHeight = rt.rect.height;
                Context.MediaProvider.SetDimensions(CurrentWidth, CurrentHeight);
            }
            else
            {
                CurrentWidth = -1;
                CurrentHeight = -1;
            }
        }

        void Update()
        {
            if (Layout == null) return;

            var width = rt.rect.width;
            var height = rt.rect.height;

            if (width != CurrentWidth || height != CurrentHeight)
            {
                CurrentWidth = width;
                CurrentHeight = height;
                Context.MediaProvider.SetDimensions(CurrentWidth, CurrentHeight);
                Layout.Width = width;
                Layout.Height = height;
                Context.ScheduleLayout();
            }
        }
    }
}
