import React from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import CurrencyPage from './pages/currency';
import Home from './pages/Home';
import Layout from './pages/layout/Layout';

function App(): JSX.Element {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/currency/:id" element={<CurrencyPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
