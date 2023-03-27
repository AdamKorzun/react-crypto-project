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
    <div className={styles.modal} onClick={props.toggle}>
      <div className={styles.overlay}>
        <div
          className={styles.content}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalLayout;
