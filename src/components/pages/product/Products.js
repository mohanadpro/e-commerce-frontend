import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Product } from './Product';
export const Products = () => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        await axios.get('/products')
            .then(res => {
                setProducts(res.data.results)
            }
            )
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className='product' style={{ marginTop: '85px' }}>
            {products?.map((product, id) =>
                <Product product={product} id={id}/>
            )}
        </div>
    )
}
