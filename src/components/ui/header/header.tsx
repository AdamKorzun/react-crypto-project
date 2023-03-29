import React, { useEffect, useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
import useModal from '../../../hooks/useModals';
import ModalLayout from '../modals/Layout/ModalLayout';
import PortfolioModal from '../modals/portfolio/Portfolio';
import { prettyNumber } from '../../../utils/prettyNumbers';
import {
  fetchCurrencies,
  fetchSpecificCurrencies,
} from '../../../services/currency';
import usePortfolio from '../../../hooks/usePortfolio';
import type { IPortfolio, IPortfolioAsset } from '../../../types/portfolio';
const Header = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<ICurrency[]>();
  const { isOpen, toggle } = useModal();
  const [portfolio, , removeAsset] = usePortfolio();
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    fetchCurrencies(0, 3).then(setCurrencies).catch(console.error);
  }, []);

  useEffect(() => {
    fetchSpecificCurrencies(portfolio.assets.map((asset) => asset.currency.id))
      .then((cur) => {
        setPortfolioValue(getCurrentPortfolioValue(cur));
      })
      .catch(console.error);
  }, [portfolio]);

  function getCurrentPortfolioValue(currencies: ICurrency[]): number {
    let totalValue = 0;
    portfolio.assets.forEach((asset) => {
      const currency: ICurrency | undefined = currencies.find(
        (currency) => currency.id === asset.currency.id,
      );
      if (typeof currency !== 'undefined') {
        totalValue += Number(currency.priceUsd) * asset.amount;
      }
    });
    return totalValue;
  }

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

      <svg
        onClick={toggle}
        className={styles.portfolio}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="white"
      >
        <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
      </svg>
      <ModalLayout isOpen={isOpen} toggle={toggle}>
        <PortfolioModal
          portfolio={uniquePortfolio(portfolio)}
          onClick={removeAsset}
        />
      </ModalLayout>
      <div className={styles.portfolioValues}>
        <span>Current value: {prettyNumber(portfolioValue)}</span>
        <span>
          Change: {prettyNumber(portfolioValue)} (
          {prettyNumber(
            (portfolioValue - portfolio.totalValue) / portfolioValue,
          )}
          )%
        </span>
      </div>
    </header>
  );
};

export default Header;
