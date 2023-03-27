import React from 'react';
import useModal from '../../../hooks/useModals';
import type { ICurrency } from '../../../types/currency';
import { Button } from '../buttons/Buttons';
import AddCurrencyModal from '../modals/addCurrency/AddCurrency';
import ModalLayout from '../modals/Layout/ModalLayout';
import styles from './CurrencyRow.module.scss';

const CurrencyRow = (props: { currency: ICurrency }): JSX.Element => {
  const { isOpen, toggle } = useModal();

  function handleModalClose(amount: number): void {
    toggle();
  }
  return (
    <>
      <tr className={styles.row}>
        <td data-label="Rank">
          <span>{props.currency.rank}</span>
        </td>
        <td data-label="Name" className={styles.cell}>
          <span>{props.currency.name}</span>
        </td>
        <td data-label="Symbol">
          <span>{props.currency.symbol}</span>
        </td>
        <td data-label="price">
          <span>{props.currency.priceUsd}</span>
        </td>
        <td data-label="Supply">
          <span>{props.currency.supply}</span>
        </td>

        <td data-label="Maket Cap">
          <span>{props.currency.marketCapUsd}</span>
        </td>
        <td data-label="Volume 24h">
          <span>{props.currency.volumeUsd24Hr}</span>
        </td>
        <td>
          <Button text="Add" onClick={toggle} />
        </td>
      </tr>
      <ModalLayout isOpen={isOpen} toggle={toggle}>
        <AddCurrencyModal
          currencyName={props.currency.name}
          handleClose={handleModalClose}
        />
      </ModalLayout>
    </>
  );
};

export default CurrencyRow;
