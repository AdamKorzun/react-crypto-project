import React, { useState } from 'react';
import Pagination from '../../components/ui/pagination/Pagination';
import Table from '../../components/ui/table/Table';
import styles from './Home.module.scss';
import { currencies } from '../../data/currencies.mockup';
import { Button } from '../../components/ui/buttons/Buttons';
import useModal from '../../hooks/useModals';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';
import AddCurrencyModal from '../../components/ui/modals/addCurrency/AddCurrency';
import { useNavigate } from 'react-router-dom';
const Home = (): JSX.Element => {
  const { isOpen, toggle } = useModal();
  const navigate = useNavigate();
  const [currencyName, setCurrencyName] = useState('');

  function handleRowClick(id: string): void {
    navigate(`/currency/${id}`);
  }

  function handleModalClose(amount: number): void {
    toggle();
  }

  function openModal(name: string): void {
    toggle();
    setCurrencyName(name);
  }
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Top Currencies</h1>
        <Table
          headers={{
            id: 'Id',
            rank: 'Rank',
            name: 'Name',
            symbol: 'Symbol',
            supply: 'Supply',
            maxSupply: 'Max Supply',
            priceUsd: 'Price',
            vwap24Hr: 'VWAP 24h',
            marketCapUsd: 'Market Cap',
            volumeUsd24Hr: 'Volume 24h',
            changePercent24Hr: 'Change 24h',
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
                  it.button.onClick(it.name);
                }}
              />
            ),
          }}
        />
        <div className={styles.paginationWrapper}>
          <Pagination />
        </div>
        <ModalLayout isOpen={isOpen} toggle={toggle}>
          <AddCurrencyModal
            currencyName={currencyName}
            handleClose={handleModalClose}
          />
        </ModalLayout>
      </main>
    </>
  );
};

export default Home;
