import React, { useState } from 'react'
import { StripePayment } from './StripePayment'
import { Paypal } from './Paypal'
import { Col } from 'react-bootstrap'
import './payment-method.css'
export const PaymentMethod = ({amount}) => {
  return (
    <Col md={{md:5}} style={{marginTop:'90px'}} data-testid="payment-methods">
        <StripePayment amount={amount}/> 
        <Paypal amount={amount}/> 
    </Col>
  )
}
