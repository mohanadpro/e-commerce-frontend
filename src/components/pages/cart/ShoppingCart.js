import React from 'react'
import { useCart } from '../../../contexts/CartContext';
import { ProductTable } from './ProductTable';

function ShoppingCart() {
  const Cart = useCart();

  return (
    <ProductTable products={Cart}/>
  );
}

export default ShoppingCart;