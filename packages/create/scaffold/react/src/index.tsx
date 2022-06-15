import { Renderer } from '@reactunity/renderer';
import './index.scss';

function App() {
  return <scroll>
    <text>{`Go to <color=red>src/index.tsx</color> to edit this file`}</text>
  </scroll>;
}

Renderer.render(<App />);
