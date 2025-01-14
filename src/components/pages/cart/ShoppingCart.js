import React from 'react'
import { useCart } from '../../../contexts/CartContext';
import { ProductTable } from './ProductTable';
import { Paypal } from '../paymnets/Paypal';
import { Col, Row } from 'react-bootstrap';

function ShoppingCart() {
  const Cart = useCart();

  return (
    <div>
      <ProductTable products={Cart}/>
      <Row>
        <Col md={{span:3,offset:5}}>
         <Paypal amount={25}/>
        </Col>
      </Row>
    </div>
  );
}

export default ShoppingCart;