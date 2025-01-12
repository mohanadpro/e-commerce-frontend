import React from 'react'
import { Card, Col } from 'react-bootstrap'

export const Product = ({product, id}) => {
  return (
    <Col>
    <Card key={id} style={{ width: '18rem' }}>
    <Card.Img variant="top" src={product.image} />
    <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
            {product.description} <br/>
           Color: <span  className="text-info"> {product.color} </span> <br/>
          Size: <span className="text-info">  {product.size} </span>
        </Card.Text>
    </Card.Body>
    </Card>
    </Col>
  )
}
