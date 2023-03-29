import React from 'react';
import styles from './Portfolio.module.scss';
import { Button } from '../../buttons/Buttons';
import type { IPortfolioAsset } from '../../../../types/portfolio';
import { prettyNumber } from '../../../../utils/prettyNumbers';
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
            <td className={styles.nameColumn}>Name</td>
            <td className={styles.amountColumn}>Amount</td>
            <td className={styles.removeButtonColumn}></td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.portfolio).map((key): JSX.Element => {
            return (
              <tr key={key}>
                <td>{props.portfolio[key].currency.name}</td>
                <td className={styles.amountColumn}>
                  {prettyNumber(props.portfolio[key].amount)}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      props.onClick(key);
                    }}
                    text="-"
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
