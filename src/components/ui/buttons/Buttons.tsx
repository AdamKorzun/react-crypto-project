import React from 'react';
import styles from './Buttons.module.scss';
export const Button = (props: {
  text: string;
  onClick?: (...args: any) => any;
}): JSX.Element => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
