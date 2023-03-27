import React, { useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
import { currencies as currenciesMockup } from '../../../data/currencies.mockup';
import useModal from '../../../hooks/useModals';
import ModalLayout from '../modals/Layout/ModalLayout';
import PortfolioModal from '../modals/portfolio/Portfolio';
import { prettyNumber } from '../../../utils/prettyNumbers';
const Header = (): JSX.Element => {
  const [currencies]: [ICurrency[], any] = useState(
    currenciesMockup.slice(0, 3),
  );
  const { isOpen, toggle } = useModal();

  return (
    <header className={styles.header}>
      <div className={styles.topCurrencies}>
        {currencies.map((currency) => {
          return (
            <div key={currency.id}>
              <span>{currency.symbol}: </span>
              <span>{prettyNumber(currency.priceUsd, 8)}</span>
            </div>
          );
        })}
      </div>
      <span onClick={toggle} className={styles.portfolio}>
        Portfolio
      </span>
      <ModalLayout isOpen={isOpen} toggle={toggle}>
        <PortfolioModal />
      </ModalLayout>
      <div>
        <span>Current value: </span>
        <span>0 (+0%)</span>
      </div>
    </header>
  );
};

export default Header;
