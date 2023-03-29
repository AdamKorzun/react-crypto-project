import React, { useEffect, useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
import useModal from '../../../hooks/useModals';
import ModalLayout from '../modals/Layout/ModalLayout';
import PortfolioModal from '../modals/portfolio/Portfolio';
import { prettyNumber } from '../../../utils/prettyNumbers';
import { fetchCurrencies } from '../../../services/currency';
import usePortfolio from '../../../hooks/usePortfolio';
import type { IPortfolio, IPortfolioAsset } from '../../../types/portfolio';
const Header = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<ICurrency[]>();
  const { isOpen, toggle } = useModal();
  const [portfolio, , removeAsset] = usePortfolio();

  useEffect(() => {
    fetchCurrencies(0, 3)
      .then((fetchedCurrencies) => {
        setCurrencies(fetchedCurrencies);
      })
      .catch(console.error);
  }, []);

  function uniquePortfolio(
    portfolio: IPortfolio,
  ): Record<string, IPortfolioAsset> {
    const result: Record<string, IPortfolioAsset> = portfolio.assets.reduce(
      (acc: Record<string, IPortfolioAsset>, obj) => {
        if (obj.currency.id in acc) {
          acc[obj.currency.id].amount += obj.amount;
        } else {
          acc[obj.currency.id] = {
            currency: { ...obj.currency },
            amount: obj.amount,
          };
        }
        return acc;
      },
      {},
    );
    return result;
  }

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
        <PortfolioModal
          portfolio={uniquePortfolio(portfolio)}
          onClick={removeAsset}
        />
      </ModalLayout>
      <div>
        <span>Current value: </span>
        <span>0 (+0%)</span>
      </div>
    </header>
  );
};

export default Header;
