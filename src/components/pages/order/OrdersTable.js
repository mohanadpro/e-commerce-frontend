import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './orders.css'
import { axiosRes } from '../../../api/axiosDefault';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
export const OrderTable = ({orders, setOrders}) => {
  const navigate = useNavigate()
  const deleteOrder = (id) => {
    axiosRes.delete('orders/'+id).then(res=>{
      toast.success('Order deleted successfully...')
      setOrders(orders.filter(order=>order.id != id))
    }).catch(err=>{
      toast.error('Error occured')
    })
  }
  return (
    <Table striped bordered hover variant="dark" style={{marginTop:'91px'}}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Created Date</th>
        <th>Total Price</th>
        <th>Details</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {orders.map((order, id)=>
        <tr key={id}>
            <td>{order.id}</td>
            <td>{order.created_at}</td>
            <td>{order.total_price}</td>
            <td>
              <Button onClick={()=>navigate(`/orders/${order.id}`)} className='order-button' variant='none' > Details </Button>
            </td>
            <td>
              <Button onClick={()=>{Swal.fire({
                                                title: "Are you sure you want to delete order with number " + order.id,
                                                icon:'warning',
                                                cancelButtonText: 'No',
                                                showConfirmButton: true,
                                                confirmButtonColor:'green',
                                                cancelButtonColor:'red',
                                                showCancelButton: true
                                              }).then(res => {
                                                      if (res.isConfirmed)
                                                          deleteOrder(order.id)
                                                      else { }
                                                })}}
                 className='btn btn-danger' variant='none' > Delete </Button>
            </td>
        </tr>
        )
    }      
    </tbody>
  </Table>
  )
}
