import React, { useEffect, useState } from 'react'
import { Product } from './Product';
import { Col, Row } from 'react-bootstrap';
import { useProduct, useSetProducts } from '../../../contexts/ProductContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosRes } from '../../../api/axiosDefault';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DotLoader } from 'react-spinners'

export const Products = () => {
    const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
    const [next, setNext] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const products = useProduct()
    const setProducts = useSetProducts()
    const navigate = useNavigate()

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try{
        await axiosRes.get('/products?page=' + currentPage)
            .then(res => {
                setIsLoading(false)
                if (isFirstTimeLoading) {
                    setProducts(res.data.results)
                    setIsFirstTimeLoading(false)
                }
                else
                {
                    setProducts(products => [...products, ...res.data.results])
                }
                setNext(res.data.next)
                if (res.data.next != null) {
                    setCurrentPage(currentPage + 1)
                }
            })
            .catch(err=>{
                if(err.code === "ERR_NETWORK")
                    {
                    toast.error('We are sorry, but there is an error in the network')
                    navigate('/server-error')
                }
            })
        }catch(err){
            
        }
    }
    const loadingSpinner = (
        <>
            <div>
                <div className='product-loader d-flex justify-content-center align-items-center'>
                    <DotLoader size={80} loading={isLoading}/> 
                </div>
            </div>
        </>
    )
    const loadProducts = (
        <>
            <InfiniteScroll
                    dataLength={products.length}
                    hasMore={next != null ? true : false}
                    loader={<h4> Loading... </h4>}
                    next={getProducts}
                    style={{ overflowX:'hidden'}}
                >
            <Row>
                {products.map((product, id) => 
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2"  key={id}>
                        <Product product={product} id={id}/>
                    </Col>                                                
                )}
            </Row>
            </InfiniteScroll> 
        </>
    )

    return (
        <div style={{ marginTop: '85px' }}> 
            {isLoading ? loadingSpinner : products.length && loadProducts } 
            
        </div>)}
