import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useCart } from '../../../contexts/CartContext'
import axios from 'axios'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'

export const Paypal = ({amount}) => {

    const Cart = useCart()
    const currentUser = useCurrentUser()
    
    const sendNotificationToServer = async ()=>{
    const formData = new FormData();
    formData.append('cart', Cart);
    formData.append('total_price',25.6)
    formData.append('customer', currentUser.pk)
    const {data} =await axios.post('orders/',formData);

    }
  return (
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
                return actions.order.capture().then((details) => 
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
  )
}
