export interface ICurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  supply: number;
  maxSupply: number | null;
  priceUsd: number;
  vwap24Hr: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  changePercent24Hr: number;
}
