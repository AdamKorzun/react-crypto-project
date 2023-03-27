import React, { useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
const Header = (): JSX.Element => {
  const [currencies]: [ICurrency[], any] = useState([]);
  return (
    <header className={styles.header}>
      <div className={styles.topCurrencies}>
        {currencies.map((currency) => {
          return <div key={currency.id}> </div>;
        })}
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <span className={styles.portfolio}>Portfolio</span>
      <div>Current value</div>
    </header>
  );
};

export default Header;
