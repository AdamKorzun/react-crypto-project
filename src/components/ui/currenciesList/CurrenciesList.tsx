import React, { useState } from 'react';
import { currencies as currencyMockup } from '../../../data/currencies.mockup';
import styles from './CurrenciesList.module.scss';
import type { ICurreny } from '../../../types/currency';
import CurrencyRow from '../currencyRow/CurrencyRow';
const CurrenciesList = (): JSX.Element => {
  const [currencies]: [ICurreny[], any] = useState(currencyMockup);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Change 1h</th>
          <th>Change 24h</th>
          <th>Change 7d</th>
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
