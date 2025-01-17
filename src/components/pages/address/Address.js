import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { Col, NavLink, Row } from 'react-bootstrap'
import style from '../../../assets/styles/Button.module.css'
import './address.css'
export const Address = () => {
    const currentUser = useCurrentUser()
    const [ profile, setProfile ] = useState({})
    const [ isShippingToProfileAdd, setIsShippingToProfileAddress ] = useState(true)
    const getUseProfile = async ()=>{

        try{
            console.log(currentUser);
        const { data } = await axios.get(`profiles/${currentUser.pk}`)
        
        setProfile(data)
        }catch(err){
            console.log('error')

        }
    }
    useEffect(()=>{
        getUseProfile()
    },[])
  return (
    <Row >
      {isShippingToProfileAdd ? <Col md={{span:4, offset:4}}>
            <p>
                The order will be shipped to the below address <br/><br/>
                 {profile.name} <br/>
                 {profile.country} <br/>
                 {profile.state} <br/>
                 {profile.state} <br/>
                 {profile.street} <br/>
                 {profile.zipcode} <br/>
            </p>
            <NavLink onClick={e=>setIsShippingToProfileAddress(false)} className={`${style.Button} another-address`}>
                To another address
            </NavLink> 
       </Col>:
       <Col md={{span:4, offset:4}}>
            
       </Col>
       }
    </Row>
  )
}
