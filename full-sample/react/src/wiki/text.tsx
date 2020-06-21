import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

export function App() {
  return <text>Hello world!</text>;
}

export default () => ReactUnity.render(<App />, RootContainer, null);
