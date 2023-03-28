import React, { useState } from 'react';
import type { IPortfolio, IPortfolioAsset } from '../../../../types/portfolio';
import { portfolio as portfolioMockup } from '../../../../data/portfolio.mockup';
import styles from './Portfolio.module.scss';
import { Button } from '../../buttons/Buttons';
const PortfolioModal = (): JSX.Element => {
  const [portfolio, setPortfolio] = useState<IPortfolio>(portfolioMockup);

  function removeAsset(asset: IPortfolioAsset): void {
    const updatedAssets = portfolio.assets.filter(
      (portfolioAsset) => portfolioAsset.currency.id !== asset.currency.id,
    );
    setPortfolio({ ...portfolio, assets: updatedAssets });
  }
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
          {portfolio.assets.map((asset): JSX.Element => {
            return (
              <tr key={asset.currency.id}>
                <td>{asset.currency.name}</td>
                <td className={styles.amountColumn}>{asset.amount}</td>
                <td>
                  <Button
                    onClick={() => {
                      removeAsset(asset);
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
