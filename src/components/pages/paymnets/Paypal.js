import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import toast from 'react-hot-toast'
import { useCart } from '../../../contexts/CartContext'
import axios from 'axios'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { Button, Col, Row } from 'react-bootstrap'
import { useAddress } from '../../../contexts/AddressContext'

export const Paypal = ({amount}) => {

    const Cart = useCart()
    const currentUser = useCurrentUser()
    const delivery_place = useAddress();

    const sendNotificationToServer = async ()=>{
    const formData = new FormData();
    formData.append('cart', JSON.stringify(Cart));
    formData.append('total_price', amount)
    delete delivery_place.image
    delete delivery_place.created_at
    delete delivery_place.updated_at
    formData.append('delivery_place', JSON.stringify(delivery_place))
    formData.append('customer', currentUser.pk)
    const {data} =await axios.post('orders/',formData);
    }

  return (
    <Row style={{margin:'100px auto'}}>
    <Col md={{span:3, offset:4}}>
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
                    const name = details.payer.name.given_name;
                    toast.success("Thank you for your payment "+name , {duration: 3000})
                    sendNotificationToServer()
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
    <Button onClick={()=>sendNotificationToServer()}>Click</Button>
    </Col>
    </Row>
  )
}
