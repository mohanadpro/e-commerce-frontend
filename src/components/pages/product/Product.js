import React, { useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useCart, useSetCart } from '../../../contexts/CartContext'

export const Product = ({ product, id }) => {
  const setCart = useSetCart()
  const [count, setCount] = useState(1)
  const Cart = useCart()

  const checkIfItemInArray = (item)=>{
    let isFound = false;
    let index = 0;
    for(let i=0; i<Cart.length;i++)
      if(Cart[i].id === item.id)
        {
          isFound = true;
          index = i;
          break;
        }
    return [isFound, index];
  }

  const addToCart = (item)=>{    
    const added_product = {
        'product': item.id,
        'name': item.name,
        'count': count,
        'image': item.image,
        'price': item.price,
        'total_price': item.price * count              
    }
  setCart([ ...Cart, added_product ])
  }
  const handleIncrement = (item) => {
    const res = checkIfItemInArray(item);
    if(res[0] === false)
    {
      addToCart(item)
    }
    else
    {
      Cart.splice(res[1], 1);
      addToCart(item)
    }
  }
  
  return (
    <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Color: <span className="text-info"> {product.color} </span> <br />
            Size: <span className="text-info">  {product.size} </span> <br/>
            Count: <select value={count} onChange={e=>setCount(e.target.value)}>
              {
                Array.from(Array(25), (item, i) => 
                {
                  return <option value={i+1} key={i+1}> {i+1} </option>
                })
              }
            </select>
            <Button variant="none" size="sm" onClick={() => handleIncrement(product)}>
            <i className='fa fa-plus'></i>
          </Button>
          </Card.Text>

        </Card.Body>
      </Card>
    </Col>
  )
}