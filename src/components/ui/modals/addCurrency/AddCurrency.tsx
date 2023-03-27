import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../../buttons/Buttons';
import styles from './AddCurrency.module.scss';
const AddCurrencyModal = (props: {
  currencyName: string;
  handleClose: (amount: number) => void;
}): JSX.Element => {
  const [amount, setAmount] = useState(0);

  function handleInput(event: ChangeEvent<HTMLInputElement>): void {
    const value = Number.parseFloat(event.target.value);
    setAmount(Math.max(value, 0));
  }

  return (
    <div className={styles.content}>
      <h2>Add {props.currencyName} to your portfolio</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="">Amount</label>
        <input
          type="number"
          onChange={handleInput}
          placeholder="Amount"
          value={amount}
        />
      </div>
      <Button
        text="Add to portfolio"
        onClick={() => {
          props.handleClose(amount);
        }}
      />
    </div>
  );
};

export default AddCurrencyModal;
