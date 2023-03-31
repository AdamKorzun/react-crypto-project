import type {
  ICurrenciesRequest,
  ICurrency,
  ICurrencyTimestamp,
} from '../types/currency';

const baseUrl = 'https://api.coincap.io/v2/assets/';

export const fetchCurrencies = async (
  offset = 0,
  limit = 5,
): Promise<ICurrency[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const data = await fetch(`${baseUrl}?${params.toString()}`);
  return ((await data.json()) as ICurrenciesRequest).data;
};

export const fetchCrrency = async (id: string): Promise<ICurrency> => {
  const data = await fetch(`${baseUrl}${id}`);
  if (data.status === 404) {
    throw Error('Currency not found');
  }
  return (await data.json()).data;
};

export const fetchHistoricData = async (
  id: string,
): Promise<ICurrencyTimestamp[]> => {
  const params = new URLSearchParams({
    interval: 'd1',
  });

  const data = await fetch(`${baseUrl}${id}/history?${params.toString()}`);
  return (await data.json()).data;
};

export const fetchSpecificCurrencies = async (
  ids: string[],
): Promise<ICurrency[]> => {
  const params = new URLSearchParams({
    ids: ids.join(','),
  });
  const data = await fetch(`${baseUrl}?${params.toString()}`);
  return (await data.json()).data;
};
