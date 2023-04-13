import React from 'react';
import styles from './Buttons.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  onClick?: () => void;
  text: string;
  type?: 'submit' | 'reset' | 'button';
  width?: string;
  height?: string;
  disabled?: boolean;
  tooltipText?: string;
  icon?: IconProp;
  testId?: string;
}

export const Button = (props: Props): JSX.Element => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    props.onClick?.();
    event.stopPropagation();
  }

  return (
    <Tippy
      content={props.tooltipText}
      delay={100}
      disabled={!props.tooltipText}
    >
      <button
        className={styles.button}
        onClick={handleClick}
        style={{
          height: props.height,
          width: props.width,
        }}
        type={props.type}
        disabled={props.disabled}
        data-testid={props.testId}
      >
        {props.icon && (
          <span>
            <FontAwesomeIcon icon={props.icon} />{' '}
          </span>
        )}
        <span>{props.text}</span>
      </button>
    </Tippy>
  );
};
