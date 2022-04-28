import { Renderer } from '@reactunity/renderer';
import React, { Suspense } from 'react';
import { MemoryRouter, useNavigate } from 'react-router';
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
      <button onClick={() => nav('lazy')}>Lazy loading</button>
      <button onClick={() => nav('tailwind')}>Tailwind</button>
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
    <MemoryRouter initialEntries={['/' + global.location.hash.replace(/^#/, '')]} initialIndex={0}>
      <App />
    </MemoryRouter>
  </Suspense>
);
