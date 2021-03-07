import { Renderer } from '@reactunity/renderer/editor';
import { useEffect, useState } from 'react';
import './index.module.scss';

export function App() {
  const [ct, setCt] = useState(0);

  const a = 5;

  useEffect(() => {
    setInterval(() => setCt(x => x + 1), 1000);
  }, [setCt]);

  const ongui = () => {
    if (UnityEngine.GUILayout.Button("I am a button", UnityEngine.GUILayout.Width(150))) {
      console.log("You clicked the button!");
    }


    const startPoint = new UnityEngine.Vector3(-0.0, 0.0, 0.0);
    const endPoint = new UnityEngine.Vector3(50.0, 50.0, 0.0);

    UnityEditor.Handles.color = UnityEngine.Color.black;

    UnityEditor.Handles.DrawLine(startPoint, endPoint, 5);
  };

  return <view style={{ flexGrow: 1 }}>

    <toolbar>
      <tb-button>Button</tb-button>

      <tb-popupsearch></tb-popupsearch>

      <tb-toggle>Toggle</tb-toggle>

      <tb-breadcrumbs>My bread crumbs</tb-breadcrumbs>
    </toolbar>

    Hello world

    <view onClick={() => console.log('Clickff')} onContextClick={() => console.log('Context click')}
      onFocus={() => console.log('Selected')} onBlur={() => console.log('Deselected')} focusable>
      My name is {ct}
      A good framework
    </view>

    <imgui onGUI={ongui} />
  </view>;
};

Renderer.render(<App />);
