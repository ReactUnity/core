import { icon, render } from '@reactunity/renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import { Suspense } from 'react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';
import { AppRoutes } from './routes';

const queryClient = new QueryClient();

/**
 * The sidebar, in the order it is drawn. Icons come from the Material Icons font ReactUnity
 * ships, so a `text-*` utility colours them along with the label -- an SVG icon component
 * would need its colour passed as a prop instead.
 */
const pages = [
  { path: '', label: 'Home', Icon: icon.home },
  { path: 'material', label: 'Material', Icon: icon.widgets },
  { path: 'animations', label: 'Animations', Icon: icon.animation },
  { path: 'scroll-animations', label: 'Scroll Animations', Icon: icon.linear_scale },
  { path: 'images', label: 'Images', Icon: icon.image },
  { path: 'bg-patterns', label: 'Background Patterns', Icon: icon.texture },
  { path: 'svgs', label: 'SVGs', Icon: icon.gesture },
  { path: 'filter', label: 'Filter', Icon: icon.blur_on },
  { path: 'container-queries', label: 'Container Queries', Icon: icon.aspect_ratio },
  { path: 'positioning', label: 'Positioning', Icon: icon.push_pin },
  { path: 'scope', label: 'Scoped Styles', Icon: icon.donut_large },
  { path: 'tailwind', label: 'Tailwind', Icon: icon.style },
  { path: 'interop', label: 'Interop', Icon: icon.settings_ethernet },
  { path: 'todo', label: 'Todo App Example', Icon: icon.checklist },
  { path: 'query', label: 'Tanstack Query', Icon: icon.cloud_download },
  { path: 'redux', label: 'Redux', Icon: icon.storage },
  { path: 'style-playground', label: 'Style Playground', Icon: icon.science },
  { path: 'game', label: 'Game UI', Icon: icon.sports_esports },
];

function NavItem({ path, label, Icon }: (typeof pages)[number]) {
  const nav = useNavigate();
  const active = useLocation().pathname.replace(/^\//, '') === path;

  return (
    <button
      onClick={() => nav(path)}
      // `justify-start text-left` because ReactUnity centres a button's contents, and a nav
      // item wants its icon against the leading edge whatever the label's length.
      className={clsx(
        'flex-row justify-start gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
        active ? 'bg-indigo-500 text-white' : 'bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white',
      )}
    >
      <Icon className={'text-xl'} />
      {label}
    </button>
  );
}

function App() {
  return (
    // Translucent and blurred here rather than on the scroll below, so the Unity scene stays
    // visible behind the UI without a backdrop filter sitting inside a scroll's own clipping.
    <view className={'h-full flex-row items-stretch overflow-hidden bg-white/75 text-slate-900 backdrop-blur-sm'}>
      <scroll className={'w-60 shrink-0 gap-1 bg-slate-800 p-3'}>
        <view className={'mb-3 px-3 pt-2 pb-3 border-b border-slate-700'}>
          <view className={'text-lg font-bold text-white'}>ReactUnity</view>
          <view className={'text-xs text-slate-400'}>Kitchen Sink</view>
        </view>

        {pages.map((page) => (
          <NavItem key={page.path} {...page} />
        ))}
      </scroll>

      <scroll className={'flex-1'}>
        <view className={'mx-auto w-full max-w-4xl shrink-0 items-stretch p-10'}>
          <AppRoutes />
        </view>
      </scroll>
    </view>
  );
}

render(
  <Suspense fallback={<view>Loading</view>}>
    <MemoryRouter initialEntries={[`/${global.location.hash.replace(/^#/, '')}`]} initialIndex={0}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  </Suspense>,
);
