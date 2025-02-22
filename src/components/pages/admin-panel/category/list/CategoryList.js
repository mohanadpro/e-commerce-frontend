// import '../../../styles/public.css';

import axios from 'axios';
import React, { useEffect } from 'react'
// import { deleteCategoryAction, getCategoryWithPagniationAction } from '../../../redux/category/category-action';
// import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';

export function CategoryList(props) {
      const [pageNumber, setPageNumber]=useState(0);
      const [categories, setCategories] = useState([]);
      const getCategories = async ()=>{
        axiosReq.get('categories/').then(res=>{
            // console.log(res.data.results)
            setCategories(res.data.results)
        }).catch(err=>{

        })
      }
      useEffect(() => {
        getCategories()
      }, [])
      return (

            <div className="mybody" style={{marginTop:"91px", minHeight:'70h'}}>
                <div className="title">
                    <h1>List Categories</h1>
                </div>
                <div className="d-flex justify-content-end">
                        <Link to={{pathname:"/create-category",pgNumber:pageNumber}} className="btn btn-danger">
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
                                           <button className="btn btn-block" style={{ backgroundColor: "transparent"}}> <i className='fa-solid fa-trash' style={{color:'red'}}></i></button>
                                           <Link className='btn btn-block' to='/create-edit-category/'> <i className='fa-solid fa-edit' color='red'></i></Link>
                                        </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
      )
}

