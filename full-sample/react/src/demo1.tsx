import * as React from 'react';
import { FlexDirection, YogaAlign, YogaJustify, Wrap, Dropdown, DropdownItem, Tooltip, ReactUnity } from 'react-unity-renderer';

class App extends React.Component<{}, { names: string[], id: number }> {
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
    return <view layout={{ FlexDirection: FlexDirection.Column, Padding: '10%', Height: '100%', AlignItems: YogaAlign.Center, JustifyContent: YogaJustify.Center }}>
      <view>
        Dropdown example 😂
      </view>

      <Dropdown style={{ backgroundColor: new ColorNative(0.7, 0.3, 0.3) }} layout={{ MarginBottom: 30, Padding: 15 }}>
        <view>Please select</view>

        <DropdownItem value="Hello" triggerTemplate={<view style={{ backgroundColor: ColorNative.green }}>Hello Template</view>}>Hello</DropdownItem>
        <DropdownItem value={{ a: 55 }}>Another</DropdownItem>
        <DropdownItem>GreenOne</DropdownItem>
      </Dropdown>

      <Tooltip layout={{ MarginTop: 60 }} tooltipContent={'Some neat tooltip content'}>
        Hover this to see a neat tooltip
      </Tooltip>
    </view>;
  }
}
ReactUnity.render(<App />, RootContainer, null);
