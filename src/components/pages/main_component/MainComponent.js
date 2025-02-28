import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import { Footer } from '../footer/Footer'
import { Container } from 'react-bootstrap'
import { useCurrentUser } from '../../../contexts/CurrentUserContext'

export const MainComponent = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(()=>{
    if(currentUser)
    {
    if(currentUser?.is_admin)
      navigate('/admin')
    else
      navigate('products')
    }
  },[])
  return (
    <div>
      Main Component
        <NavBar/>
          <Container>
            <Outlet style={{'marginTop':'91px'}}/>
          </Container>
        <Footer/>
    </div>
  )
}
