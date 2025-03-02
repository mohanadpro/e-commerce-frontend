import { useEffect, useState } from 'react';
import React from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosReq } from '../../../../../api/axiosDefault';
import './create-edit-category.css'
function CreateEditCategory(props) {
      const navigate = useNavigate()
      const location = useLocation();
      const {state} = location;
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
        if(state != null){
            setCategory({id: state.updatedCategory.id, name: state.updatedCategory.name})            
        }
      },[])
      return (
            <div className="create-edit-category d-flex justify-content-center" style={{minHeight:'75vh', marginTop: '91px'}}>
                <form className="col-sm-12 col-md-4 mt-5">
                <div className="title d-flex justify-content-center">
                    <h2>{category.id?"Edit Category":"Create Category"}</h2>
                </div>
                    <div className="form-style1">
                            <div className="form-group input-block-level mt-5">
                                <input type="text" value={category.name} className="form-control " placeholder="Enter Category Name" onChange={e => setCategory({ ...category, name: e.target.value })} />
                            </div>
                            <div className='d-flex justify-content-center'>
                            <button onClick={(e) => {
                                e.preventDefault();
                                category.id ? editCategory(category) : createCategory(category);
                            }} className="btn btn-primary input-block-level mt-3 mb-5" style={{borderRadius:"20px", width:'100%'}}>
                                {category.id ? "Edit category" : "Create category"}
                            </button>
                            </div>
                    </div>                  
                </form>
            </div>
      )
}

export default CreateEditCategory