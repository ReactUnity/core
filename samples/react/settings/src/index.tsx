import '@reactunity/material/styles';
import { Renderer } from '@reactunity/renderer';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import './index.scss';
import { MainMenu } from './menu';
import { Settings } from './settings';

function App() {
  return <MemoryRouter>
    This sample is a work-in-progress. View other samples instead.

    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/settings/*" element={<Settings />} />
    </Routes>
  </MemoryRouter>;
}

Renderer.render(<App />);
