import { Renderer } from '@reactunity/renderer';
import * as React from 'react';
import './index.scss';

function App() {
  return <scroll>
    <text>{`Go to <color=red>app.tsx</color> to edit this file`}</text>
  </scroll>;
}

Renderer.render(<App />);
