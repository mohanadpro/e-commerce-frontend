import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { CartProvider } from './contexts/CartContext';
import { RouterProvider } from 'react-router-dom';
import router from './components/root-component';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './contexts/ProductContext';
import { AddressProvider } from './contexts/AddressContext';

function App() {
  return (
    <div className="App">
    <CurrentUserProvider>
      <CartProvider>
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
    </div>
  );
}

export default App;
