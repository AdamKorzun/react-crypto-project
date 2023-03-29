import React from 'react';
import type { IPortfolio } from '../types/portfolio';

interface ContextParams {
  portfolio: IPortfolio;
  setPortfolio: (portfolio: IPortfolio) => void;
}
export const PortfolioContext = React.createContext<ContextParams | undefined>(
  undefined,
);
