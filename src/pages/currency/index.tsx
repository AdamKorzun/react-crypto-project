import React, { useState } from 'react';
import { data as chartData } from '../../data/chart.mockup';
import { Button } from '../../components/ui/buttons/Buttons';
import styles from './CurrencyPage.module.scss';
import PriceChart from '../../components/ui/priceChart/PriceChart';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';
import AddCurrencyModal from '../../components/ui/modals/addCurrency/AddCurrency';
import useModal from '../../hooks/useModals';
import { currencies } from '../../data/currencies.mockup';
const CurrencyPage = (): JSX.Element => {
  const [currency] = useState(currencies[0]);
  const [data] = useState(chartData);
  const { isOpen, toggle } = useModal();

  function handleModalClose(amount: number): void {
    toggle();
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.chartWrapper}>
          <PriceChart data={data} />
        </div>
        <div className={styles.currencyInfo}>
          <div className={styles.currencyDescription}>
            <span className={styles.name}>{currency.name}</span>
            <span>Price: {currency.priceUSD}</span>
            <span>Market Cap: {currency.marketCap}</span>
            <span>Volume (24hr): {currency.volume24h}</span>
          </div>
          <Button text="Add to portfolio" onClick={toggle} />
          <ModalLayout isOpen={isOpen} toggle={toggle}>
            <AddCurrencyModal
              currencyName={currency.name}
              handleClose={handleModalClose}
            />
          </ModalLayout>
        </div>
      </main>
    </>
  );
};

export default CurrencyPage;
