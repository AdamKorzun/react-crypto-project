import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/buttons/Buttons';
import styles from './CurrencyPage.module.scss';
import PriceChart from '../../components/ui/priceChart/PriceChart';
import ModalLayout from '../../components/ui/modals/Layout/ModalLayout';
import AddCurrencyModal from '../../components/ui/modals/addCurrency/AddCurrency';
import useModal from '../../hooks/useModals';
import { fetchCurrency, fetchHistoricData } from '../../services/currency';
import type { ICurrency, ICurrencyTimestamp } from '../../types/currency';
import { useNavigate, useParams } from 'react-router-dom';
import { prettifyNumber } from '../../utils/prettifyNumbers';
import usePortfolio from '../../hooks/usePortfolio';

const CurrencyPage = (): JSX.Element => {
  const [currency, setCurrency] = useState<ICurrency>();
  const [chartData, setChartData] = useState<ICurrencyTimestamp[]>([]);
  const { isOpen, toggle } = useModal();
  const { id } = useParams();
  const [, addCurrency] = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchCurrency(id)
      .then(setCurrency)
      .catch(() => {
        navigate('/');
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchHistoricData(id)
      .then(setChartData)
      .catch(() => {});
  }, [currency]);

  function handleModalClose(amount: number): void {
    if (!currency) return;
    addCurrency({ currency, amount });
    toggle();
  }

  return (
    <main className={styles.main}>
      {currency ? (
        <>
          <div className={styles.chartWrapper}>
            <PriceChart
              data={chartData.map((x) => ({
                priceUsd: Number(x.priceUsd),
                time: x.time,
              }))}
              lineLabel={'priceUsd'}
              xAxisLabel={'time'}
            />
          </div>
          <div className={styles.currency}>
            <div className={styles.currencyDescription}>
              <span className={styles.currencyName}>
                {currency.name} ({currency.symbol})
              </span>
              <span>Rank: {currency.rank}</span>
              <span>Price: {prettifyNumber(currency.priceUsd)}</span>
              <span>Supply: {prettifyNumber(currency.supply)}</span>
              <span>Max Supply: {prettifyNumber(currency.maxSupply)}</span>
              <span>Market Cap: {prettifyNumber(currency.marketCapUsd)}</span>
              <span>
                Volume (24hr): {prettifyNumber(currency.volumeUsd24Hr)}
              </span>
              <span>
                Change (24hr): {prettifyNumber(currency.changePercent24Hr)}
              </span>
            </div>
            <Button text='Add to portfolio' onClick={toggle} />
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
  );
};

export default CurrencyPage;
