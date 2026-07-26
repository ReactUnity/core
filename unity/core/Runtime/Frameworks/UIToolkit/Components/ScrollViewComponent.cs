using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ScrollViewComponent : UIToolkitComponent<ScrollView>
    {
        public override float ScrollWidth => Element.contentRect.width;
        public override float ScrollHeight => Element.contentRect.height;

        public override float ScrollLeft
        {
            get => Element.scrollOffset.x;
            set => Element.scrollOffset = new Vector2(value, Element.scrollOffset.y);
        }

        public override float ScrollTop
        {
            get => Element.scrollOffset.y;
            set => Element.scrollOffset = new Vector2(Element.scrollOffset.x, value);
        }

#if UNITY_2021_2_OR_NEWER
        private ScrollerVisibility horizontalScrollerVisibility = ScrollerVisibility.Auto;
        private ScrollerVisibility verticalScrollerVisibility = ScrollerVisibility.Auto;
#endif

        public ScrollViewComponent(UIToolkitContext context, string tag = "scroll") : base(context, tag)
        {
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "elasticity":
#if UNITY_2020_1_OR_NEWER
                    var el = AllConverters.FloatConverter.TryGetConstantValue(value, 0f);
                    Element.touchScrollBehavior = el > 0 ? ScrollView.TouchScrollBehavior.Elastic : ScrollView.TouchScrollBehavior.Clamped;
                    Element.elasticity = el;
#endif
                    break;
                case "smoothness":
#if UNITY_2020_1_OR_NEWER
                    var sm = AllConverters.FloatConverter.TryGetConstantValue(value, 0.12f);
                    Element.scrollDecelerationRate = sm > 0 ? sm : 0;
#endif
                    break;
                case "direction":
#if UNITY_2021_2_OR_NEWER
                    var dir = AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.Both);
                    Element.horizontalScrollerVisibility =
                        dir.HasFlag(ScrollDirection.Horizontal) ? horizontalScrollerVisibility : ScrollerVisibility.Hidden;
                    Element.verticalScrollerVisibility =
                        dir.HasFlag(ScrollDirection.Vertical) ? verticalScrollerVisibility : ScrollerVisibility.Hidden;

                    Element.mode = dir == ScrollDirection.Both ? ScrollViewMode.VerticalAndHorizontal :
                        dir == ScrollDirection.Horizontal ? ScrollViewMode.Horizontal : ScrollViewMode.Vertical;
#else
                    var dir = AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.Both);
                    Element.showHorizontal = dir.HasFlag(ScrollDirection.Horizontal);
                    Element.showVertical = dir.HasFlag(ScrollDirection.Vertical);
#endif
                    break;
                case "alwaysShow":
#if UNITY_2021_2_OR_NEWER
                    var dir2 = AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.None);
                    Element.horizontalScrollerVisibility = horizontalScrollerVisibility =
                        dir2.HasFlag(ScrollDirection.Horizontal) ? ScrollerVisibility.AlwaysVisible : ScrollerVisibility.Auto;
                    Element.verticalScrollerVisibility = verticalScrollerVisibility =
                        dir2.HasFlag(ScrollDirection.Vertical) ? ScrollerVisibility.AlwaysVisible : ScrollerVisibility.Auto;
#endif
                    break;
                case "sensitivity":
                    var fl = AllConverters.FloatConverter.TryGetConstantValue(value, 50f);
                    Element.horizontalPageSize = Element.verticalPageSize = fl;
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        public void ScrollTo(float? left = null, float? top = null, float? smoothness = null) =>
            Element.scrollOffset = new Vector2(left ?? Element.scrollOffset.x, top ?? Element.scrollOffset.y);
        public void ScrollBy(float? left = null, float? top = null, float? smoothness = null) =>
            Element.scrollOffset = new Vector2((left ?? 0) + Element.scrollOffset.x, (top ?? 0) + Element.scrollOffset.y);

    }
}
