import { Renderer } from '@reactunity/renderer/editor';
import { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './main';
import { store, persistor } from './store';
import { Provider } from 'react-redux';

Renderer.render(
  <Suspense fallback={<view>Loading</view>}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>
);


(module as any)?.hot?.accept();
