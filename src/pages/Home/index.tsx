import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/table/Table';
import styles from './Home.module.scss';
import { Button } from '../../components/ui/buttons/Buttons';
import useModal from '../../hooks/useModals';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';
import AddCurrencyModal from '../../components/ui/modals/addCurrency/AddCurrency';
import { useNavigate } from 'react-router-dom';
import type { ICurrency } from '../../types/currency';
import { fetchCurrencies } from '../../services/currency';
import usePortfolio from '../../hooks/usePortfolio';
const Home = (): JSX.Element => {
  const { isOpen, toggle } = useModal();
  const navigate = useNavigate();
  const [currentCurrency, setCurrentCurrency] = useState<ICurrency>();
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [, addCurrency] = usePortfolio();
  const [offset, setOffset] = useState(0);

  function handleRowClick(id: string): void {
    navigate(`/currency/${id}`);
  }

  const currenciesPerPage = 15;

  function handleModalClose(amount: number): void {
    if (typeof currentCurrency !== 'undefined')
      addCurrency({ currency: currentCurrency, amount });
    toggle();
  }

  function openModal(currencyId: string): void {
    toggle();
    if (currencies.length > 0) {
      const currency = currencies.find((cur) => cur.id === currencyId);
      setCurrentCurrency(currency);
    }
  }

  function loadMoreCurrencies(): void {
    fetchCurrencies(offset + currenciesPerPage, currenciesPerPage)
      .then((fetchedCurrencies) => {
        setOffset(offset + currenciesPerPage);
        setCurrencies([...currencies, ...fetchedCurrencies]);
      })
      .catch(() => {});
  }

  useEffect(() => {
    fetchCurrencies(offset, currenciesPerPage)
      .then(setCurrencies)
      .catch(() => {});
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Top Currencies</h1>
        <Table
          headers={{
            id: 'Id',
            rank: 'Rank',
            symbol: 'Symbol',
            name: 'Name',
            priceUsd: 'Price',
            supply: 'Supply',
            maxSupply: 'Max Supply',
            vwap24Hr: 'VWAP 24h',
            marketCapUsd: 'Market Cap',
            volumeUsd24Hr: 'Volume 24h',
            changePercent24Hr: 'Change 24h',
            explorer: 'Explorer',
            button: 'Add',
          }}
          items={currencies.map((currency) => {
            return { ...currency, button: { text: 'Add', onClick: openModal } };
          })}
          onRowClick={(it) => {
            handleRowClick(it.id);
          }}
          customRenderers={{
            button: (it) => (
              <Button
                text={it.button.text}
                onClick={() => {
                  it.button.onClick(it.id);
                }}
              />
            ),
            explorer: (it) => (
              <a
                href={it.explorer}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Explorer
              </a>
            ),
          }}
        />
        <Button text="Load more" onClick={loadMoreCurrencies} width="200px" />
        <ModalLayout isOpen={isOpen} toggle={toggle}>
          <AddCurrencyModal
            currencyName={currentCurrency?.name ?? ''}
            handleClose={handleModalClose}
          />
        </ModalLayout>
      </main>
    </>
  );
};

export default Home;
