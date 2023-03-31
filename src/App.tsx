import React, { useState } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { PortfolioContext } from './context/PortfolioContext';
import CurrencyPage from './pages/currency';
import Home from './pages/Home';
import Layout from './pages/layout/Layout';
import type { IPortfolio } from './types/portfolio';

function App(): JSX.Element {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/currency/:id" element={<CurrencyPage />} />
      </Route>,
    ),
  );
  const storagePortfolio = JSON.parse(
    String(localStorage.getItem('portfolio')),
  ) ?? { assets: [], totalValue: 0 };

  const [portfolio, setPortfolio] = useState<IPortfolio>(storagePortfolio);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <RouterProvider router={router} />
    </PortfolioContext.Provider>
  );
}

export default App;
