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
        <td data-label="name" className={styles.cell}>
          <span>{props.currency.name}</span>
        </td>
        <td data-label="price">
          <span>{props.currency.priceUSD}</span>
        </td>
        <td data-label="Change 1h">
          <span>{props.currency.change1h}</span>
        </td>
        <td data-label="Change 24h">
          <span>{props.currency.change24h}</span>
        </td>
        <td data-label="Change 7d">
          <span>{props.currency.change7d}</span>
        </td>
        <td data-label="Maket Cap">
          <span>{props.currency.marketCap}</span>
        </td>
        <td data-label="Volume 24h">
          <span>{props.currency.volume24h}</span>
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
