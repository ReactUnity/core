import * as React from 'react';
import { ReactUnity, Button, NativeInstance } from '@reactunity/renderer';


// Add strong typing for customButton component
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
    const ElementName: string = 'customButton';

    return (
      <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <button layout={{ MarginBottom: 20 }} style={{ fontColor: 'white' }}>
          Normal Button
        </button>

        {/* Recommended - Strong typed */}
        <customButton layout={{ MarginBottom: 20 }} style={{ fontColor: 'white' }}>
          Custom Button
        </customButton>

        {/* Not Recommended - Not strong typed */}
        <ElementName style={{ fontColor: 'white' }}>
          Custom Button - Value Based
        </ElementName>

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
