import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

export const Product = () => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        await axios.get('/products')
            .then(res => {
                console.log(res.data.results[0].name)
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
                <Card key={id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description} <br/>
                           Color: <span  className="text-info"> {product.color} </span> <br/>
                          Size: <span className="text-info">  {product.size} </span>
                        </Card.Text>

                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
