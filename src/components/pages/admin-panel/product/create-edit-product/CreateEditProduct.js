import { useEffect, useState } from 'react';
import React from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosReq } from '../../../../../api/axiosDefault';
import TextArea from 'antd/es/input/TextArea';
import './create-edit-product.css'
function CreateEditProduct(props) {
    const navigate = useNavigate()
    const location = useLocation();
    const {state} = location;
    const [product, setProduct] = useState({name: ''});
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const genders =[
        'Men',
        'Women',
        'Babys',
        'Girls',
        'Unisex',
        'youth'
    ]

    const sizes =[
        '2XS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        '2XL',
        '3XL',
        '4XL',
        '26',        
        '27',       
        '28',        
        '29',       
        '31',      
        '32',      
        '33',      
        '34',      
        '35',      
        '36',      
        '37',      
        '38',      
        '39',
        '40',      
        '41',      
        '42',      
        '43',
        '44',
        '45',
        '46',
    ]
    const colors = [
        'Black',
        'White',
        'Red',
        'Green',
        'Yellow',
        'Blue',
        'Pink',
        'Lilac',
        'Brown',
        'Beige',
        'Gray',
        'Salmon'
    ]
    const getCategories = async ()=>{
        axiosReq.get('categories/').then(res=>{
            setCategories(res.data.results)
        }).catch(err=>{

        })
    }

    const editProduct= ()=>{
        axiosReq.put('/products/'+product.id+'/', product)
        .then(res=>{
            navigate('/product')
        })
        .catch(err=>{
            toast.error('There is a problem with the editing')
        })
    }
    const createProduct= ()=>{
        var fd=new FormData();
        fd.append('name',product.name);
        if(selectedImage != null)
            fd.append('image',selectedImage);
        fd.append('price',product.price);
        fd.append('description',product.description);
        fd.append('category',product.category);
        fd.append('color',product.color);
        fd.append('size',product.size);
        fd.append('genders',product.genders);
        axiosReq.post('/products/',fd)
        .then(res=>{
            navigate('/product')
        })
        .catch(err=>{
            if(err.response?.data.name)
                toast.error(err.response?.data.name['0'])
            if(err.response?.data.price)
                toast.error(err.response?.data.price['0'] +" for the price")
            else
                toast.error('There is a problem with the create')
        })
    }
    var fileSelectorHandler = event => {
        setSelectedImage(event.target.files[0]);
    }
    useEffect(() => {
        getCategories();
        if(state!=null)
        {
            setProduct({
                id:state.updatedProduct.id,
                name:state.updatedProduct.name,
                price:state.updatedProduct.price, 
                category: state.updatedProduct.category,
                color: state.updatedProduct.color,
                genders: state.updatedProduct.genders,
                size: state.updatedProduct.size,
                description: state.updatedProduct.description
            })
        }
    },[])
    return (
        <div className="create-edit-product d-flex justify-content-center" style={{minHeight:'75vh', marginTop: '21px'}}>
            <form className="col-sm-12 col-md-6 mt-5">
                <div className="title d-flex justify-content-center">
                    <h1>{product.id?"Edit Product":"Create Product"}</h1>
                </div>
                <div className="form-style1">
                        <div className="form-group input-block-level mt-5">
                            <input type="text" value={product.name} className="form-control " placeholder="Enter Product Name" onChange={e => setProduct({ ...product, name: e.target.value })} />
                        </div>                            
                        {categories.length>0 &&
                        <select className="form-control mt-2"
                        value={product.category}
                        onChange={e =>                                     
                        {                                          
                            setProduct({ ...product, category: e.target.value })
                        }                                          
                        }>
                            {
                            <option  value=''>Please Select Category</option> }
                            {
                            categories.map(cat =>
                                    <option key={cat.id} value={cat.id} 
                                    style={{color:'black'}}>{cat.name}</option>
                            )
                            }
                        </select>                          
                        }
                        
                        <select className="form-control mt-2"
                        value={product.color}
                        onChange={e =>                                     
                        {                                          
                            setProduct({ ...product, color: e.target.value })
                        }                                          
                        }>
                            {
                            <option  value=''>Please Select Color</option> }
                            {
                            colors.map(col =>
                                    <option key={col} value={col} 
                                    style={{color:'black'}}>{col}</option>
                            )
                            }
                        </select>   

                        <select className="form-control mt-2"
                        value={product.size}
                        onChange={e =>                                     
                        {                                          
                            setProduct({ ...product, size: e.target.value })
                        }                                          
                        }>
                            {
                            <option  value=''>Please Select Size</option> }
                            {
                            sizes.map(size =>
                                    <option key={size} value={size} 
                                    style={{color:'black'}}>{size}</option>
                            )
                            }
                        </select> 

                        <select className="form-control mt-2"
                        value={product.genders}
                        onChange={e =>                                     
                        {                                          
                            setProduct({ ...product, genders: e.target.value })
                        }                                          
                        }>
                            {
                            <option  value=''>Please Select Gender</option> }
                            {
                            genders.map(gen =>
                                <option key={gen} value={gen} 
                                style={{color:'black'}}>{gen}</option>
                            )
                            }
                        </select> 
                        {!product.id && <div className="form-group input-block-level mt-4">
                            <label for="product_image">Please Choose an image</label>
                            <input 
                            type="file"
                            style={{display:'block'}}
                            onChange={fileSelectorHandler}
                            />
                        </div>}
                        <div className="form-group input-block-level mt-2">
                            <input type="text" value={product.price} 
                            className="form-control" 
                            placeholder="Enter Product Price"
                            onChange={e => setProduct({ ...product, price: e.target.value })} />
                        </div>
                        <div className="form-group input-block-level mt-2">
                            <TextArea type="text" value={product.description}
                            className="form-control"
                            placeholder="Enter Product Description"
                            onChange={e => setProduct({ ...product, description: e.target.value })} />
                        </div>
                        <div className='d-flex justify-content-center' >
                            <button onClick={(e) => {
                                e.preventDefault();
                                product.id ? editProduct(product) : createProduct(product);
                            }} className="btn btn-primary btn-bg input-block-level mt-3 mb-5" style={{borderRadius:"20px" ,width: '100%'}}>
                                { product.id ? "Edit product" : "Create product" }
                            </button>
                        </div>
                </div>                  
            </form>
        </div>
      )
}

export default CreateEditProduct