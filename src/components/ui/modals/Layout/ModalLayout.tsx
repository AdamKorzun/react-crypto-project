import React from 'react';
import type { ReactNode } from 'react';
import styles from './ModalLayout.module.scss';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const ModalLayout = (props: ModalType): JSX.Element => {
  return props.isOpen ? (
    <div
      className={styles.overlay}
      onClick={props.toggle}
      data-testid='overlay'
    >
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
        data-testid='content'
      >
        {props.children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalLayout;
