import { Renderer } from '@reactunity/renderer';
import { Suspense } from 'react';
import { MemoryRouter, useNavigate } from 'react-router';
import styles from './index.module.scss';
import { AppRoutes } from './routes';

function App() {
  const nav = useNavigate();

  return <view className={styles.host}>
    <scroll className={styles.sidepanel}>
      <button onClick={() => nav('')}>Home</button>
      <button onClick={() => nav('material')}>Material</button>
      <button onClick={() => nav('animations')}>Animations</button>
      <button onClick={() => nav('images')}>Images</button>
      <button onClick={() => nav('bg-patterns')}>Background Patterns</button>
      <button onClick={() => nav('svgs')}>SVGs</button>
      <button onClick={() => nav('style-frameworks/jss')}>Style Frameworks</button>
      <button onClick={() => nav('interop')}>Interop</button>
    </scroll>

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
