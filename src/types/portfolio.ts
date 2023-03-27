import type { ICurrency } from './currency';

export interface IPortfolio {
  assets: IPortfolioAsset[];
  totalValue: number;
}

export interface IPortfolioAsset {
  currency: ICurrency;
  amount: number;
}
