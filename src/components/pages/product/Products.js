import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Product } from './Product';
import { Col, Container, Row } from 'react-bootstrap';
import { useProduct, useSetProducts } from '../../../contexts/ProductContext';
export const Products = () => {
    // const [products, setProducts] = useState([])
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
    return (
        <div style={{ marginTop: '85px' }}>
            <Row className='mt-3'>
                {products?.map((product, id) =>
                <Col md={3}>
                    <Product product={product} id={id}/>
                </Col>
                )}                                         
            </Row>
        </div>

    )
}
