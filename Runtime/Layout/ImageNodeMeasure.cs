using Facebook.Yoga;
using ReactUnity.Components;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class ImageNodeMeasure : MonoBehaviour, ILayoutSelfController
    {
        private Image image;
        private RectTransform rt;

        public YogaNode Layout;
        public ImageComponent Component;
        public UnityUGUIContext Context;

        private void Awake()
        {
            rt = GetComponent<RectTransform>();
            image = GetComponent<Image>();
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Layout.MarkDirty();
            Context.scheduleLayout();
        }

        void ILayoutController.SetLayoutVertical()
        {
            Layout.MarkDirty();
            Context.scheduleLayout();
        }


        public YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            //return new YogaSize() { width = width, height = height };
            var sprite = image.sprite;
            var mode = Component.Fit;
            var ow = sprite.rect.width;
            var oh = sprite.rect.height;

            var rw = ow;
            var rh = oh;

            if (mode == ImageFitMode.CenterCrop)
            {
                if (rw < width)
                {
                    var scale = width / rw;
                    rw = width;
                    rh *= scale;
                }

                if (rh < height)
                {
                    var scale = height / rh;
                    rh = height;
                    rw *= scale;
                }
            }
            else if (mode == ImageFitMode.CenterInside)
            {
                if (rw > width)
                {
                    var scale = width / rw;
                    rw = width;
                    rh *= scale;
                }

                if (rh > height)
                {
                    var scale = height / rh;
                    rh = height;
                    rw *= scale;
                }
            }
            else if (mode == ImageFitMode.Fill)
            {
                rw = width;
                rh = height;
            }
            else if (mode == ImageFitMode.FitCenter || mode == ImageFitMode.FitEnd || mode == ImageFitMode.FitStart)
            {
                if (rw != width)
                {
                    var scale = width / rw;
                    rw = width;
                    rh *= scale;
                }

                if (rh > height)
                {
                    var scale = height / rh;
                    rh = height;
                    rw *= scale;
                }
            }

            return new YogaSize
            {
                width = Mathf.Ceil(rw),
                height = Mathf.Ceil(rh),
            };
        }
    }
}
