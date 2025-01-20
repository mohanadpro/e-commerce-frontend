import React, { useState } from 'react'
import { Form, Col, Row, InputGroup, Button } from 'react-bootstrap'
import { axiosRes } from '../../../api/axiosDefault'
import { useCart, useSetCart } from '../../../contexts/CartContext'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { useAddress, useSetAddress } from '../../../contexts/AddressContext'
import { useNavigate } from 'react-router-dom'
import {SendOrderToServer} from './SendOrder'

export const StripePayment = ({amount}) => {
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
        amount:0.0,
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
        setCard({...card, amount: amount})
        axiosRes.post('payment/',card)
        .then(res=>{
            console.log(res)
            sendOrder()
        })
        .catch(err=>{

        })
    }
  return (
    <Row>
    <Col md={{span:3, offset:4}}>
    <Form onSubmit={handlePayment}>
        <Row>
        <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
                type="text"
                placeholder="Card Number"
                name='card_number'
                value={card.card_number}
                onChange={handleChanges}
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
                />
            </InputGroup>
            </Form.Group>
            <Button className='my-3' type='submit'>Pay</Button>
        </Row>
    </Form>
    </Col>
    </Row>
  )
}
