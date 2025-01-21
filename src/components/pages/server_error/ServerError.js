import React from 'react'
import ServerErrorPage from '../../../assets/images/Server Error.webp'
import './server-error.css'
export const ServerError = () => {
  return (
      <div className='d-flex justify-content-center align-items-center server-error'>
        <img src={ServerErrorPage} alt='Server error'/>
      </div>
  )
}
