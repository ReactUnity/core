import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <input placeholder="Write something!" style={{ backgroundColor: 'aqua' }}/>

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
