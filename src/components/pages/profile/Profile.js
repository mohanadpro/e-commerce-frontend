import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import axios from 'axios'
import { Form, Col, Row, InputGroup, Button,  } from 'react-bootstrap'
import {  Navigate, useParams } from 'react-router-dom'

export const Profile = () => {
    const [profile, setProfile] = useState({})
    const { id } = useParams();
    const getProfile = async ()=> {
        console.log('Hello world')
        await axios.get('/profiles/'+id)
        .then(res=>{
            setProfile(res.data);
        }).catch(err=>{

        })
    }
    useEffect(()=>{
        getProfile();
    },[])

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
    };

    const handleChanges = e=>{
        console.log('Hello world')
        setProfile({...profile, 
            [e.target.name]: e.target.value
        })
        console.log(profile);
    }
    const hadnleUpdate = async e =>{
        e.preventDefault(); 
        delete profile.image
        await axios.put('profiles/'+id,profile).then(
            res=>{
                console.log(res.data)
                Navigate('/')
            }
        )
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <Form onSubmit={hadnleUpdate} style={{marginTop:'91px'}}>
        <Row>
            <Col md={{span:4, offset:4}}>
            <img src={profile?.image} width='200px' height='200px'/>
            </Col>
        </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            defaultValue={profile?.owner}
            name='owner'
            value={profile.owner}
            onChange={handleChanges}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            defaultValue={profile?.name}
            name='name'
            value={profile.name}
            onChange={handleChanges}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              defaultValue={profile?.email}
              name='email'
              value={profile.email}
              onChange={handleChanges}
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Country"
            defaultValue={profile?.country}
            name='country'
            value={profile.country}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State"
            defaultValue={profile?.state}
            name='state'
            value={profile.state}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" 
            defaultValue={profile?.zipcode}
            name='zipcode'
            value={profile.zipcode}
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
            defaultValue={profile?.city}
            name='city'
            value={profile.city}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Street</Form.Label>
          <Form.Control type="text" placeholder="Street"
            defaultValue={profile?.street}
            name='street'
            value={profile.street}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Street.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Street Number</Form.Label>
          <Form.Control type="number" placeholder="Street number"
            defaultValue={profile?.street_number}
            name='street_number'
            value={profile.street_number}
            onChange={handleChanges}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Street.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Update</Button>
    </Form>
  )
}
