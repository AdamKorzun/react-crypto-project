import React from 'react';
import styles from './Buttons.module.scss';
export const Button = (props: {
  text: string;
  onClick?: (...args: any) => any;
}): JSX.Element => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    if (props.onClick != null) props.onClick();
    event.stopPropagation();
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {props.text}
    </button>
  );
};
