import { Renderer } from '@reactunity/renderer';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/demo/store';
import { Redux } from './redux';

function App() {
  const Lazy = React.lazy(() => import('./lazy').then(x => ({ default: x.Lazy })));

  return <MemoryRouter>
    <Routes>
      <Route path="" element={<Root />} />
      <Route path="redux" element={<Redux />} />
      <Route path="lazy" element={<Lazy />} />
    </Routes>

  </MemoryRouter>;
}


function Root() {
  const nav = useNavigate();

  return <>
    <button onClick={() => nav('')}>Root</button>
    <button onClick={() => nav('redux')}>Redux</button>
    <button onClick={() => nav('lazy')}>Lazy</button>
  </>;
}

Renderer.render(
  <Suspense fallback={<view>Loading</view>}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>
);
