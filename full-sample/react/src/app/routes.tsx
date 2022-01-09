import { Route, Routes } from "react-router";
import AnimationsPage from "src/pages/animations";
import BgPatternsPage from "src/pages/bg-patterns";
import HomePage from "src/pages/home";
import ImagesPage from "src/pages/images";
import MaterialPage from "src/pages/material";

export function AppRoutes() {
  return <Routes>
    <Route path={''} element={<HomePage />} />
    <Route path={'material'} element={<MaterialPage />} />
    <Route path={'animations'} element={<AnimationsPage />} />
    <Route path={'images'} element={<ImagesPage />} />
    <Route path={'bg-patterns'} element={<BgPatternsPage />} />
  </Routes>;
}
