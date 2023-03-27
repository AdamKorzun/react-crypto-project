import React from 'react';
import './App.css';
import Header from './components/ui/header/header';
import CurrencyPage from './pages/currency';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <CurrencyPage />
    </>
  );
}

export default App;
