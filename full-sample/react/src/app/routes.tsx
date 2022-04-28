import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import AnimationsPage from "src/pages/animations";
import BgPatternsPage from "src/pages/bg-patterns";
import HomePage from "src/pages/home";
import ImagesPage from "src/pages/images";
import MaterialPage from "src/pages/material";

const Lazy = React.lazy(() =>
  new Promise<any>((resolve) =>
    // Delay loading by 2 seconds
    setTimeout(() => import('src/pages/lazy').then(x => ({ default: x.Lazy })).then(resolve), 2000)));

const TailwindPage = React.lazy(() => import('src/pages/tailwind'));

export function AppRoutes() {
  return <Routes>
    <Route path={''} element={<HomePage />} />
    <Route path={'material'} element={<MaterialPage />} />
    <Route path={'animations'} element={<AnimationsPage />} />
    <Route path={'images'} element={<ImagesPage />} />
    <Route path={'bg-patterns'} element={<BgPatternsPage />} />

    <Route path={'lazy'} element={
      <Suspense fallback={<>
        Loading
      </>}>
        <Lazy />
      </Suspense>
    } />

    <Route path={'tailwind'} element={<TailwindPage />} />
  </Routes>;
}
