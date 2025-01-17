import React, { useEffect, useState } from 'react'
import { useCart } from '../../../contexts/CartContext';
import { ProductTable } from './ProductTable';

function ShoppingCart() {

  const Cart = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(()=>{
    let sum =0;
    for(let i=0; i< Cart.length; i++)
    {
      sum += Cart[i].total_price
    }
    setTotalPrice(sum)
  }
  ,[])

  return (
    <div>
      <ProductTable products={Cart}/>
    </div>
  );
}

export default ShoppingCart;