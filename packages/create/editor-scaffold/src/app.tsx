import * as React from 'react';
import { Renderer } from '@reactunity/renderer/editor';
import './index.css';

function App() {
  return <view>
    <text>Go to app.tsx to edit this file</text>
  </view>;
}

Renderer.render(<App />, RootContainer, null);
