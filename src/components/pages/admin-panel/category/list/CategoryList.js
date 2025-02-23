// import '../../../styles/public.css';

import axios from 'axios';
import React, { useEffect } from 'react'
import Swal from "sweetalert2";  
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';

export function CategoryList(props) {
      const [categories, setCategories] = useState([]);
      const getCategories = async ()=>{
        axiosReq.get('categories/').then(res=>{
            setCategories(res.data.results)
        }).catch(err=>{

        })
      }
      const deleteCategory = async (id)=>{
        axiosReq.delete('categories/'+id).then(res=>{
            getCategories()
        }).catch(err=>{

        })
      }
      useEffect(() => {
        getCategories()
      }, [])
      return (

            <div className="mybody" style={{marginTop:"91px", minHeight:'75vh'}}>
                <div className="title">
                    <h1>List Categories</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link to={{pathname:"/category-edit-category"}} className="btn btn-danger">
                            <i className="fa-solid fa-plus"></i>
                        </Link>
                  </div>
                <div  className='d-flex flex-column justify-content-between' >
                    <table className="table">
                        <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col" className="d-flex justify-content-center">Actions</th>
                                </tr>
                        </thead>
                        <tbody>
                        {categories.map((item,i) =>
                                <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td>{item.name}</td>
                                        <td className='d-flex justify-content-center'>
                                           <button className="btn btn-block" style={{ backgroundColor: "transparent"}}
                                           onClick={()=>{
                                            Swal.fire({
                                                title: "Are you sure you want to delete " + item.name + " category",
                                                icon:'warning',
                                                cancelButtonText: 'No',

                                                showConfirmButton: true,
                                                confirmButtonColor:'green',
                                                cancelButtonColor:'red',
                                                showCancelButton: true
                                          }).then(res => {
                                                      if (res.isConfirmed)
                                                            deleteCategory(item.id)
                                                      else { }
                                                })
                                        }
                                        }
                                           > <i className='fa-solid fa-trash' style={{color:'red'}}></i></button>
                                           <Link className='btn btn-block' to="/category-edit-category" state={{ updatedCategory: item } }> <i className='fa-solid fa-edit' color='red'></i></Link>
                                        </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
      )
}

