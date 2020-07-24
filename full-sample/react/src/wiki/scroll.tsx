import * as React from 'react';
import lorem from '../assets/lorem';

export function App() {
  return <scroll layout={{ Height: '100%', AlignItems: 'Stretch', JustifyContent: 'FlexStart', Padding: 16, PaddingRight: 25, BorderWidth: 1 }}>
    {[lorem, lorem, lorem]}
  </scroll>;
}
