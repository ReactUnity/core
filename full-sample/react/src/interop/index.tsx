import * as React from 'react';
import { ReactUnity, ContentType } from '@reactunity/renderer';

class App extends React.Component<{}, {}> {
  onInputChange = (val: string) => {
    Globals.CubeMove["Speed"] = parseFloat(val) || 0;
  };

  render() {
    return (
      <view style={{ height: '100%', alignItems: 'Center', justifyContent: 'Center' }}>

        Cube Speed:

        <input value={Globals.CubeMove["Speed"]} onChange={this.onInputChange} contentType={ContentType.DecimalNumber} />

      </view>
    );
  }
}
ReactUnity.render(<App />);
