import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import { Footer } from '../footer/Footer'
import { Container } from 'react-bootstrap'

export const MainComponent = () => {
  return (
    <div>
        <NavBar/>
          <Container>
            <Outlet style={{'marginTop':'91px'}}/>
          </Container>
        <Footer/>
    </div>
  )
}
