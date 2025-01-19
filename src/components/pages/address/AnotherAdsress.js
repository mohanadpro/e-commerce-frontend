import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export const AnotherAdsress = ({setIsShippingToProfileAddress, address, setAddress}) => {
    const [finalAddress, setFinalAddress] = useState({})

    const hadnleUpdate = e=>{
        e.preventDefault()
        setIsShippingToProfileAddress(true)
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
                        value={finalAddress.name}
                        onChange={handleChanges}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Country"
                        name='country'
                        value={finalAddress.country}
                        onChange={handleChanges}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State"
                        name='state'
                        value={finalAddress.state}
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
                        value={finalAddress.zipcode}
                        onChange={handleChanges}
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
                        value={finalAddress.city}
                        onChange={handleChanges}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street</Form.Label>
                    <Form.Control type="text" placeholder="Street"
                        name='street'
                        value={finalAddress.street}
                        onChange={handleChanges}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid Street.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Street Number</Form.Label>
                    <Form.Control type="number" placeholder="Street number"
                        name='street_number'
                        value={finalAddress.street_number}
                        onChange={handleChanges}
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
