import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';
import lorem from '../lorem';

export function App() {
  return <scroll layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'FlexStart' }}>
    {[lorem, lorem, lorem, lorem, lorem, lorem]}
  </scroll>;
}

export default () => ReactUnity.render(<App />, RootContainer, null);
