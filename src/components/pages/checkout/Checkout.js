import React, { useState } from 'react'
import { Steps } from "antd";
import ShoppingCart from '../cart/ShoppingCart';
import { Address } from '../address/Address';
import { Paypal } from '../paymnets/Paypal';
import { Button, Col } from 'react-bootstrap';
import style from '../../../assets/styles/Button.module.css'
import './checkout.css'
export const Checkout = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
    const renderStep = (step) => {
        switch (step) {
          case 0:
            return <ShoppingCart />;
          case 1:
            return <Address />;
          case 2:
            return <Paypal />;
          default:
            return null;
        }
      };
      const handleNext = ()=>{
        if(currentStep < 2 ){
        setCurrentStep(currentStep+1)
        }
      }
      const handlePrevious = ()=>{
        if(currentStep > 0 ){
        setCurrentStep(currentStep-1)
        }
      }

  return (
    <div className='checkout'>
      <Steps current={currentStep} style={{marginTop:'95px'}}>
        <Step title={"Order Details"} />
        <Step title={"Address details"} />
        <Step title={"Payment method"} />
      </Steps>
      <main>{renderStep(currentStep)}</main>
      <Col md={{span:4, offset:5}} style={{ marginBottom:'25px'}}>
       {currentStep!=0 && <Button onClick={handlePrevious} className={`${style.Button} checkout-button`}>
              <i class="fa-solid fa-angle-left"></i>
         Back</Button>}
       {currentStep!=2 && <Button onClick={handleNext} className={`${style.Button} back-button`}>Continue To Checkout
              <i class="fa-solid fa-angle-right"></i>
        </Button>}
      </Col>
    </div>
  )
}
