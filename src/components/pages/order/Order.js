import React, { useEffect, useState } from 'react'
import { OrderTable } from './OrdersTable'
import './orders.css'
import { axiosRes } from '../../../api/axiosDefault'
export const Order = () => {
  const [orders, setOrders] = useState([])
  const getOrders = async ()=> {
    axiosRes.get('/orders/').then(res=>{
      setOrders(res.data)
    })
    .catch(err=>{
      
    })
  }
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <div className='orders' data-testid="order-page">
     { orders.length && <OrderTable orders={orders} setOrders={setOrders}/> }
    </div>
  )
}
