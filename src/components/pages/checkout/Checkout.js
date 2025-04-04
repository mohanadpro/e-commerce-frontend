import React, { useState } from 'react'
import { Steps } from "antd";
import ShoppingCart from '../cart/ShoppingCart';
import { Address } from '../address/Address';
import { Button, Col } from 'react-bootstrap';
import style from '../../../assets/styles/Button.module.css'
import './checkout.css'
import { useCart } from '../../../contexts/CartContext';
import { PaymentMethod } from '../paymnets/PaymentMethod';
import toast from 'react-hot-toast';
export const Checkout = ({isTesting}) => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [ isFormValid, setIsFormValid ] = useState(false);
  const Cart = useCart()
  const calculate_total_price= ()=> {
    let sum_total_price = 0
    for(let i=0; i<Cart.length; i++)
        sum_total_price += Cart[i].total_price
    return sum_total_price;
}


    const renderStep = (step) => {
      const amount = calculate_total_price()
        switch (step) {
          case 0:
            return <ShoppingCart />;
          case 1:
            return <Address setIsFormValid={setIsFormValid} isTesting={isTesting}/>;
          case 2:
            return <PaymentMethod amount={amount}/>;
          default:
            return null;
        }
      };
      const handleNext = ()=>{
        if(currentStep < 2 ){
          if(currentStep === 1)
            if(isFormValid)
              setCurrentStep(currentStep+1)            
            else            
              toast.error('The shipping address is not valid')            
          else          
            setCurrentStep(currentStep+1)                     
        }
      }
      const handlePrevious = ()=>{
        if(currentStep > 0 ){
        setCurrentStep(currentStep-1)
        }
      }

  return (
    <div className='checkout' data-testid="checkout-page">
      <Steps current={currentStep} style={{marginTop:'95px'}}>
        <Step title={"Order Details"} data-testid="order-details-step"/>
        <Step title={"Address details"} data-testid="address-details-step"/>
        <Step title={"Payment method"} data-testid="payment-step"/>
      </Steps>
      <main>{renderStep(currentStep)}</main>
      <Col md={{span:4, offset:5}} style={{ marginBottom:'25px', marginTop:'75px'}}>
       {currentStep!=0 && <Button onClick={handlePrevious} data-testid="previous-button" className={`${style.Button} checkout-button`}>
              <i className="fa-solid fa-angle-left"></i>
         Back</Button>}
       {currentStep!=2 && <Button onClick={handleNext} data-testid="next-button" className={`${style.Button} back-button`}>Continue To Checkout
              <i className="fa-solid fa-angle-right"></i>
        </Button>}
      </Col>
    </div>
  )
}
