import React from 'react';
import CurrenciesList from '../../components/ui/currenciesList/CurrenciesList';
import Pagination from '../../components/ui/pagination/Pagination';
import styles from './Home.module.scss';
const Home = (): JSX.Element => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Top Currencies</h1>
        <CurrenciesList />
        <div className={styles.paginationWrapper}>
          <Pagination />
        </div>
      </main>
    </>
  );
};

export default Home;
