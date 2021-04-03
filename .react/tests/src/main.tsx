import { Renderer } from '@reactunity/renderer/editor';
import * as React from 'react';

export function App() {
  return <text>Hello world</text>;
}

Renderer.render(<App />, RootContainer, null);
