export interface ICurrency {
  id: number;
  name: string;
  priceUSD: number;
  change24h: string;
  change1h: string;
  change7d: string;
  marketCap: number;
  volume24h: number;
}
