export interface ICurrency {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  supply: string;
  maxSupply: string | null;
  vwap24Hr: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  explorer?: string;
}

export interface ICurrenciesRequest {
  data: ICurrency[];
  timestamp: number;
}

export interface ICurrencyTimestamp {
  priceUsd: string;
  time: number;
}

export interface IHistoricDataRequest {
  data: ICurrencyTimestamp[];
  timestamp: number;
}
