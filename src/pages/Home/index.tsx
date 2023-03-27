import React from 'react';
import CurrenciesList from '../../components/ui/currenciesList/CurrenciesList';
import Header from '../../components/ui/header/header';
import styles from './Home.module.scss';
const Home = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Top Currencies</h1>
        <CurrenciesList />
      </main>
    </>
  );
};

export default Home;
