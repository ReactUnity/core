import * as React from 'react';
import { ReactUnity, FlexDirection, Wrap, YogaAlign } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <scroll layout={{ FlexDirection: FlexDirection.Column, Wrap: Wrap.Wrap, AlignItems: YogaAlign.FlexStart, Padding: 40, PaddingRight: 0 }}>
      <text layout={{ MaxWidth: 300, MarginRight: 40, FlexShrink: 1, FlexGrow: 1, FlexBasis: YogaValueNative.Percent(60) }} style={{ textOverflow: 'Linked' }}
      >{`Go to ${`<color=red>app.tsx</color>`} to edit this file`}</text>
    </scroll>;
  }
}
ReactUnity.render(<App />, RootContainer, null);
