import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Product } from './Product';
import { Col, Row } from 'react-bootstrap';
import { useProduct, useSetProducts } from '../../../contexts/ProductContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner';
export const Products = () => {
    const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
    const[next, setNext] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const products = useProduct()
    const setProducts = useSetProducts()
    const getProducts = async () => {
        await axios.get('/products?page='+currentPage)
            .then(res => {
                if(isFirstTimeLoading){
                    setProducts(res.data.results)
                    setIsFirstTimeLoading(false)
                }
                else
                    setProducts(products=>[...products, ...res.data.results])
                setNext(res.data.next)
                if(res.data.next!=null){
                    console.log('next')
                    setCurrentPage(currentPage+1)
                }
            })
    }    
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div style={{ marginTop: '85px'}}>
          <Row className='mt-3' >
            {products.length && <InfiniteScroll
            dataLength={products.length}
            hasMore={ next != null ? true : false }
            children=
                {products.map((product, id) =>
                <Col md={12} key={id}>
                  <Product product={product} id={id}/>                  
                </Col>
                )}
            loader={<h4> Loading... </h4>}
            next={getProducts}
            /> 
            }                                    
            </Row>
        
        </div>
    )
}
