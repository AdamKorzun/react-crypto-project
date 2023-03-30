import React from 'react';
import styles from './Buttons.module.scss';

interface Props {
  onClick?: () => void;
  text: string;
  type?: 'submit' | 'reset' | 'button';
  width?: string;
  height?: string;
  disabled?: boolean;
}

export const Button = (props: Props): JSX.Element => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    props.onClick?.();
    event.stopPropagation();
  }

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      style={{
        height: props.height,
        width: props.width,
      }}
      type={props.type}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
