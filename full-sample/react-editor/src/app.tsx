import { Renderer } from '@reactunity/renderer/editor';
import { useEffect, useState } from 'react';
import './index.module.scss';

export function App() {
  const [ct, setCt] = useState(0);

  useEffect(() => {
    setInterval(() => setCt(x => x + 1), 1000);
  }, [setCt]);

  return <view style={{ flexGrow: 1 }}>
    Hello world

    <view onClick={() => console.log('Clickff')} onContextClick={() => console.log('Context click')}
      onFocus={() => console.log('Selected')} onBlur={() => console.log('Deselected')} focusable>
      My name is {ct}
      A good framework
    </view>

    <button onClick={() => console.log('heeeeeeey')}>
      Clickable Button
    </button>


    <button onDragEnter={() => console.log('drag')} style={{ flexGrow: 1 }}>
      Drag Ener
    </button>
  </view>;
};

Renderer.render(<App />);
