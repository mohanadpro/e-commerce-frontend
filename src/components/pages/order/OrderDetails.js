import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import './orders.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
export const OrderDetails = () => {
    const [ orderDetails, setOrderDetails ] = useState([])
    const { id } = useParams()
    useEffect(()=>{
        axios.get('/orders/orderDetails/'+id)
        .then(res=>{
            setOrderDetails(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <Table striped bordered hover variant="dark" style={{marginTop:'91px'}} className='orders'>
    <thead>
      <tr>
        <th>Order</th>
        <th>Product</th>
        <th>Count</th>
        <th>Price</th>
        <th>Total Price</th>
      </tr>
    </thead>
    <tbody>
        {orderDetails && orderDetails.map((item, id)=>
        <tr key={id}>
            <td>{item.order}</td>
            <td>{item.product}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            <td>{item.total_price}</td>
        </tr>
        )
    }      
    </tbody>
  </Table>
  
  )
}
