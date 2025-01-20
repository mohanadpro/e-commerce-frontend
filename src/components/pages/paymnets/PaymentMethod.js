import React from 'react'
import { StripePayment } from './StripePayment'
import { Paypal } from './Paypal'

export const PaymentMethod = ({amount}) => {
  return (
    <div>
        <StripePayment amount={amount} />
        <Paypal amount={amount}/>;
    </div>
  )
}
