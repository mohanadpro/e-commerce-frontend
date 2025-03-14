import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useCart, useSetCart } from '../../../contexts/CartContext'
import './product.css'
import toast from 'react-hot-toast'
export const Product = ({ product, id }) => {
  const setCart = useSetCart()
  const [count, setCount] = useState(1)
  const Cart = useCart()

  const checkIfItemInArray = (item)=>{
    let isFound = false;
    let index = 0;
    for(let i=0; i<Cart.length;i++)
    {
      if(Cart[i].product === item.id)
        {
          isFound = true;
          index = i;
          break;
        }
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
      toast.success(`${item.name} has been added to the cart`, {duration: 3000})
    }
    else
    {
      Cart.splice(res[1], 1);
      addToCart(item)
      toast.success(`count of product ${item.name} has been updated`, {duration: 3000})
    }

  }

  return (
    <div className='product'>
      <Card>
        <Card.Img variant="top" src={product.image} alt='product' className='card-img-top' />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Price: <span data-testid="price"> {product.price}$ </span><br/>
            Color: <span data-testid="color"> {product.color} </span> <br />
            Size: <span data-testid="size">  {product.size} </span> <br/>
            Count: <select 
                   value={count} 
                   onChange={e=>setCount(e.target.value)}
                   aria-label='count of item'
                   data-testid="select-count"
                   >
              {
                Array.from(Array(25), (item, i) => 
                {
                  return <option value={i+1} key={i+1}> {i+1} </option>
                })
              }
            </select>
            <Button variant="none" size="sm" onClick={() => handleIncrement(product)} aria-label='Add to cart'>
              <i className='fa fa-plus'></i>
          </Button>
          </Card.Text>

        </Card.Body>
      </Card>
      </div>
  )
}