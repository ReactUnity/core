import * as React from 'react';
import lorem from '../lorem';

export function App() {
  return <scroll layout={{ Height: '100%', AlignItems: 'Stretch', JustifyContent: 'FlexStart' }}>
    {[lorem, lorem, lorem, lorem, lorem, lorem]}
  </scroll>;
}
