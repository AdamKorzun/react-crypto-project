import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/buttons/Buttons';
import styles from './CurrencyPage.module.scss';
import PriceChart from '../../components/ui/priceChart/PriceChart';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';
import AddCurrencyModal from '../../components/ui/modals/addCurrency/AddCurrency';
import useModal from '../../hooks/useModals';
import { fetchCrrency, fetchHistoricData } from '../../services/currency';
import type { ICurrency, ICurrencyTimestamp } from '../../types/currency';
import { useParams } from 'react-router-dom';
import { prettyNumber } from '../../utils/prettyNumbers';
const CurrencyPage = (): JSX.Element => {
  const [currency, setCurrency] = useState<ICurrency>();
  const [chartData, setChartData] = useState<ICurrencyTimestamp[]>([]);
  const { isOpen, toggle } = useModal();
  const { id } = useParams();

  useEffect(() => {
    if (id === undefined) return;
    fetchCrrency(id)
      .then((currency) => {
        setCurrency(currency);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (id === undefined) return;
    fetchHistoricData(id)
      .then((fetchedData) => {
        setChartData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currency]);

  function handleModalClose(amount: number): void {
    toggle();
  }

  return (
    <>
      <main className={styles.main}>
        {currency !== undefined ? (
          <>
            <div className={styles.chartWrapper}>
              <PriceChart
                data={chartData}
                lineLabel={'priceUsd' as keyof ICurrencyTimestamp}
                xAxisLabel={'time' as keyof ICurrencyTimestamp}
              />
            </div>
            <div className={styles.currencyInfo}>
              <div className={styles.currencyDescription}>
                <span className={styles.name}>
                  {currency.name} ({currency.symbol})
                </span>
                <span>Rank: {currency.rank}</span>
                <span>Price: {prettyNumber(currency.priceUsd)}</span>
                <span>Supply: {prettyNumber(currency.supply)}</span>
                <span>Max Supply: {prettyNumber(currency.maxSupply)}</span>
                <span>Market Cap: {prettyNumber(currency.marketCapUsd)}</span>
                <span>
                  Volume (24hr): {prettyNumber(currency.volumeUsd24Hr)}
                </span>
                <span>
                  Change (24hr): {prettyNumber(currency.changePercent24Hr)}
                </span>
              </div>
              <Button text="Add to portfolio" onClick={toggle} />
              <ModalLayout isOpen={isOpen} toggle={toggle}>
                <AddCurrencyModal
                  currencyName={currency.name}
                  handleClose={handleModalClose}
                />
              </ModalLayout>
            </div>
          </>
        ) : (
          <span>Loading page</span>
        )}
      </main>
    </>
  );
};

export default CurrencyPage;
