import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const Paypal = ({amount}) => {

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
                return actions.order.capture().then((details) => {
                    console.log('You have successful payment')
                    const name = details.payer.name.given_name;
                    toast.success("Thank you for your payment "+name , {duration: 3000})
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
