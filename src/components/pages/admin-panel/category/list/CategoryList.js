// import '../../../styles/public.css';

import axios from 'axios';
import React, { useEffect } from 'react'
import Swal from "sweetalert2";  
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../../../../api/axiosDefault';
import { toast } from 'react-hot-toast';

export function CategoryList({isTesting}) {
      const [categories, setCategories] = useState([]);
      const getCategories = async ()=>{
        try{
        if(isTesting)
            var { data } = await axiosReq.get('categories/', { headers : {'Authorization': `Bearer ${ process.env.REACT_APP_ADMIN_TOKEN }` }});
        else
            var { data } = await axiosRes.get('categories/')
        setCategories(data.results)
        }
        catch(err){
            console.log(err)
        }
      }
      const deleteCategory = async (id)=>{
        try{
            var res;
            if(isTesting)
                res = await axiosReq.delete('categories/'+id, { headers : {'Authorization': `Bearer ${ process.env.REACT_APP_ADMIN_TOKEN }` }})
            else
                res = await axiosReq.delete('categories/'+id)
            console.log(res.status)
            if(res.status == 204)
            {
                toast.success('category deleted')
                getCategories()
            }
        }catch(err)
        {
            console.log(err)
        }
      }

      useEffect(() => {
        getCategories()
      }, [])
      return (

            <div className="mybody" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1 data-testid="List_Categories_Text">List Categories</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link data-testid="create-category-link" to={{pathname:"/category-edit-category"}} className="btn btn-danger">
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
                                           <button data-testid="delete_category_button" className="btn btn-block" style={{ backgroundColor: "transparent"}}
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
                                           <Link data-testid="edit-category-link" className='btn btn-block' to="/category-edit-category" state={{ updatedCategory: item } }> <i className='fa-solid fa-edit' color='red'></i></Link>
                                        </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
      )
}

