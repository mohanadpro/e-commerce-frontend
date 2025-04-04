import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { CartProvider } from './contexts/CartContext';
import { RouterProvider } from 'react-router-dom';
import router from './components/root-component';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './contexts/ProductContext';
import { AddressProvider } from './contexts/AddressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CurrentUserProvider value={null}>
  <CartProvider value={[]}>
    <ProductProvider>
      <AddressProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <RouterProvider router={router}/>
      </AddressProvider>
    </ProductProvider>
  </CartProvider>
</CurrentUserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
