import React, { useState } from 'react';
import { Button } from '../../buttons/Buttons';
import styles from './AddCurrency.module.scss';
const AddCurrencyModal = (props: {
  currencyName: string;
  handleClose: (amount: number) => void;
}): JSX.Element => {
  const [amount, setAmount] = useState('');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const result = event.target.value.replace(/[^\d.]/g, '');
    if (Number(result) >= 0) {
      setAmount(result);
    }
  }

  function validateForm(amount: string): boolean {
    return Number(amount) > 0;
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (validateForm(amount)) {
      props.handleClose(Number(amount));
    }
  }

  return (
    <div className={styles.content}>
      <h2>Add {props.currencyName} to your portfolio</h2>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <label htmlFor='amount'>Amount</label>
        <input
          autoComplete='off'
          id='amount'
          name='amount'
          className={styles.input}
          type='text'
          onChange={handleInput}
          placeholder='Amount'
          value={amount}
        />
        <Button
          text='Add to portfolio'
          type='submit'
          disabled={!validateForm(amount)}
        />
      </form>
    </div>
  );
};

export default AddCurrencyModal;
