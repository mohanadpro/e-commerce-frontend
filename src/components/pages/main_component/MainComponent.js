import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../navbar/NavBar'

export const MainComponent = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}
