import * as ReactUnityMaterialModule from '@reactunity/material';
import * as ReactUnityModule from '@reactunity/renderer';
import * as ReactUnityWebGLCompat from '@reactunity/renderer/webgl-compat';
import * as React from 'react';

const ReactUnity = ReactUnityModule;
const Material = ReactUnityMaterialModule;
const MaterialStyles = () => require('@reactunity/material/styles');

/*INJECTABLE_START*/

void ReactUnityWebGLCompat;

function App() {
  React.useEffect(() => MaterialStyles());

  return <Material.Card />;
}

ReactUnity.render(<App />);

/*INJECTABLE_END*/
