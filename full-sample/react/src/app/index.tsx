import { Renderer } from '@reactunity/renderer';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/demo/store';
import styles from './index.module.scss';
import { AppRoutes } from './routes';


function App() {
  const nav = useNavigate();

  return <view className={styles.host}>
    <view className={styles.sidepanel}>
      <button onClick={() => nav('')}>Home</button>
      <button onClick={() => nav('material')}>Material</button>
      <button onClick={() => nav('animations')}>Animations</button>
      <button onClick={() => nav('images')}>Images</button>
      <button onClick={() => nav('bg-patterns')}>Background Patterns</button>
    </view>

    <scroll className={styles.scroll}>
      <view className={styles.content}>
        <AppRoutes />
      </view>
    </scroll>
  </view>;
}

Renderer.render(
  <Suspense fallback={<view>Loading</view>}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MemoryRouter initialEntries={['/' + location.hash.replace(/^#/, '')]} initialIndex={0}>
          <App />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);
