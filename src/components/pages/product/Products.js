import axios from 'axios'
import React, { useEffect } from 'react'
import { Product } from './Product';
import { Col, Row } from 'react-bootstrap';
import { useProduct, useSetProducts } from '../../../contexts/ProductContext';
export const Products = () => {
    const products = useProduct()
    const setProducts = useSetProducts()
    const getProducts = async () => {
        await axios.get('/products')
            .then(res => {
                setProducts(res.data.results)
            })
    }
    useEffect(() => {
        getProducts()
    }, [])
    const handleGetProducts = ()=>{
        console.log('Hello world')
    }
    return (
        <div style={{ marginTop: '85px' }} onScroll={()=>handleGetProducts()}>
            <Row className='mt-3'>
                {products?.map((product, id) =>
                <Col md={3} key={id}>
                    <Product product={product} id={id}/>
                </Col>
                )}                                         
            </Row>
        </div>

    )
}
