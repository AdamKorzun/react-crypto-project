import React, { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Header from './components/ui/header/header';
import { PortfolioContext } from './context/PortfolioContext';
import CurrencyPage from './pages/currency';
import Home from './pages/Home';
import type { IPortfolio } from './types/portfolio';

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
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
      <Header />
      <RouterProvider router={router} />
    </PortfolioContext.Provider>
  );
}

export default App;
