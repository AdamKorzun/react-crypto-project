import React from 'react';
import './App.css';
import Header from './components/ui/header/header';
import Home from './pages/Home';
// import CurrencyPage from './pages/currency';

function App(): JSX.Element {
  return (
    <>
      <Header />
      {/* <CurrencyPage /> */}
      <Home />
    </>
  );
}

export default App;
