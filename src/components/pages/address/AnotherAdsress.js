import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'

export const AnotherAdsress = ({setHasUserAddress, setIsShippingToProfileAddress, address, setAddress, setIsFormValid}) => {

    useEffect(()=>{
        setIsFormValid(false)
    },[])
    
    const hadnleUpdate = e=>{
        e.preventDefault()
        if(address.city != "" && address.country != "" && address.zipcode != "" && address.street != "" && address.street_number !=0 && address.name != "" )
        {
            setIsFormValid(true)
            setIsShippingToProfileAddress(true)
            setHasUserAddress(true)
        }
        else
        {
            toast.error('Please fill all the field')
        }
    }
    const handleChanges = e=>{
        setAddress({...address, 
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <Form onSubmit={hadnleUpdate}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        name='name'
                        value={address.name}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country"
                        name='country'
                        value={address.country}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State"
                        name='state'
                        value={address.state}
                        onChange={handleChanges}                        
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip"
                        name='zipcode'
                        value={address.zipcode}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City"
                        name='city'
                        value={address.city}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Street"
                        name='street'
                        value={address.street}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control type="number" placeholder="Street number"
                        name='street_number'
                        value={address.street_number}
                        onChange={handleChanges}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <div className='d-flex justify-content-center'>
                <Button type="submit" variant='success'>Add</Button>
            </div>
        </Form>
    )
}
