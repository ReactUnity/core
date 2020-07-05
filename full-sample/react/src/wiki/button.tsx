import * as React from 'react';

export function App() {
  return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>
    <button onClick={() => console.log('Clicked')}>
      Click me!
    </button>
  </view>;
}
