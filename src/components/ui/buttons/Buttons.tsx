import React from 'react';
import styles from './Buttons.module.scss';
export const Button = (props: {
  text: string;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
