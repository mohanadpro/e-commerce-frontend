import React, { useState } from 'react'
import { Steps } from "antd";
import ShoppingCart from '../cart/ShoppingCart';
import { Address } from '../address/Address';
import { Paypal } from '../paymnets/Paypal';
import { Button, Col } from 'react-bootstrap';
import style from '../../../assets/styles/Button.module.css'
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
    <div>
      <Steps current={currentStep} style={{marginTop:'95px'}}>
        <Step title={"Order Details"} />
        <Step title={"Address details"} />
        <Step title={"Review and Save"} />
      </Steps>
      <main>{renderStep(currentStep)}</main>
      <Col md={{span:4, offset:4}} style={{marginTop:'25px', marginBottom:'25px'}}>
        <Button onClick={handlePrevious} className={style.Button}>Back</Button>
        <Button onClick={handleNext} className={style.Button}>Continue To Checout</Button>
      </Col>
    </div>
  )
}