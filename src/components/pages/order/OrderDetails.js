import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import './orders.css'
import { useParams } from 'react-router-dom';
import { axiosRes } from '../../../api/axiosDefault';
export const OrderDetails = () => {
    const [ orderDetails, setOrderDetails ] = useState([])
    const { id } = useParams()
    useEffect(()=>{
      axiosRes.get('/orders/orderDetails/'+id)
        .then(res=>{
            setOrderDetails(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div className='orders'>
    <Table striped bordered hover variant="dark" style={{marginTop:'91px'}}>
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
            <td>{item.product_name}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            <td>{item.total_price}</td>
        </tr>
        )
    }      
    </tbody>
  </Table>
  </div>
  )
}
