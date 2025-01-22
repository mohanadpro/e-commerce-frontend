import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import Avatar from '../avatar/Avatar';
import { useCart, useSetCart } from '../../../contexts/CartContext';

export const ProductTable = (products) => {
    const Cart = useCart()
    const setCart = useSetCart()
    const handleChangeItemsCount = (e, item) =>{
      setCart(Cart.map(updated_product =>
        updated_product.product === item.product ? { ...updated_product, count: e.target.value, total_price: item.price * e.target.value } : updated_product
      ));
    }
  return (
    <Table striped bordered hover variant="dark" style={{marginTop:'91px'}}>
    <thead>
      <tr>
        <th>Image</th>
        <th>Item</th>
        <th>Count</th>
        <th>Price</th>
        <th>Total Price</th>
      </tr>
    </thead>
    <tbody>
        {products["products"].map((product, id)=>
        <tr key={id}>
            <td>
            <Avatar src={product.image} height={45}/>
            </td>
            <td>{product.name}</td>
            <td>
            <select value={product.count} onChange={e=>handleChangeItemsCount(e, product)}>
                {Array.from(Array(25), (item,i)=>{
                 return <option value={i+1} key={i}> {i+1}</option>
                })}
              </select>
            </td>
            <td>{product.price}</td>
            <td>{product.total_price} $</td>
        </tr>
        )
    }
      
    </tbody>
  </Table>
  
  )
}
