import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'

export const Address = () => {
    const currentUser = useCurrentUser()
    const [ profile, setProfile ] = useState({})
    const getUseProfile = async (e)=>{
        e.preventDefault()
        try{
        const { data } = await axios.get(`/profiles/+${currentUser.id}`)
        
        setProfile(data)
        }catch(err){
            console.log('error')

        }
    }
    useEffect(()=>{
        getUseProfile()
    },[])
  return (
    <div>
        {profile.name} <br/>
        {profile.country} <br/>
        {profile.state} <br/>
        {profile.street} <br/>
        {profile.zipcode} <br/>
    </div>
  )
}
