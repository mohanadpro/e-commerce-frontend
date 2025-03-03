import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import toast from 'react-hot-toast'
import { useCart, useSetCart } from '../../../contexts/CartContext'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { Col, Row } from 'react-bootstrap'
import { useAddress, useSetAddress } from '../../../contexts/AddressContext'
import { useNavigate } from 'react-router-dom'
import {SendOrderToServer} from './SendOrder'
import './payment-method.css'
export const Paypal = ({amount}) => {

    const Cart = useCart()
    const setCart = useSetCart()
    const currentUser = useCurrentUser()
    const delivery_place = useAddress();
    const setAddress = useSetAddress();
    const navigate = useNavigate()
    const sendOrder = ()=>{
        SendOrderToServer(amount, Cart, setCart, currentUser, delivery_place, setAddress, navigate)
    }

  return (
    <Row className='mt-2'>
    <Col md={{span:4, offset:4}} className="payment-method">
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
        <PayPalButtons style={{ layout: "horizontal" }} 
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: amount,
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    sendOrder()
                });
            }}
            onCancel={()=>{
                toast("You have cancelled the payment ", {duration: 3000})
            }}
            onError={(err) => {
                toast.error(
                    "There was an error processing your payment. If this error please contact support.", {
                    duration: 6000,
                });
            }}
        />
    </PayPalScriptProvider>
    </Col>
    </Row>
  )
}
