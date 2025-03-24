import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Col, Row, InputGroup, Button,  } from 'react-bootstrap'
import {  useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ProfileImage from '../../../assets/images/default_profile_qdjgyp.WebP'
import './profile.css'
import { axiosRes } from '../../../api/axiosDefault'

export const Profile = () => {
    const [profile, setProfile] = useState({
      username: '',
      owner: '',
      name: '',
      email: '',
      country: '',
      state: '',
      zipcode: '',
      city: '',
      street: '',
      street_number: 0,
      image:ProfileImage
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const getProfile = async ()=> {
      if(id != undefined)
      {
      await axiosRes.get('/profiles/'+id)
      .then(res=>{
          setProfile(res.data);
      }).catch(err=>{
        console.log(err)
      })}}

    useEffect(()=>{
        getProfile();
    },[])
    const handleChanges = e=>{
        setProfile({...profile, 
            [e.target.name]: e.target.value
        })
    }
    const hadnleUpdate = async e =>{
        e.preventDefault(); 
        delete profile.image
        await axios.put('profiles/'+id,profile).then(
            res=>{
              toast.success('Profile has been updated succesfully... ')
              navigate('/products')
            }
        )
        .catch(err=>{
        })
    }
  return (
    <Form onSubmit={hadnleUpdate} className='profile' data-testid="profile-page">
        <div className='d-flex justify-content-center mt-5' style={{paddingTop:'25px'}}>
              <img alt='Profile' src={profile?.image} width='200px' height='200px'/>
        </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name='owner'
            value={profile.owner}
            onChange={handleChanges}
            data-testid="username-profile"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
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
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
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
            name='country'
            value={profile.country}
            onChange={handleChanges}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State"
            name='state'
            value={profile.state}
            onChange={handleChanges}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Zip"
            name='zipcode'
            value={profile.zipcode}
            onChange={handleChanges}          
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom06">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City"
            name='city'
            value={profile.city}
            onChange={handleChanges}
          />
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustom07">
          <Form.Label>Street</Form.Label>
          <Form.Control type="text" placeholder="Street"
            name='street'
            value={profile.street}
            onChange={handleChanges}
          />
       </Form.Group>
       <Form.Group as={Col} md="4" controlId="validationCustom08">
          <Form.Label>Street Number</Form.Label>
          <Form.Control type="number" placeholder="Street number"
            name='street_number'
            value={profile.street_number}
            onChange={handleChanges}
          />
       </Form.Group>
      </Row>
      <div className='d-flex justify-content-center my-3'>
      <Button type="submit" variant='success'>Update</Button>
      </div>
    </Form>
    
  )
}
