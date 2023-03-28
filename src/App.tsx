import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Header from './components/ui/header/header';
import CurrencyPage from './pages/currency';
import Home from './pages/Home';

function App(): JSX.Element {
  // temporaray router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/currency/:id" element={<CurrencyPage />} />
      </Route>,
    ),
  );
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
