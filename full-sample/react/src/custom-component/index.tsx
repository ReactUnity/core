import * as React from 'react';
import { ReactUnity, Button, NativeInstance } from 'react-unity-renderer';


declare module 'React' {
  namespace JSX {
    interface IntrinsicElements {
      customButton: Button & RefAttributes<NativeInstance> & { children?: any };
    }
  }
}

class App extends React.Component<{}, {}> {
  onInputChange = (val: string) => {
    NamedAssets.CubeMove["Speed"] = parseFloat(val) || 0;
  };

  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <button layout={{ MarginBottom: 20 }} style={{ fontColor: 'white' }}>
          Normal Button
        </button>

        <customButton style={{ fontColor: 'white' }}>
          Custom Button
        </customButton>

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
