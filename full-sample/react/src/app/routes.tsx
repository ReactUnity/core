import React from "react";
import { Route, Routes } from "react-router";
import AnimationsPage from "src/pages/animations";
import BgPatternsPage from "src/pages/bg-patterns";
import HomePage from "src/pages/home";
import ImagesPage from "src/pages/images";
import MaterialPage from "src/pages/material";

const Lazy = React.lazy(() => import('src/pages/lazy').then(x => ({ default: x.Lazy })));

export function AppRoutes() {
  return <Routes>
    <Route path={''} element={<HomePage />} />
    <Route path={'material'} element={<MaterialPage />} />
    <Route path={'animations'} element={<AnimationsPage />} />
    <Route path={'images'} element={<ImagesPage />} />
    <Route path={'bg-patterns'} element={<BgPatternsPage />} />
    <Route path={'lazy'} element={<Lazy />} />
  </Routes>;
}
