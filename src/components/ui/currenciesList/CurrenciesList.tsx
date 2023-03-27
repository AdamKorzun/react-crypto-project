import React, { useState } from 'react';
import { currencies as currencyMockup } from '../../../data/currencies.mockup';
import styles from './CurrenciesList.module.scss';
import type { ICurrency } from '../../../types/currency';
import CurrencyRow from '../currencyRow/CurrencyRow';
const CurrenciesList = (): JSX.Element => {
  const [currencies]: [ICurrency[], any] = useState(currencyMockup);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Supply</th>
          <th>Market Cap</th>
          <th>Volume 24h</th>
        </tr>
      </thead>
      <tbody>
        {currencies.map((currency) => (
          <CurrencyRow key={currency.id} currency={currency} />
        ))}
      </tbody>
    </table>
  );
};

export default CurrenciesList;
