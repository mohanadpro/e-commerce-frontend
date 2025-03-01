// import '../../../styles/public.css';

import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';
import InfiniteScroll from 'react-infinite-scroll-component';
import toast from 'react-hot-toast';

export function OrderList(props) {
      const [orders, setOrders] = useState([]);
      const [updatedOrder, setUpdatedOrder] = useState({})
      const [next, setNext] = useState('')
      const [currentPage, setCurrentPage] = useState(1)
      const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
      const getOrders = async ()=>{
        axiosReq.get('orders/allOrders/?page=' + currentPage).then(res=>{
            if (isFirstTimeLoading) {
                setOrders(res.data.results)
                setIsFirstTimeLoading(false)
            }
            else
            {
                setOrders(orders => [...orders, ...res.data.results])
            }
            setNext(res.data.next)
            if (res.data.next != null) {
                setCurrentPage(currentPage + 1)
            }
        }).catch(err=>{

        })
      }

      const shipOrder= (order)=>{
        setUpdatedOrder({'created_at': order.created_at,
            'total_price': order.total_price,
            'customer': order.customer,
            'delivery_place': order.delivery_place,
            'is_delivered': true})
        axiosReq.put('/orders/orderDetails/'+order.id+'/', updatedOrder)
        .then(res=>{
            toast.success('Order has been shipped successfully... ')
        })
        .catch(err=>{
            toast.error('There is a problem with the editing... ')
        })
        }
      useEffect(() => {
        getOrders()
      }, [])
      return (

            <div className="mybody" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1>List Orders</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link to={{pathname:"/create-edit-order"}} className="btn btn-danger">
                            <i className="fa-solid fa-plus"></i>
                        </Link>
                  </div>
                <div  className='d-flex flex-column justify-content-between' >
                <InfiniteScroll
                                dataLength={orders.length}
                                hasMore={next != null ? true : false}
                                loader={<h4> Loading... </h4>}
                                next={getOrders}
                                style={{ overflowX:'hidden'}}
                            >
                    <table className="table">
                        <thead className="thead-dark">
                                <tr>
                                    <th scope="col" style={{color:'red'}}>Actions</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Delivery Place</th>
                                </tr>
                        </thead>
                        <tbody>

                        {orders.map((item,i) =>
                            <tr key={i}>
                                <td><button className='btn btn-none' onClick={()=>{shipOrder(item)}}><i className="fa-solid fa-truck"></i></button> </td>
                                <td>{item.created_at}</td>
                                <td>{item.total_price}</td>
                                <td>{item.customer}</td>
                                <td>{item.delivery_place}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </InfiniteScroll>

                </div>
            </div>
      )
}

