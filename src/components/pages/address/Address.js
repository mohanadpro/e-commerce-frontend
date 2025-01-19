import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { Col, NavLink, Row } from 'react-bootstrap'
import style from '../../../assets/styles/Button.module.css'
import './address.css'
import { useAddress, useSetAddress } from '../../../contexts/AddressContext'
import { AnotherAdsress } from './AnotherAdsress'
export const Address = () => {
    const setAddress = useSetAddress()
    const address = useAddress()
    const currentUser = useCurrentUser()
    const [ isShippingToProfileAdd, setIsShippingToProfileAddress ] = useState(true)
    const getUseProfile = async ()=>{
        try{
        const { data } = await axios.get(`profiles/${currentUser.pk}`)
        setAddress(data)
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
                 {address.name} <br/>
                 {address.country} <br/>
                 {address.state} <br/>
                 {address.city} <br/>
                 {address.street} <br/>
                 {address.zipcode} <br/>
            </p>
            <NavLink onClick={e=>setIsShippingToProfileAddress(false)} className={`${style.Button} another-address`}>
                To another address
            </NavLink> 
       </Col>:
       <Col md={{span:4, offset:4}}>
          <AnotherAdsress setIsShippingToProfileAddress={setIsShippingToProfileAddress} address={address} setAddress={setAddress} />
       </Col>
       }
    </Row>
  )
}
