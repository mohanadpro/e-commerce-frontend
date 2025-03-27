import React, { useEffect } from 'react'
import { useState } from 'react';
import { axiosReq, axiosRes } from '../../../../../api/axiosDefault';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-hot-toast';

export function OrderList({isTesting}) {
      const [orders, setOrders] = useState([]);
      const [updatedOrder, setUpdatedOrder] = useState({})
      const [next, setNext] = useState('')
      const [currentPage, setCurrentPage] = useState(1)
      const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
      const getOrders = async ()=>{        
        if(isTesting)
            var { data } = await axiosRes.get('orders/allOrders/?page=' + currentPage, { headers: {'Authorization': `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}});
        else
            var { data } = await axiosRes.get('orders/allOrders/?page=' + currentPage);

        if (isFirstTimeLoading) {
            setOrders(data.results)
            setIsFirstTimeLoading(false)
        }
        else
        {
            setOrders(orders => [...orders, ...data.results])
        }
        setNext(data.next)
        if (data.next != null) {
            setCurrentPage(currentPage + 1)
        }
      }

      const shipOrder= async (order)=>{
        try{
            setUpdatedOrder({'created_at': order.created_at,
                'total_price': order.total_price,
                'customer': order.customer,
                'delivery_place': order.delivery_place,
                'is_delivered': true})
            let res;
            if(isTesting)
               res = axiosReq.put('/orders/orderDetails/'+order.id+'/', updatedOrder, { headers: {'Authorization': `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}})
            else
               res = axiosReq.put('/orders/orderDetails/'+order.id+'/', updatedOrder)
            console.log(res.status)
            if(res.status == 201)
                toast.success('Order has been shipped successfully...')
        }catch(err){
            toast.error('There is a problem with the editing... ')
        }
    }

      useEffect(() => {
        getOrders()
      }, [])
      return (
            <div className="mybody" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1 data-testid="List_Products_Text">List Orders</h1>
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
                                <td><button data-testid="ship_order_button" className='btn btn-none' onClick={()=>{shipOrder(item)}}><i className="fa-solid fa-truck"></i></button> </td>
                                <td>{item.created_at}</td>
                                <td>{item.total_price}</td>
                                <td>{item.customer_name}</td>
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