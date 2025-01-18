import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { OrderTable } from './OrdersTable'
import './orders.css'
export const Order = () => {
  const [orders, setOrders] = useState([])
  const getOrders = async ()=> {
    axios.get('/orders/').then(res=>{
      setOrders(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <div className='orders'>
     { orders.length && <OrderTable orders={orders}/> }
    </div>
  )
}
