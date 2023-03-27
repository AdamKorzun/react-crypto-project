import React from 'react';
import CurrenciesList from '../../components/ui/currenciesList/CurrenciesList';
import styles from './Home.module.scss';
const Home = (): JSX.Element => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Top Currencies</h1>
        <CurrenciesList />
      </main>
    </>
  );
};

export default Home;
