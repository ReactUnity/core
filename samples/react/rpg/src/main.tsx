import * as React from 'react';
import { Renderer } from '@reactunity/renderer';
import './index.scss';
import { Inventory } from './inventory';

function App() {
  return <view>
    <Inventory />
  </view>;
}

Renderer.render(<App />, RootContainer, null);
