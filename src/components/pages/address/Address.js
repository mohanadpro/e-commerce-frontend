import React, { useEffect, useMemo, useState } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'
import { Col, NavLink, Row } from 'react-bootstrap'
import style from '../../../assets/styles/Button.module.css'
import './address.css'
import { useAddress, useSetAddress } from '../../../contexts/AddressContext'
import { AnotherAdsress } from './AnotherAdsress'
import { axiosRes } from '../../../api/axiosDefault'
export const Address = ({setIsFormValid, isTesting}) => {
    const [hasUserAddress, setHasUserAddress] = useState(true);
    const setAddress = useSetAddress()
    const address = useAddress()
    const currentUser = useCurrentUser()
    const [ isShippingToProfileAdd, setIsShippingToProfileAddress ] = useState(true)
    const getUseProfile = async ()=>{
        try{
        if(isTesting)        
            var { data } = await axiosRes.get(`profiles/${currentUser.pk}`, { headers : { 'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`}})        
        else
            var { data } = await axiosRes.get(`profiles/${currentUser.pk}`)
        setAddress(data)
        if(data.city === "" || data.country === "" || data.zipcode === "" || data.street === "" || data.street_number === 0 || data.name === "" )
            {
                setHasUserAddress(false)
                setIsFormValid(false)
            }
            else{
                setIsFormValid(true)
            }
        }catch(err){
            setHasUserAddress(false)
        }
    }

    useEffect(()=>{
        getUseProfile()
    },[])
  return (
    <Row >
      {hasUserAddress && isShippingToProfileAdd ? <Col md={{span:4, offset:4}} data-testid="customer-address" >
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
       <Col md={{span:4, offset:4}} data-testid="add-another-customer-address">
        <AnotherAdsress  setHasUserAddress={setHasUserAddress} setIsShippingToProfileAddress={setIsShippingToProfileAddress} address={address} setAddress={setAddress} setIsFormValid={setIsFormValid}/>
       </Col>
       }
    </Row>
  )
}
