import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './orders.css'
export const OrderTable = ({orders}) => {
  const navigate = useNavigate()
  return (
    <Table striped bordered hover variant="dark" style={{marginTop:'91px'}}>
    <thead>
      <tr>
        <th>Created Date</th>
        <th>Customer</th>
        <th>Total Price</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
        {orders.map((order, id)=>
        <tr key={id}>
            <td>{order.created_at}</td>
            <td>{order.customer}</td>
            <td>{order.total_price}</td>
            <td>
              <Button onClick={()=>navigate(`/orders/${order.id}`)} className='order-button' variant='none' > Details </Button>
            </td>
        </tr>
        )
    }      
    </tbody>
  </Table>
  )
}
