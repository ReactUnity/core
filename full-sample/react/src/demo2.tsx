import * as React from 'react';
import { ReactUnity, FlexDirection, YogaAlign, YogaJustify, Wrap } from 'react-unity-renderer';

class App extends React.Component<{}, { names: string[], id: number }> {
  onClickHandler = () => {
    this.setState(state => ({
      names: [...state.names, `Element <color=blue>${state.id}</color>`],
      id: state.id + 1,
    }));
  };

  removeIndex = (i: number) => {
    this.setState(state => ({ names: [...state.names.slice(0, i), ...state.names.slice(i + 1)] }));
  };

  constructor(props) {
    super(props);
    this.state = {
      names: [],
      id: 0,
    };
  }

  render() {
    const canAdd = this.state.names.length < 10;

    return <view layout={{ FlexDirection: FlexDirection.Column, Padding: '10%', Height: '100%', AlignItems: YogaAlign.Center, JustifyContent: YogaJustify.FlexStart }}>

      <button onClick={canAdd && this.onClickHandler} style={canAdd || { backgroundColor: ColorNative.red }}>
        {canAdd ? 'Click to Add More' : 'Cannot add anymore'}
      </button>

      <view layout={{ FlexDirection: FlexDirection.Column, AlignItems: YogaAlign.FlexEnd, Padding: 24, Wrap: Wrap.Wrap }}>
        {this.state.names.map((x, i) =>
          <view layout={{ FlexDirection: FlexDirection.Row, Padding: 4, AlignItems: YogaAlign.Center }}>
            {x}
            <button layout={{ MarginLeft: 10 }} style={{ backgroundColor: ColorNative.red, fontColor: ColorNative.white }}
              onClick={() => this.removeIndex(i)}>-</button>
          </view>
        )}
      </view>

    </view>;
  }
}
ReactUnity.render(<App />, RootContainer, null);
