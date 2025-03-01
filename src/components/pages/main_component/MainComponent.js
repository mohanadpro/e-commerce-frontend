import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import { Footer } from '../footer/Footer'
import { Container } from 'react-bootstrap'
export const MainComponent = () => {
  const navigate = useNavigate();
  const is_admin = localStorage.getItem("is_admin");    
  useEffect(()=>{
    if(is_admin == "true")
    {
      navigate('/admin')
    }
    else
    {
      navigate('/products')
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
