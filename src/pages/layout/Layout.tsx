import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/ui/header/header';
import { PortfolioContext } from '../../context/PortfolioContext';
import type { IPortfolio } from '../../types/portfolio';

const Layout = (): JSX.Element => {
  const storagePortfolio = JSON.parse(
    String(localStorage.getItem('portfolio')),
  ) ?? { assets: [], totalValue: 0 };

  const [portfolio, setPortfolio] = useState<IPortfolio>(storagePortfolio);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <Header />
      <Outlet />
    </PortfolioContext.Provider>
  );
};

export default Layout;
