using Facebook.Yoga;
using ReactUnity.Components;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class ImageMeasurer : MonoBehaviour, ILayoutSelfController
    {
        public YogaNode Layout;
        public UGUIContext Context;

        private ImageFitMode fitMode;
        public ImageFitMode FitMode
        {
            get => fitMode;
            set
            {
                fitMode = value;
                MarkDirty();
            }
        }

        private Sprite sprite;
        public Sprite Sprite
        {
            get => sprite;
            set
            {
                sprite = value;
                MarkDirty();
            }
        }

        private Texture texture;
        public Texture Texture
        {
            get => texture;
            set
            {
                texture = value;
                MarkDirty();
            }
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            MarkDirty();
        }

        void ILayoutController.SetLayoutVertical()
        {
            MarkDirty();
        }

        public void MarkDirty()
        {
            if(Layout.Parent != null) Layout.MarkDirty();
            Context.scheduleLayout();
        }


        public YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            float ow = 0;
            float oh = 0;
            if (sprite != null)
            {
                ow = sprite.rect.width;
                oh = sprite.rect.height;
            }
            else if (texture != null)
            {
                ow = texture.width;
                oh = texture.height;
            }


            var rw = ow;
            var rh = oh;

            if (fitMode == ImageFitMode.CenterCrop)
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
            else if (fitMode == ImageFitMode.CenterInside)
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
            else if (fitMode == ImageFitMode.Fill)
            {
                rw = width;
                rh = height;
            }
            else if (fitMode == ImageFitMode.FitCenter || fitMode == ImageFitMode.FitEnd || fitMode == ImageFitMode.FitStart)
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
