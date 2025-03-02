// import '../../../styles/public.css';

import React, { useEffect } from 'react'
import Swal from "sweetalert2";  
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';
import InfiniteScroll from 'react-infinite-scroll-component';

export function ProductList(props) {
      const [products, setProducts] = useState([]);
      const [next, setNext] = useState('')
      const [currentPage, setCurrentPage] = useState(1)
      const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
      const getProducts = async ()=>{
        axiosReq.get('products/?page=' + currentPage).then(res=>{
            if (isFirstTimeLoading) {
                setProducts(res.data.results)
                setIsFirstTimeLoading(false)
            }
            else
            {
                setProducts(products => [...products, ...res.data.results])
            }
            setNext(res.data.next)
            if (res.data.next != null) {
                setCurrentPage(currentPage + 1)
            }
        }).catch(err=>{

        })
      }

      const deleteProduct = async (id)=>{
        axiosReq.delete('products/'+id).then(res=>{
            setProducts(
                products.filter(x=>x.id!==id)
            )
        }).catch(err=>{

        })
      }
      useEffect(() => {
        getProducts()
      }, [])
      return (

            <div className="mybody" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1>List Products</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link to={{pathname:"/create-edit-product"}} className="btn btn-danger">
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
                                    <button className="btn btn-block" style={{ backgroundColor: "transparent"}}
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
                                    <Link className='btn btn-block' to="/create-edit-product" state={{ updatedProduct: item } }> <i className='fa-solid fa-edit' color='red'></i></Link>
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

