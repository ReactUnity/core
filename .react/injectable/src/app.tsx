import * as ReactUnityMaterialModule from '@reactunity/material/all';
import * as ReactUnityModule from '@reactunity/renderer';
import * as React from 'react';

const react = globalThis.react = globalThis.React = React;
const ReactUnity = globalThis.ReactUnity = ReactUnityModule;
const Material = globalThis.Material = ReactUnityMaterialModule;
const MaterialStyles = () => require('@reactunity/material/styles');

/*INJECTABLE_START*/

function App() {
  React.useEffect(() => MaterialStyles());

  return <Material.Card />;
}

ReactUnity.Renderer.render(<App />);

/*INJECTABLE_END*/
