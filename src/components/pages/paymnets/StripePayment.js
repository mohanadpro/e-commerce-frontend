import React, { useState } from 'react'
import { Form, Col, Row, InputGroup, Button } from 'react-bootstrap'
import { axiosRes } from '../../../api/axiosDefault'
import { useCart, useSetCart } from '../../../contexts/CartContext'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { useAddress, useSetAddress } from '../../../contexts/AddressContext'
import { useNavigate } from 'react-router-dom'
import {SendOrderToServer} from './SendOrder'
import { DotLoader } from 'react-spinners'
import './payment-method.css'
import toast from 'react-hot-toast'
export const StripePayment = ({amount}) => {
    const [isSpinner, setIsSpinner] = useState(false)
    const Cart = useCart()
    const setCart = useSetCart()
    const currentUser = useCurrentUser()
    const delivery_place = useAddress();
    const setAddress = useSetAddress();
    const navigate = useNavigate()
    const sendOrder = ()=>{
        SendOrderToServer(amount, Cart, setCart, currentUser, delivery_place, setAddress, navigate)
    }

    const [card, setCard] = useState({
        card_number: '',
        amount:amount,
        exp_month: '',
        exp_year: '',
        cvv: ''
    })
    const handleChanges = (e)=> {
        setCard({...card, 
            [e.target.name]: e.target.value
        })        
    }
    const handlePayment = (e)=>{
        e.preventDefault();
        setIsSpinner(true)
        axiosRes.post('payment/',card)
        .then(res=>{
            setIsSpinner(false)
            sendOrder()
        })
        .catch(err=>{
            toast.error("There was an error with the payment")
            setIsSpinner(false)
        })
    }
  return (
    <Row>
    <Col md={{span:4, offset:4}} className='payment-method'>
    <Form onSubmit={handlePayment}>
        <div className='text-center'>
            <ul>
               <li>Master card <i className="fa-brands fa-cc-mastercard" style={{color: '#FF5F00'}}></i> </li>
               <li>Visa card <i className="fa-brands fa-cc-visa" style={{color: '#1434CB'}}></i></li>
            </ul>
        </div>
        <Row>
        <Form.Group as={Col} controlId="validationCustom01">
            <Form.Control
                type="text"
                placeholder="Card Number"
                name='card_number'
                value={card.card_number}
                onChange={handleChanges}
                required
            />
            </Form.Group>
        </Row>
        <Row className="my-3">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Control
                type="text"
                placeholder="Exp Month"
                name='exp_month'
                value={card.exp_month}
                onChange={handleChanges}
                required
            />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <InputGroup hasValidation>
                <Form.Control
                type="text"
                placeholder="Exp Year"
                name='exp_year'
                value={card.exp_year}
                onChange={handleChanges}
                required
                />
            </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <InputGroup hasValidation>
                <Form.Control
                type="text"
                placeholder="CVV"
                name='cvv'
                value={card.cvv}
                onChange={handleChanges}
                required
                />
            </InputGroup>
            </Form.Group>
            <Button className='my-3 d-flex justify-content-center' type='submit' disabled={isSpinner}>
                <DotLoader size={20} color='white' loading={isSpinner}/> 
                   Pay {amount}$
            </Button>
        </Row>
    </Form>
    </Col>
    </Row>
  )
}
