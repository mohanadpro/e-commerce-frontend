import React, { useState } from 'react'
import { StripePayment } from './StripePayment'
import { Paypal } from './Paypal'
import { Form } from 'react-bootstrap'

export const PaymentMethod = ({amount}) => {
  const [isPaymentUsingPayPal, setIsPaymentUsingPaypal] = useState(false)
  const [isPaymentMethodDetermined, setIsPaymentMethodDetermined] = useState(false)
  const handlePaypalChanges = (e)=>{
    setIsPaymentMethodDetermined(true);
    setIsPaymentUsingPaypal(true);
  }
  const handleStripeChanges = (e)=>{
    setIsPaymentMethodDetermined(true);
    setIsPaymentUsingPaypal(false);
  }
  return (
    <div style={{marginTop:'91px'}}>
      <div className='d-flex justify-content-center' >
     {
     !isPaymentMethodDetermined && <Form>
        <label>Paypal 
          <i className="fa-brands fa-cc-paypal" style={{color: '#003087'}}></i>
        </label>
        <input type='radio' name="typeofpaymentmethod" value='paypal' onChange={handlePaypalChanges}/><br/>
        <label>Visa Card <i className="fa-brands fa-cc-visa" style={{color:"	#1A1F71"}}></i> , Master Card <i className="fa-brands fa-cc-mastercard" style={{color:'#EB001B'}}></i></label>
        <input type='radio' name="typeofpaymentmethod" value='mastercard' onChange={handleStripeChanges}/>
      </Form>
      }
      </div>
    <div>
       { isPaymentMethodDetermined && !isPaymentUsingPayPal && <StripePayment amount={amount}/> }
       { isPaymentMethodDetermined && isPaymentUsingPayPal && <Paypal amount={amount}/> }
    </div>
    </div>
  )
}
