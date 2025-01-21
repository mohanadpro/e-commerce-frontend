import React, { useEffect, useState } from 'react'
import { Product } from './Product';
import { Col, Row } from 'react-bootstrap';
import { useProduct, useSetProducts } from '../../../contexts/ProductContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosRes } from '../../../api/axiosDefault';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
export const Products = () => {
    const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true)
    const [next, setNext] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const products = useProduct()
    const setProducts = useSetProducts()
    const navigate = useNavigate()
    const getProducts = async () => {
        await axiosRes.get('/products?page=' + currentPage)
            .then(res => {
                if (isFirstTimeLoading) {
                    // setProducts(res.data.results)
                    // setIsFirstTimeLoading(false)
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
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div style={{ marginTop: '85px' }}>

            {products.length &&
                <InfiniteScroll
                    dataLength={products.length}
                    hasMore={next != null ? true : false}
                    loader={<h4> Loading... </h4>}
                    next={getProducts}
                    style={{ overflowX:'hidden'}}
                >
                    <Row>
                        {products.map((product, id) => 
                            <Col md={3}  className="my-2"  key={id}>
                                <Product product={product} id={id} />
                            </Col>                                                
                        )}
                    </Row>
                    </InfiniteScroll> 
                    }

                        </div>
                    )
                    }
