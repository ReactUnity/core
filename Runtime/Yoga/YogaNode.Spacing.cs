/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

namespace Facebook.Yoga
{
    public partial class YogaNode
    {
        public YogaValue Left
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.Left);
            set => SetStylePosition(YogaEdge.Left, value);
        }

        public YogaValue Top
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.Top);
            set => SetStylePosition(YogaEdge.Top, value);
        }

        public YogaValue Right
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.Right);
            set => SetStylePosition(YogaEdge.Right, value);
        }

        public YogaValue Bottom
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.Bottom);
            set => SetStylePosition(YogaEdge.Bottom, value);
        }

        public YogaValue Start
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.Start);
            set => SetStylePosition(YogaEdge.Start, value);
        }

        public YogaValue End
        {
            get => Native.YGNodeStyleGetPosition(_ygNode, YogaEdge.End);
            set => SetStylePosition(YogaEdge.End, value);
        }

        private void SetStylePosition(YogaEdge edge, YogaValue value)
        {
            if (value.Unit == YogaUnit.Percent)
                Native.YGNodeStyleSetPositionPercent(_ygNode, edge, value.Value);
            else
                Native.YGNodeStyleSetPosition(_ygNode, edge, value.Value);
        }

        public YogaValue MarginLeft
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Left);
            set => SetStyleMargin(YogaEdge.Left, value);
        }

        public YogaValue MarginTop
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Top);
            set => SetStyleMargin(YogaEdge.Top, value);
        }

        public YogaValue MarginRight
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Right);
            set => SetStyleMargin(YogaEdge.Right, value);
        }

        public YogaValue MarginBottom
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Bottom);
            set => SetStyleMargin(YogaEdge.Bottom, value);
        }

        public YogaValue MarginStart
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Start);
            set => SetStyleMargin(YogaEdge.Start, value);
        }

        public YogaValue MarginEnd
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.End);
            set => SetStyleMargin(YogaEdge.End, value);
        }

        public YogaValue MarginHorizontal
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Horizontal);
            set => SetStyleMargin(YogaEdge.Horizontal, value);
        }

        public YogaValue MarginVertical
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.Vertical);
            set => SetStyleMargin(YogaEdge.Vertical, value);
        }

        public YogaValue Margin
        {
            get => Native.YGNodeStyleGetMargin(_ygNode, YogaEdge.All);
            set => SetStyleMargin(YogaEdge.All, value);
        }

        private void SetStyleMargin(YogaEdge edge, YogaValue value)
        {
            if (value.Unit == YogaUnit.Percent)
                Native.YGNodeStyleSetMarginPercent(_ygNode, edge, value.Value);
            else if (value.Unit == YogaUnit.Auto)
                Native.YGNodeStyleSetMarginAuto(_ygNode, edge);
            else
                Native.YGNodeStyleSetMargin(_ygNode, edge, value.Value);
        }

        public YogaValue PaddingLeft
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Left);
            set => SetStylePadding(YogaEdge.Left, value);
        }

        public YogaValue PaddingTop
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Top);
            set => SetStylePadding(YogaEdge.Top, value);
        }

        public YogaValue PaddingRight
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Right);
            set => SetStylePadding(YogaEdge.Right, value);
        }

        public YogaValue PaddingBottom
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Bottom);
            set => SetStylePadding(YogaEdge.Bottom, value);
        }

        public YogaValue PaddingStart
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Start);
            set => SetStylePadding(YogaEdge.Start, value);
        }

        public YogaValue PaddingEnd
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.End);
            set => SetStylePadding(YogaEdge.End, value);
        }

        public YogaValue PaddingHorizontal
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Horizontal);
            set => SetStylePadding(YogaEdge.Horizontal, value);
        }

        public YogaValue PaddingVertical
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.Vertical);
            set => SetStylePadding(YogaEdge.Vertical, value);
        }

        public YogaValue Padding
        {
            get => Native.YGNodeStyleGetPadding(_ygNode, YogaEdge.All);
            set => SetStylePadding(YogaEdge.All, value);
        }

        private void SetStylePadding(YogaEdge edge, YogaValue value)
        {
            if (value.Unit == YogaUnit.Percent)
                Native.YGNodeStyleSetPaddingPercent(_ygNode, edge, value.Value);
            else
                Native.YGNodeStyleSetPadding(_ygNode, edge, value.Value);
        }

        public float BorderLeftWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.Left);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.Left, value);
        }

        public float BorderTopWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.Top);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.Top, value);
        }

        public float BorderRightWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.Right);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.Right, value);
        }

        public float BorderBottomWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.Bottom);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.Bottom, value);
        }

        public float BorderStartWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.Start);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.Start, value);
        }

        public float BorderEndWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.End);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.End, value);
        }

        public float BorderWidth
        {
            get => Native.YGNodeStyleGetBorder(_ygNode, YogaEdge.All);
            set => Native.YGNodeStyleSetBorder(_ygNode, YogaEdge.All, value);
        }

        public float LayoutMarginLeft => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.Left);
        public float LayoutMarginTop => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.Top);
        public float LayoutMarginRight => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.Right);
        public float LayoutMarginBottom => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.Bottom);
        public float LayoutMarginStart => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.Start);
        public float LayoutMarginEnd => Native.YGNodeLayoutGetMargin(_ygNode, YogaEdge.End);

        public float LayoutBorderLeft => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.Left);
        public float LayoutBorderTop => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.Top);
        public float LayoutBorderRight => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.Right);
        public float LayoutBorderBottom => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.Bottom);
        public float LayoutBorderStart => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.Start);
        public float LayoutBorderEnd => Native.YGNodeLayoutGetBorder(_ygNode, YogaEdge.End);

        public float LayoutPaddingLeft => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.Left);
        public float LayoutPaddingTop => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.Top);
        public float LayoutPaddingRight => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.Right);
        public float LayoutPaddingBottom => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.Bottom);
        public float LayoutPaddingStart => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.Start);
        public float LayoutPaddingEnd => Native.YGNodeLayoutGetPadding(_ygNode, YogaEdge.End);
    }
}
