import * as React from 'react';
import { ReactUnity, Button, NativeInstance } from '@reactunity/renderer';
import { RefAttributes } from 'react';


// Add strong typing for customButton component
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      customButton: Button & RefAttributes<NativeInstance> & { children?: any };
    }
  }
}


class App extends React.Component<{}, {}> {
  onInputChange = (val: string) => {
    Globals.CubeMove["Speed"] = parseFloat(val) || 0;
  };

  render() {
    const ElementName: string = 'customButton';

    return (
      <view style={{ height: '100%', alignItems: 'Center', justifyContent: 'Center' }}>

        <button style={{ marginBottom: 20, fontColor: 'white' }}>
          Normal Button
        </button>

        {/* Recommended - Strong typed */}
        <customButton style={{ marginBottom: 20, fontColor: 'white' }}>
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
ReactUnity.render(<App />);
