import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        Hello world!

      </view>
    );
  }
}

export default () => ReactUnity.render(<App />, RootContainer, null);
