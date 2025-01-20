import React from 'react'
import { useCart } from '../../../contexts/CartContext';
import { ProductTable } from './ProductTable';

function ShoppingCart() {

  const Cart = useCart();

  return (
    <div>
      <ProductTable products={Cart}/>
    </div>
  );
}

export default ShoppingCart;