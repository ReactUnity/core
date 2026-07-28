import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import AnimationsPage from '#src/pages/animations/index.tsx';
import BgPatternsPage from '#src/pages/bg-patterns/index.tsx';
import { GamePage } from '#src/pages/game/index.tsx';
import HomePage from '#src/pages/home/index.tsx';
import ImagesPage from '#src/pages/images/index.tsx';
import InteropPage from '#src/pages/interop/index.tsx';
import MaterialPage from '#src/pages/material/index.tsx';
import { QueryPage } from '#src/pages/query/QueryPage.tsx';
import { Redux } from '#src/pages/redux/index.tsx';
import BootstrapPage from '#src/pages/style-frameworks/bootstrap/index.tsx';
import EmotionPage from '#src/pages/style-frameworks/emotion/index.tsx';
import StyleFrameworksPage from '#src/pages/style-frameworks/index.tsx';
import JSSPage from '#src/pages/style-frameworks/jss/index.tsx';
import StyledComponentsPage from '#src/pages/style-frameworks/styled-components/index.tsx';
import { StylePlayground } from '#src/pages/style-playground/StylePlayground.tsx';
import SvgsPage from '#src/pages/svgs/index.tsx';
import TodoPage from '#src/pages/todo/index.jsx';

const TailwindPage = React.lazy(() => import('#src/pages/style-frameworks/tailwind/index.tsx'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path={''} element={<HomePage />} />
      <Route path={'material'} element={<MaterialPage />} />
      <Route path={'animations'} element={<AnimationsPage />} />
      <Route path={'images'} element={<ImagesPage />} />
      <Route path={'bg-patterns'} element={<BgPatternsPage />} />
      <Route path={'svgs'} element={<SvgsPage />} />
      <Route path={'interop'} element={<InteropPage />} />
      <Route path={'todo'} element={<TodoPage />} />
      <Route path={'query'} element={<QueryPage />} />
      <Route path={'redux'} element={<Redux />} />
      <Route path={'style-playground'} element={<StylePlayground />} />
      <Route path={'game'} element={<GamePage />} />

      <Route path={'style-frameworks'} element={<StyleFrameworksPage />}>
        <Route path={'jss'} element={<JSSPage />} />
        <Route path={'styled-components'} element={<StyledComponentsPage />} />
        <Route path={'emotion'} element={<EmotionPage />} />
        <Route path={'bootstrap'} element={<BootstrapPage />} />
        <Route
          path={'tailwind'}
          element={
            <Suspense fallback={<>Loading</>}>
              <TailwindPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
