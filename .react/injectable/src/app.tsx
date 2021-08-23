import * as ReactUnityMaterialModule from '@reactunity/material/all';
import * as ReactUnityModule from '@reactunity/renderer';
import * as React from 'react';

const ReactUnity = ReactUnityModule;
const Material = ReactUnityMaterialModule;

/*INJECTABLE_START*/

function App() {
  return <Material.Card />;
}

ReactUnity.Renderer.render(<App />);

/*INJECTABLE_END*/
