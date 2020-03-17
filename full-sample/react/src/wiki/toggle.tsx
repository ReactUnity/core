import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center', FlexDirection: 'Row' }}>

        <toggle />
        Toggle me!

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
