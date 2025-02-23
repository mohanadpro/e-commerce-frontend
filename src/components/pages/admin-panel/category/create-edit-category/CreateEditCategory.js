import { useEffect, useState } from 'react';
import React from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosReq } from '../../../../../api/axiosDefault';

function CreateEditCategory(props) {
      const navigate = useNavigate()
      const location = useLocation();
      const {state} = location;
      const {updatedCategory} = state;
      const [category, setCategory] = useState({name: ''});
      const editCategory= ()=>{
        axiosReq.put('/categories/'+category.id+'/', category)
        .then(res=>{
            navigate('/category')
        })
        .catch(err=>{
            toast.error('There is a problem with the editing')
        })
      }
      const createCategory= ()=>{
        axiosReq.post('/categories/',category)
        .then(res=>{
            navigate('/category')
        })
        .catch(err=>{
            toast.error('There is a problem with the create')
        })
      }
      
      useEffect(() => {
        if(updatedCategory!=null)
        {
            setCategory({id:updatedCategory.id, name:updatedCategory.name})
        }
      },[])
      return (
            <div className="mybody d-flex justify-content-center" style={{minHeight:'75vh'}}>
                <div className="title">
                    <h1>{category.id?"Edit Category":"Create Category"}</h1>
                </div>
                
                <form className="col-sm-12 col-md-6 mt-5">
                    <div className="form-style1">
                            <div className="form-group input-block-level mt-5">
                                <input type="text" value={category.name} className="form-control " placeholder="Enter Category Name" onChange={e => setCategory({ ...category, name: e.target.value })} />
                            </div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                category.id ? editCategory(category) : createCategory(category);
                            }} className="btn btn-success input-block-level mt-3 mb-5" style={{borderRadius:"20px"}}>
                                {category.id ? "Edit category" : "Create category"}
                            </button>
                    </div>                  
                </form>
            </div>
      )
}

export default CreateEditCategory