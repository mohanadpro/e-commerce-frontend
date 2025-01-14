import React from 'react'
import { Table } from 'react-bootstrap';
import Avatar from '../avatar/Avatar';

export const ProductTable = (products) => {

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
            <td>{product.count}</td>
            <td>{product.price}</td>
            <td>{product.total_price} $</td>
        </tr>
        )
    }
      
    </tbody>
  </Table>
  
  )
}
