import React from 'react';
import styles from './Portfolio.module.scss';
import { Button } from '../../buttons/Buttons';
import type { IPortfolioAsset } from '../../../../types/portfolio';
import { prettifyNumber } from '../../../../utils/prettifyNumbers';

const PortfolioModal = (props: {
  portfolio: Record<string, IPortfolioAsset>;
  onClick: (id: string) => void;
}): JSX.Element => {
  return (
    <div className={styles.content}>
      <h2>Portfolio</h2>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <td className={styles.tableColumnName}>Name</td>
            <td className={styles.tableColumnAmount}>Amount</td>
            <td className={styles.tableColumnRemove}></td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.portfolio).map((key): JSX.Element => {
            return (
              <tr key={key}>
                <td>{props.portfolio[key].currency.name}</td>
                <td className={styles.tableColumnAmount}>
                  {prettifyNumber(props.portfolio[key].amount)}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      props.onClick(key);
                    }}
                    text='-'
                    width='100%'
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioModal;
