import { render } from '@reactunity/renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { MemoryRouter, useNavigate } from 'react-router';
import styles from './index.module.scss';
import { AppRoutes } from './routes';

const queryClient = new QueryClient();

function App() {
  const nav = useNavigate();

  return (
    <view className={styles.host}>
      <scroll className={styles.sidepanel}>
        <button onClick={() => nav('')}>Home</button>
        <button onClick={() => nav('material')}>Material</button>
        <button onClick={() => nav('animations')}>Animations</button>
        <button onClick={() => nav('images')}>Images</button>
        <button onClick={() => nav('bg-patterns')}>Background Patterns</button>
        <button onClick={() => nav('svgs')}>SVGs</button>
        <button onClick={() => nav('style-frameworks/jss')}>Style Frameworks</button>
        <button onClick={() => nav('interop')}>Interop</button>
        <button onClick={() => nav('todo')}>Todo App Example</button>
        <button onClick={() => nav('query')}>Tanstack Query</button>
        <button onClick={() => nav('redux')}>Redux</button>
        <button onClick={() => nav('style-playground')}>Style Playground</button>
      </scroll>

      <scroll className={styles.scroll}>
        <view className={styles.content}>
          <AppRoutes />
        </view>
      </scroll>
    </view>
  );
}

render(
  <Suspense fallback={<view>Loading</view>}>
    <MemoryRouter
      initialEntries={[`/${global.location.hash.replace(/^#/, '')}`]}
      initialIndex={0}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  </Suspense>,
);
