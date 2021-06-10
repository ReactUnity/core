using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class ImageMeasurer : MonoBehaviour, ILayoutSelfController
    {
        public YogaNode Layout;
        public UGUIContext Context;

        private ObjectFit fitMode;
        public ObjectFit FitMode
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

        private void Start()
        {
            if (Layout == null) DestroyImmediate(this);
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
            if (Layout?.Parent != null) Layout.MarkDirty();
            Context?.ScheduleLayout();
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

            // ObjectFit.None
            var rw = ow;
            var rh = oh;

            if (fitMode == ObjectFit.Cover)
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
            else if (fitMode == ObjectFit.ScaleDown)
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
            else if (fitMode == ObjectFit.Fill)
            {
                rw = width;
                rh = height;
            }
            else if (fitMode == ObjectFit.Contain)
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


            // TODO: Verify this logic
            // If a dimension is NaN, that means the layout does not care when that dimension is.
            // In that case, we can show the most suitable size,
            // Which is the up/down scaled version of original image with same aspect ratio

            var wnan = float.IsNaN(rw);
            var hnan = float.IsNaN(rh);

            if (wnan && hnan)
            {
                rw = ow;
                rh = ow;
            }
            else if (hnan)
            {
                rh = rw * oh / ow;
            }
            else if (wnan)
            {
                rw = rh * ow / oh;
            }


            return new YogaSize
            {
                width = Mathf.Ceil(rw),
                height = Mathf.Ceil(rh),
            };
        }
    }
}
