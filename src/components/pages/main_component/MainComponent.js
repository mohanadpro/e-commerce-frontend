import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import { Product } from '../product/Products'

export const MainComponent = () => {
  return (
    <div>
        <NavBar/>
        <Outlet style={{'marginTop':'91px'}}/>
    </div>
  )
}
