import type { IPortfolio } from '../types/portfolio';
import { currencies } from './currencies.mockup';
export const portfolio: IPortfolio = {
  assets: currencies.map((cur) => {
    return { currency: cur, amount: 1 };
  }),
  totalValue: 0,
};
