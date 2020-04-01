import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <text>Hello world!</text>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
