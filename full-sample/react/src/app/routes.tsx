import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import AnimationsPage from "src/pages/animations";
import BgPatternsPage from "src/pages/bg-patterns";
import HomePage from "src/pages/home";
import ImagesPage from "src/pages/images";
import InteropPage from "src/pages/interop";
import MaterialPage from "src/pages/material";
import StyleFrameworksPage from "src/pages/style-frameworks";
import BootstrapPage from "src/pages/style-frameworks/bootstrap";
import EmotionPage from "src/pages/style-frameworks/emotion";
import JSSPage from "src/pages/style-frameworks/jss";
import StyledComponentsPage from "src/pages/style-frameworks/styled-components";
import SvgsPage from "src/pages/svgs";
import TodoPage from "src/pages/todo";

const TailwindPage = React.lazy(() => import('src/pages/style-frameworks/tailwind'));

export function AppRoutes() {
  return <Routes>
    <Route path={''} element={<HomePage />} />
    <Route path={'material'} element={<MaterialPage />} />
    <Route path={'animations'} element={<AnimationsPage />} />
    <Route path={'images'} element={<ImagesPage />} />
    <Route path={'bg-patterns'} element={<BgPatternsPage />} />
    <Route path={'svgs'} element={<SvgsPage />} />
    <Route path={'interop'} element={<InteropPage />} />
    <Route path={'todo'} element={<TodoPage />} />

    <Route path={'style-frameworks'} element={< StyleFrameworksPage />}>
      <Route path={'jss'} element={<JSSPage />} />
      <Route path={'styled-components'} element={<StyledComponentsPage />} />
      <Route path={'emotion'} element={<EmotionPage />} />
      <Route path={'bootstrap'} element={<BootstrapPage />} />
      <Route path={'tailwind'} element={
        <Suspense fallback={<>Loading</>}><TailwindPage /></Suspense>} />
    </Route >
  </Routes >;
}
