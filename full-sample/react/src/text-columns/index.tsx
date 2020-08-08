import * as React from 'react';
import { FlexDirection, Wrap, YogaAlign, Layout, PointerEventData, StyleAndLayout, PositionType, CursorType } from '@reactunity/renderer';
import lorem from '../assets/lorem';

export class App extends React.Component<{}, { ratio: number }> {

  scrollLayout: Layout = { FlexDirection: FlexDirection.Column, Wrap: Wrap.Wrap, AlignItems: YogaAlign.FlexStart, Padding: 20, PaddingRight: 0 };

  separatorLayout: StyleAndLayout = {
    layout: { Height: YogaValueNative.Percent(4) },
    style: { backgroundColor: ColorNative.gray, cursor: CursorType.RowResize },
  };

  textProps: StyleAndLayout = {
    layout: { MaxWidth: 300, MarginRight: 40, FlexShrink: 1, FlexGrow: 1, FlexBasis: YogaValueNative.Percent(60) },
    style: { textOverflow: 'Linked' },
  }

  constructor(props) {
    super(props);
    this.state = {
      ratio: 0.5,
    };
  }

  dragSeparator = (ev: PointerEventData) => {
    this.setState(state => ({ ratio: state.ratio - ev.delta.y / 1000 }));
  };

  render() {
    return <>
      <view layout={{ Height: YogaValueNative.Percent(96 * this.state.ratio), PositionType: PositionType.Absolute, Top: 0, Left: 0, Right: 0 }}>
        <scroll layout={this.scrollLayout}>
          <text {...this.textProps}>
            {lorem}
          </text>
        </scroll>
      </view>

      <view layout={{ PositionType: PositionType.Absolute, Top: YogaValueNative.Percent(96 * this.state.ratio), Left: 0, Right: 0 }}>
        <button onDrag={this.dragSeparator} {...this.separatorLayout}></button>
      </view>

      <view layout={{ Height: YogaValueNative.Percent(96 * (1 - this.state.ratio)), PositionType: PositionType.Absolute, Bottom: 0, Left: 0, Right: 0 }}>
        <scroll layout={this.scrollLayout}>
          <text {...this.textProps}>
            {lorem}
          </text>
        </scroll>
      </view>
    </>;
  }
}
