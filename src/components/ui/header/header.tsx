import React, { useEffect, useState } from 'react';
import type { ICurrency } from '../../../types/currency';
import styles from './Header.module.scss';
import useModal from '../../../hooks/useModals';
import ModalLayout from '../modals/Layout/ModalLayout';
import PortfolioModal from '../modals/portfolio/Portfolio';
import { prettifyNumber } from '../../../utils/prettifyNumbers';
import {
  fetchCurrencies,
  fetchSpecificCurrencies,
} from '../../../services/currency';
import usePortfolio from '../../../hooks/usePortfolio';
import type { IPortfolio, IPortfolioAsset } from '../../../types/portfolio';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<ICurrency[]>();
  const { isOpen, toggle } = useModal();
  const [portfolio, , removeAsset] = usePortfolio();
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    fetchCurrencies(0, 3)
      .then(setCurrencies)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchSpecificCurrencies(portfolio.assets.map((asset) => asset.currency.id))
      .then((cur) => {
        setPortfolioValue(getCurrentPortfolioValue(cur));
      })
      .catch(() => {});
  }, [portfolio]);

  function getCurrentPortfolioValue(currencies: ICurrency[]): number {
    let totalValue = 0;
    portfolio.assets.forEach((asset) => {
      const currency: ICurrency | undefined = currencies.find(
        (currency) => currency.id === asset.currency.id,
      );
      totalValue += Number(currency?.priceUsd) * asset.amount;
    });
    return totalValue;
  }

  function getUniquePortfolio(
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
    <header className={styles.header} data-testid='header'>
      <div className={styles.topCurrencies} data-testid='top-currencies'>
        {currencies?.map((currency) => {
          return (
            <div key={currency.id} data-testid='top-currency'>
              <span>{currency.symbol}: </span>
              <span>{prettifyNumber(Number(currency.priceUsd), 8)}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.navigationMenu}>
        <Link to='/' className={styles.iconHome}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
            fill='white'
          >
            <path d='M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z' />
          </svg>
        </Link>

        <svg
          onClick={toggle}
          className={styles.iconPortfolio}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='white'
          data-testid='portfolio-icon'
        >
          <path d='M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z' />
        </svg>
      </div>

      <ModalLayout isOpen={isOpen} toggle={toggle}>
        <PortfolioModal
          portfolio={getUniquePortfolio(portfolio)}
          onClick={removeAsset}
        />
      </ModalLayout>
      <div className={styles.portfolioValues}>
        <span>
          Current value:{' '}
          <span data-testid='portfolio-value'>
            {prettifyNumber(portfolioValue)}
          </span>
        </span>
        <span>
          Change: {prettifyNumber(portfolioValue - portfolio.totalValue)} (
          {(portfolioValue - portfolio.totalValue) / portfolioValue
            ? prettifyNumber(
                (portfolioValue - portfolio.totalValue) / portfolioValue,
              )
            : 0}
          %)
        </span>
      </div>
    </header>
  );
};

export default Header;
