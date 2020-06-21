import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';

export function App() {
  return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>
    <image source={NamedAssets.delete} />
  </view>;
}

export default () => ReactUnity.render(<App />, RootContainer, null);
