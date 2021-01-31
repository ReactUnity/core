import * as React from 'react';
import { FlexDirection, Wrap, YogaAlign, PointerEventData, Style, Position, CursorType } from '@reactunity/renderer';
import lorem from '../assets/lorem';

export class App extends React.Component<{}, { ratio: number }> {

  scrollLayout: Style = { flexDirection: FlexDirection.Column, flexWrap: Wrap.Wrap, alignItems: YogaAlign.FlexStart, padding: 20, paddingRight: 0 };

  separatorLayout: Style = {
    height: `${4}%`,
    backgroundColor: 'grey',
    cursor: CursorType.RowResize,
  };

  textProps: Style = {
    maxWidth: 300,
    marginRight: 40,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: `${60}%`,
    textOverflow: 'linked',
  };

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
      <view style={{ height: `${96 * this.state.ratio}%`, position: Position.Absolute, top: 0, left: 0, right: 0 }}>
        <scroll style={this.scrollLayout}>
          <text style={this.textProps}>
            {lorem}
          </text>
        </scroll>
      </view>

      <view style={{ position: Position.Absolute, top: `${96 * this.state.ratio}%`, left: 0, right: 0 }}>
        <button onDrag={this.dragSeparator} style={this.separatorLayout}></button>
      </view>

      <view style={{ height: `${96 * (1 - this.state.ratio)}%`, position: Position.Absolute, bottom: 0, left: 0, right: 0 }}>
        <scroll style={this.scrollLayout}>
          <text style={this.textProps}>
            {lorem}
          </text>
        </scroll>
      </view>
    </>;
  }
}
