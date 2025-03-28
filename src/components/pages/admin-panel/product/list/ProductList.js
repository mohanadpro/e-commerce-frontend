// import '../../../styles/public.css';

import React, { useEffect } from 'react'
import Swal from "sweetalert2";  
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-hot-toast';

export function ProductList({isTesting}) {
      const [products, setProducts] = useState([]);
      const [next, setNext] = useState('')
      const [currentPage, setCurrentPage] = useState(1)
      const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
      
      const getProducts = async ()=>{
        if(isTesting)            
            var { data } = await axiosReq.get('products/?page=' + currentPage, { headers: {'Authorization': `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}});
        else
            var { data } = await axiosReq.get('products/?page=' + currentPage);
        
        if (isFirstTimeLoading) {
            setProducts(data.results)
            setIsFirstTimeLoading(false)
        }
        else
        {
            setProducts(products => [...products, ...data.results])
        }
        setNext(data.next)
        if (data.next != null) {
            setCurrentPage(currentPage + 1)
        }
      }

      const deleteProduct = async (id)=>{
        try{
        let res;
        if(isTesting)
          res = await axiosReq.delete('products/'+id, { headers: {'Authorization': `Bearer ${process.env.REACT_APP_ADMIN_TOKEN}`}});
        else
          res = await axiosReq.delete('products/'+id)
          toast.success('product deleted');
          setProducts(products.filter( x=> x.id !== id))
        }catch(err){
        }
      }
      useEffect(() => {
        getProducts()
      }, [])
      return (

            <div data-testid="product-list-page" className="mybody" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1 data-testid="List_Products_Text">List Products</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link data-testid="create-product-link" to={{pathname:"/create-edit-product"}} className="btn btn-danger">
                            <i className="fa-solid fa-plus"></i>
                        </Link>
                  </div>
                <div  className='d-flex flex-column justify-content-between' >
                <InfiniteScroll
                                dataLength={products.length}
                                hasMore={next != null ? true : false}
                                loader={<h4> Loading... </h4>}
                                next={getProducts}
                                style={{ overflowX:'hidden'}}
                            >
                    <table className="table">
                        <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col" className="d-flex justify-content-center">Actions</th>
                                </tr>
                        </thead>
                        <tbody>

                        {products.map((item,i) =>
                            <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{item.name}</td>
                                <td>{item.category_name}</td>
                                <td>{item.price}</td>
                                <td>{item.size}</td>
                                <td>{item.color}</td>
                                <td>{item.genders}</td>
                                <td className='d-flex justify-content-center'>
                                    <button data-testid="delete_product_button" className="btn btn-block" style={{ backgroundColor: "transparent"}}
                                    onClick={()=>{
                                    Swal.fire({
                                        title: "Are you sure you want to delete " + item.name + " product",
                                        icon:'warning',
                                        cancelButtonText: 'No',

                                        showConfirmButton: true,
                                        confirmButtonColor:'green',
                                        cancelButtonColor:'red',
                                        showCancelButton: true
                                    }).then(res => {
                                                if (res.isConfirmed)
                                                    deleteProduct(item.id)
                                                else { }
                                        })
                                }
                                }
                                    > <i className='fa-solid fa-trash' style={{color:'red'}}></i></button>
                                    <Link data-testid="edit-product-link" className='btn btn-block' to="/create-edit-product" state={{ updatedProduct: item } }> <i className='fa-solid fa-edit' color='red'></i></Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </InfiniteScroll>

                </div>
            </div>
      )
}

