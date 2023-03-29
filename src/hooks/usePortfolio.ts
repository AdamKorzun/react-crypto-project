import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';
import type { IPortfolio, IPortfolioAsset } from '../types/portfolio';

const usePortfolio = (): [
  IPortfolio,
  (asset: IPortfolioAsset) => void,
  (currencyId: string) => void,
] => {
  const context = useContext(PortfolioContext);
  if (typeof context === 'undefined') {
    throw Error('Context was not provided');
  }

  const portfolioKey = 'portfolio';
  const { portfolio, setPortfolio } = context;
  function updatePortfolio(newPortfolio: IPortfolio): void {
    let portfolioSum = 0;
    newPortfolio.assets.forEach((asset) => {
      portfolioSum += asset.amount * Number(asset.currency.priceUsd);
    });
    setPortfolio({ ...newPortfolio, totalValue: portfolioSum });

    localStorage.setItem(
      portfolioKey,
      JSON.stringify({ ...newPortfolio, totalValue: portfolioSum }),
    );
  }

  function addAsset(newAsset: IPortfolioAsset): void {
    updatePortfolio({
      assets: [...portfolio.assets, newAsset],
      totalValue: portfolio.totalValue,
    });
  }

  function removeAsset(currencyId: string): void {
    updatePortfolio({
      assets: [
        ...portfolio.assets.filter((asset) => asset.currency.id !== currencyId),
      ],
      totalValue: portfolio.totalValue,
    });
  }

  return [portfolio, addAsset, removeAsset];
};

export default usePortfolio;
