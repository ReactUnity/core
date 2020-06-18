import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <text>Hello world!</text>
    );
  }
}

export default () => ReactUnity.render(<App />, RootContainer, null);
