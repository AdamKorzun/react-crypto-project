import type { ICurrency } from '../types/currency';

export const currencies: ICurrency[] = [
  {
    id: 1,
    name: 'Bitcoin',
    priceUSD: 38436,
    change24h: 'string',
    change1h: 'string',
    change7d: 'string',
    marketCap: 1,
    volume24h: 1,
  },
  {
    id: 2,
    name: 'Ethereum',
    priceUSD: 2300,
    change24h: 'string',
    change1h: 'string',
    change7d: 'string',
    marketCap: 1,
    volume24h: 1,
  },
  {
    id: 3,
    name: 'Tether',
    priceUSD: 1,
    change24h: 'string',
    change1h: 'string',
    change7d: 'string',
    marketCap: 1,
    volume24h: 1,
  },
];
