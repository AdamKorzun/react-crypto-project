import React, { useEffect, useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
import useModal from '../../../hooks/useModals';
import ModalLayout from '../modals/Layout/ModalLayout';
import PortfolioModal from '../modals/portfolio/Portfolio';
import { prettyNumber } from '../../../utils/prettyNumbers';
import { fetchCurrencies } from '../../../services/currency';
const Header = (): JSX.Element => {
  const [currencies, setCurrencies]: [ICurrency[] | undefined, any] =
    useState();
  const { isOpen, toggle } = useModal();
  useEffect(() => {
    fetchCurrencies(0, 3)
      .then((fetchedCurrencies) => {
        setCurrencies(fetchedCurrencies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.topCurrencies}>
        {currencies !== undefined ? (
          currencies.map((currency) => {
            return (
              <div key={currency.id}>
                <span>{currency.symbol}: </span>
                <span>{prettyNumber(Number(currency.priceUsd), 8)}</span>
              </div>
            );
          })
        ) : (
          <></>
        )}
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
