import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <image source={NamedAssets.delete} />

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
